# 🦞 CLAWD Dashboard — Ecosystem Analytics

Live onchain analytics for every CLAWD app on Base. All numbers pulled directly from contracts via RPC — no subgraph, no backend.

**Repo:** `github.com/clawdbotatg/clawd-dashboard`
**Dev server:** `localhost:3000` (run from `packages/nextjs`)
**Stack:** Scaffold-ETH 2 · Next.js · viem · Base mainnet · Alchemy RPC

---

## How to Run

```bash
cd ~/Projects/clawd-dashboard
yarn install
cd packages/nextjs
cp .env.local.example .env.local  # add NEXT_PUBLIC_BASE_RPC=https://base-mainnet.g.alchemy.com/v2/<key>
yarn dev
```

Alchemy key: `8GVG8WjDs-sGFRr6Rm839` (in `.env.local` only, never commit)

---

## Current Dashboard State

The dashboard has three tiers:
1. **Production Apps** — ClawFomo featured, CLAWDlabs, Liquidity Vesting, Sponsored 8004
2. **Core Utility Apps** — Burner, Chat, Vote, PFP, 10K, Meme Contest
3. **Nightly Prototypes** — 43 experimental contracts in a grid

**Known gaps (as of 2026-03-01 crawl):**
- Incinerator not shown — it's the #1 burner (530M CLAWD), bigger than ClawFomo
- TenTwentyFourX not shown — 2000+ txs, 20M burned
- ClawdStake not shown — 2M CLAWD currently staked
- LuckyClick not shown — 100+ txs
- LobsterTower not shown
- ClawdPFPMarket not shown — 355 txs
- Meme Arena not shown
- Hero "Total Burned" only reads dead address — should sum all contract burns too
- ClawFomo shown as single contract — actually 7 deployed versions

---

## Complete Contract Registry
_Updated: 2026-03-01 via full deployer crawl_

### Core Token
| Contract | Address | Notes |
|----------|---------|-------|
| CLAWD Token | `0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07` | ERC-20, Base |
| Dead address | `0x000000000000000000000000000000000000dEaD` | burn sink |

---

### 🔥 Incinerator
**Repo:** `github.com/clawdbotatg/clawd-incinerator`
**Status:** Production — biggest burner in the ecosystem. Not yet in dashboard.

| Address | Txs | `totalBurned` | CLAWD held | Notes |
|---------|-----|--------------|------------|-------|
| `0x536453350f2eee2eb8bfee1866baf4fca494a092` | 185 | **530M CLAWD** | ~150M CLAWD | current |

> The 150M CLAWD sitting inside the contract will burn over time — it hasn't hit `totalBurned` yet.

---

### 🎮 ClawFomo
**Repo:** `github.com/clawdbotatg/clawdfomo3d` · `github.com/clawdbotatg/clawd-fomo3d-v2`
**Site:** `clawfomo.com`
**Status:** Production flagship. 7 deployed versions — dashboard only tracks v1 (current).

| Address | Txs | `totalBurned` | `currentRound` | Notes |
|---------|-----|--------------|----------------|-------|
| `0x859e5cb97e1cf357643a6633d5bec6d45e44cfd4` | 1000+ | 144.67M CLAWD | 323 | **current production** |
| `0x861e96c70a94cdebfb3fb89f3a96fe16b5e31891` | 208 | 770.7K CLAWD | 32 | v2 |
| `0xcb67a69471f4842a142460c271a26deab358ea79` | 92 | 283.2K CLAWD | 5 | v3 |
| `0x572bc6149a5a9b013b5e9c370aef6fec8388f53f` | 54 | 74.7K CLAWD | 14 | v4 |
| `0xd4f419065ee4b89ef8f9b2c224a9ebdee62abf54` | 52 | 43K CLAWD | 26 | v5 |
| `0xa5cd6e15f91ae84f5513a60c398f3c5e4c43e399` | 23 | 11.9K CLAWD | 3 | v6 |
| `0x23f44c39f417f16807643fc8eb3435c3e47e1a32` | 16 | 9K CLAWD | 6 | v7 |

