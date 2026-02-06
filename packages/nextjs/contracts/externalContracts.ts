import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const ERC20_ABI = [
  { type: "function", name: "balanceOf", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalSupply", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "decimals", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint8" }] },
] as const;

const BURNER_ABI = [
  { type: "function", name: "totalBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "burnAmount", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "burnInterval", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "callerReward", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalBurns", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

const CHAT_ABI = [
  { type: "function", name: "totalPosts", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "postCost", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

const VOTE_ABI = [
  { type: "function", name: "nextProposalId", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "proposalCost", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

const PFP_ABI = [
  { type: "function", name: "totalMinted", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalClawdBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "maxSupply", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "mintPrice", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

const TEN_K_ABI = [
  { type: "function", name: "totalMinted", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalBurned", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "mintPrice", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "remainingSupply", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
] as const;

const externalContracts = {
  8453: {
    CLAWD: {
      address: "0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07",
      abi: ERC20_ABI,
    },
    CLAWDBurner: {
      address: "0xe499B193ffD38626D79e526356F3445ce0A943B9",
      abi: BURNER_ABI,
    },
    CLAWDChat: {
      address: "0x33f97501921e40c56694b259115b89b6a6ee5500",
      abi: CHAT_ABI,
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
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
