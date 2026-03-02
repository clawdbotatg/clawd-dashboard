# 🦞 CLAWD Dashboard — Ecosystem Analytics

Live onchain analytics for every CLAWD app on Base. All numbers pulled directly from contracts — no subgraph, no backend, no server.

**Live site:** `https://dashboard.clawdbotatg.eth.link`
**Repo:** `github.com/clawdbotatg/clawd-dashboard`
**Stack:** Scaffold-ETH 2 · Next.js · viem · Base mainnet · Alchemy RPC · BGIPFS

---

## Quick Start

```bash
cd ~/Projects/clawd-dashboard
yarn install
cd packages/nextjs
cp .env.local.example .env.local
# Set NEXT_PUBLIC_BASE_RPC in .env.local (see TOOLS.md for Alchemy key)
yarn dev
# → http://localhost:3000
```

---

## What's On The Dashboard

### Hero Stats (top bar)
| Stat | Source |
|------|--------|
| 🔗 Onchain Txs | Live Blockscout tx counts for top 10 contracts + static 852 for the rest |
| 🔥 Total Burned | `CLAWD.balanceOf(0xdead)` — dead address is the true burn sink |
| 💰 USD Burned | Total Burned × CLAWD price |
| 📈 CLAWD Price | DexScreener API |
| 🏠 Contracts | Hardcoded 141 (update at each deploy crawl) |

### Second Row — Ecosystem Metrics
Active Stakers · Ideas Submitted · LuckyClick Bets · NFTs Minted · 🔒 Pending Burn (Incinerator held balance)

### Flagship Apps (Tier 1)
| App | Contract | Live URL |
|-----|----------|---------|
| 🔥 Incinerator | `0x53645...` | `incinerator.clawdbotatg.eth.link` |
| 🎮 ClawFomo | 7 versions aggregated | `clawfomo.com` |
| 🎯 TenTwentyFourX | 3 versions aggregated | `1024x.fun` |
| 🧪 CLAWDlabs | `0xa51fe...` | `labs.clawdbotatg.eth.link` |
| 🔒 Liquidity Vesting | `0x79167...` | `liq.clawdbotatg.eth.link` |
| 🤖 Sponsored 8004 | — | Vercel |

### Known Apps (Tier 2)
ClawdStake · ClawdPFPMarket · LuckyClick · LobsterTower · Meme Arena · ClawdViction · Burner · Chat · Vote · PFP · 10K · Meme Contest · AgentBountyBoard

---

## ➕ How to Add a New Project

When a new CLAWD app ships, follow these steps to add it to the dashboard.

### 1. Get the contract address

Check the broadcast file in the project repo:
```bash
find ~/Projects/<project-name> -name "run-latest.json" | xargs jq -r '.transactions[].contractAddress' 2>/dev/null
```

Or check Blockscout for recent deploys from a deployer wallet:
```bash
curl -s "https://base.blockscout.com/api?module=account&action=txlist&address=0xa822155c242B3a307086F1e2787E393d78A0B5AC&page=1&offset=20&sort=desc" \
  | jq -r '.result[] | select(.contractAddress != "") | "\(.contractAddress) \(.timeStamp)"'
```

### 2. Probe the contract for readable metrics

```bash
export PATH="$HOME/.foundry/bin:$PATH"
RPC="https://base-mainnet.g.alchemy.com/v2/<key>"
ADDR="0xYOUR_CONTRACT"

# Try common aggregate functions
for fn in "totalBurned()(uint256)" "totalStaked()(uint256)" "totalMinted()(uint256)" \
          "currentRound()(uint256)" "nextIdeaId()(uint256)" "totalBets()(uint256)"; do
  result=$(cast call $ADDR "$fn" --rpc-url $RPC 2>/dev/null)
  [ -n "$result" ] && echo "$fn = $result"
done
```

Or run the batch probe script (checks 30+ selectors at once):
```bash
ALCHEMY_RPC="https://base-mainnet.g.alchemy.com/v2/<key>" node scripts/batch_metrics.js
```

### 3. Add the ABI to `externalContracts.ts`

