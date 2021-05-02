<template>
  <div id="app">
    <Login v-if="!account" />
    <NetworkError v-else-if="network !== requireNetwork" />
    <Home v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import NetworkError from '@/views/NetworkError.vue'

const NETWORK = 97

export default {
  name: 'App',
  components: {
    Home,
    Login,
    NetworkError,
  },
  data() {
    return {
      requireNetwork: NETWORK,
    }
  },
  computed: {
    ...mapState(['account', 'network']),
  },
  created() {
    this.$store.dispatch('CONNECT')
  },
}
</script>
