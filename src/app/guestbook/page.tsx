'use client';

import { useState } from 'react';
import { SignGuestbook } from './components/SignGuestbook';
import { SignatureList } from './components/SignatureList';
import { mainnet, base, arbitrum } from 'wagmi/chains';

export default function Guestbook() {
  // Tab state - which chain's signatures to display
  const chains = [
    { id: mainnet.id, name: 'Ethereum' },
    { id: base.id, name: 'Base' },
    { id: arbitrum.id, name: 'Arbitrum' },
  ];

  const [selectedChainId, setSelectedChainId] = useState<number>(mainnet.id);

  return (
    <div className="mx-auto">
      {/* Sign Guestbook Section */}
      <div className="p-8 border border-border">
        <h1 className="text-3xl font-bold mb-6">Guestbook</h1>
        <SignGuestbook />
      </div>

      {/* Signatures Section */}
      <div className="mt-8 p-8 border border-border">
        <h2 className="text-xl font-bold mb-4">Signatures</h2>
        <p className="text-xs text-gray-600 mb-4">
          Signatures are replicated across all chains via LayerZero. Each tab shows the on-chain data for that network.
        </p>

        {/* Chain Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-border pb-2">
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => setSelectedChainId(chain.id)}
              className={
                selectedChainId === chain.id
                  ? 'underline font-bold'
                  : 'hover:underline'
              }
            >
              {chain.name}
            </button>
          ))}
        </div>

        {/* Signature List */}
        <SignatureList chainIds={[selectedChainId]} />
      </div>
    </div>
  );
}
