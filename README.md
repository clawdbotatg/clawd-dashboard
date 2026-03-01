# 🦞 CLAWD Dashboard — Ecosystem Analytics

Live onchain analytics dashboard for the entire CLAWD ecosystem on Base.

**🔗 [View on GitHub](https://github.com/clawdbotatg/clawd-dashboard)**

---

## What It Shows

### Hero Stats
- 🔥 Total CLAWD burned (from dead address)
- 💰 USD value burned
- 📈 CLAWD price (DexScreener)
- 🏛️ Fully diluted valuation
- 🎮 ClawFomo rounds played
- 🏠 Total contracts deployed

### Production Apps (Tier 1)
- **ClawFomo** — Last-bidder-wins game with 323+ rounds and 144M+ CLAWD burned
- **CLAWDlabs** — Idea staking platform (19+ ideas submitted)
- **Liquidity Vesting** — WETH+CLAWD locked in Uniswap V3
- **Sponsored 8004** — ERC-8004 agent identity registration

### Core Utility Apps (Tier 2)
- Burner, Chat, Vote, PFP, 10K, Meme Contest

### Nightly Prototypes (Tier 3)
- Experimental contracts with real on-chain activity

## Tech Stack

- **Scaffold-ETH 2** (Next.js + viem)
- **Base mainnet** (chain 8453)
- **Direct RPC reads** via `createPublicClient` — no subgraph needed
- **DexScreener API** for price data
- **Auto-refresh** every 30 seconds

## Run Locally

```bash
yarn install
cd packages/nextjs
cp .env.local.example .env.local  # Add your Alchemy RPC URL
yarn dev
```

Open http://localhost:3000

## Key Addresses

| Name | Address |
|------|---------|
| CLAWD Token | `0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07` |
| Dead (burn sink) | `0x000000000000000000000000000000000000dEaD` |
| Deployer3 | `0xa822155c242B3a307086F1e2787E393d78A0B5AC` |
| clawdheart.eth (Deployer2) | `0x472C382550780cD30e1D27155b96Fa4b63d9247e` |
| ClawFomo | `0x859E5CB97E1Cf357643A6633D5bEC6d45e44cFD4` |
| Safe Multisig | `0x90eF2A9211A3E7CE788561E5af54C76B0Fa3aEd0` |

---

## 🤖 Agent Data Crawl Playbook

This section documents the full process for discovering, mapping, and measuring every contract in the CLAWD ecosystem. Run this whenever you want to find new contracts, update metrics, or onboard a new agent to the dashboard.

---

### Step 1 — Find All Deployed Contracts

There are **two deployer addresses** that have shipped CLAWD contracts. Check both every time.

| Deployer | Address | ENS | Notes |
|----------|---------|-----|-------|
| Deployer3 | `0xa822155c242B3a307086F1e2787E393d78A0B5AC` | — | Primary deployer, most contracts |
| clawdheart.eth | `0x472C382550780cD30e1D27155b96Fa4b63d9247e` | clawdheart.eth | Second deployer — track all its contracts too |
| Main wallet | `0x11ce532845ce0eacda41f72fdc1c88c335981442` | clawdbotatg.eth | Occasional direct deploys |

Get every contract creation transaction from each deployer:

```bash
# Deployer3
curl "https://api.basescan.org/api?module=account&action=txlist&address=0xa822155c242B3a307086F1e2787E393d78A0B5AC&startblock=0&endblock=99999999&sort=asc" \
  | jq -r '.result[] | select(.contractAddress != "") | "\(.contractAddress) \(.timeStamp | tonumber | strftime("%Y-%m-%d")) \(.hash)"'

# clawdheart.eth
curl "https://api.basescan.org/api?module=account&action=txlist&address=0x472C382550780cD30e1D27155b96Fa4b63d9247e&startblock=0&endblock=99999999&sort=asc" \
  | jq -r '.result[] | select(.contractAddress != "") | "\(.contractAddress) \(.timeStamp | tonumber | strftime("%Y-%m-%d")) \(.hash)"'

# Main wallet (clawdbotatg.eth)
curl "https://api.basescan.org/api?module=account&action=txlist&address=0x11ce532845ce0eacda41f72fdc1c88c335981442&startblock=0&endblock=99999999&sort=asc" \
  | jq -r '.result[] | select(.contractAddress != "") | "\(.contractAddress) \(.timeStamp | tonumber | strftime("%Y-%m-%d"))"'
```

**What you get:** A unified list of contract addresses + deploy date + tx hash. Deduplicate by address before proceeding.

---

### Step 2 — Score Each Contract by Activity

For every contract found in Step 1, count its total transactions. This tells you which ones are real apps vs throwaway tests:

```bash
# For each CONTRACT_ADDRESS:
curl "https://api.basescan.org/api?module=account&action=txlist&address=CONTRACT_ADDRESS&startblock=0&endblock=99999999" \
  | jq '.result | length'
```

**Thresholds:**
| Tx Count | Classification |
|----------|---------------|
| 1000+ | Production app — flagship card |
| 100–999 | Active app — full card |
| 10–99 | Got traction — include in long-tail grid |
| 1–9 | Prototype/test — list in "all deploys" section only |
| 0 | Dead deploy — ignore |

Sort the full list descending by tx count. The top 5–10 will be obvious production apps. Everything else is noise.

**Also useful — check internal txs (for contracts that receive ETH):**
```bash
curl "https://api.basescan.org/api?module=account&action=txlistinternal&address=CONTRACT_ADDRESS&startblock=0&endblock=99999999" \
  | jq '[.result[] | .value | tonumber] | add'
# Returns total ETH received (in wei) — tells you if real money flowed through
```

---

### Step 3 — Map Contracts to Projects

Once you have a ranked list of contracts, figure out which project each belongs to. Two methods:

**Method A — GitHub grep**

For each high-activity contract address, search all CLAWD repos:

```bash
# Clone all repos to a temp dir
gh repo list clawdbotatg --limit 100 --json name | jq -r '.[].name' | while read repo; do
  gh repo clone "clawdbotatg/$repo" "/tmp/clawd-repos/$repo" -- --depth=1 2>/dev/null
done

# Search for a contract address across all repos
grep -r "CONTRACT_ADDRESS" /tmp/clawd-repos/ --include="*.ts" --include="*.tsx" --include="*.json" -l
```

The file that mentions the address is the project it belongs to. Check `deployedContracts.ts` or `scaffold.config.ts` in each repo — SE2 projects always have the deployed address there.

**Method B — Basescan contract name**

If the contract is verified on Basescan, it has a name:

```bash
curl "https://api.basescan.org/api?module=contract&action=getsourcecode&address=CONTRACT_ADDRESS" \
  | jq -r '.result[0].ContractName'
```

The contract name usually tells you the project (e.g. `ClawFomo`, `CLAWDChat`, `LiquidityVesting`).

**Method C — Check input data of deploy tx**

The deploy transaction's input data contains the constructor bytecode. If the contract is unverified, the function signature in the first few txs after deploy often reveals the project:

```bash
curl "https://api.basescan.org/api?module=account&action=txlist&address=CONTRACT_ADDRESS&startblock=0&endblock=99999999&sort=asc" \
  | jq -r '.result[0:5][] | "\(.functionName) | \(.methodId)"'
```

---

### Step 4 — Pull Metrics Per Contract

Once you know what each contract is, read its key metrics. Most CLAWD contracts follow a consistent naming convention:

**Generic reads to try on every contract:**
```bash
# Try totalBurned (most utility contracts have this)
cast call CONTRACT_ADDRESS "totalBurned()(uint256)" --rpc-url https://mainnet.base.org

# Try totalMinted (NFT contracts)
cast call CONTRACT_ADDRESS "totalMinted()(uint256)" --rpc-url https://mainnet.base.org

# CLAWD token balance (how much CLAWD is locked/staked)
cast call 0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07 "balanceOf(address)(uint256)" CONTRACT_ADDRESS --rpc-url https://mainnet.base.org

# ETH balance (how much ETH is in the contract right now)
cast balance CONTRACT_ADDRESS --rpc-url https://mainnet.base.org
```

**ClawFomo-specific reads:**
```bash
cast call FOMO_ADDRESS "roundId()(uint256)" --rpc-url https://mainnet.base.org  # current round
cast call FOMO_ADDRESS "totalBurned()(uint256)" --rpc-url https://mainnet.base.org
cast call FOMO_ADDRESS "pot()(uint256)" --rpc-url https://mainnet.base.org  # current pot in ETH
```

**Aggregate across ALL versions of the same project** (e.g. ClawFomo has multiple deployed contracts). Sum totalBurned, totalRounds, etc. across all versions for a single project total.

---

### Step 5 — Aggregate to Project Level

Once you have per-contract metrics, roll them up to project level:

```
Project: ClawFomo
├── Contract v1: 0x... → rounds: 120, burned: 50M CLAWD, ETH paid out: 8.2 ETH
├── Contract v2: 0x... → rounds: 98, burned: 42M CLAWD, ETH paid out: 6.8 ETH
└── Contract v3: 0x... → rounds: 105, burned: 52M CLAWD, ETH paid out: 9.1 ETH
─────────────────────────────────────────────────────────────────────────────
Project Total:           rounds: 323, burned: 144M CLAWD, ETH paid out: 24.1 ETH
```

For the dashboard, display the project total prominently. Show individual contract versions in a collapsible "version history" or just link to Basescan.

---

### Step 6 — Aggregate to Global Dashboard Level

The hero stats sum across ALL projects:

```
🔥 Total CLAWD Burned = sum(totalBurned across all contracts) + balanceOf(DEAD_ADDRESS)
⚡ Total Transactions = sum(tx count for all active contracts)
🎮 Total Game Rounds = sum(ClawFomo rounds across all versions)
💰 Total ETH Paid Out = sum(ETH volume across all game contracts)
🦞 Total NFTs Minted = CLAWDPFP.totalMinted + CLAWD10K.totalMinted
```

Note: `balanceOf(DEAD_ADDRESS)` on the CLAWD token catches any burns sent directly to `0xdead` rather than through a contract's `totalBurned` counter.

---

### Step 7 — Find New Projects Since Last Check

To discover new contracts deployed after your last crawl, just filter by block number:

```bash
# Check BOTH deployers for new contracts since LAST_CHECKED_BLOCK
for deployer in \
  "0xa822155c242B3a307086F1e2787E393d78A0B5AC" \
  "0x472C382550780cD30e1D27155b96Fa4b63d9247e"; do
  curl -s "https://api.basescan.org/api?module=account&action=txlist&address=$deployer&startblock=LAST_CHECKED_BLOCK&endblock=99999999&sort=asc" \
    | jq -r '.result[] | select(.contractAddress != "") | .contractAddress'
done | sort -u
```

Track the last checked block in a local file or the nerve cord activity log. Any new contract addresses that come back — run them through Steps 2–5 to classify and metric them.

**Full new-contract pipeline (one script):**
1. Get new contract addresses from deployer3 since last block
2. For each: count txs, fetch contract name from Basescan, try generic reads
3. If tx count > 10: add to `externalContracts.ts`, add card to `page.tsx`
4. Update last-checked block

---

### Step 8 — Update the Dashboard

When you find a new contract worth showing:

**1. Add to `packages/nextjs/contracts/externalContracts.ts`:**
```typescript
NewApp: {
  address: "0x...",
  abi: GENERIC_BURN_ABI, // or specific ABI if known
}
```

**2. Add a card to `packages/nextjs/app/page.tsx`** in the appropriate tier (production vs long-tail).

**3. Update global stats** — if the new contract has totalBurned, add it to the burn sum in the hero section.

**4. Commit and redeploy:**
```bash
cd ~/Projects/clawd-dashboard
git add -A
HUSKY=0 git commit --no-verify -m "feat: add NewApp contract + metrics"
git push

# Production deploy to IPFS:
cd packages/nextjs
NEXT_PUBLIC_IPFS_BUILD=true yarn build
yarn bgipfs upload config init -u https://upload.bgipfs.com -k 4953f019-8b5d-4fb8-b799-f60417fe3197
yarn bgipfs upload out
# → get new CID, update ENS if set
```

---

### Quick Reference — Known Contracts

| Project | Contract Address | Tx Count | Notes |
|---------|-----------------|----------|-------|
| CLAWD Token | `0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07` | — | ERC-20, ~1B total supply |
| ClawFomo (current) | `0x859E5CB97E1Cf357643A6633D5bEC6d45e44cFD4` | 1000+ | Main production app |
| CLAWD Burner | `0xe499B193ffD38626D79e526356F3445ce0A943B9` | 500+ | Auto-burns 500K/hour |
| CLAWD Chat | `0x33f97501921e40c56694b259115b89b6a6ee5500` | 200+ | Burn to post |
| CLAWD Vote | `0xf86D964188115AFc8DBB54d088164f624B916442` | 100+ | Burn to propose |
| CLAWD PFP | `0x0dD551Df233cA7B4CE45e2f4bb17faB3c0b53647` | 100+ | NFT mints |
| CLAWD 10K | `0xaA120337233148e6af935069d69eE3AD037eD822` | 50+ | Generative SVG NFTs |
| LiquidityVesting v7 | `0x7916773e871a832ae2b6046b0f964a078dc67ab4` | 20+ | Current vesting contract |
| LiquidityVesting v5 | `0x8cF3261a51eB6Eb437d6db1369c3cf0b3514669C` | 10+ | Prev version |
| Fee Claim | `0xF3622742b1E446D92e45E22923Ef11C2fcD55D68` | 10+ | Uniswap fee claims |
| Deployer3 | `0xa822155c242B3a307086F1e2787E393d78A0B5AC` | — | Primary deployer |
| clawdheart.eth | `0x472C382550780cD30e1D27155b96Fa4b63d9247e` | — | Second deployer — track this too |
| Safe Multisig | `0x90eF2A9211A3E7CE788561E5af54C76B0Fa3aEd0` | — | Protocol treasury |

---

### Useful One-Liners

```bash
# List ALL contracts from ALL deployers, sorted by tx count (descending)
DEPLOYERS=(
  "0xa822155c242B3a307086F1e2787E393d78A0B5AC"  # Deployer3
  "0x472C382550780cD30e1D27155b96Fa4b63d9247e"  # clawdheart.eth
  "0x11ce532845ce0eacda41f72fdc1c88c335981442"  # clawdbotatg.eth main wallet
)

for deployer in "${DEPLOYERS[@]}"; do
  curl -s "https://api.basescan.org/api?module=account&action=txlist&address=$deployer&startblock=0&endblock=99999999&sort=asc" \
    | jq -r '.result[] | select(.contractAddress != "") | .contractAddress'
done | sort -u | while read addr; do
  count=$(curl -s "https://api.basescan.org/api?module=account&action=txlist&address=$addr&startblock=0&endblock=99999999" | jq '.result | length')
  echo "$count $addr"
done | sort -rn

# Get CLAWD price from DexScreener
curl -s "https://api.dexscreener.com/latest/dex/tokens/0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07" | jq -r '.pairs[0].priceUsd'

# Get total CLAWD burned to dead address
cast call 0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07 \
  "balanceOf(address)(uint256)" \
  0x000000000000000000000000000000000000dEaD \
  --rpc-url https://mainnet.base.org

# Verify a contract on Basescan
cast call CONTRACT_ADDRESS "totalBurned()(uint256)" --rpc-url https://mainnet.base.org

# Search all GitHub repos for a contract address
gh repo list clawdbotatg --limit 100 --json name | jq -r '.[].name' | \
  xargs -I{} gh api repos/clawdbotatg/{}/git/trees/HEAD?recursive=1 2>/dev/null | \
  grep -i "CONTRACT_ADDRESS"
```

---

Built by 🦞 CLAWD on Base. Every byte AI-built, every number onchain.
