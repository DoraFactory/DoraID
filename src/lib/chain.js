import Web3 from 'web3'

import ERC20_ABI from '@/contract/ERC20.abi.json'
import DORAID_ABI from '@/contract/DoraID.abi.json'

// const TEST_DORA_CONTRACT = '0x22CC3F3db9255b6b228A859Dc55156f840733139'
// const TEST_DORAID_CONTRACT = '0x53262b47178797eF8E777C6F0b0AE09eA85d9e33'

// const DORA_CONTRACT = '0x7ab088fedae4fa8ada4df638c07cef6c23aff002'
// const DORAID_CONTRACT = '0xfDaC13AAf14Fb3A814f43C65F497c4547e288B4c'
// const AUTH_CONTRACT = '0x077DF55191994C347444e025C17f88fB6b104F7b'

const DORA_CONTRACT = '0xbc4171f45EF0EF66E76F979dF021a34B46DCc81d'
const DORAID_CONTRACT = '0xA8f56d0506738c7f4400Ae9d8811538A85907287'
// const AUTH_CONTRACT = '0x3eA9e0cee7bd3924b8f307555a05F24Af245bb44'

const MAX_BALANCE = '10000000000000000000000000'
const ACTIVATION_FEE = 6e21

export default class Chain {
  constructor() {
    this.web3 = null
  }

  updateProvider(provider) {
    if (!this.web3) {
      this._initWeb3(provider)
    } else {
      this.web3.setProvider(provider)
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

  async getTxStatus(txHash) {
    const receipt = await this.web3.eth.getTransactionReceipt(txHash)
    if (!receipt) {
      return 'Pending'
    } else if (receipt.status) {
      return 'Success'
    } else {
      return 'Fail'
    }
  }

  async getDoraBalance(addr) {
    return this.dora.methods['balanceOf'](addr)
      .call()
      .then((res) => {
        return this.fromWei(res, 2)
      })
      .catch(() => '0')
  }

  async getAllowance(addr) {
    return this.dora.methods['allowance'](addr, DORAID_CONTRACT)
      .call()
      .then((res) => {
        return this.fromWei(res)
      })
      .catch(() => '0')
  }

  async getStatus(addr) {
    return Promise.all([
      this.doraId.methods['proofOf'](addr).call(),
      this.doraId.methods['statusOf'](addr).call(),
    ])
      .then(([proof, status]) => {
        const endTime = Number(status.stakingEndTime) * 1000
        return {
          proof: Math.floor(Number(proof) / ACTIVATION_FEE),
          authenticated: status.authenticated,
          stakingAmount: this.fromWei(status.stakingAmount, 2),
          stakingEndTime: endTime < Date.now() ? 0 : endTime,
        }
      })
      .catch(() => ({
        proof: 0,
        authenticated: false,
        stakingAmount: '0',
        stakingEndTime: 0,
      }))
  }

  async approve(addr) {
    const data = this.dora.methods['approve'](DORAID_CONTRACT, MAX_BALANCE).encodeABI()
    const tx = {
      from: addr,
      to: DORA_CONTRACT,
      data,
    }
    return window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [tx],
      })
      .catch((error) => {
        console.error(error.message || error)
        return false
      })
  }

  async stake(addr, inputAmount, inputEndTimestamp) {
    const amount = this.web3.utils.toWei(inputAmount)
    const endTime = Math.floor(inputEndTimestamp / 1000)
    const data = this.doraId.methods['stake'](amount, endTime).encodeABI()
    const tx = {
      from: addr,
      to: DORAID_CONTRACT,
      data,
    }
    return window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [tx],
      })
      .catch((error) => {
        console.error(error.message || error)
        return false
      })
  }

  async unstake(addr, inputAmount) {
    const amount = this.web3.utils.toWei(inputAmount)
    const data = this.doraId.methods['unstake'](amount).encodeABI()
    const tx = {
      from: addr,
      to: DORAID_CONTRACT,
      data,
    }
    return window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [tx],
      })
      .catch((error) => {
        console.error(error.message || error)
        return false
      })
  }

  async activate(addr, aim) {
    const data = this.doraId.methods['activate'](aim).encodeABI()
    const tx = {
      from: addr,
      to: DORAID_CONTRACT,
      data,
    }
    return window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [tx],
      })
      .catch((error) => {
        console.error(error.message || error)
        return false
      })
  }

  _initWeb3(provider) {
    this.web3 = new Web3(provider)
    this.dora = new this.web3.eth.Contract(ERC20_ABI, DORA_CONTRACT)
    this.doraId = new this.web3.eth.Contract(DORAID_ABI, DORAID_CONTRACT)
  }
}