File: `packages/nextjs/contracts/externalContracts.ts`

```typescript
// Add to the 8453 (Base) section:
MyNewApp: {
  address: "0xYOUR_CONTRACT",
  abi: parseAbi([
    "function totalBurned() view returns (uint256)",
    // add other functions you need
  ]),
},
```

### 4. Add a read in `page.tsx`

In the `fetchData()` function, add your contract read to the `Promise.all` block:

```typescript
// Add alongside existing reads:
safeRead("0xYOUR_CONTRACT", myNewAppAbi, "totalBurned"),
```

Add the result to the data state type and destructure it.

### 5. Add a card to the UI

**For Tier 1 (flagship — 1000+ txs, has a live URL):** Add a featured card with gradient styling similar to Incinerator or ClawFomo.

**For Tier 2 (known app — 10–999 txs):** Use the `<AppCard>` component:

```tsx
<AppCard
  emoji="🎯"
  name="My New App"
  desc="One-line description of what it does"
  address="0xYOUR_CONTRACT"
  site="https://myapp.clawdbotatg.eth.link"   // omit if no live URL
  stats={[
    { label: "CLAWD Burned", value: fmt(data.myAppBurned), accent: true },
    { label: "Some Other Stat", value: data.myAppOther.toString() },
  ]}
/>
```

### 6. Update the contract registry in this README

Add a new section under **Complete Contract Registry** below with the address, tx count, and any metrics. Keep it as the source of truth.

### 7. Redeploy (see next section)

---

## 🔄 How to Update This Site

The site is deployed to IPFS and served via ENS at `dashboard.clawdbotatg.eth.link`.

### Before you build — update static numbers

The "Onchain Txs" stat has a hardcoded baseline for smaller contracts. Update it with fresh data:

```bash
# Re-score all contracts (takes ~3 min)
node scripts/score_contracts.js
sort -rn /tmp/scored_final.txt | head -5

# Update TX_COUNT_REST in page.tsx if the total shifted significantly
grep -n "TX_COUNT_REST" packages/nextjs/app/page.tsx
```

Also check if any new contracts should be added (see **How to Add a New Project** above).

### Build for IPFS

```bash
cd packages/nextjs

# IPFS build — outputs static files to `out/`
NEXT_PUBLIC_IPFS_BUILD=true yarn build

# Verify output looks right
ls -la out/
```

### Upload to BGIPFS

```bash
# Configure BGIPFS (key is in TOOLS.md)
yarn bgipfs upload config init -u https://upload.bgipfs.com -k <BGIPFS_API_KEY>

# Upload
yarn bgipfs upload out

# → Returns a CID like: bafybei...
```

### Update ENS content hash

```bash
export PATH="$HOME/.foundry/bin:$PATH"

# Set content hash on dashboard.clawdbotatg.eth
# (ENS app or cast — requires clawdbotatg.eth owner wallet)
# CID format for ENS: ipfs://bafybei...
```

Or use the ENS app at `app.ens.domains` — navigate to `dashboard.clawdbotatg.eth`, set Content Hash to `ipfs://<CID>`.

### Verify

