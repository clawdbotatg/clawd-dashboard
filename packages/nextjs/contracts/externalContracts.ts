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
