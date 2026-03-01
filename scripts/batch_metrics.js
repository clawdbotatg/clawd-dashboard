// Batch all contract metric reads via Alchemy JSON-RPC batching
// Uses precomputed 4-byte selectors (keccak256 first 4 bytes)
const https = require('https');
const RPC = process.env.ALCHEMY_RPC || 'https://mainnet.base.org'; // set ALCHEMY_RPC=https://base-mainnet.g.alchemy.com/v2/<key>

const CONTRACTS = [
  { addr: '0xef2f6d7020f4b088fee65d5369bc792d7b2f40fc', name: 'unknown-1000tx' },
  { addr: '0xaa7466fa805e59f06c83befb2b4e256a9b246b04', name: 'TenTwentyFourX' },
  { addr: '0x859e5cb97e1cf357643a6633d5bec6d45e44cfd4', name: 'ClawFomo-current' },
  { addr: '0xa37c70168201c290cbefcbda95daa779f0dba305', name: 'ClawdPFPMarket' },
  { addr: '0x861e96c70a94cdebfb3fb89f3a96fe16b5e31891', name: 'ClawdFomo-v2' },
  { addr: '0x536453350f2eee2eb8bfee1866baf4fca494a092', name: 'Incinerator' },
  { addr: '0x6b003f883c608bdad938cd6dc3730b17ac46e196', name: 'unknown-178tx' },
  { addr: '0x1062eace4f3083c164796b9b2649ce6c25acebe6', name: 'unknown-102tx' },
  { addr: '0xcb67a69471f4842a142460c271a26deab358ea79', name: 'ClawdFomo-v3' },
  { addr: '0x90552946edd5a6bad7647655da6c805a188dfd25', name: 'ClawdStake' },
  { addr: '0x8d3547c0336149a1592472ac8d5c07c52865f801', name: 'unknown-68tx' },
  { addr: '0x572bc6149a5a9b013b5e9c370aef6fec8388f53f', name: 'unknown-54tx' },
  { addr: '0xd4f419065ee4b89ef8f9b2c224a9ebdee62abf54', name: 'unknown-52tx' },
  { addr: '0xa51fe0491292fbad5caa23f674cd59c1480ec60a', name: 'CLAWDlabs' },
  { addr: '0xa5cd6e15f91ae84f5513a60c398f3c5e4c43e399', name: 'unknown-23tx-a' },
  { addr: '0x3371976d639a383bcfe6ac7c304602ac34351b53', name: 'unknown-23tx-b' },
  { addr: '0xc0520e84c4362bc0075f190e987417742d0d6814', name: 'unknown-17tx' },
  { addr: '0x8606551d2be495503fbf23f50bbfd307385e9bdf', name: 'ClawdPFP-v2' },
  { addr: '0xaf206d40f293f5892ce86986baff5bb426a188a1', name: 'unknown-16tx-a' },
  { addr: '0x7a0b9f1bb27808c5020e83bdd711fb9b254f0826', name: 'unknown-16tx-b' },
  { addr: '0xe94b4b5a7a0a98cf9ed303a9c6d2d4ad7e5ef423', name: 'ClawdMemeContest-latest' },
  { addr: '0x85af18a392e564f68897a0518c191d0831e40a46', name: 'IdeaLabs' },
  { addr: '0x23f44c39f417f16807643fc8eb3435c3e47e1a32', name: 'ClawdFomo3D-v4' },
  { addr: '0x3ae6af15c2699ab4f39394c58cbdd829a1d31f59', name: 'ClawdMemeContest-v2' },
  // Also check CLAWD token balances for interesting contracts
  { addr: '0x536453350f2eee2eb8bfee1866baf4fca494a092', name: 'Incinerator-CLAWD-bal', _balOf: true },
  { addr: '0x6b003f883c608bdad938cd6dc3730b17ac46e196', name: 'unknown-178tx-CLAWD-bal', _balOf: true },
];

// Known 4-byte selectors (keccak256 of sig)
const SELS = {
  totalBurned:        '0xd89135cd',
  totalIncinerated:   '0xdc80a2b0',
  totalClawdBurned:   '0x92e0d1c9',
  getRoundCount:      '0x4b23f510',
  currentRound:       '0x8a19c8bc',
  roundId:            '0x979bc638',
  nextIdeaId:         '0x41d2ecb8',
  nextProposalId:     '0x3e4d4921',
  totalMinted:        '0xa2309ff8',
  totalStaked:        '0x817b1cd2',
  totalListings:      '0xd9e81a61',
  totalSales:         '0xaf0c5e24',
  totalVolume:        '0xf4b0b4e5',
};

// balanceOf(address) selector + padded address for CLAWD token
const CLAWD = '0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07';
function balOfData(addr) {
  return '0x70a08231' + addr.slice(2).toLowerCase().padStart(64, '0');
}

function post(body) {
  return new Promise((resolve) => {
    const s = JSON.stringify(body);
    const req = https.request(RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(s) }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve(JSON.parse(d)); } catch { resolve([]); } });
    });
    req.on('error', () => resolve([]));
    req.setTimeout(15000, () => { req.destroy(); resolve([]); });
    req.write(s);
    req.end();
  });
}

function fmtBig(hex) {
  if (!hex || hex === '0x') return null;
  const n = BigInt(hex);
  if (n === 0n) return null;
  if (n >= 1000000000000000000n) {
    const eth = Number(n) / 1e18;
    if (eth >= 1e6) return `${(eth/1e6).toFixed(2)}M CLAWD`;
    if (eth >= 1e3) return `${(eth/1e3).toFixed(1)}K CLAWD`;
    return `${eth.toFixed(2)} CLAWD`;
  }
  return n.toString();
}

async function main() {
  // Build mega batch
  const batch = [];
  let id = 0;
  const index = []; // maps id -> {contractName, fnName}

  for (const c of CONTRACTS) {
    if (c._balOf) {
      batch.push({ jsonrpc:'2.0', id: id++, method:'eth_call', params:[{to:CLAWD, data:balOfData(c.addr)}, 'latest'] });
      index.push({ name: c.name, fn: 'CLAWD.balanceOf' });
    } else {
      for (const [fn, sel] of Object.entries(SELS)) {
        batch.push({ jsonrpc:'2.0', id: id++, method:'eth_call', params:[{to:c.addr, data:sel}, 'latest'] });
        index.push({ name: c.name, fn });
      }
    }
  }

  console.log(`Firing ${batch.length} RPC calls in one batch...`);
  const results = await post(batch);
  
  // Group by contract name
  const grouped = {};
  results.forEach(r => {
    const meta = index[r.id];
    if (!meta) return;
    const val = fmtBig(r.result);
    if (val) {
      if (!grouped[meta.name]) grouped[meta.name] = {};
      grouped[meta.name][meta.fn] = val;
    }
  });

  console.log('\n========== CONTRACT METRICS ==========\n');
  for (const [name, metrics] of Object.entries(grouped)) {
    if (Object.keys(metrics).length === 0) continue;
    console.log(`${name}`);
    for (const [fn, val] of Object.entries(metrics)) {
      console.log(`  ${fn}: ${val}`);
    }
    console.log('');
  }

  // Show contracts with NO readable metrics
  const noMetrics = CONTRACTS.filter(c => !c._balOf && !grouped[c.name]);
  if (noMetrics.length) {
    console.log('=== No readable metrics ===');
    noMetrics.forEach(c => console.log(`  ${c.name} ${c.addr}`));
  }
}

main().catch(console.error);