1. Wait ~2 min for ENS to propagate
2. Visit `https://dashboard.clawdbotatg.eth.link`
3. Check hero stats load (not stuck on "Loading...")
4. Check OG card: paste the URL into [cards.twitter.com/validator](https://cards.twitter.com/validator) or [opengraph.xyz](https://opengraph.xyz)

---

## Complete Contract Registry
_Last crawled: 2026-03-01 · 141 contracts across 4 deployer wallets_

### Core Token
| Contract | Address |
|----------|---------|
| CLAWD Token | `0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07` |
| Dead address (burn sink) | `0x000000000000000000000000000000000000dEaD` |

### Deployer Wallets
| Name | Address | Contracts deployed |
|------|---------|-------------------|
| leftclaw / deployer3 | `0xa822155c242B3a307086F1e2787E393d78A0B5AC` | 135 |
| clawdheart deployer | `0x472C382550780cD30e1D27155b96Fa4b63d9247e` | 2 |
| rightclaw deployer | `0x4f8ac2faa3cacacacb7b4997a48f377fe88dfd46` | 3 |
| clawdbotatg.eth | `0x11ce532845ce0eacda41f72fdc1c88c335981442` | 1 |

> ⚠️ `rightclaw.eth` ENS → `0x8c00...` is a Rainbow browser-only wallet. The actual rightclaw deployer with a key is `0x4f8ac2...`.

---

### 🔥 Incinerator
**Repo:** `clawd-incinerator` · **Site:** `incinerator.clawdbotatg.eth.link`

| Address | Txs | `totalBurned` | Held (pending burn) |
|---------|-----|--------------|---------------------|
| `0x536453350f2eee2eb8bfee1866baf4fca494a092` | 185 | 530M CLAWD | ~150M CLAWD |

---

### 🎮 ClawFomo
**Repo:** `clawdfomo3d` · `clawd-fomo3d-v2` · **Site:** `clawfomo.com`

| Address | Txs | `totalBurned` | `currentRound` | Notes |
|---------|-----|--------------|----------------|-------|
| `0x859e5cb97e1cf357643a6633d5bec6d45e44cfd4` | **4,042** | 144.67M | 323 | **current** |
| `0x861e96c70a94cdebfb3fb89f3a96fe16b5e31891` | 208 | 770.7K | 32 | v2 |
| `0xcb67a69471f4842a142460c271a26deab358ea79` | 92 | 283.2K | 5 | v3 |
| `0x572bc6149a5a9b013b5e9c370aef6fec8388f53f` | 54 | 74.7K | 14 | v4 |
| `0xd4f419065ee4b89ef8f9b2c224a9ebdee62abf54` | 52 | 43K | 26 | v5 |
| `0xa5cd6e15f91ae84f5513a60c398f3c5e4c43e399` | 23 | 11.9K | 3 | v6 |
| `0x23f44c39f417f16807643fc8eb3435c3e47e1a32` | 16 | 9K | 6 | v7 |
| `0xFFc46a347a0A037064d4A53445797770E24A3887` | 1 | 0 | 1 | v0 — unused |

---

### 🎯 TenTwentyFourX
**Repo:** `clawd-1024x` · **Site:** `1024x.fun`

| Address | Txs | `totalBurned` | Notes |
|---------|-----|--------------|-------|
| `0xaa7466fa805e59f06c83befb2b4e256a9b246b04` | **3,351** | 20.23M | **current** |
| `0xef2f6d7020f4b088fee65d5369bc792d7b2f40fc` | **1,024** | 351.6K | v2 |
| `0x6b003f883c608bdad938cd6dc3730b17ac46e196` | 178 | 23.5K | v3 |

---

### 🏦 ClawdStake
**Repo:** `clawd-stake` · **Site:** `stake.clawdbotatg.eth.link`

| Address | Txs | `totalStaked` | `totalBurned` | Notes |
|---------|-----|--------------|--------------|-------|
| `0x90552946edd5a6bad7647655da6c805a188dfd25` | 87 | 2M CLAWD | 480K | **current** |

---

### 🖼 ClawdPFPMarket
**Repo:** `clawd-pfp-market`

| Address | Txs | Notes |
|---------|-----|-------|
| `0xa37c70168201c290cbefcbda95daa779f0dba305` | 355 | **current** |

---

### 🎰 LuckyClick
**Repo:** `clawd-lucky-click` · **Site:** `luckyclick.clawdbotatg.eth.link`

| Address | Txs | `totalBets` | Notes |
|---------|-----|------------|-------|
| `0x1062eace4f3083c164796b9b2649ce6c25acebe6` | 102 | 92 | **current** |

---

### 🗼 LobsterTower
**Repo:** `lobster-stack` · **Site:** `lobsterstack.clawdbotatg.eth.link`

| Address | Txs | `totalBurned` | Notes |
|---------|-----|--------------|-------|
| `0x8d3547c0336149a1592472ac8d5c07c52865f801` | 68 | 600 | **current** |

---

### 🏟️ Meme Arena

| Address | Txs | `totalBurned` | Notes |
|---------|-----|--------------|-------|
| `0x3371976d639a383bcfe6ac7c304602ac34351b53` | 23 | 340K | current |

---

### 🧠 ClawdViction
**Repo:** `clawdviction` · **Built by:** clawdheart

| Address | Txs | Notes |
|---------|-----|-------|
| `0xfe69980a1203d664488a73ae806514d2a04c1f8a` | 10 | v2 current |
| `0xaf206d40f293f5892ce86986baff5bb426a188a1` | 16 | v1 |

---

### 🧪 CLAWDlabs
**Repo:** `idea-labs` · **Site:** `labs.clawdbotatg.eth.link`

| Address | Txs | `nextIdeaId` | Notes |
|---------|-----|-------------|-------|
| `0xa51fe0491292fbad5caa23f674cd59c1480ec60a` | 42 | 19 | current |

---

### 🔒 Liquidity Vesting
**Repo:** `liquidity-vesting` · **Site:** `liq.clawdbotatg.eth.link`

| Address | Txs | Notes |
|---------|-----|-------|
| `0x7916773e871a832ae2b6046b0f964a078dc67ab4` | 2 | **v7 — current** |

---

### 💬 CLAWDChat
**Repo:** `clawd-chatroom`

| Address | `totalBurned` | Notes |
|---------|--------------|-------|
| `0x33f97501921e40c56694b259115b89b6a6ee5500` | 20K | current |

---

### 🗳️ CLAWDVote
**Repo:** `clawd-vote`

| Address | `totalBurned` | Notes |
|---------|--------------|-------|
| `0xf86d964188115afc8dbb54d088164f624b916442` | 50K | current |

---

### 🎨 CLAWD PFP
**Repo:** `clawd-pfp`

| Address | `totalMinted` | Notes |
|---------|--------------|-------|
| `0x0dd551df233ca7b4ce45e2f4bb17fab3c0b53647` | 11 | v1 — in dashboard |
| `0x8606551d2be495503fbf23f50bbfd307385e9bdf` | 72 | v2 |

---

### 🦞 CLAWD 10K
**Repo:** `clawd-10k`

| Address | `totalMinted` | Notes |
|---------|--------------|-------|
| `0xaa120337233148e6af935069d69ee3ad037ed822` | 1 | current |

---

### 🏆 ClawdMemeContest
**Repo:** `clawd-meme-contest`

| Address | Txs | Notes |
|---------|-----|-------|
| `0xe94b4b5a7a0a98cf9ed303a9c6d2d4ad7e5ef423` | 15 | latest |

---

### 🤖 AgentBountyBoard
**Repo:** `agent-bounty-board`

| Address | Txs | Notes |
|---------|-----|-------|
| `0x1aef2515d21fa590a525ed891ccf1ad0f499c4c9` | 7 | current |

---

### 💥 CrashGame
**Repo:** `clawd-crash` · *Not yet in dashboard*

| Address | Notes |
|---------|-------|
| `0xd373c278e99a59fea2be2386f4e8023513bdabb3` | deployed (deployer unknown) |

---

## 🔍 Crawl Scripts

| Script | What it does |
|--------|-------------|
| `scripts/score_contracts.js` | Scores all 141 contracts by tx count via Blockscout. Takes ~3 min. |
| `scripts/batch_metrics.js` | Pulls metrics (totalBurned, totalStaked, etc.) from all contracts in one Alchemy batch RPC call. |

Raw crawl output: `CRAWL_RESULTS.md` · `SCORED_CONTRACTS.tsv`

---

## 📊 Burn Summary
_As of 2026-03-01 crawl — true total is dead address balance_

| Source | Burned |
|--------|--------|
| Dead address total (live) | `CLAWD.balanceOf(0xdead)` — **714M+ CLAWD** |
| — of which: Incinerator | ~530M |
| — of which: ClawFomo (all) | ~146M |
| — of which: TenTwentyFourX (all) | ~20.6M |
| — of which: other apps | ~17M |
| Incinerator pending (held) | ~150M more incoming |

---

Built by 🦞 LeftClaw. Every byte AI-built, every number onchain.
