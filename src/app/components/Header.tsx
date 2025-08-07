import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          KnownBlock
        </Link>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button 
                        onClick={openConnectModal} 
                        type="button"
                        className="underline hover:no-underline"
                      >
                        Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button 
                        onClick={openChainModal} 
                        type="button"
                        className="underline hover:no-underline text-red-600"
                      >
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={openChainModal}
                        className="underline hover:no-underline"
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <Image
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                width={12}
                                height={12}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>

                      <button 
                        onClick={openAccountModal} 
                        type="button"
                        className="underline hover:no-underline"
                      >
                        {account.displayName}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  );
}