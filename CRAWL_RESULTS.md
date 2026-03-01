# CLAWD Ecosystem Crawl Results
_Last updated: 2026-03-01_

## Methodology
- Scanned all 4 deployer addresses via Blockscout v1 API
- Found 141 unique contracts total
- Scored each by tx count
- Matched to GitHub repos via broadcast files
- Pulled metrics via Alchemy batch RPC

---

## Deployers Scanned
| Deployer | Address | Contracts Deployed |
|----------|---------|-------------------|
| leftclaw / deployer3 | `0xa822155c242B3a307086F1e2787E393d78A0B5AC` | 135 |
| clawdheart deployer | `0x472C382550780cD30e1D27155b96Fa4b63d9247e` | 2 |
| rightclaw deployer | `0x4f8ac2faa3cacacacb7b4997a48f377fe88dfd46` | 3 |
| clawdbotatg.eth main | `0x11ce532845ce0eacda41f72fdc1c88c335981442` | 1 |

---

## 🔥 Incinerator (`clawd-incinerator` repo)
> **Biggest burner in the ecosystem — not in dashboard**

| Address | Txs | totalBurned | CLAWD held |
|---------|-----|-------------|------------|
| `0x536453350f2eee2eb8bfee1866baf4fca494a092` | 185 | **530M CLAWD** | 149.93M CLAWD |

---

## 🎮 ClawFomo — All Versions (`clawdfomo3d`, `clawd-fomo3d-v2`)
> Current dashboard only tracks v1. Real total: ~145.9M burned across all versions.

| Address | Txs | totalBurned | currentRound | Notes |
|---------|-----|-------------|--------------|-------|
| `0x859e5cb97e1cf357643a6633d5bec6d45e44cfd4` | 1000+ | 144.67M CLAWD | 323 | **current production** |
| `0x861e96c70a94cdebfb3fb89f3a96fe16b5e31891` | 208 | 770.7K CLAWD | 32 | v2 |
| `0xcb67a69471f4842a142460c271a26deab358ea79` | 92 | 283.2K CLAWD | 5 | v3 |
| `0x572bc6149a5a9b013b5e9c370aef6fec8388f53f` | 54 | 74.7K CLAWD | 14 | v4 |
| `0xd4f419065ee4b89ef8f9b2c224a9ebdee62abf54` | 52 | 43K CLAWD | 26 | v5 |
| `0xa5cd6e15f91ae84f5513a60c398f3c5e4c43e399` | 23 | 11.9K CLAWD | 3 | v6 |
| `0x23f44c39f417f16807643fc8eb3435c3e47e1a32` | 16 | 9K CLAWD | 6 | v7 |

---

## 🎯 TenTwentyFourX (`clawd-1024x` repo)
> **Not in dashboard. 2000+ txs across versions, 20.6M burned total.**
> Confirmed via function selectors: `click(bytes32,uint256,uint256)` = 0x126cf40d, `reveal(uint256,bytes32,bytes32)` = 0xaf697a6f

| Address | Txs | totalBurned | Notes |
|---------|-----|-------------|-------|
| `0xaa7466fa805e59f06c83befb2b4e256a9b246b04` | 1000+ | 20.23M CLAWD | **current production** |
| `0xef2f6d7020f4b088fee65d5369bc792d7b2f40fc` | 1000+ | 351.6K CLAWD | older deploy (same contract, different params) |
| `0x6b003f883c608bdad938cd6dc3730b17ac46e196` | 178 | 23.5K CLAWD | even older deploy |
| `0xcdd04b6f5e635a71b20aefd5e477557447d498fe` | 7 | — | newest deploy |

---

## 🎰 LuckyClick (`clawd-lucky-click` repo)
> **Not in dashboard. 102 txs.**

| Address | Txs | Notes |
|---------|-----|-------|
| `0x1062eace4f3083c164796b9b2649ce6c25acebe6` | 102 | **current production** |
| `0xc0520e84c4362bc0075f190e987417742d0d6814` | 17 | older deploy |

---

## 🏦 ClawdStake (`clawd-stake` repo)
> **Not in dashboard. 87 txs, 2M CLAWD currently staked.**

| Address | Txs | totalBurned | totalStaked | Notes |
|---------|-----|-------------|-------------|-------|
| `0x90552946edd5a6bad7647655da6c805a188dfd25` | 87 | 480K CLAWD | **2M CLAWD** | current |
| `0x4f564d77cecf0830487b80fa0812d40f41537ff6` | 4 | — | — | pilot |
| `0xb077fe4b30e01377fc15880895aa10cf59b3d190` | 5 | — | — | test |

---

## 🗼 LobsterTower (`lobster-stack` repo)
> **Not in dashboard. 68 txs.**

| Address | Txs | totalBurned | Notes |
|---------|-----|-------------|-------|
| `0x8d3547c0336149a1592472ac8d5c07c52865f801` | 68 | 600 CLAWD | **current production** |
| `0xb05f0b9e52bfa2005d16d88827645e531aae4894` | 1 | — | older deploy |
| `0x656def27004f0c563adba9f4d02ab22583601e1c` | 6 | — | earlier version |

---

## 🖼 ClawdPFPMarket (`clawd-pfp-market` repo)
> **Not in dashboard. 355 txs on current contract.**

| Address | Txs | Notes |
|---------|-----|-------|
| `0xa37c70168201c290cbefcbda95daa779f0dba305` | 355 | **current production** |
| `0x7a0b9f1bb27808c5020e83bdd711fb9b254f0826` | 16 | v2 |
| `0x465fbd7d94c9bcc1cb4888949192bb924aae8ac3` | 8 | v3 |
| `0xa01bd258165591c823b816eff2a88b6d8feb6182` | 7 | v4 |
| `0xc92331a1e80aaa84aef12fdfb60bbeb9993c1104` | 8 | v5 |

