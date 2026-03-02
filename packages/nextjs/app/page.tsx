"use client";

import { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import { createPublicClient, formatUnits, http, parseAbi } from "viem";
import { base } from "viem/chains";

// ─── Constants ─────────────────────────────────────────────────────
const CLAWD_TOKEN = "0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07" as const;
const DEAD = "0x000000000000000000000000000000000000dEaD" as const;
const DEPLOYER3          = "0xa822155c242B3a307086F1e2787E393d78A0B5AC" as const;
const CLAWDHEART_DEPLOYER = "0x472C382550780cD30e1D27155b96Fa4b63d9247e" as const;
const RIGHTCLAW_DEPLOYER  = "0x4f8ac2faa3cacacacb7b4997a48f377fe88dfd46" as const;

const DEPLOYERS = [
  { name: "deployer3",          ens: null,             address: DEPLOYER3,           desc: "leftclaw primary deployer" },
  { name: "clawdheart deployer", ens: "clawdheart.eth", address: CLAWDHEART_DEPLOYER, desc: "clawdheart.eth" },
  { name: "rightclaw deployer",  ens: null,             address: RIGHTCLAW_DEPLOYER,  desc: "rightclaw deployer (clawd-crash-deployer)" },
] as const;

const RPC = typeof window !== "undefined"
  ? (process.env.NEXT_PUBLIC_BASE_RPC || "https://mainnet.base.org")
  : "https://mainnet.base.org";

const client = createPublicClient({ chain: base, transport: http(RPC) });

// ─── Contract Addresses ────────────────────────────────────────────
const INCINERATOR = "0x536453350f2eee2eb8bfee1866baf4fca494a092" as const;

const CLAWFOMO_VERSIONS = [
  "0x859e5cb97e1cf357643a6633d5bec6d45e44cfd4",
  "0x861e96c70a94cdebfb3fb89f3a96fe16b5e31891",
  "0xcb67a69471f4842a142460c271a26deab358ea79",
  "0x572bc6149a5a9b013b5e9c370aef6fec8388f53f",
  "0xd4f419065ee4b89ef8f9b2c224a9ebdee62abf54",
  "0xa5cd6e15f91ae84f5513a60c398f3c5e4c43e399",
  "0x23f44c39f417f16807643fc8eb3435c3e47e1a32",
] as const;

const TENTWENTYFOURX_VERSIONS = [
  "0xaa7466fa805e59f06c83befb2b4e256a9b246b04",
  "0xef2f6d7020f4b088fee65d5369bc792d7b2f40fc",
  "0x6b003f883c608bdad938cd6dc3730b17ac46e196",
] as const;

const CLAWD_STAKE = "0x90552946edd5a6bad7647655da6c805a188dfd25" as const;
const CLAWD_PFP_MARKET = "0xa37c70168201c290cbefcbda95daa779f0dba305" as const;
const LUCKY_CLICK = "0x1062eace4f3083c164796b9b2649ce6c25acebe6" as const;
const LOBSTER_TOWER = "0x8d3547c0336149a1592472ac8d5c07c52865f801" as const;
const MEME_ARENA = "0x3371976d639a383bcfe6ac7c304602ac34351b53" as const;
const CLAWD_VICTION = "0xfe69980a1203d664488a73ae806514d2a04c1f8a" as const;
const MEME_CONTEST = "0xe94b4b5a7a0a98cf9ed303a9c6d2d4ad7e5ef423" as const;
const PFP_V2 = "0x8606551d2be495503fbf23f50bbfd307385e9bdf" as const;
const CONTRACTS_DEPLOYED = 141; // hardcoded from deployer crawl

// ─── Top 10 contracts for tx count ─────────────────────────────────
const TX_COUNT_CONTRACTS = [
  "0x859e5cb97e1cf357643a6633d5bec6d45e44cfd4",
  "0xaa7466fa805e59f06c83befb2b4e256a9b246b04",
  "0xef2f6d7020f4b088fee65d5369bc792d7b2f40fc",
  "0xa37c70168201c290cbefcbda95daa779f0dba305",
  "0x861e96c70a94cdebfb3fb89f3a96fe16b5e31891",
  "0x536453350f2eee2eb8bfee1866baf4fca494a092",
  "0x6b003f883c608bdad938cd6dc3730b17ac46e196",
  "0x1062eace4f3083c164796b9b2649ce6c25acebe6",
  "0x90552946edd5a6bad7647655da6c805a188dfd25",
  "0x8d3547c0336149a1592472ac8d5c07c52865f801",
] as const;
const TX_COUNT_REST = 852; // remaining ecosystem contracts (known from crawl)

async function fetchTxCount(addr: string): Promise<number> {
  try {
    let total = 0, page = 1;
    while (true) {
      const res = await fetch(`https://base.blockscout.com/api?module=account&action=txlist&address=${addr}&page=${page}&offset=1000&sort=asc`);
      const json = await res.json();
      const count = (json.result || []).length;
      total += count;
      if (count < 1000) break;
      page++;
    }
    return total;
  } catch { return 0; }
}

// ─── ABIs ──────────────────────────────────────────────────────────
const erc20Abi = parseAbi([
  "function balanceOf(address) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
]);
const fomoAbi = parseAbi([
  "function currentRound() view returns (uint256)",
  "function totalBurned() view returns (uint256)",
  "function getRoundInfo() view returns (uint256 round, uint256 pot, uint256 keyPrice, uint256 endTime, address lastBidder, uint256 totalKeys, bool active)",
  "function getRoundCount() view returns (uint256)",
]);
const totalBurnedAbi = parseAbi(["function totalBurned() view returns (uint256)"]);
const totalClawdBurnedAbi = parseAbi(["function totalClawdBurned() view returns (uint256)"]);
const totalStakedAbi = parseAbi(["function totalStaked() view returns (uint256)"]);
const nextProposalIdAbi = parseAbi(["function nextProposalId() view returns (uint256)"]);
const nextIdeaIdAbi = parseAbi(["function nextIdeaId() view returns (uint256)"]);
const totalMintedAbi = parseAbi(["function totalMinted() view returns (uint256)"]);
const totalStakersAbi = parseAbi(["function totalStakers() view returns (uint256)"]);
const totalBetsAbi = parseAbi(["function totalBets() view returns (uint256)"]);
const currentRoundAbi = parseAbi(["function currentRound() view returns (uint256)"]);
const isLockedAbi = parseAbi(["function isLocked() view returns (bool)"]);

// ─── Contract Registry ─────────────────────────────────────────────
const PRODUCTION_APPS = [
  { name: "ClawFomo", emoji: "🎮", desc: "Last-bidder-wins game", address: "0x859E5CB97E1Cf357643A6633D5bEC6d45e44cFD4", site: "https://clawfomo.com", tier: 1 as const },
  { name: "Incinerator", emoji: "🔥", desc: "Massive CLAWD burn engine", address: INCINERATOR, tier: 1 as const },
  { name: "TenTwentyFourX", emoji: "🎯", desc: "Click-to-reveal prediction game", address: TENTWENTYFOURX_VERSIONS[0], tier: 1 as const },
  { name: "CLAWDlabs", emoji: "🧪", desc: "Idea staking", address: "0xa51fe0491292fbad5caa23f674cd59c1480ec60a", site: "https://labs.clawdbotatg.eth.link", tier: 1 as const },
  { name: "Liquidity Vesting", emoji: "🔒", desc: "WETH+CLAWD locked in Uniswap V3", address: "0x7916773e871a832ae2b6046b0f964a078dc67ab4", tier: 1 as const },
  { name: "Sponsored 8004", emoji: "🤖", desc: "ERC-8004 agent identity registration", address: "", site: "https://sponsored-8004-registration-nextjs.vercel.app", tier: 1 as const },
];

const UTILITY_APPS = [
  { name: "ClawdStake", emoji: "🏦", desc: "Stake CLAWD, earn rewards", address: CLAWD_STAKE, tier: 2 as const },
  { name: "ClawdPFPMarket", emoji: "🖼", desc: "Profile Pic Prediction Market", address: CLAWD_PFP_MARKET, tier: 2 as const },
  { name: "LuckyClick", emoji: "🎰", desc: "Luck-based burn game", address: LUCKY_CLICK, tier: 2 as const },
  { name: "LobsterTower", emoji: "🗼", desc: "Stack-and-climb tower game", address: LOBSTER_TOWER, tier: 2 as const },
  { name: "Meme Arena", emoji: "🏟️", desc: "Vote on memes, burn CLAWD", address: MEME_ARENA, tier: 2 as const },
  { name: "ClawdViction", emoji: "🧠", desc: "AI conviction governance", address: CLAWD_VICTION, tier: 2 as const },
  { name: "Burner", emoji: "🔥", desc: "Auto-burns 500K/hour, 5K caller reward", address: "0xe499B193ffD38626D79e526356F3445ce0A943B9", tier: 2 as const },
  { name: "Chat", emoji: "💬", desc: "Burn 10K CLAWD to post onchain", address: "0x33f97501921e40c56694b259115b89b6a6ee5500", tier: 2 as const },
  { name: "Vote", emoji: "🗳️", desc: "Create proposals, stake to vote", address: "0xf86D964188115AFc8DBB54d088164f624B916442", tier: 2 as const },
  { name: "PFP", emoji: "🎨", desc: "0.001 ETH mint, 1M CLAWD burned per mint", address: "0x0dD551Df233cA7B4CE45e2f4bb17faB3c0b53647", tier: 2 as const },
  { name: "10K", emoji: "🦞", desc: "10,000 generative onchain SVG NFTs", address: "0xaA120337233148e6af935069d69eE3AD037eD822", tier: 2 as const },
  { name: "Meme Contest", emoji: "🏆", desc: "Submit memes, community votes, winner takes pool", address: "0x716836Ebf9f6E3b18110CCef89E06dD07b8371c6", tier: 2 as const },
];

const PROTOTYPE_CONTRACTS: { name: string; address: string; desc: string }[] = [
  { name: "Crown", address: "0x7b3E3193bCAf552E4Fcf1a8D798F3effD9459CD7", desc: "King-of-the-hill" },
  { name: "Faucet", address: "0xbCdB4010fe2b5f349590a613675A685A8DFC0104", desc: "Token faucet" },
  { name: "Tip", address: "0x25BF19565b301ab262407DfBfA307ed2cA3306f0", desc: "Send tips to builders" },
  { name: "Stake", address: "0xff887F760eb18fdCcF7eD2412272b30aa36305F0", desc: "Stake for rewards" },
  { name: "Raffle", address: "0xD42fCb8a504829008F8E5d5fba9C6233AE56c297", desc: "Onchain raffle" },
  { name: "Bounty", address: "0x3797710f9ff1FA1Cf0Bf014581e4651845d75530", desc: "Post & claim bounties" },
  { name: "Escrow", address: "0xc1615196Fceba7d71a93c854e349C9c8B780338a", desc: "Trustless P2P escrow" },
  { name: "wCLAWD", address: "0xFd2e32B82Af54CB89a4D30b23966E38bDe8e5A9E", desc: "Wrapped CLAWD ERC-20" },
  { name: "Timelock", address: "0x35F5c4308D075C0b2Ee27Dd2377e218f887B0CA3", desc: "Time-locked releases" },
  { name: "Auction", address: "0x673c29ed989C604CCdddd691F4b4Df995A4cbCd2", desc: "Auctions" },
  { name: "Leaderboard", address: "0xC540f42d47119Eb8E5AAbcE3bf0Ef8b638dCB27c", desc: "Onchain rankings" },
  { name: "Predict", address: "0x68c1DBD7896BDEeC7cc43838D5050737c043De1D", desc: "Prediction markets" },
  { name: "Streaks", address: "0xb8Fc92aBfBBe782015c6c248fed612dE3A21fFD7", desc: "Daily streaks" },
  { name: "Tribute", address: "0x7dA13fAc147b2daCffC538558F7E9BfeeF22C586", desc: "Protocol donations" },
  { name: "Registry", address: "0x90F75E14336C8a1385A40115Ff258E8D2A790E7d", desc: "Identity registry" },
  { name: "Lottery", address: "0x17ea0859f209D0b8F555104660166f7428E12d77", desc: "Onchain lottery" },
  { name: "Splitter", address: "0xf69E0Be99D7564C8e446437Ed2efc9f639454435", desc: "Revenue splitting" },
  { name: "Pledge", address: "0x00BBE533b0a2aFAC940E845Fa672F0f3D271dC78", desc: "Accountability pledges" },
  { name: "Badge", address: "0x433406ca42CED9A2581d89d7a473E6604B7A22eb", desc: "Soulbound badges" },
  { name: "Crowdfund", address: "0x75d19359207De12d27B01eE429743d4145D2cdC6", desc: "Crowdfunding" },
  { name: "Airdrop", address: "0x544423D9039c470370903e360a9060948895898C", desc: "Merkle airdrops" },
  { name: "Swap", address: "0xCbDb6A95058d4A9552FB2cD9734146a4554c6c4a", desc: "Token swap" },
  { name: "Vault", address: "0xB6360b93263C564f73435d10CEd362BD9fe67295", desc: "Time-locked vault" },
  { name: "Delegate", address: "0xdB4Bf2fb4F00C8F5303d1506bD1C04A906dBc3C1", desc: "Vote delegation" },
  { name: "Quest", address: "0x2370D29f65a23AAbF73Dea7cD649236C7d236f22", desc: "Quest system" },
  { name: "Snapshot", address: "0x7E3afc31693be7999dc6a0dF111dBfF00E1E4626", desc: "Balance snapshots" },
  { name: "Mailbox", address: "0x7B83fE267DDA99aD2FF85193d428783c023768d6", desc: "Onchain messages" },
  { name: "Poll", address: "0x221f5d120a0aF5ffBfD54AD9A943e2fD3350C8AB", desc: "Multiple choice polls" },
  { name: "Roulette", address: "0x7f15D58fa7E00279DF43A50d0C62FA5FB9f9abf2", desc: "Onchain roulette" },
  { name: "Subscription", address: "0x0FC1ba72F1406314845d61E1bA5075e950288e62", desc: "Recurring payments" },
  { name: "Coupon", address: "0x4cA8Ba6fb0e057a593540f96A83f3639EC81e8cc", desc: "Redeemable coupons" },
  { name: "Whitelist", address: "0x4d6B4cECdB51522ef04C7EB1Ad4384D0B6d17007", desc: "Merkle whitelists" },
  { name: "Reputation", address: "0x3147A8E2092E088F3aD90B0A13fc95c9a7b5De06", desc: "Reputation scoring" },
  { name: "Scratch", address: "0xaD4a988d95Cd245C05351cB73E9A89599d4D2AC7", desc: "Scratch-card game" },
  { name: "Marketplace", address: "0xEAB24347Fc24490aA84624E4fD181db3A5Bbf980", desc: "NFT marketplace" },
  { name: "Relay", address: "0x05De3bcD691Db6803749eFB3ED4A6a898C81A827", desc: "Gasless meta-tx relay" },
  { name: "Charity", address: "0xc90ab2035c0FB846D8Ec258be9c9B54B129B0b9b", desc: "Transparent donations" },
  { name: "Insurance", address: "0x69B0195b7dE86754295760A61FebAebFcE5aEeFB", desc: "P2P insurance" },
  { name: "Referral", address: "0x4F14931213F0563392e043d0C9a72064D61272d2", desc: "Referral rewards" },
  { name: "Guestbook", address: "0xCF8168Cd23c0DF11405aE002BF2bFB856a0BC8A3", desc: "Onchain guestbook" },
  { name: "Duel", address: "0x0B366b3ab023aD7BE61E00cdFF674aAE6d3884BB", desc: "1v1 wagers" },
  { name: "Forge", address: "0xB9A7926421d969Ed4498acAE2c35ddf95d591cEA", desc: "Combine NFTs" },
  { name: "Payroll", address: "0x767F82f7c97130551F6159950CB382f1D6052157", desc: "Automated payroll" },
  { name: "Grant", address: "0x77d01bD547C565b2729f82bd42ceF578f7B31892", desc: "Grant funding" },
  { name: "DAO", address: "0xD5D31d5b05e38a02a8abe95C11A71254C12e2eae", desc: "Minimal viable DAO" },
];

// ─── Helpers ───────────────────────────────────────────────────────
const fmt = (v: bigint | undefined, decimals = 18): string => {
  if (v === undefined) return "—";
  const n = parseFloat(formatUnits(v, decimals));
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
};

const fmtUsd = (n: number): string => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  if (n >= 1) return `$${n.toFixed(2)}`;
  return `$${n.toFixed(4)}`;
};

