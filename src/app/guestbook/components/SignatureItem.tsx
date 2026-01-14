'use client';

import { Signature } from '../lib/subgraph';
import { mainnet, base, arbitrum } from 'wagmi/chains';

interface SignatureItemProps {
  signature: Signature;
}

// Helper to get block explorer URL for an address
function getExplorerUrl(address: string, chainId: string): string {
  const id = parseInt(chainId);

  if (id === mainnet.id) {
    return `https://etherscan.io/address/${address}`;
  } else if (id === base.id) {
    return `https://basescan.org/address/${address}`;
  } else if (id === arbitrum.id) {
    return `https://arbiscan.io/address/${address}`;
  }

  return '#';
}

// Helper to format timestamp as relative time
function formatTimestamp(timestamp: string): string {
  const ts = parseInt(timestamp);

  // Validate timestamp is reasonable (between 2020 and 2050)
  const minTs = 1577836800; // 2020-01-01
  const maxTs = 2524608000; // 2050-01-01

  if (isNaN(ts) || ts < minTs || ts > maxTs) {
    return 'Invalid date';
  }

  const date = new Date(ts * 1000);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}

// Helper to get chain name from source chain ID
function getChainName(chainId: string): string {
  const id = parseInt(chainId);

  if (id === mainnet.id) return 'Ethereum';
  if (id === base.id) return 'Base';
  if (id === arbitrum.id) return 'Arbitrum';

  return `Chain ${chainId}`;
}

export function SignatureItem({ signature }: SignatureItemProps) {
  const explorerUrl = getExplorerUrl(signature.signer, signature.sourceChainId);
  const timeAgo = formatTimestamp(signature.timestamp);
  const sourceChain = getChainName(signature.sourceChainId);

  return (
    <div className="p-4 border border-border">
      {/* Header: Name and Timestamp */}
      <div className="flex justify-between items-start mb-2">
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline font-bold"
        >
          {signature.name}
        </a>
        <span className="text-xs text-gray-600">{timeAgo}</span>
      </div>

      {/* Message */}
      <p className="text-sm mb-2 whitespace-pre-wrap break-words">
        {signature.message}
      </p>

      {/* Footer: Source Chain and Address */}
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>
          from <span className="font-bold">{sourceChain}</span>
        </span>
        <span className="font-mono">
          {signature.signer.slice(0, 6)}...{signature.signer.slice(-4)}
        </span>
      </div>
    </div>
  );
}