---

## 🧪 CLAWDlabs / IdeaLabs (`idea-labs` repo)
> In dashboard but tracking wrong contract. Multiple deploys.

| Address | Txs | Notes |
|---------|-----|-------|
| `0xa51fe0491292fbad5caa23f674cd59c1480ec60a` | 42 | in dashboard |
| `0x85af18a392e564f68897a0518c191d0831e40a46` | 14 | newer deploy? |
| `0x06779e41c76eb1aa6ce3323f01f8b3aee92e9f4d` | 1 | old |

---

## 🤖 AgentBountyBoard (`agent-bounty-board` repo)
| Address | Txs | Notes |
|---------|-----|-------|
| `0x1aef2515d21fa590a525ed891ccf1ad0f499c4c9` | 7 | current |

---

## 💬 CLAWDChat (`clawd-chatroom` repo)
| Address | Txs | totalBurned | Notes |
|---------|-----|-------------|-------|
| `0x33f97501921e40c56694b259115b89b6a6ee5500` | 3 (Blockscout cap) | — | current |

---

## 🏆 ClawdMemeContest (`clawd-meme-contest` repo)
| Address | Txs | totalBurned | Notes |
|---------|-----|-------------|-------|
| `0xe94b4b5a7a0a98cf9ed303a9c6d2d4ad7e5ef423` | 15 | 8 CLAWD | latest |
| `0x3ae6af15c2699ab4f39394c58cbdd829a1d31f59` | 13 | 80 CLAWD | v2 |
| `0x708c357d6c81b9ddc4505ee5f7f730ba83316b47` | 3 | — | v3 |

---

## 🎨 CLAWD PFP (`clawd-pfp` repo)
| Address | Txs | totalMinted | Notes |
|---------|-----|-------------|-------|
| `0x0dd551df233ca7b4ce45e2f4bb17fab3c0b53647` | 11 | — | in dashboard |
| `0x8606551d2be495503fbf23f50bbfd307385e9bdf` | 17 | 72 | v2 |

---

## 🦞 CLAWD 10K (`clawd-10k` repo)
| Address | Txs | totalMinted | Notes |
|---------|-----|-------------|-------|
| `0xaa120337233148e6af935069d69ee3ad037ed822` | 2 | — | in dashboard |

---

## 🔒 LiquidityVesting (`liquidity-vesting` repo)
| Address | Txs | Notes |
|---------|-----|-------|
| `0x7916773e871a832ae2b6046b0f964a078dc67ab4` | 2 | v7, current, in dashboard |
| `0x5d313662ccc366f2dd31ee367f11cbb79bb3e5c5` | 7 | v5 |
| `0x1f88546d03070afa342b8a50d5c52bf058244d5f` | 6 | v4 |
| `0x8cf3261a51eb6eb437d6db1369c3cf0b3514669c` | 2 | v3 |
| `0x833c26c61016e36ecb7f4f3f7de08e4f802042de` | 2 | v2 |

---

## 🗳️ CLAWDVote (`clawd-vote` repo)
| Address | Txs | totalBurned | Notes |
|---------|-----|-------------|-------|
| `0xf86d964188115afc8dbb54d088164f624b916442` | — | — | in dashboard |

---

## 🎰 ClawdSlots (`slot402` repo)
| Address | Txs | Notes |
|---------|-----|-------|
| `0x7e34d120d50127d39ed29033e286d5f43ecd4782` | 1 | Base mainnet |

---

## 🏆 FantasyLeague (`clawd-fantasy` repo)
| Address | Txs | Notes |
|---------|-----|-------|
| `0x54659613dc56ff779b799073b231785f473b3d99` | 1 | deployed, low activity |

---

## 💥 CrashGame (`clawd-crash` repo)
> Found in repo but NOT in our deployer scan — may have been deployed from a different address.

| Address | Txs | Notes |
|---------|-----|-------|
| `0xd373c278e99a59fea2be2386f4e8023513bdabb3` | unknown | need to check |

---

## ❓ UNIDENTIFIED — Need Austin's Help
One remaining mystery:

| Address | Txs | Known Metrics | Clues |
|---------|-----|---------------|-------|
| `0x3371976d639a383bcfe6ac7c304602ac34351b53` | 23 | 340K CLAWD burned | functions: `vote(uint256)`, `proposeOwner`, `executeWithdraw` — owned by clawdbotatg.eth |

_Note: `0xef2f...` confirmed as TenTwentyFourX (clawd-1024x) — selectors matched exactly._

---

## 📊 Global Burn Totals (aggregated)
| Source | Burns |
|--------|-------|
| Incinerator | 530M CLAWD |
| ClawFomo (all versions) | ~145.9M CLAWD |
| TenTwentyFourX | 20.23M CLAWD |
| CLAWD dead address (direct) | ~check live |
| ClawdStake | 480K CLAWD |
| LobsterTower | 600 CLAWD |
| Others | ~1M CLAWD |
| **TOTAL (tracked)** | **~700M+ CLAWD** |

_Note: Dashboard currently shows only 144M (ClawFomo current only)._

---

## 🚧 Dashboard TODO
- [ ] Add Incinerator card (530M burned — biggest story)
- [ ] Add TenTwentyFourX card (clawd-1024x)
- [ ] Add LuckyClick card
- [ ] Add ClawdStake card (2M staked live stat)
- [ ] Add LobsterTower card
- [ ] Add ClawdPFPMarket card
- [ ] Fix hero "Total Burned" to aggregate ALL contracts + dead address
- [ ] Aggregate ClawFomo across all 7 versions
- [ ] Identify 0xef2f and 0x3371
- [ ] Check CrashGame deployer + add card