const shortAddr = (a: string) => `${a.slice(0, 6)}…${a.slice(-4)}`;
const basescanAddr = (a: string) => `https://basescan.org/address/${a}`;

async function safeRead(address: string, abi: any, functionName: string): Promise<bigint> {
  try {
    const result = await client.readContract({ address: address as `0x${string}`, abi, functionName } as any);
    return result as bigint;
  } catch {
    return 0n;
  }
}

async function safeReadBool(address: string, abi: any, functionName: string): Promise<boolean> {
  try {
    const result = await client.readContract({ address: address as `0x${string}`, abi, functionName } as any);
    return result as boolean;
  } catch {
    return false;
  }
}

// ─── Data types ────────────────────────────────────────────────────
interface DashData {
  // Global
  totalBurnedDead: bigint;
  totalSupply: bigint;
  clawdPrice: number;
  fdv: number;
  // Incinerator
  incineratorBurned: bigint;
  incineratorBalance: bigint;
  // ClawFomo aggregated
  fomoTotalRounds: bigint;
  fomoTotalBurned: bigint;
  fomoActive: boolean;
  fomoPot: bigint;
  // TenTwentyFourX aggregated
  tenTwentyFourXBurned: bigint;
  // ClawdStake
  stakeBurned: bigint;
  stakeTotal: bigint;
  // Meme Arena
  memeArenaBurned: bigint;
  // LuckyClick
  luckyClickBurned: bigint;
  // LobsterTower
  lobsterTowerBurned: bigint;
  // Utility
  chatBurned: bigint;
  voteBurned: bigint;
  voteProposals: bigint;
  pfpBurned: bigint;
  pfpMinted: bigint;
  tenKBurned: bigint;
  tenKMinted: bigint;
  // Labs
  labsIdeas: bigint;
  // Vesting
  vestLocked: boolean;
  vestClawdBal: bigint;
  // New all-time metrics
  memeContestBurned: bigint;
  totalStakers: bigint;
  totalBets: bigint;
  pfpV2Minted: bigint;
  fomoTotalRoundsCurrent: bigint;
  // Aggregated total burn
  totalBurnedAll: bigint;
  // Total onchain txs
  totalTxs: number;
}

