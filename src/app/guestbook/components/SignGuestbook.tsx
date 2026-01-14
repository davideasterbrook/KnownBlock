'use client';

import { useState, useEffect } from 'react';
import { useAccount, useChainId, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { GUESTBOOK_ABI, getGuestbookAddress } from '../lib/contracts';
import { mainnet, base, arbitrum } from 'wagmi/chains';

export function SignGuestbook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { writeContract, data: hash, error: writeError, isPending, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Check if current chain is supported
  const supportedChainIds = [mainnet.id, base.id, arbitrum.id] as const;
  const isSupported = (supportedChainIds as readonly number[]).includes(chainId);
  const contractAddress = getGuestbookAddress(chainId);

  // LayerZero options for 50000 gas
  const lzOptions = '0x0003010011010000000000000000000000000000c350' as `0x${string}`;

  // Get the LayerZero fee quote (but don't display it)
  const { data: feeQuote } = useReadContract({
    address: contractAddress,
    abi: GUESTBOOK_ABI,
    functionName: 'quoteBroadcast',
    args: [
      address || '0x0000000000000000000000000000000000000000',
      name.trim() || 'placeholder',
      message.trim() || 'placeholder',
      lzOptions,
    ],
    query: {
      enabled: isConnected && isSupported && !!contractAddress && !!name.trim() && !!message.trim(),
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      return; // Empty input
    }

    if (trimmedName.length < 2) {
      return; // Name too short
    }

    if (trimmedMessage.length < 5) {
      return; // Message too short
    }

    if (!contractAddress) {
      return; // Should not happen if chain check works
    }

    // Call signGuestbook function with LayerZero options and exact fee
    writeContract({
      address: contractAddress,
      abi: GUESTBOOK_ABI,
      functionName: 'signGuestbook',
      args: [trimmedName, trimmedMessage, lzOptions],
      value: feeQuote as bigint, // Send the exact LayerZero fee
    });
  };

  // Reset form on success
  useEffect(() => {
    if (isSuccess) {
      setName('');
      setMessage('');
      // Reset the write state after a delay
      const timer = setTimeout(() => {
        reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, reset]);

  return (
    <div>
      {!isConnected ? (
        <p className="text-sm text-gray-600">
          Connect your wallet to sign the guestbook
        </p>
      ) : !isSupported ? (
        <p className="text-sm text-red-600">
          Please switch to Ethereum, Base, or Arbitrum to sign
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              className="w-full px-3 py-2 border border-border bg-background font-mono text-sm focus:outline-none focus:border-foreground"
              placeholder="Your name"
              disabled={isPending || isConfirming}
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-sm mb-1">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border bg-background font-mono text-sm focus:outline-none focus:border-foreground resize-none"
              placeholder="Leave a message..."
              disabled={isPending || isConfirming}
            />
            <div className="mt-1 space-y-1">
              <p className="text-xs text-gray-600">
                {message.length} characters
              </p>
              {message.length > 280 && (
                <p className="text-xs text-yellow-600">
                  ⚠ Longer messages cost more gas
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending || isConfirming || !name.trim() || !message.trim() || !feeQuote}
            className="underline hover:no-underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Confirm in wallet...' : isConfirming ? 'Signing...' : 'Sign Guestbook'}
          </button>

          {/* Transaction States */}
          {writeError && (
            <p className="text-sm text-red-600">
              Error: {writeError.message.split('\n')[0]}
            </p>
          )}

          {isSuccess && (
            <p className="text-sm text-green-600">
              Signature recorded! Transaction: {hash?.slice(0, 10)}...
            </p>
          )}
        </form>
      )}
    </div>
  );
}
