import Vue from 'vue'
import Vuex from 'vuex'

import Chain from '@/lib/chain'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chain: new Chain(),
    network: 0,
    account: '',

    status: {
      loading: true,
      balance: '--',
      allowance: 0,
      authed: false,
      stakingAmount: '--',
      stakingEndTime: 0,
    },

    route: location.hash,
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
    UPDATE_STATUS(state, status) {
      state.status = {
        ...state.status,
        ...status,
        loading: false,
      }
    },

    UPDATE_ROUTE(state, route) {
      state.route = route
      history.pushState(null, '', '/' + route)
    },
  },
  actions: {
    CONNECT({ commit, dispatch }) {
      if (typeof window.ethereum === 'undefined') {
        return false
      }
      return window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          commit('UPDATE_PROVIDER', window.web3.currentProvider)
          commit('SET_ACCOUNT', accounts[0])
          dispatch('UPDATE')
          commit('SET_NETWORK', Number(window.ethereum.chainId))
          window.ethereum.on('accountsChanged', (accounts) => {
            commit('SET_ACCOUNT', accounts[0])
            dispatch('UPDATE')
          })
          window.ethereum.on('chainChanged', (chainID) => {
            commit('SET_NETWORK', Number(chainID))
          })
          return true
        })
        .catch(() => false)
    },
    UPDATE({ state, commit }) {
      if (!state.chain.ready || !state.account) {
        return
      }
      Promise.all([
        state.chain.getDoraBalance(state.account),
        state.chain.getAllowance(state.account),
        state.chain.getStatus(state.account),
      ]).then(([balance, allowance, status]) => {
        const result = {
          balance,
          allowance: Number(allowance),
          authed: status.authenticated,
          stakingAmount: status.stakingAmount,
          stakingEndTime: status.stakingEndTime,
        }
        commit('UPDATE_STATUS', result)
      })
    },
    DISCONNECT({ commit }) {
      commit('SET_ACCOUNT', '')
      commit('SET_NETWORK', 0)
    },
  },
  modules: {},
})