// ─── Page ──────────────────────────────────────────────────────────
const Home: NextPage = () => {
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Core reads
      const [deadBal, supply] = await Promise.all([
        client.readContract({ address: CLAWD_TOKEN, abi: erc20Abi, functionName: "balanceOf", args: [DEAD] }),
        client.readContract({ address: CLAWD_TOKEN, abi: erc20Abi, functionName: "totalSupply" }),
      ]);

      // Incinerator
      const [incBurned, incBalance] = await Promise.all([
        safeRead(INCINERATOR, totalBurnedAbi, "totalBurned"),
        client.readContract({ address: CLAWD_TOKEN, abi: erc20Abi, functionName: "balanceOf", args: [INCINERATOR] }),
      ]);

      // ClawFomo — aggregate all versions
      const fomoResults = await Promise.all(
        CLAWFOMO_VERSIONS.map(async (addr) => {
          const [burned, rounds] = await Promise.all([
            safeRead(addr, totalBurnedAbi, "totalBurned"),
            safeRead(addr, fomoAbi, "getRoundCount"),
          ]);
          return { burned, rounds };
        })
      );
      const fomoTotalBurned = fomoResults.reduce((s, r) => s + r.burned, 0n);
      const fomoTotalRounds = fomoResults.reduce((s, r) => s + r.rounds, 0n);

      // Current fomo round info
      let fomoActive = false;
      let fomoPot = 0n;
      try {
        const info = await client.readContract({
          address: CLAWFOMO_VERSIONS[0] as `0x${string}`,
          abi: fomoAbi,
          functionName: "getRoundInfo",
        });
        fomoPot = info[1];
        fomoActive = info[6];
      } catch {}

      // TenTwentyFourX — aggregate all versions
      const ttfxResults = await Promise.all(
        TENTWENTYFOURX_VERSIONS.map(addr => safeRead(addr, totalBurnedAbi, "totalBurned"))
      );
      const tenTwentyFourXBurned = ttfxResults.reduce((s, v) => s + v, 0n);

      // ClawdStake
      const [stakeBurned, stakeTotal] = await Promise.all([
        safeRead(CLAWD_STAKE, totalBurnedAbi, "totalBurned"),
        safeRead(CLAWD_STAKE, totalStakedAbi, "totalStaked"),
      ]);

      // Other burns
      const [memeArenaBurned, luckyClickBurned, lobsterTowerBurned] = await Promise.all([
        safeRead(MEME_ARENA, totalBurnedAbi, "totalBurned"),
        safeRead(LUCKY_CLICK, totalBurnedAbi, "totalBurned"),
        safeRead(LOBSTER_TOWER, totalBurnedAbi, "totalBurned"),
      ]);

      // New all-time metrics reads
      const [totalStakers, totalBets, pfpV2Minted, memeContestBurned] = await Promise.all([
        safeRead(CLAWD_STAKE, totalStakersAbi, "totalStakers"),
        safeRead(LUCKY_CLICK, totalBetsAbi, "totalBets"),
        safeRead(PFP_V2, totalMintedAbi, "totalMinted"),
        safeRead(MEME_CONTEST, totalBurnedAbi, "totalBurned"),
      ]);

      // Fomo rounds via currentRound() for accurate count
      const fomoRoundResults = await Promise.all(
        CLAWFOMO_VERSIONS.map(addr => safeRead(addr, currentRoundAbi, "currentRound"))
      );
      const fomoTotalRoundsCurrent = fomoRoundResults.reduce((s, v) => s + v, 0n);

      // Existing utility reads
      const [chatBurned, voteBurned, voteProposals, pfpBurned, pfpMinted, tenKBurned, tenKMinted, labsIdeas, vestLocked, vestBal] = await Promise.all([
        safeRead("0x33f97501921e40c56694b259115b89b6a6ee5500", totalBurnedAbi, "totalBurned"),
        safeRead("0xf86D964188115AFc8DBB54d088164f624B916442", totalBurnedAbi, "totalBurned"),
        safeRead("0xf86D964188115AFc8DBB54d088164f624B916442", nextProposalIdAbi, "nextProposalId"),
        safeRead("0x0dD551Df233cA7B4CE45e2f4bb17faB3c0b53647", totalClawdBurnedAbi, "totalClawdBurned"),
        safeRead("0x0dD551Df233cA7B4CE45e2f4bb17faB3c0b53647", totalMintedAbi, "totalMinted"),
        safeRead("0xaA120337233148e6af935069d69eE3AD037eD822", totalBurnedAbi, "totalBurned"),
        safeRead("0xaA120337233148e6af935069d69eE3AD037eD822", totalMintedAbi, "totalMinted"),
        safeRead("0xa51fe0491292fbad5caa23f674cd59c1480ec60a", nextIdeaIdAbi, "nextIdeaId"),
        safeReadBool("0x7916773e871a832ae2b6046b0f964a078dc67ab4", isLockedAbi, "isLocked"),
        client.readContract({ address: CLAWD_TOKEN, abi: erc20Abi, functionName: "balanceOf", args: ["0x7916773e871a832ae2b6046b0f964a078dc67ab4"] }),
      ]);

      // Total burned = dead address balance only (all burns go to dead address)
      const totalBurnedAll = deadBal;

      // Fetch total onchain txs from Blockscout (top 10 contracts in parallel)
      const txCounts = await Promise.all(TX_COUNT_CONTRACTS.map(fetchTxCount));
      const totalTxs = txCounts.reduce((s, c) => s + c, 0) + TX_COUNT_REST;

      // Fetch price from DexScreener
      let price = 0, fdv = 0;
      try {
        const r = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CLAWD_TOKEN}`);
        const d = await r.json();
        if (d.pairs?.[0]) {
          price = parseFloat(d.pairs[0].priceUsd || "0");
          fdv = parseFloat(d.pairs[0].fdv || "0");
        }
      } catch {}

      setData({
        totalBurnedDead: deadBal,
        totalSupply: supply,
        clawdPrice: price,
        fdv,
        incineratorBurned: incBurned,
        incineratorBalance: incBalance,
        fomoTotalRounds,
        fomoTotalBurned,
        fomoActive,
        fomoPot,
        tenTwentyFourXBurned,
        stakeBurned,
        stakeTotal,
        memeArenaBurned,
        luckyClickBurned,
        lobsterTowerBurned,
        chatBurned,
        voteBurned,
        voteProposals,
        pfpBurned,
        pfpMinted,
        tenKBurned,
        tenKMinted,
        labsIdeas,
        vestLocked,
        vestClawdBal: vestBal,
        memeContestBurned,
        totalStakers,
        totalBets,
        pfpV2Minted,
        fomoTotalRoundsCurrent,
        totalBurnedAll,
        totalTxs,
      });
      setLastUpdate(new Date());
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const totalContracts = PRODUCTION_APPS.length + UTILITY_APPS.length;

  const burnedPct = data
    ? ((parseFloat(formatUnits(data.totalBurnedAll, 18)) / parseFloat(formatUnits(data.totalSupply, 18))) * 100).toFixed(2)
    : "0";

  return (
    <div className="min-h-screen" style={{ background: "#0e0e14", color: "#e8e6e3" }}>
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🦞</span>
          <h1 className="text-xl font-bold tracking-tight">CLAWD Dashboard</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">Base</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {lastUpdate && <span>Updated {lastUpdate.toLocaleTimeString()}</span>}
          {DEPLOYERS.map(d => (
            <a key={d.address} href={basescanAddr(d.address)} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              {d.ens ?? d.name} ↗
            </a>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500 text-lg animate-pulse">Loading onchain data…</div>
          </div>
        ) : data ? (
          <>
            {/* ═══ HERO STATS — ROW 1 ═══ */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
              <StatCard label="🔗 Onchain Txs" value={data.totalTxs.toLocaleString()} />
              <StatCard label="🔥 Total Burned" value={fmt(data.totalBurnedAll)} sub={`${burnedPct}% of supply`} accent />
              <StatCard label="💰 USD Burned" value={fmtUsd(parseFloat(formatUnits(data.totalBurnedAll, 18)) * data.clawdPrice)} />
              <StatCard label="📈 CLAWD Price" value={data.clawdPrice > 0 ? `$${data.clawdPrice.toFixed(8)}` : "—"} />
              <StatCard label="🏠 Contracts" value={CONTRACTS_DEPLOYED.toString()} />
            </div>

            {/* ═══ ALL-TIME METRICS — ROW 2 ═══ */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
              <StatCardSmall label="👥 Active Stakers" value={data.totalStakers.toString()} color="text-blue-400" />
              <StatCardSmall label="💡 Ideas Submitted" value={data.labsIdeas.toString()} color="text-purple-400" />
              <StatCardSmall label="🎰 Lucky Bets" value={data.totalBets.toString()} color="text-purple-400" />
              <StatCardSmall label="🖼 NFTs Minted" value={(data.pfpMinted + data.pfpV2Minted + data.tenKMinted).toString()} color="text-blue-400" />
              <StatCardSmall label="🔒 Pending Burn" value={fmt(data.incineratorBalance)} sub="held in Incinerator" color="text-orange-400" />
            </div>

            {/* ═══ SECTION 1: FLAGSHIP APPS ═══ */}
            <SectionHeader emoji="⭐" title="Flagship Apps" sub="The core of the CLAWD ecosystem" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">

              {/* 🔥 Incinerator — featured */}
              <div className="rounded-xl p-6 border border-orange-900/40" style={{ background: "linear-gradient(135deg, #1a0800 0%, #0e0e14 100%)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <span>🔥</span> Incinerator
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-900/60 text-orange-400">ACTIVE</span>
                    </h3>
                    <p className="text-gray-400 mt-1">Massive burn engine — the ecosystem&apos;s #1 burner</p>
                  </div>
                  <a href="https://incinerator.clawdbotatg.eth.link" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors" style={{ background: "#ff6600", color: "#fff" }}>
                    Visit App →
                  </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <MiniStat label="Total Burned" value={fmt(data.incineratorBurned)} accent />
                  <MiniStat label="CLAWD Pending" value={fmt(data.incineratorBalance)} />
                  <MiniStat label="USD Burned" value={fmtUsd(parseFloat(formatUnits(data.incineratorBurned, 18)) * data.clawdPrice)} />
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  <a href={basescanAddr(INCINERATOR)} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 font-mono">
                    {shortAddr(INCINERATOR)} ↗
                  </a>
                </div>
              </div>

              {/* 🎮 ClawFomo — featured, aggregated */}
              <div className="rounded-xl p-6 border border-red-900/40" style={{ background: "linear-gradient(135deg, #1a0a0a 0%, #0e0e14 100%)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <span>🎮</span> ClawFomo
                      {data.fomoActive && <span className="text-xs px-2 py-0.5 rounded-full bg-green-900/60 text-green-400 animate-pulse">LIVE</span>}
                      {!data.fomoActive && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-500">Between rounds</span>}
                    </h3>
                    <p className="text-gray-400 mt-1">Last-bidder-wins — 7 versions, {data.fomoTotalRounds.toString()} rounds</p>
                  </div>
                  <a href="https://clawfomo.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors" style={{ background: "#ff4444", color: "#fff" }}>
                    Play →
                  </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MiniStat label="Total Rounds" value={data.fomoTotalRounds.toString()} />
                  <MiniStat label="CLAWD Burned" value={fmt(data.fomoTotalBurned)} accent />
                  <MiniStat label="Current Pot" value={`${fmt(data.fomoPot)} CLAWD`} />
                  <MiniStat label="USD Burned" value={fmtUsd(parseFloat(formatUnits(data.fomoTotalBurned, 18)) * data.clawdPrice)} />
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  <a href={basescanAddr(CLAWFOMO_VERSIONS[0])} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 font-mono">
                    {shortAddr(CLAWFOMO_VERSIONS[0])} ↗
                  </a>
                  <span className="ml-2 text-gray-700">+ 6 previous versions</span>
                </div>
              </div>

              {/* 🎯 TenTwentyFourX — featured */}
              <div className="rounded-xl p-6 border border-purple-900/40" style={{ background: "linear-gradient(135deg, #150a1a 0%, #0e0e14 100%)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <span>🎯</span> TenTwentyFourX
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-400">2000+ txs</span>
                    </h3>
                    <p className="text-gray-400 mt-1">Click-to-reveal prediction game — 3 versions</p>
                  </div>
                  <a href="https://1024x.fun" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors" style={{ background: "#8b5cf6", color: "#fff" }}>
                    Visit App →
                  </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <MiniStat label="Total Burned" value={fmt(data.tenTwentyFourXBurned)} accent />
                  <MiniStat label="USD Burned" value={fmtUsd(parseFloat(formatUnits(data.tenTwentyFourXBurned, 18)) * data.clawdPrice)} />
                  <MiniStat label="Versions" value="3" />
                </div>
                <div className="mt-3 text-xs text-gray-600">
                  <a href={basescanAddr(TENTWENTYFOURX_VERSIONS[0])} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 font-mono">
                    {shortAddr(TENTWENTYFOURX_VERSIONS[0])} ↗
                  </a>
                </div>
              </div>

              {/* CLAWDlabs */}
              <AppCard
                emoji="🧪" name="CLAWDlabs" desc="Idea staking — submit and back ecosystem ideas"
                address="0xa51fe0491292fbad5caa23f674cd59c1480ec60a"
                site="https://labs.clawdbotatg.eth.link"
                stats={[{ label: "Ideas Submitted", value: data.labsIdeas.toString() }]}
              />

              {/* Liquidity Vesting */}
              <AppCard
                emoji="🔒" name="Liquidity Vesting" desc="WETH+CLAWD locked in Uniswap V3"
                address="0x7916773e871a832ae2b6046b0f964a078dc67ab4"
                site="https://liq.clawdbotatg.eth.link"
                stats={[
                  { label: "Status", value: data.vestLocked ? "🔒 Locked" : "🔓 Unlocked" },
                  { label: "CLAWD Balance", value: fmt(data.vestClawdBal) },
                ]}
              />

              {/* Sponsored 8004 */}
              <AppCard
                emoji="🤖" name="Sponsored 8004" desc="ERC-8004 agent identity registration"
                address=""
                site="https://sponsored-8004-registration-nextjs.vercel.app"
                stats={[]}
              />
            </div>

            {/* ═══ SECTION 2: PRODUCTION APPS ═══ */}
            <SectionHeader emoji="⚡" title="Known Apps" sub="Live contracts with real usage" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              <AppCard emoji="🏦" name="ClawdStake" desc="Stake CLAWD, earn rewards" address={CLAWD_STAKE}
                site="https://stake.clawdbotatg.eth.link"
                stats={[{ label: "Staked", value: fmt(data.stakeTotal) }, { label: "Burned", value: fmt(data.stakeBurned), accent: true }]} />
              <AppCard emoji="🖼" name="ClawdPFPMarket" desc="Profile Pic Prediction Market — 355 txs" address={CLAWD_PFP_MARKET}
                site={`https://basescan.org/address/${CLAWD_PFP_MARKET}`}
                stats={[]} />
              <AppCard emoji="🎰" name="LuckyClick" desc="Luck-based burn game" address={LUCKY_CLICK}
                site="https://luckyclick.clawdbotatg.eth.link"
                stats={[{ label: "Burned", value: fmt(data.luckyClickBurned), accent: true }]} />
              <AppCard emoji="🗼" name="LobsterTower" desc="Stack-and-climb tower game" address={LOBSTER_TOWER}
                site="https://lobsterstack.clawdbotatg.eth.link"
                stats={[{ label: "Burned", value: fmt(data.lobsterTowerBurned), accent: true }]} />
              <AppCard emoji="🏟️" name="Meme Arena" desc="Vote on memes, burn CLAWD" address={MEME_ARENA}
                site={`https://basescan.org/address/${MEME_ARENA}`}
                stats={[{ label: "Burned", value: fmt(data.memeArenaBurned), accent: true }]} />
              <AppCard emoji="🧠" name="ClawdViction" desc="AI conviction governance" address={CLAWD_VICTION}
                site="https://github.com/clawdbotatg/clawdviction"
                stats={[]} />
              <AppCard emoji="🔥" name="Burner" desc="Auto-burns 500K/hour" address="0xe499B193ffD38626D79e526356F3445ce0A943B9" stats={[]} />
              <AppCard emoji="💬" name="Chat" desc="Burn CLAWD to post onchain" address="0x33f97501921e40c56694b259115b89b6a6ee5500"
                site="https://chat.clawdbotatg.eth.link"
                stats={[{ label: "CLAWD Burned", value: fmt(data.chatBurned), accent: true }]} />
              <AppCard emoji="🗳️" name="Vote" desc="Create proposals, stake to vote" address="0xf86D964188115AFc8DBB54d088164f624B916442"
                site="https://vote.clawdbotatg.eth.link"
                stats={[{ label: "Proposals", value: data.voteProposals.toString() }, { label: "Burned", value: fmt(data.voteBurned), accent: true }]} />
              <AppCard emoji="🎨" name="PFP" desc="0.001 ETH mint, 1M CLAWD burned" address="0x0dD551Df233cA7B4CE45e2f4bb17faB3c0b53647"
                site="https://pfp.clawdbotatg.eth.link"
                stats={[{ label: "Minted", value: data.pfpMinted.toString() }, { label: "Burned", value: fmt(data.pfpBurned), accent: true }]} />
              <AppCard emoji="🦞" name="10K" desc="10,000 onchain SVG NFTs" address="0xaA120337233148e6af935069d69eE3AD037eD822"
                stats={[{ label: "Minted", value: data.tenKMinted.toString() }, { label: "Burned", value: fmt(data.tenKBurned), accent: true }]} />
              <AppCard emoji="🏆" name="Meme Contest" desc="Submit memes, vote, win" address="0x716836Ebf9f6E3b18110CCef89E06dD07b8371c6"
                site="https://memecontest.clawdbotatg.eth.link"
                stats={[]} />
            </div>

            {/* ═══ DEPLOYER WALLETS ═══ */}
            <SectionHeader emoji="🔑" title="Deployer Wallets" sub="Every CLAWD contract was deployed from one of these addresses" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {DEPLOYERS.map(d => (
                <a
                  key={d.address}
                  href={`https://basescan.org/address/${d.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-5 border border-gray-800/50 hover:border-gray-600 transition-colors flex flex-col gap-2 group"
                  style={{ background: "#111118" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm group-hover:text-white transition-colors">
                      {d.ens ?? d.name}
                    </span>
                    <span className="text-xs text-gray-600">↗ Basescan</span>
                  </div>
                  <span className="font-mono text-xs text-gray-500 break-all">{d.address}</span>
                  <a
                    href={`https://basescan.org/txs?a=${d.address}&type=2`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-xs text-red-400/70 hover:text-red-400 transition-colors w-fit"
                  >
                    View contract deploys ↗
                  </a>
                </a>
              ))}
            </div>

            {/* ═══ FOOTER ═══ */}
            <div className="border-t border-gray-800 pt-6 mt-6 text-center text-sm text-gray-600 flex flex-col items-center gap-2">
              <div className="flex gap-4">
                <a href="https://clawdbotatg.eth.link" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Homepage</a>
                <a href="https://x.com/clawdbotatg" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">@clawdbotatg</a>
                <a href="https://github.com/clawdbotatg" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">GitHub</a>
                <a href={`https://basescan.org/token/${CLAWD_TOKEN}`} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">$CLAWD</a>
              </div>
              <p>Built by an AI lobster on Base 🦞</p>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 py-20">Failed to load data. Refresh to try again.</div>
        )}
      </main>
    </div>
  );
};

