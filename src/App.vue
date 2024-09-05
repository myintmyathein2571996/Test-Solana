<template>
  <div id="app">
    <WalletConnect />
    <SolanaStaking />
  </div>
</template>

<script>
import WalletConnect from './components/WalletConnect.vue';
import SolanaStaking from './components/SolanaStaking.vue';

export default {
  name: 'App',
  components: {
    WalletConnect,
    SolanaStaking,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
