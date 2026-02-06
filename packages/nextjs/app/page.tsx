"use client";

import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { formatUnits } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const CLAWD_TOKEN = "0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07";
const DEAD = "0x000000000000000000000000000000000000dEaD";

const formatClawd = (v: bigint | undefined): string => {
  if (!v) return "0";
  const n = parseFloat(formatUnits(v, 18));
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
};

const apps = [
  {
    name: "🔥 CLAWD Burner",
    desc: "Auto-burns 500K/hour, 5K caller reward",
    contract: "0xe499B193ffD38626D79e526356F3445ce0A943B9",
    github: "clawdbotatg/clawd-burner",
    ipfs: "bafybeiapxjiqph4nge4dgasu37jhmxvjaae7b2v74g2ui6tdf25h4wjvou",
    contractName: "CLAWDBurner" as const,
    burnField: "totalBurned",
    statFields: [{ label: "Total Burns", field: "totalBurns" }],
  },
  {
    name: "💬 CLAWD Chat",
    desc: "Burn 10K to post onchain messages",
    contract: "0x33f97501921e40c56694b259115b89b6a6ee5500",
    github: "clawdbotatg/clawd-chatroom",
    ipfs: "bafybeienfkhznrbivegaqzjksjpvk5gxg2idi6uh7dqay2jsvl7b5pb7ee",
    contractName: "CLAWDChat" as const,
    burnField: "totalBurned",
    statFields: [{ label: "Total Posts", field: "totalPosts" }],
  },
  {
    name: "🗳️ CLAWD Vote",
    desc: "Create proposals (50K burn), stake to vote",
    contract: "0xf86D964188115AFc8DBB54d088164f624B916442",
    github: "clawdbotatg/clawd-vote",
    ipfs: "bafybeieogrr6jvq57neruu4syxa4puvdwnr4cftimyreagwp3b63wlppvy",
    contractName: "CLAWDVote" as const,
    burnField: "totalBurned",
    statFields: [{ label: "Proposals", field: "nextProposalId" }],
  },
  {
    name: "🎨 CLAWD PFP",
    desc: "0.001 ETH mint, 1M CLAWD burned per mint",
    contract: "0x0dD551Df233cA7B4CE45e2f4bb17faB3c0b53647",
    github: "clawdbotatg/clawd-pfp",
    ipfs: "bafybeif7ltdiflps3cdchomhkbd6buafovei322ny7lro6qruhd2yeovgi",
    contractName: "CLAWDPFP" as const,
    burnField: "totalClawdBurned",
    statFields: [{ label: "Minted", field: "totalMinted" }],
  },
  {
    name: "🦞 CLAWD 10K",
    desc: "10K onchain SVG NFTs, 100K CLAWD per mint",
    contract: "0xaA120337233148e6af935069d69eE3AD037eD822",
    github: "clawdbotatg/clawd-10k",
    ipfs: "bafybeigqtny6ykugsk7qpnoccevagxekma4jce2zpwirn7vn2usimx66uu",
    contractName: "CLAWD10K" as const,
    burnField: "totalBurned",
    statFields: [{ label: "Minted", field: "totalMinted" }],
  },
];

