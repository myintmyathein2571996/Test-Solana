<template>
  <div>
    <h1>Connect Your Wallet</h1>
    <div v-if="!connected">
      <button v-for="wallet in wallets" :key="wallet.name" @click="connectWallet(wallet)">
        Connect with {{ wallet.name }}
      </button>
    </div>
    <div v-else>
      <p>Wallet Connected!</p>
      <p>Public Key: {{ publicKey.toString() }}</p>
      <button @click="disconnectWallet">Disconnect</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import walletStore from '../wallet';

export default {
  setup() {
    const wallets = walletStore.wallets;
    const publicKey = ref(null);
    const connected = computed(() => !!publicKey.value);

    const connectWallet = async (wallet) => {
      try {
        await wallet.connect();
        publicKey.value = wallet.publicKey;
      } catch (err) {
        console.error('Failed to connect wallet:', err);
      }
    };

    const disconnectWallet = async () => {
      publicKey.value = null;
    };

    return {
      wallets,
      connected,
      publicKey,
      connectWallet,
      disconnectWallet,
    };
  },
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
