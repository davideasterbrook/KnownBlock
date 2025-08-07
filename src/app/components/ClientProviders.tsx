'use client';

import { useState, useEffect } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { getConfig } from '../config';
import Header from './Header';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());
  const [config, setConfig] = useState<ReturnType<typeof getConfig> | null>(null);

  useEffect(() => {
    setMounted(true);
    setConfig(getConfig());
  }, []);

  if (!mounted || !config) {
    return (
      <>
        <header className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold">KnownBlock</div>
            <div className="underline">Connect Wallet</div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}