// ─── Components ────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="rounded-xl p-4 border border-gray-800/50" style={{ background: "#111118" }}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${accent ? "text-red-400" : "text-white"}`}>{value}</p>
      {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
    </div>
  );
}

function StatCardSmall({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="rounded-xl p-3 border border-gray-800/30" style={{ background: "#0f0f18" }}>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className={`text-lg font-bold ${color || "text-white"}`}>{value}</p>
      {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
    </div>
  );
}

function MiniStat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-lg font-bold ${accent ? "text-red-400" : "text-white"}`}>{value}</p>
    </div>
  );
}

function AppCard({ emoji, name, desc, address, site, stats }: {
  emoji: string; name: string; desc: string; address: string; site?: string;
  stats: { label: string; value: string; accent?: boolean }[];
}) {
  return (
    <div className="rounded-xl p-5 border border-gray-800/50 hover:border-gray-700 transition-colors" style={{ background: "#111118" }}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-base flex items-center gap-2">
          <span>{emoji}</span> {name}
        </h3>
        <div className="flex gap-2">
          {site && (
            <a href={site} target="_blank" rel="noopener noreferrer"
              className="text-xs px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors">
              Open ↗
            </a>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-3">{desc}</p>
      {stats.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {stats.map(s => (
            <div key={s.label}>
              <span className={`font-bold ${s.accent ? "text-red-400" : ""}`}>{s.value}</span>
              <span className="text-gray-600 text-xs ml-1">{s.label.toLowerCase()}</span>
            </div>
          ))}
        </div>
      )}
      {address && (
        <div className="mt-3 text-xs text-gray-700">
          <a href={basescanAddr(address)} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 font-mono">
            {shortAddr(address)} ↗
          </a>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ emoji, title, sub }: { emoji: string; title: string; sub: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h2>
      <p className="text-sm text-gray-500">{sub}</p>
    </div>
  );
}

export default Home;
