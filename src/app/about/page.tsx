import Link from 'next/link';

export default function About() {
  return (
    <div className="mx-auto">
      <div className="p-8 border border-border">
        <h1 className="text-3xl font-bold mb-6">About</h1>
        <p className="mb-4">
          Here I will talk through my history, my blockchain journey, and my projects.
        </p>
        <p className="mb-4">
          You can find me on X (Twitter) at <Link href="https://x.com/eastftw" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">@eastftw</Link>.
        </p>
        <p className="text-sm opacity-75">
          This page will be populated with more information on an ad-hoc basis.
        </p>
      </div>
      <div className="mt-8 p-6 border border-border">
        <h2 id="duplicates" className="text-xl font-bold">
          <a href="#duplicates" className="hover:underline">Duplicates</a>
        </h2>
        
        <p className='mb-4'>Block ID: <Link href="https://etherscan.io/block/23017016" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">23017016</Link></p>
        <p className='mb-4'>
          Duplicates App Page: <Link href="https://duplicates.knownblock.com" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">duplicates.knownblock.com</Link>
        </p>  
        <div className="space-y-1 text-sm">
          <p>
            Duplicates is my first project. It is a simple contract that allows you to &quot;duplicate&quot; any ERC-721 compliant NFT written in Vyper.
          </p>
          <p>
            Users provide the contract address and the token ID of the NFT collection they want to duplicate.
          </p>
          <p>
            The contract will then mint a new NFT pointing to the original NFT&apos;s metadata, essentially creating a perfect duplicate.
          </p>
          <p className='mt-4'>
            The contract can be found on Github <Link href="https://github.com/davideasterbrook/duplicates-contract" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">here</Link> and the frontend can be found <Link href="https://github.com/davideasterbrook/duplicates-frontend" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">here</Link>.
          </p>
        </div>
      </div>
      <div className="mt-8 p-6 border border-border">
        <h2 id="guestbook" className="text-xl font-bold">
          <a href="#guestbook" className="hover:underline">Guestbook</a>
        </h2>
        
        <p className='mb-4'>Block ID: <Link href="https://etherscan.io/block/23017016" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">23017016</Link></p>
        <p className='mb-4'>
          Guestbook App Page: <Link href="/guestbook" className="text-gray-600 underline">knownblock.com/guestbook</Link>
        </p>
        
        <div className="space-y-1 text-sm">
          <p>
            Guestbook is collection of contracts that allows a user to sign a guestbook with a message and name.
          </p>
          <p>
            Users provide the contract with a message and their name. This creates a signature object with the id, signer, sourceChainId, name, message, and timestamp. An event is emitted for each signature using LayerZero to share the signature across multiple chains.
          </p>
          <p>
            Using a third party service (such as Graph), you can view all the signatures on the guestbook.
          </p>
          <p className='mt-4'>
            The contract can be found on Github <Link href="https://github.com/davideasterbrook/guestbook-contract" className="text-gray-600 underline" target="_blank" rel="noopener noreferrer">here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}