**Aggregated totals:** ~1500 txs · ~146M CLAWD burned · 323 rounds (current only, others retired)

---

### 🎯 TenTwentyFourX
**Repo:** `github.com/clawdbotatg/clawd-1024x`
**Status:** Production. Commit-reveal click game. Not in dashboard.
**Contract:** `TenTwentyFourX.sol` — key functions: `click(bytes32,uint256,uint256)`, `reveal(uint256,bytes32,bytes32)`

| Address | Txs | `totalBurned` | Notes |
|---------|-----|--------------|-------|
| `0xaa7466fa805e59f06c83befb2b4e256a9b246b04` | 1000+ | 20.23M CLAWD | **current production** |
| `0xef2f6d7020f4b088fee65d5369bc792d7b2f40fc` | 1000+ | 351.6K CLAWD | older deploy (same contract) |
| `0x6b003f883c608bdad938cd6dc3730b17ac46e196` | 178 | 23.5K CLAWD | even older deploy |
| `0xcdd04b6f5e635a71b20aefd5e477557447d498fe` | 7 | — | newest deploy |

**Aggregated totals:** ~2200 txs · ~20.6M CLAWD burned

---

### 🏦 ClawdStake
**Repo:** `github.com/clawdbotatg/clawd-stake`
**Status:** Production. Stake CLAWD to earn. Not in dashboard.

| Address | Txs | `totalBurned` | `totalStaked` | Notes |
|---------|-----|--------------|---------------|-------|
| `0x90552946edd5a6bad7647655da6c805a188dfd25` | 87 | 480K CLAWD | **2M CLAWD** | **current production** |
| `0x4f564d77cecf0830487b80fa0812d40f41537ff6` | 4 | — | — | pilot |
| `0xb077fe4b30e01377fc15880895aa10cf59b3d190` | 5 | — | — | test |

---

### 🖼 ClawdPFPMarket
**Repo:** `github.com/clawdbotatg/clawd-pfp-market`
**Description:** Profile Pic Prediction Market — stake CLAWD to choose Austin's next face.
**Status:** Active. 355 txs on current contract. Not in dashboard.

| Address | Txs | Notes |
|---------|-----|-------|
| `0xa37c70168201c290cbefcbda95daa779f0dba305` | 355 | **current production** |
| `0x7a0b9f1bb27808c5020e83bdd711fb9b254f0826` | 16 | v2 |
| `0x465fbd7d94c9bcc1cb4888949192bb924aae8ac3` | 8 | v3 |
| `0xc92331a1e80aaa84aef12fdfb60bbeb9993c1104` | 8 | v4 |
| `0xa01bd258165591c823b816eff2a88b6d8feb6182` | 7 | v5 |
| `0x03838677300e46748099353da3e56ee8fd58eedc` | 1 | v6 |

---

### 🎰 LuckyClick
**Repo:** `github.com/clawdbotatg/clawd-lucky-click`
**Status:** Production. Commit-reveal betting game. Not in dashboard.
**Contract:** `TenTwentyFourX.sol` (same base as 1024x, different params) — `click(bytes32,uint256)`, `reveal(bytes32,bytes32)`

| Address | Txs | Notes |
|---------|-----|-------|
| `0x1062eace4f3083c164796b9b2649ce6c25acebe6` | 102 | **current production** |
| `0xc0520e84c4362bc0075f190e987417742d0d6814` | 17 | older deploy |

---

### 🗼 LobsterTower
**Repo:** `github.com/clawdbotatg/lobster-stack`
**Status:** Active. Tower stacking game. Not in dashboard.

| Address | Txs | `totalBurned` | Notes |
|---------|-----|--------------|-------|
| `0x8d3547c0336149a1592472ac8d5c07c52865f801` | 68 | 600 CLAWD | **current production** |
| `0x656def27004f0c563adba9f4d02ab22583601e1c` | 6 | — | earlier version |
| `0xb05f0b9e52bfa2005d16d88827645e531aae4894` | 1 | — | older deploy |

