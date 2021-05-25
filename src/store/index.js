import Vue from 'vue'
import Vuex from 'vuex'

import Chain from '@/lib/chain'

Vue.use(Vuex)

const txsCheckingTimer = new Map()
const MAX_LOGS_LENGTH = 5

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

    txList: [],

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
        loading: false,
        ...status,
      }
    },
    REFRESH(state) {
      state.status = {
        ...state.status,
      }
    },

    PUSH_TX(state, tx) {
      state.txList.unshift({
        ...tx,
        status: 'Pending',
      })
      if (state.txList.length > MAX_LOGS_LENGTH) {
        const oldTx = state.txList.pop()
        txsCheckingTimer.delete(oldTx.txHash)
      }
      txsCheckingTimer.set(tx.txHash, {
        interval: 3000,
        lastCheck: Date.now() + 3000,
      })
    },
    UPDATE_TX(state, { tx, status }) {
      state.txList = state.txList.map((item) => {
        if (item === tx) {
          return {
            ...tx,
            status,
          }
        } else {
          return item
        }
      })
    },

    UPDATE_ROUTE(state, route) {
      state.route = route
      history.pushState(null, '', location.pathname + route)
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
          commit('UPDATE_PROVIDER', window.ethereum)
          commit('SET_ACCOUNT', accounts[0])
          dispatch('UPDATE')
          commit('SET_NETWORK', Number(window.ethereum.chainId))
          window.ethereum.on('accountsChanged', (accounts) => {
            commit('SET_ACCOUNT', accounts[0])
            commit('UPDATE_STATUS', { loading: true })
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
    UPDATE_TXLIST({ state, commit, dispatch }) {
      if (!state.chain.ready) {
        return
      }
      const now = Date.now()
      for (const tx of state.txList) {
        const timer = txsCheckingTimer.get(tx.txHash)
        if (tx.status === 'Pending' && now >= timer.lastCheck) {
          timer.interval = Math.min(15000, Math.floor(timer.interval * 1.2))
          timer.lastCheck = now + timer.interval
          state.chain.getTxStatus(tx.txHash).then((status) => {
            commit('UPDATE_TX', { tx, status })
            if (status) {
              dispatch('UPDATE')
            }
          })
        }
      }
    },
    DISCONNECT({ commit }) {
      commit('SET_ACCOUNT', '')
      commit('SET_NETWORK', 0)
    },
  },
  modules: {},
})
