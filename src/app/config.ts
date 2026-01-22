import { http } from 'wagmi';
import { mainnet, base, arbitrum } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

export const getConfig = () => getDefaultConfig({
  appName: 'KnownBlock',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, base, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [arbitrum.id]: http(),
  },
});