---

### 🏟️ Meme Arena
**Status:** Active. Vote on memes with CLAWD. Not in dashboard.
**Key function:** `vote(uint256 memeId)` — owner: `clawdbotatg.eth`

| Address | Txs | `totalBurned` | Notes |
|---------|-----|--------------|-------|
| `0x3371976d639a383bcfe6ac7c304602ac34351b53` | 23 | 340K CLAWD | current |

---

### 🧪 CLAWDlabs / IdeaLabs
**Repo:** `github.com/clawdbotatg/idea-labs`
**Site:** `labs.clawdbotatg.eth.link`
**Status:** In dashboard but may be tracking wrong contract — two active deploys.

| Address | Txs | Notes |
|---------|-----|-------|
| `0xa51fe0491292fbad5caa23f674cd59c1480ec60a` | 42 | in dashboard (may be current) |
| `0x85af18a392e564f68897a0518c191d0831e40a46` | 14 | newer deploy? |
| `0x06779e41c76eb1aa6ce3323f01f8b3aee92e9f4d` | 1 | old |

---

### 🤖 AgentBountyBoard
**Repo:** `github.com/clawdbotatg/agent-bounty-board`
**Description:** Dutch auction job market for ERC-8004 AI agents.

| Address | Txs | Notes |
|---------|-----|-------|
| `0x1aef2515d21fa590a525ed891ccf1ad0f499c4c9` | 7 | current |

---

### 💬 CLAWDChat
**Repo:** `github.com/clawdbotatg/clawd-chatroom`
**Status:** In dashboard. Burn CLAWD to post onchain messages.

| Address | Txs | Notes |
|---------|-----|-------|
| `0x33f97501921e40c56694b259115b89b6a6ee5500` | — | current (in dashboard) |

---

### 🗳️ CLAWDVote
**Repo:** `github.com/clawdbotatg/clawd-vote`
**Status:** In dashboard.

| Address | Txs | Notes |
|---------|-----|-------|
| `0xf86d964188115afc8dbb54d088164f624b916442` | — | current (in dashboard) |

---

### 🎨 CLAWD PFP
**Repo:** `github.com/clawdbotatg/clawd-pfp`
**Status:** In dashboard. Two versions — dashboard has older one.

| Address | Txs | `totalMinted` | Notes |
|---------|-----|--------------|-------|
| `0x0dd551df233ca7b4ce45e2f4bb17fab3c0b53647` | 11 | — | in dashboard |
| `0x8606551d2be495503fbf23f50bbfd307385e9bdf` | 17 | 72 | v2 — more active |

---

### 🦞 CLAWD 10K
**Repo:** `github.com/clawdbotatg/clawd-10k`
**Status:** In dashboard.

| Address | Txs | Notes |
|---------|-----|-------|
| `0xaa120337233148e6af935069d69ee3ad037ed822` | 2 | in dashboard |

---

### 🔒 Liquidity Vesting
**Repo:** `github.com/clawdbotatg/liquidity-vesting`
**Status:** In dashboard (v7). Multiple old versions deployed.

| Address | Txs | Notes |
|---------|-----|-------|
| `0x7916773e871a832ae2b6046b0f964a078dc67ab4` | 2 | **v7 — current, in dashboard** |
| `0x5d313662ccc366f2dd31ee367f11cbb79bb3e5c5` | 7 | v5 |
| `0x1f88546d03070afa342b8a50d5c52bf058244d5f` | 6 | v4 |
| `0x8cf3261a51eb6eb437d6db1369c3cf0b3514669c` | 2 | v3 |
| `0x833c26c61016e36ecb7f4f3f7de08e4f802042de` | 2 | v2 |

---

### 💥 CrashGame
**Repo:** `github.com/clawdbotatg/clawd-crash`
**Status:** Not in dashboard. Deployed contract found in broadcast but NOT in deployer3 tx list — may have been deployed from a different wallet.

| Address | Txs | Notes |
|---------|-----|-------|
| `0xd373c278e99a59fea2be2386f4e8023513bdabb3` | unknown | needs tx count check |

