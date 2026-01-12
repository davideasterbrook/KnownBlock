import Link from 'next/link';

export default function Home() {
  return (
    <div className="mx-auto">
      <div className="p-8 border border-border">
        <h1 className="text-3xl font-bold mb-6">Welcome</h1>
        <p className="mb-6 text-base">
          This is a simple page for documenting my blockchain projects. 
        </p>
        <p className="mb-6 text-base">
          KnownBlock gets its name from the immutable nature of blockchain with each project being deployed as part of a block in the chain.
          This gives a known block after which the project exists.
          Each project will be listed with the block ID it was deployed to.
        </p>
        <div className="space-y-2">
          <p>→ Connect your wallet using the button in the header and sign the guestbook (coming soon).</p>
          <p>→ Visit the <Link href="/about" className="underline">About page</Link> for more information about me and my projects.</p>
        </div>
      </div>
      
      <div className="mt-8 p-6 border border-border">
        <h2 className="text-xl font-bold mb-4">Known Projects</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-2">Project</th>
              <th className="text-left pb-2">Chain</th>
              <th className="text-left pb-2">Block ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1">• <Link href="https://duplicates.knownblock.com" className="underline" target="_blank" rel="noopener noreferrer">Duplicates</Link></td>
              <td className="py-1 text-gray-600">Ethereum Mainnet</td>
              <td className="py-1"><Link href="https://etherscan.io/block/23017016" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">23017016</Link></td>
            </tr>
            <tr>
              <td rowSpan={3} className="py-1 pt-4 align-top">• <Link href="https://guestbook.knownblock.com" className="underline" target="_blank" rel="noopener noreferrer">Guestbook</Link></td>
              <td className="py-0.25 pt-4 text-gray-600">Ethereum Mainnet</td>
              <td className="py-0.25 pt-4"><Link href="https://etherscan.io/block/23970198" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">23970198</Link></td>
            </tr>
            <tr>
              <td className="py-0.25 text-gray-600">Base</td>
              <td className="py-0.25"><Link href="https://basescan.org/block/39216561" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">39216561</Link></td>
            </tr>
            <tr>
              <td className="py-0.25 text-gray-600">Arbitrum</td>
              <td className="py-0.25"><Link href="https://arbiscan.io/block/408571892" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">408571892</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8 p-6 border border-border">
        <h2 className="text-xl font-bold mb-4">Future Work</h2>
        <div className="space-y-1 text-sm">
          <p>• ████████████</p>
          <p>• ██████████</p>
          <p>• ████████████</p>
        </div>
      </div>
    </div>
  );
}
