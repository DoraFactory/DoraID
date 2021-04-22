import Vue from 'vue'
import Vuex from 'vuex'

import Chain from '@/lib/chain'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chain: new Chain(),
    network: 0,
    account: '',
  },
  mutations: {
    UPDATE_PROVIDER(state, provider) {
      state.chain.updateProvider(provider)
    },
    SET_ACCOUNT(state, account) {
      state.account = account
    },
    SET_NETWORK(state, chainID) {
      state.network = chainID
      localStorage.setItem('network', chainID)
    },
  },
  actions: {
    CONNECT({ commit }) {
      if (typeof window.ethereum === 'undefined') {
        return false
      }
      return window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          commit('UPDATE_PROVIDER', window.web3.currentProvider)
          commit('SET_ACCOUNT', accounts[0])
          commit('SET_NETWORK', Number(window.ethereum.chainId))
          window.ethereum.on('accountsChanged', (accounts) => {
            commit('SET_ACCOUNT', accounts[0])
          })
          window.ethereum.on('chainChanged', (chainID) => {
            commit('SET_NETWORK', Number(chainID))
          })
          return true
        })
        .catch(() => false)
    },
    DISCONNECT({ commit }) {
      commit('SET_ACCOUNT', '')
      commit('SET_NETWORK', 0)
    },
  },
  modules: {},
})
