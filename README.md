# 🦞 CLAWD Ecosystem Dashboard

One page to rule them all. Every onchain stat, every app, every burned token — live, aggregated, and impossible to fake.

## 🔗 Links

- **IPFS (v1):** [community.bgipfs.com/ipfs/bafybeihzyisdq6pymqt5dniuo7exrdpkjxfndxqnjsksgz5kqgprkaihoy](https://community.bgipfs.com/ipfs/bafybeihzyisdq6pymqt5dniuo7exrdpkjxfndxqnjsksgz5kqgprkaihoy)
- **GitHub:** https://github.com/clawdbotatg/clawd-dashboard
- **Stack:** Scaffold-ETH 2 · Base · BGIPFS · No custom contracts

---

## 🎯 Goal

The CLAWD ecosystem has **52+ deployed contracts across 20+ apps** on Base. Right now, there's no single place to see the full picture — total tokens burned, total transactions processed, total NFTs minted, total games played, total fees earned.

This dashboard fixes that. It reads every contract directly onchain, aggregates everything into global KPIs, and shows **numbers going up in real time** as people use the ecosystem.

Think: "CLAWD mission control."

---

## 📊 What It Shows

### Global Hero Stats (top of page)
| Metric | How we get it |
|--------|---------------|
| 🔥 Total CLAWD Burned | Sum of `totalBurned` across all burn contracts |
| 💀 % of Supply Burned | Burned ÷ totalSupply |
| 💰 USD Value Burned | Burned × CLAWD price (DexScreener) |
| 📈 CLAWD Price | DexScreener API |
| 🏛️ FDV / Market Cap | Price × circulating supply |
| ⚡ Transactions (All Apps) | Sum of interaction counts across all contracts |
| 🎮 Total NFTs Minted | Sum across PFP + 10K + future NFT apps |
| 🏆 Apps Deployed | Count of tracked contracts |

### Per-App Cards (grid)

Each app gets a card showing:
- App name, description, emoji
- Contract address (linked to Basescan)
- Key metrics (specific to app type)
- CLAWD burned (if applicable)
- Link to live app

### App Tiers

**Tier 1 — Production Apps** (flagship products with real usage)
| App | Contract | Key Metric |
|-----|----------|------------|
| 🔥 ClawFomo | (deployer3 history) | Rounds played, ETH paid out, CLAWD burned |
| 🧪 CLAWDlabs | (deployer3 history) | Ideas staked, CLAWD staked |
| 🔒 Liquidity Vesting | `0x7916773e871a832ae2b6046b0f964a078dc67ab4` | CLAWD locked, vest progress |
| 📊 Token Hub | (read-only, no contract) | Price, supply, holders |

**Tier 2 — CLAWD Utility Apps** (token mechanics)
| App | Contract | Key Metric |
|-----|----------|------------|
| 🔥 CLAWD Burner | `0xe499B193ffD38626D79e526356F3445ce0A943B9` | Total burned, total burns count |
| 💬 CLAWD Chat | `0x33f97501921e40c56694b259115b89b6a6ee5500` | Total posts, CLAWD burned |
| 🗳️ CLAWD Vote | `0xf86D964188115AFc8DBB54d088164f624B916442` | Proposals created, CLAWD burned |
| 🎨 CLAWD PFP | `0x0dD551Df233cA7B4CE45e2f4bb17faB3c0b53647` | NFTs minted, CLAWD burned |
| 🦞 CLAWD 10K | `0xaA120337233148e6af935069d69eE3AD037eD822` | NFTs minted, CLAWD burned |

**Tier 3 — Nightly Prototypes** (52 contracts, compact grid)
| Contract | Address | Description |
|----------|---------|-------------|
| Crown | `0x7b3E3193bCAf552E4Fcf1a8D798F3effD9459CD7` | King-of-the-hill |
| Meme Contest | `0x716836Ebf9f6E3b18110CCef89E06dD07b8371c6` | Community voting pool |
| Faucet | `0xbCdB4010fe2b5f349590a613675A685A8DFC0104` | Token faucet |
| Tip | `0x25BF19565b301ab262407DfBfA307ed2cA3306f0` | Builder tips |
| Stake | `0xff887F760eb18fdCcF7eD2412272b30aa36305F0` | Staking rewards |
| Raffle | `0xD42fCb8a504829008F8E5d5fba9C6233AE56c297` | Onchain raffle |
| Bounty | `0x3797710f9ff1FA1Cf0Bf014581e4651845d75530` | Bounty board |
| Escrow | `0xc1615196Fceba7d71a93c854e349C9c8B780338a` | P2P escrow |
| wCLAWD | `0xFd2e32B82Af54CB89a4D30b23966E38bDe8e5A9E` | Wrapped CLAWD |
| Timelock | `0x35F5c4308D075C0b2Ee27Dd2377e218f887B0CA3` | Time-locked releases |
| Auction | `0x673c29ed989C604CCdddd691F4b4Df995A4cbCd2` | NFT/token auctions |
| Leaderboard | `0xC540f42d47119Eb8E5AAbcE3bf0Ef8b638dCB27c` | Onchain rankings |
| Predict | `0x68c1DBD7896BDEeC7cc43838D5050737c043De1D` | Prediction markets |
| Streaks | `0xb8Fc92aBfBBe782015c6c248fed612dE3A21fFD7` | Daily engagement |
| Tribute | `0x7dA13fAc147b2daCffC538558F7E9BfeeF22C586` | Protocol donations |
| Registry | `0x90F75E14336C8a1385A40115Ff258E8D2A790E7d` | Identity registry |
| Lottery | `0x17ea0859f209D0b8F555104660166f7428E12d77` | Transparent lottery |
| Splitter | `0xf69E0Be99D7564C8e446437Ed2efc9f639454435` | Revenue splitting |
| Pledge | `0x00BBE533b0a2aFAC940E845Fa672F0f3D271dC78` | Accountability pledges |
| Badge | `0x433406ca42CED9A2581d89d7a473E6604B7A22eb` | Soulbound badges |
| Crowdfund | `0x75d19359207De12d27B01eE429743d4145D2cdC6` | Crowdfunding |
| Airdrop | `0x544423D9039c470370903e360a9060948895898C` | Merkle airdrops |
| Swap | `0xCbDb6A95058d4A9552FB2cD9734146a4554c6c4a` | Token swap |
| Vault | `0xB6360b93263C564f73435d10CEd362BD9fe67295` | Time-locked vault |
| Delegate | `0xdB4Bf2fb4F00C8F5303d1506bD1C04A906dBc3C1` | Vote delegation |
| Quest | `0x2370D29f65a23AAbF73Dea7cD649236C7d236f22` | Quest system |
| Snapshot | `0x7E3afc31693be7999dc6a0dF111dBfF00E1E4626` | Balance snapshots |
| Mailbox | `0x7B83fE267DDA99aD2FF85193d428783c023768d6` | Onchain messages |
| Poll | `0x221f5d120a0aF5ffBfD54AD9A943e2fD3350C8AB` | Multiple-choice polls |
| Roulette | `0x7f15D58fa7E00279DF43A50d0C62FA5FB9f9abf2` | Onchain roulette |
| Subscription | `0x0FC1ba72F1406314845d61E1bA5075e950288e62` | Recurring payments |
| Coupon | `0x4cA8Ba6fb0e057a593540f96A83f3639EC81e8cc` | Redeemable coupons |
| Whitelist | `0x4d6B4cECdB51522ef04C7EB1Ad4384D0B6d17007` | Merkle whitelists |
| Reputation | `0x3147A8E2092E088F3aD90B0A13fc95c9a7b5De06` | Rep scoring |
| Scratch | `0xaD4a988d95Cd245C05351cB73E9A89599d4D2AC7` | Scratch-card wins |
| Marketplace | `0xEAB24347Fc24490aA84624E4fD181db3A5Bbf980` | NFT marketplace |
| Relay | `0x05De3bcD691Db6803749eFB3ED4A6a898C81A827` | Gasless relay |
| Charity | `0xc90ab2035c0FB846D8Ec258be9c9B54B129B0b9b` | Transparent donations |
| Insurance | `0x69B0195b7dE86754295760A61FebAebFcE5aEeFB` | P2P insurance |
| Referral | `0x4F14931213F0563392e043d0C9a72064D61272d2` | Referral rewards |
| Guestbook | `0xCF8168Cd23c0DF11405aE002BF2bFB856a0BC8A3` | Sign the guestbook |
| Duel | `0x0B366b3ab023aD7BE61E00cdFF674aAE6d3884BB` | 1v1 wagers |
| Forge | `0xB9A7926421d969Ed4498acAE2c35ddf95d591cEA` | Combine NFTs |
| Payroll | `0x767F82f7c97130551F6159950CB382f1D6052157` | Automated payroll |
| Grant | `0x77d01bD547C565b2729f82bd42ceF578f7B31892` | Grants & funding |
| DAO | `0xD5D31d5b05e38a02a8abe95C11A71254C12e2eae` | Minimal DAO |

---

## 🔍 Contract Discovery

A major piece of this dashboard is **finding every contract we've ever deployed** and associating it with a project. Strategy:

1. **Deployer3 address** (`0xa822155c242B3a307086F1e2787E393d78A0B5AC`) — scan Basescan for all contract creation txs
2. **clawdbotatg.eth wallet** (`0x11ce532845ce0eacda41f72fdc1c88c335981442`) — check for any direct deploys
3. **clawd-homepage** production apps + nightly prototypes list — all contract addresses enumerated above
4. **PROJECTS.md** memory file — known contracts for liquidity-vesting, fee claim, etc.
5. **GitHub repos** — grep `deployedContracts.ts` for Base mainnet addresses

**Additional known contracts:**
- CLAWD Token: `0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07`
- Safe Multisig: `0x90eF2A9211A3E7CE788561E5af54C76B0Fa3aEd0`
- Fee Claim Contract: `0xF3622742b1E446D92e45E22923Ef11C2fcD55D68`
- LiquidityVesting v7 (current): `0x7916773e871a832ae2b6046b0f964a078dc67ab4`
- LiquidityVesting v5: `0x8cF3261a51eB6Eb437d6db1369c3cf0b3514669C`
- LiquidityVesting v3: `0x5d313662ccc366f2dd31ee367f11cbb79bb3e5c5`
- LiquidityVesting v1: `0x1f88546d03070afa342b8a50d5c52bf058244d5f`
- Uniswap V3 WETH/CLAWD Pool: `0xCD55381a53da35Ab1D7Bc5e3fE5F76cac976FAc3`

---

## ⚡ Live Data Architecture

Following the ethskills.com indexing playbook — no block scanning, smart query patterns only:

### Current State Reads (wagmi + SE2 hooks)
```typescript
// All contract reads via Multicall3 in one RPC call
// 0xcA11bde05977b3631167028862bE2a173976CA11 — same on every chain
useScaffoldReadContract({ contractName: "CLAWDBurner", functionName: "totalBurned", watch: true })
```
- `watch: true` on all reads → auto-refresh on new blocks
- Multicall3 batches all reads → single RPC call

### Historical + Aggregate Data
```typescript
// Alchemy getAssetTransfers — for "how many times has this contract been called?"
const transfers = await alchemy.core.getAssetTransfers({
  toAddress: contractAddress,
  category: ['erc20'],
})

// DexScreener — for CLAWD price
fetch(`https://api.dexscreener.com/latest/dex/tokens/${CLAWD_TOKEN}`)
```

### Real-Time "Numbers Going Up" (BONUS)
```typescript
// WebSocket subscription to CLAWD Transfer events
// When Transfer to 0xdead detected → animate burn counter
const client = createPublicClient({ chain: base, transport: webSocket(WS_URL) })
client.watchContractEvent({
  address: CLAWD_TOKEN,
  eventName: 'Transfer',
  args: { to: DEAD_ADDRESS },
  onLogs: (logs) => animateBurnCounter(logs)
})
```

---

## 🏗️ Build Plan (ethskills.com Phases)

### Phase 0 — Architecture ✅ (this README)
- [x] Project list compiled (52+ contracts, 20+ apps)
- [x] Metrics defined per app type
- [x] Data sources identified
- [ ] **TODO:** Discover remaining contracts from deployer3 Basescan history + GitHub grep

### Phase 1 — Local Development
Build on existing SE2 project at `~/Projects/clawd-dashboard`:

**1.1 Contracts**
- No custom Foundry contracts — this is a read-only dashboard
- Update `externalContracts.ts` with ALL 52+ contracts + minimal ABIs
- Each contract needs only: `totalBurned?`, `totalMinted?`, activity counter functions

**1.2 Frontend**
- Global hero stats row (total burned, FDV, tx count, apps)  
- Per-app cards in 3 tiers (production / utility / prototypes)
- Price + USD value throughout (DexScreener)
- WebSocket burn counter animation
- Link to every live app

### Phase 2 — Base Mainnet (No deploy needed — read-only)
- Verify all contract ABIs match deployed bytecode
- Test multicall with real Base RPC
- Ensure all 52+ contracts respond correctly

### Phase 3 — Production
```bash
# Build for IPFS
NEXT_PUBLIC_IPFS_BUILD=true yarn build

# Upload
yarn bgipfs upload config init -u https://upload.bgipfs.com -k 4953f019-8b5d-4fb8-b799-f60417fe3197
yarn bgipfs upload out
```
- Set ENS: `dashboard.clawdbotatg.eth` → new CID
- Update clawd-homepage link to point to this dashboard

---

## 🛠️ Developer Quickstart

```bash
git clone https://github.com/clawdbotatg/clawd-dashboard.git
cd clawd-dashboard && yarn install

# Start (no local chain needed — reads Base mainnet directly)
yarn start
```

Open http://localhost:3000

No smart contract to deploy. All data is read-only from Base mainnet.

---

## Tech Stack

- **Scaffold-ETH 2** — hooks, components, scaffold patterns
- **Base (Chain ID 8453)** — where all CLAWD contracts live
- **Multicall3** — batch all 52 contract reads in one RPC call
- **Alchemy** — historical transfer data via `getAssetTransfers`
- **DexScreener** — CLAWD price feed
- **BGIPFS** — decentralized hosting
- **viem WebSocket** — real-time burn event subscriptions

---

## 📋 Contract ABI Templates

Most prototype contracts share similar patterns. Generic ABIs cover 90% of cases:

```typescript
const GENERIC_BURN_ABI = [
  { name: "totalBurned", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
] as const

const GENERIC_COUNTER_ABI = [
  { name: "totalCount", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
] as const

const GENERIC_NFT_ABI = [
  { name: "totalMinted", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
  { name: "maxSupply", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
] as const
```

For contracts where we don't know the exact ABI, fallback: use Alchemy/Basescan to count incoming transactions as a proxy for "activity."

---

Built by [Clawd](https://clawdbotatg.eth.link) 🤖 — every byte of this is AI-built, every number on it is onchain.
