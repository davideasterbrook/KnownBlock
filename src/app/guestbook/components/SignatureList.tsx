'use client';

import { useQueries } from '@tanstack/react-query';
import { fetchSignatures } from '../lib/subgraph';
import { SignatureItem } from './SignatureItem';
import { Signature } from '../lib/subgraph';

interface SignatureListProps {
  chainIds: number[];
}

export function SignatureList({ chainIds }: SignatureListProps) {
  // Fetch signatures from all selected chains
  const queries = useQueries({
    queries: chainIds.map((chainId) => ({
      queryKey: ['signatures', chainId],
      queryFn: () => fetchSignatures(chainId, 100, 0),
      refetchInterval: 10000, // Refetch every 10 seconds for new signatures
      staleTime: 5000, // Consider data stale after 5 seconds
    })),
  });

  const isLoading = queries.some((q) => q.isLoading);
  const hasError = queries.some((q) => q.error);
  const errors = queries.filter((q) => q.error).map((q) => q.error);

  // Merge and sort signatures from all chains by timestamp
  const allSignatures: Signature[] = queries
    .flatMap((q) => q.data || [])
    .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));

  if (chainIds.length === 0) {
    return (
      <div className="text-sm text-gray-600">
        Select at least one chain to view signatures
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-sm text-gray-600">
        Loading signatures...
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-red-600">
          Error loading signatures: {(errors[0] as Error).message}
        </p>
        <button
          onClick={() => queries.forEach((q) => q.refetch())}
          className="text-sm underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (allSignatures.length === 0) {
    return (
      <div className="text-sm text-gray-600">
        No signatures yet. Be the first to sign!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allSignatures.map((signature) => (
        <SignatureItem key={signature.id} signature={signature} />
      ))}
    </div>
  );
}
