// src/wallet.js
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { reactive } from 'vue';

const network = WalletAdapterNetwork.Devnet;
const endpoint = clusterApiUrl(network);

const wallets = reactive([
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
]);

const connection = new Connection(endpoint);

export default {
    wallets,
    connection,
};
