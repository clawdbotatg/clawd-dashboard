import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const ERC20_ABI = [
  { type: "function", name: "balanceOf", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalSupply", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "decimals", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint8" }] },
] as const;

const CLAWDFOMO_ABI = [
  { type: "function", name: "currentRound", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "getRoundCount", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "getRoundInfo", stateMutability: "view", inputs: [], outputs: [
    { name: "round", type: "uint256" },
    { name: "pot", type: "uint256" },
    { name: "keyPrice", type: "uint256" },
    { name: "endTime", type: "uint256" },
    { name: "lastBidder", type: "address" },
    { name: "totalKeys", type: "uint256" },
    { name: "active", type: "bool" },
  ] },
  { type: "function", name: "paused", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "bool" }] },
] as const;

const TOTAL_BURNED_ABI = [
  { type: "function", name: "totalBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

const VOTE_ABI = [
  { type: "function", name: "nextProposalId", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

const PFP_ABI = [
  { type: "function", name: "totalMinted", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalClawdBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

const TEN_K_ABI = [
  { type: "function", name: "totalMinted", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

const VESTING_ABI = [
  { type: "function", name: "isLocked", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "bool" }] },
] as const;

const STAKE_ABI = [
  { type: "function", name: "totalBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalStaked", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

const externalContracts = {
  8453: {
    CLAWD: {
      address: "0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07",
      abi: ERC20_ABI,
    },
    ClawFomo: {
      address: "0x859E5CB97E1Cf357643A6633D5bEC6d45e44cFD4",
      abi: CLAWDFOMO_ABI,
    },
    Incinerator: {
      address: "0x536453350f2eee2eb8bfee1866baf4fca494a092",
      abi: TOTAL_BURNED_ABI,
    },
    TenTwentyFourX: {
      address: "0xaa7466fa805e59f06c83befb2b4e256a9b246b04",
      abi: TOTAL_BURNED_ABI,
    },
    ClawdStake: {
      address: "0x90552946edd5a6bad7647655da6c805a188dfd25",
      abi: STAKE_ABI,
    },
    LuckyClick: {
      address: "0x1062eace4f3083c164796b9b2649ce6c25acebe6",
      abi: TOTAL_BURNED_ABI,
    },
    LobsterTower: {
      address: "0x8d3547c0336149a1592472ac8d5c07c52865f801",
      abi: TOTAL_BURNED_ABI,
    },
    MemeArena: {
      address: "0x3371976d639a383bcfe6ac7c304602ac34351b53",
      abi: TOTAL_BURNED_ABI,
    },
    CLAWDVote: {
      address: "0xf86D964188115AFc8DBB54d088164f624B916442",
      abi: VOTE_ABI,
    },
    CLAWDPFP: {
      address: "0x0dD551Df233cA7B4CE45e2f4bb17faB3c0b53647",
      abi: PFP_ABI,
    },
    CLAWD10K: {
      address: "0xaA120337233148e6af935069d69eE3AD037eD822",
      abi: TEN_K_ABI,
    },
    LiquidityVesting: {
      address: "0x7916773e871a832ae2b6046b0f964a078dc67ab4",
      abi: VESTING_ABI,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