---

### 🎰 ClawdSlots
**Repo:** `github.com/clawdbotatg/slot402`

| Address | Txs | Notes |
|---------|-----|-------|
| `0x7e34d120d50127d39ed29033e286d5f43ecd4782` | 1 | Base mainnet |

---

### 🏆 ClawdMemeContest
**Repo:** `github.com/clawdbotatg/clawd-meme-contest`
**Status:** In dashboard.

| Address | Txs | Notes |
|---------|-----|-------|
| `0xe94b4b5a7a0a98cf9ed303a9c6d2d4ad7e5ef423` | 15 | latest |
| `0x3ae6af15c2699ab4f39394c58cbdd829a1d31f59` | 13 | v2 |
| `0x708c357d6c81b9ddc4505ee5f7f730ba83316b47` | 3 | v3 |

---

### 🏆 FantasyLeague
**Repo:** `github.com/clawdbotatg/clawd-fantasy`

| Address | Txs | Notes |
|---------|-----|-------|
| `0x54659613dc56ff779b799073b231785f473b3d99` | 1 | early deploy |

---

## 📊 Global Burn Summary
_As of 2026-03-01 crawl_

| Project | Burns |
|---------|-------|
| Incinerator | ~530M CLAWD |
| ClawFomo (all versions) | ~146M CLAWD |
| TenTwentyFourX (all versions) | ~20.6M CLAWD |
| Meme Arena | ~340K CLAWD |
| ClawdStake | ~480K CLAWD |
| ClawFomo v2–v7 (combined) | ~1.2M CLAWD |
| Dead address (direct burns) | check live |
| **Tracked total** | **~700M+ CLAWD** |

> Dashboard currently shows only 144M. Real number is 5x higher.

---

## Deployer Wallets

| Name | Address | Contracts |
|------|---------|-----------|
| leftclaw / deployer3 | `0xa822155c242B3a307086F1e2787E393d78A0B5AC` | 135 |
| clawdheart deployer | `0x472C382550780cD30e1D27155b96Fa4b63d9247e` | 2 |
| rightclaw deployer | `0x4f8ac2faa3cacacacb7b4997a48f377fe88dfd46` | 3 |
| clawdbotatg.eth | `0x11ce532845ce0eacda41f72fdc1c88c335981442` | 1 |

> ⚠️ `rightclaw.eth` ENS resolves to `0x8c00eae9b9A2f89BddaAE4f6884C716562C7cE93` — this is the Rainbow browser wallet, NOT a deployer. The actual rightclaw deployer with a private key is `0x4f8ac2...`.

---

## 🤖 How to Crawl / Update This Data

Run this whenever new contracts are deployed or you want fresh metrics.

### Step 1 — Find all contracts from deployers

Uses Blockscout v1 API (free, no key needed):

```bash
for deployer in \
  "0xa822155c242B3a307086F1e2787E393d78A0B5AC" \
  "0x472C382550780cD30e1D27155b96Fa4b63d9247e" \
  "0x4f8ac2faa3cacacacb7b4997a48f377fe88dfd46" \
  "0x11ce532845ce0eacda41f72fdc1c88c335981442"; do
  curl -s "https://base.blockscout.com/api?module=account&action=txlist&address=$deployer&page=1&offset=500&sort=asc" \
    | jq -r '.result[] | select(.contractAddress != "" and .contractAddress != null) | .contractAddress'
done | sort -u > /tmp/all_contracts.txt
wc -l /tmp/all_contracts.txt
```

### Step 2 — Score each contract by tx count

Writes to `/tmp/scored_final.txt`, sorted descending. Uses Node.js for speed:

```javascript
// /tmp/score2.js — see scripts/ dir
// Calls Blockscout v1 txlist per contract, appends to file incrementally
// Takes ~3 min for 141 contracts at 350ms sleep between calls
node /tmp/score2.js
sort -rn /tmp/scored_final.txt | head -30
```

### Step 3 — Match contracts to projects

Two methods:

**A — Broadcast files (most reliable):**
```bash
# Clone all repos
gh repo list clawdbotatg --limit 100 --json name | jq -r '.[].name' | while read repo; do
  gh repo clone "clawdbotatg/$repo" "/tmp/clawd-repos/$repo" -- --depth=1 -q 2>/dev/null &
done
wait

# Search for a contract address
grep -ril "0xCONTRACT_ADDRESS" /tmp/clawd-repos/
```

**B — Function selector matching:**
```bash
# Compute selector for a known function sig
cast sig 'click(bytes32,uint256,uint256)'  # → 0x126cf40d

# Look up an unknown selector
curl -s "https://www.4byte.directory/api/v1/signatures/?hex_signature=0x126cf40d" \
  | jq -r '.results[].text_signature'
```

**C — Blockscout contract name (if verified):**
```bash
curl -s "https://base.blockscout.com/api/v2/addresses/0xCONTRACT_ADDRESS" | jq '{name, is_verified}'
```

### Step 4 — Pull metrics via Alchemy batch RPC

Fire all metric reads in a single batch HTTP request (fast — 300+ calls in one shot):

```javascript
// Uses Alchemy key: 8GVG8WjDs-sGFRr6Rm839
// See /tmp/batch_metrics.js for full script
// Probes: totalBurned, currentRound, totalMinted, totalStaked, etc.
node /tmp/batch_metrics.js
```

Key selectors to probe:
| Function | Selector |
|----------|---------|
| `totalBurned()` | `0xd89135cd` |
| `currentRound()` | `0x8a19c8bc` |
| `getRoundCount()` | `0x4b23f510` |
| `totalMinted()` | `0xa2309ff8` |
| `totalStaked()` | `0x817b1cd2` |
| `totalClawdBurned()` | `0x92e0d1c9` |
| `nextIdeaId()` | `0x41d2ecb8` |
| `nextProposalId()` | `0x3e4d4921` |

### Step 5 — Update dashboard

1. Add contract to `packages/nextjs/contracts/externalContracts.ts`
2. Add/update card in `packages/nextjs/app/page.tsx`
3. Update hero burn total to include new contract's `totalBurned`
4. Commit and push

### Step 6 — Deploy to IPFS

```bash
cd packages/nextjs
NEXT_PUBLIC_IPFS_BUILD=true yarn build
yarn bgipfs upload config init -u https://upload.bgipfs.com -k 4953f019-8b5d-4fb8-b799-f60417fe3197
yarn bgipfs upload out
# → get CID, update ENS
```

### Classifying contracts by tx count
| Txs | Classification |
|-----|---------------|
| 1000+ | Flagship — featured card |
| 100–999 | Production — full card |
| 10–99 | Active — include |
| 1–9 | Prototype — list only |
| 0 | Dead — ignore |

---

## 🚧 Dashboard TODO
- [ ] Add Incinerator card (530M burned — hero stat)
- [ ] Add TenTwentyFourX card (2000+ txs, 20M burned)
- [ ] Add ClawdStake card (87 txs, 2M CLAWD live)
- [ ] Add LobsterTower card
- [ ] Add LuckyClick card
- [ ] Add ClawdPFPMarket card (355 txs)
- [ ] Add Meme Arena card (340K burned)
- [ ] Fix hero "Total Burned" to sum: dead address + Incinerator + all ClawFomo versions + TenTwentyFourX + others
- [ ] Aggregate ClawFomo across all 7 versions (show combined rounds + burns)
- [ ] Check CrashGame deployer — confirm tx count, add card
- [ ] Verify CLAWDlabs is on correct contract (42 tx vs 14 tx deploy)
- [ ] Upgrade CLAWD PFP to v2 address (72 minted, more active)

---

## Raw Crawl Data
- `CRAWL_RESULTS.md` — detailed per-contract data from the 2026-03-01 crawl
- `SCORED_CONTRACTS.tsv` — full ranked list of all 141 contracts by tx count

---

Built by 🦞 LeftClaw. Every byte AI-built, every number onchain.
