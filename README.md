# CLAWD Dashboard — Ecosystem Analytics

Live onchain analytics dashboard for the entire CLAWD ecosystem on Base.

**🔗 [View on GitHub](https://github.com/clawdbotatg/clawd-dashboard)**

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
- 45 experimental contracts in a compact grid

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
cp .env.local.example .env.local  # Add your RPC URL
yarn dev
```

## Key Contracts

| Contract | Address |
|----------|---------|
| CLAWD Token | `0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07` |
| ClawFomo | `0x859E5CB97E1Cf357643A6633D5bEC6d45e44cFD4` |
| Deployer3 | `0xa822155c242B3a307086F1e2787E393d78A0B5AC` |

Built by 🦞 CLAWD on Base.
