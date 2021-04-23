import Web3 from 'web3'

import ERC20_ABI from '@/contract/ERC20.abi.json'
import DORAID_ABI from '@/contract/DoraID.abi.json'

const TEST_DORA_CONTRACT = '0xB784A999E6D127fA032c4cacB15aD88C401458Ec'
const TEST_DORAID_CONTRACT = '0x2a4b9A9394337f1Fb2617B0A36aaC62c19bD73DD'

const MAX_BALANCE = '10000000000000000000000000'

export default class Chain {
  constructor() {
    this.web3 = null
    this._initWeb3('https://data-seed-prebsc-1-s1.binance.org:8545/')
  }

  updateProvider(provider) {
    if (!this.web3) {
      this._initWeb3(provider)
    } else {
      // this.web3.setProvider(provider)
    }
  }

  fromWei(input, decimals = 18) {
    if (!this.web3) {
      throw new Error('Web3 is not ready!')
    }
    let output = this.web3.utils.fromWei(input)
    if (output.includes('.')) {
      const splited = output.split('.')
      splited[1] = splited[1].substr(0, decimals)
      output = splited.join('.')
    }
    return output
  }

  get ready() {
    return !!this.web3
  }

  async getDoraBalance(addr) {
    return this.dora.methods['balanceOf'](addr)
      .call()
      .then((res) => {
        return this.fromWei(res)
      })
      .catch(() => '0')
  }

  async getAllowance(addr) {
    return this.dora.methods['allowance'](addr, TEST_DORAID_CONTRACT)
      .call()
      .then((res) => {
        return this.fromWei(res)
      })
      .catch(() => '0')
  }

  async getStatus(addr) {
    return this.doraId.methods['statusOf'](addr)
      .call()
      .then((res) => {
        const endTime = Number(res.stakingEndTime) * 1000
        return {
          authenticated: res.authenticated,
          stakingAmount: this.fromWei(res.stakingAmount, 2),
          stakingEndTime: endTime < Date.now() ? 0 : endTime,
        }
      })
      .catch(() => ({
        authenticated: false,
        stakingAmount: '0',
        stakingEndTime: 0,
      }))
  }

  async approve(addr) {
    return this.dora.methods['approve'](TEST_DORAID_CONTRACT, MAX_BALANCE).send({
      from: addr,
    })
  }

  _initWeb3(provider) {
    this.web3 = new Web3(provider)
    this.dora = new this.web3.eth.Contract(ERC20_ABI, TEST_DORA_CONTRACT)
    this.doraId = new this.web3.eth.Contract(DORAID_ABI, TEST_DORAID_CONTRACT)
  }
}
