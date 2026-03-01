const fs = require('fs');
const https = require('https');

const contracts = fs.readFileSync('/tmp/all_contracts.txt', 'utf8').trim().split('\n').filter(Boolean);
const OUT = '/tmp/scored_final.txt';
fs.writeFileSync(OUT, '');

function fetchJson(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log(`Scoring ${contracts.length} contracts...`);
  
  for (let i = 0; i < contracts.length; i++) {
    const addr = contracts[i];
    try {
      const [r1, r2] = await Promise.all([
        fetchJson(`https://base.blockscout.com/api?module=account&action=txlist&address=${addr}&page=1&offset=1000&sort=asc`),
        fetchJson(`https://base.blockscout.com/api/v2/addresses/${addr}`)
      ]);
      const txCount = r1?.result?.length ?? 0;
      const name = r2?.name || 'unknown';
      const line = `${txCount}\t${addr}\t${name}\n`;
      fs.appendFileSync(OUT, line);
      if (i % 10 === 0) console.log(`${i+1}/${contracts.length} done`);
    } catch(e) {
      fs.appendFileSync(OUT, `0\t${addr}\terror\n`);
    }
    await sleep(350);
  }
  
  // Sort the final file
  const lines = fs.readFileSync(OUT, 'utf8').trim().split('\n').filter(Boolean);
  lines.sort((a, b) => parseInt(b) - parseInt(a));
  fs.writeFileSync(OUT, lines.join('\n') + '\n');
  
  console.log('\n=== TOP 40 ===');
  lines.slice(0, 40).forEach(l => console.log(l));
  console.log('DONE');
}

main().catch(e => { console.error(e); process.exit(1); });
