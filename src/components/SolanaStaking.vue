<template>
  <div>
    <h2>Stake SOL</h2>
    <div v-if="connected">
      <input
        v-model="amount"
        type="number"
        placeholder="Amount of SOL to stake"
        min="0"
        step="0.01"
      />
      <button @click="stakeSol">Stake</button>
    </div>
    <div v-else>
      <p>Please connect your wallet.</p>
    </div>
    <p v-if="message">{{ message }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Connection, PublicKey, Transaction, TransactionInstruction, clusterApiUrl } from '@solana/web3.js';
import walletStore from '../wallet';

export default {
  name: 'SolanaStaking',
  setup() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const amount = ref(0);
    const stakerPublicKey = ref(null);
    const connected = ref(false);
    const message = ref(null);
    const error = ref(null);
    
    // Replace with your actual program ID
    const programId = new PublicKey("2tiBrgRQfBf9JDZ3yTjXhnBjYXDAybhrrTkLfjSVDCSc"); // Update this with your program's public key
    const recipientAccount = new PublicKey("7NoLAnd1WAeeZxJMkiQfwx16nBC1XWo8as8s381pLKGX");

    const stakeSol = async () => {
      try {
        if (!stakerPublicKey.value) {
          throw new Error("Wallet not connected");
        }

        // Create staking instruction
        const stakingInstruction = new TransactionInstruction({
          programId: programId,
          keys: [
            { pubkey: stakerPublicKey.value, isSigner: true, isWritable: true },
            { pubkey: recipientAccount, isSigner: false, isWritable: true },
          ],
          data: Buffer.from(Uint8Array.of(0, ...new Uint8Array(new Float32Array([amount.value]).buffer))), // Example data to send
        });

        const { blockhash } = await connection.getLatestBlockhash();

        // Create the transaction
        const transaction = new Transaction();
        transaction.add(stakingInstruction);
        transaction.recentBlockhash = blockhash; // Set the blockhash directly
        transaction.feePayer = stakerPublicKey.value;

        // Sign and send the transaction
        const signed = await walletStore.wallets[0].signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);

        message.value = `Staked ${amount.value} SOL successfully! Transaction Signature: ${signature}`;
        error.value = null;
      } catch (err) {
        console.error("Failed to stake SOL:", err);
        error.value = "Failed to stake SOL: " + err.message;
        message.value = null;
      }
    };

    walletStore.wallets[0].on("connect", (publicKey) => {
      stakerPublicKey.value = publicKey;
      connected.value = true;
    });

    walletStore.wallets[0].on("disconnect", () => {
      stakerPublicKey.value = null;
      connected.value = false;
    });

    return {
      amount,
      stakeSol,
      connected,
      message,
      error,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
