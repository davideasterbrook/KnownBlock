import { mainnet, base, arbitrum } from 'wagmi/chains';

// Subgraph endpoints - will be provided by user and added to .env.local
// TODO: Add these to .env.local:
// NEXT_PUBLIC_SUBGRAPH_MAINNET_URL=https://...
// NEXT_PUBLIC_SUBGRAPH_BASE_URL=https://...
// NEXT_PUBLIC_SUBGRAPH_ARBITRUM_URL=https://...

export const SUBGRAPH_ENDPOINTS = {
  [mainnet.id]: process.env.NEXT_PUBLIC_SUBGRAPH_MAINNET_URL || '',
  [base.id]: process.env.NEXT_PUBLIC_SUBGRAPH_BASE_URL || '',
  [arbitrum.id]: process.env.NEXT_PUBLIC_SUBGRAPH_ARBITRUM_URL || '',
} as const;

// TypeScript interface for signature data from subgraph
export interface Signature {
  id: string; // GraphQL ID
  signer: string; // Address
  sourceChainId: string; // Chain ID as string from subgraph
  name: string;
  message: string;
  timestamp: string; // BigInt as string from subgraph
}

// GraphQL query to fetch signatures
// Orders by timestamp descending (most recent first)
export const GET_SIGNATURES_QUERY = `
  query GetSignatures($first: Int!, $skip: Int!) {
    signedGuestbooks(
      first: $first
      skip: $skip
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      signer
      sourceChainId
      name
      message
      timestamp
    }
  }
`;

// Fetch function using native fetch
export async function fetchSignatures(
  chainId: number,
  first: number = 100,
  skip: number = 0
): Promise<Signature[]> {
  const endpoint = SUBGRAPH_ENDPOINTS[chainId as keyof typeof SUBGRAPH_ENDPOINTS];

  if (!endpoint) {
    throw new Error(`No subgraph endpoint configured for chain ${chainId}`);
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_SIGNATURES_QUERY,
        variables: { first, skip },
      }),
    });

    if (!response.ok) {
      throw new Error(`Subgraph request failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`Subgraph errors: ${JSON.stringify(data.errors)}`);
    }

    return data.data.signedGuestbooks || [];
  } catch (error) {
    console.error('Error fetching signatures:', error);
    throw error;
  }
}
