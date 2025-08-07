# KnownBlock

A simple Web3 application for documenting my blockchain projects. KnownBlock gets its name from the immutable nature of blockchain - with each project being deployed as part of a block in the chain, giving a "known block" after which the project exists.

## About

This is a personal portfolio site to track my blockchain development journey and showcase Web3 projects. Each project is listed with the specific block ID it was deployed to, using the permanent record of the blockchain.

## Current Projects

- **[Duplicates](https://duplicates.knownblock.com)** - A simple contract that allows you to "duplicate" any ERC-721 compliant NFT, written in Vyper and deployed on Ethereum Mainnet (Block #23017016)

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Web3**: wagmi, RainbowKit, viem
- **Styling**: Tailwind CSS with terminal-inspired monospace theme
- **Deployment**: Vercel/AWS S3 (serverless)

## Features

- 🔗 Wallet connection with RainbowKit
- 📝 Project documentation with blockchain deployment details
- 🎨 Minimalist terminal aesthetic
- 📱 Responsive design
- 🚀 Static site generation for fast loading

## Getting Started

First, set up your environment variables:

```bash
mv example.env.local .env.local
# Edit .env.local and add your WalletConnect Project ID
```

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Your WalletConnect Project ID (get one at [walletconnect.com](https://walletconnect.com))

## Project Structure

```
src/
├── app/
│   ├── about/          # About page with project details
│   ├── components/     # Reusable components
│   │   ├── ClientProviders.tsx
│   │   └── Header.tsx
│   ├── config.ts       # wagmi configuration
│   ├── globals.css     # Global styles
│   └── layout.tsx      # Root layout
└── ...
```

## Deployment

This site is optimized for static deployment on Vercel or AWS S3. The hydration issues common with Web3 apps have been resolved using proper client/server separation.

## Contact

Find me on X (Twitter): [@eastftw](https://x.com/eastftw)