const AppCard = ({ app }: { app: typeof apps[0] }) => {
  const { data: burned } = useScaffoldReadContract({
    contractName: app.contractName,
    functionName: app.burnField as any,
  });
  const stat0 = app.statFields[0];
  const { data: statVal } = useScaffoldReadContract({
    contractName: app.contractName,
    functionName: stat0.field as any,
  });

  return (
    <div className="bg-base-200 rounded-2xl p-5 hover:bg-base-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">{app.name}</h3>
        <a
          href={`https://basescan.org/address/${app.contract}`}
          target="_blank"
          rel="noopener noreferrer"
          className="badge badge-ghost text-xs"
        >
          {app.contract.slice(0, 6)}...{app.contract.slice(-4)}
        </a>
      </div>
      <p className="text-sm opacity-60 mb-3">{app.desc}</p>
      <div className="flex gap-4 text-sm">
        <div>
          <span className="text-error font-bold">🔥 {formatClawd(burned as bigint)}</span>
          <span className="opacity-40 ml-1">burned</span>
        </div>
        <div>
          <span className="font-bold">{(statVal as bigint)?.toString() || "0"}</span>
          <span className="opacity-40 ml-1">{stat0.label.toLowerCase()}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <a
          href={`https://community.bgipfs.com/ipfs/${app.ipfs}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-xs"
        >
          Launch App
        </a>
        <a
          href={`https://github.com/${app.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-xs"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [clawdPrice, setClawdPrice] = useState(0);
  const [marketCap, setMarketCap] = useState(0);

  const { data: deadBalance } = useScaffoldReadContract({ contractName: "CLAWD", functionName: "balanceOf", args: [DEAD] });
  const { data: totalSupply } = useScaffoldReadContract({ contractName: "CLAWD", functionName: "totalSupply" });

  useEffect(() => {
    const f = async () => {
      try {
        const r = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CLAWD_TOKEN}`);
        const d = await r.json();
        if (d.pairs?.[0]) {
          setClawdPrice(parseFloat(d.pairs[0].priceUsd || "0"));
          setMarketCap(parseFloat(d.pairs[0].fdv || "0"));
        }
      } catch {}
    };
    f();
    const i = setInterval(f, 60000);
    return () => clearInterval(i);
  }, []);

  const burnedPct = deadBalance && totalSupply && totalSupply > 0n
    ? ((parseFloat(formatUnits(deadBalance, 18)) / parseFloat(formatUnits(totalSupply, 18))) * 100).toFixed(2)
    : "0";

  const toUsd = (v: bigint | undefined) => {
    if (!v || !clawdPrice) return "";
    const usd = parseFloat(formatUnits(v, 18)) * clawdPrice;
    if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(2)}M`;
    if (usd >= 1_000) return `$${(usd / 1_000).toFixed(1)}K`;
    return `$${usd.toFixed(2)}`;
  };

  return (
    <div className="flex flex-col items-center grow pt-6 px-4 pb-12">
      <div className="w-full max-w-4xl">

        {/* Hero */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🤖 CLAWD Ecosystem</h1>
          <p className="text-lg opacity-60">Onchain apps built by an AI agent. Deflationary by design.</p>
        </div>

        {/* Global stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-base-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{apps.length}</p>
            <p className="text-xs opacity-60">Apps Live</p>
          </div>
          <div className="bg-base-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-error">{formatClawd(deadBalance)}</p>
            <p className="text-xs opacity-60">Total Burned ({burnedPct}%)</p>
          </div>
          <div className="bg-base-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{marketCap > 0 ? `$${(marketCap / 1_000_000).toFixed(2)}M` : "..."}</p>
            <p className="text-xs opacity-60">FDV</p>
          </div>
          <div className="bg-base-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{deadBalance ? toUsd(deadBalance) : "..."}</p>
            <p className="text-xs opacity-60">USD Burned</p>
          </div>
        </div>

        {/* Apps grid */}
        <h2 className="font-bold text-xl mb-4">Live Apps on Base</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {apps.map(app => (
            <AppCard key={app.contract} app={app} />
          ))}
        </div>

        {/* Token info */}
        <div className="bg-base-200 rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-3">$CLAWD Token</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="opacity-60">Contract:</span>
              <a href={`https://basescan.org/token/${CLAWD_TOKEN}`} target="_blank" rel="noopener noreferrer" className="ml-2 link">
                {CLAWD_TOKEN.slice(0, 10)}...
              </a>
            </div>
            <div>
              <span className="opacity-60">Chain:</span>
              <span className="ml-2">Base</span>
            </div>
            <div>
              <span className="opacity-60">Price:</span>
              <span className="ml-2">{clawdPrice > 0 ? `$${clawdPrice.toFixed(8)}` : "..."}</span>
            </div>
            <div>
              <span className="opacity-60">Supply:</span>
              <span className="ml-2">{formatClawd(totalSupply)}</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <a href="https://clawdbotatg.eth.limo" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Homepage</a>
            <a href="https://x.com/clawdbotatg" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">@clawdbotatg</a>
            <a href="https://github.com/clawdbotatg" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
