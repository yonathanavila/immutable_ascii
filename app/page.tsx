// app/page.tsx
"use client";

import React, { useState } from "react";
import {
  useConnection,
  useConnect,
  useDisconnect,
  useWriteContract,
} from "wagmi";

// Mock ABI for an ERC721 Mint function
const NFT_ABI = [
  {
    type: "function",
    name: "mint",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

const CONTRACT_ADDRESS = "0x5952a90311e8031B49e611E3bf91af4e7738D1e2";

export default function MintPage() {
  const { address, isConnected } = useConnection();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, isPending } = useWriteContract();

  // 3D Card Hover Effect State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    // Reverse values to match natural tilting directions
    setRotateX(-y / 10);
    setRotateY(x / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleMint = () => {
    if (!isConnected) return;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: NFT_ABI,
      functionName: "mint",
      args: [],
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-6">
      {/* Navbar Header */}
      <header className="w-full max-w-5xl flex justify-between items-center py-4 border-b border-slate-800">
        <h1 className="text-2xl font-black tracking-wider bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          IMMUNABLE ASCII NFT
        </h1>

        <div>
          {isConnected ? (
            <div className="flex items-center gap-4">
              <span className="badge badge-info badge-outline p-4 font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="btn btn-error btn-sm btn-outline"
              >
                Disconnect
              </button>
            </div>
          ) : (
            connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="btn btn-primary"
              >
                Connect Wallet
              </button>
            ))
          )}
        </div>
      </header>

      {/* Hero Display section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center gap-16 max-w-5xl w-full my-12">
        {/* Left: 3D Hover Card */}
        <div
          className="relative w-80 h-auto rounded-2xl bg-slate-900 border border-slate-800 p-4 transition-transform duration-150 ease-out shadow-2xl"
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-72 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden flex items-center justify-center relative">
            {/* Visual placeholder inside card */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xs" />
            <div className="z-10 text-center font-bold text-lg tracking-widest text-white drop-shadow-md">
              IMMUTABLE ASCII NFT #001
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <h3 className="font-bold text-xl">IMMUTABLE ASCII</h3>
            <p className="text-sm text-slate-400">
              For God so loved the world that he gave his one and only Son, that
              whoever believes in him shall not perish but have eternal life.
              John 3:16.
            </p>
          </div>
        </div>

        {/* Right: Mint Control Interface */}
        <div className="space-y-6 max-w-sm text-center md:text-left">
          <div className="space-y-2">
            <div className="badge badge-secondary font-semibold">
              Live Free Mint
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              Claim for free your Immutable ASCII Token
            </h2>
            <p className="text-slate-400 text-sm">
              Connect via Coinbase Developer Platform Smart Wallets to enjoy
              gasless, quick one-click signing deployment.
            </p>
          </div>

          <div className="stats bg-slate-900 border border-slate-800 w-full shadow-md p-3 rounded-3xl">
            <div className="stat">
              <div className="stat-title text-slate-400">Price</div>
              <div className="stat-value text-2xl">FREE</div>
            </div>
            <div className="stat">
              <div className="stat-title text-slate-400">Network</div>
              <div className="stat-value text-2xl text-blue-400">Base</div>
            </div>
          </div>

          {/* Mint Button with Neon Glowing Aura Effect */}
          <div className="relative group aura">
            {/* The Aura Layer */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            <button
              onClick={handleMint}
              disabled={!isConnected || isPending}
              className="relative w-full btn btn-lg bg-slate-950 border border-slate-800 hover:bg-slate-900 text-white font-bold tracking-wide  disabled:bg-slate-800 disabled:text-slate-500"
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : !isConnected ? (
                "Connect Wallet to Mint"
              ) : (
                "MINT NFT"
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Footer footer */}
      <footer className="text-xs text-slate-600 font-mono py-4">
        Powered by Coinbase Smart Wallet & daisyUI
      </footer>
    </main>
  );
}
