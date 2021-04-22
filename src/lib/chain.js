import Web3 from 'web3'

export default class Chain {
  constructor() {
    this.web3 = null
  }

  updateProvider(provider) {
    if (!this.web3) {
      this.web3 = new Web3(provider)
    } else {
      this.web3.setProvider(provider)
    }
  }
}
