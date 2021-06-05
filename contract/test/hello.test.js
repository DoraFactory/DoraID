const { ethers } = require('hardhat')
const { expect } = require('chai')

let hardhatERC20 = null
let hardhatDoraID = null

describe('Prepare', function () {
  it('Deploy ERC20 contract', async function () {
    const [admin, alice, bob] = await ethers.getSigners()

    const ERC20 = await ethers.getContractFactory('ERC20')
    hardhatERC20 = await ERC20.deploy(admin.address)

    await hardhatERC20.transfer(alice.address, '100000000000000000000')
    await hardhatERC20.transfer(bob.address, '100000000000000000000')

    expect(await hardhatERC20.balanceOf(alice.address)).to.equal('100000000000000000000')
    expect(await hardhatERC20.balanceOf(bob.address)).to.equal('100000000000000000000')
  })
})

describe('DoraID contract is working', function () {
  it('The authenticated account can be initialized', async function () {
    const accounts = await ethers.getSigners()
    const alice = accounts[1]
    const bob = accounts[2]

    const DoraID = await ethers.getContractFactory('DoraID')
    hardhatDoraID = await DoraID.deploy(
      hardhatERC20.address,
      [alice.address],
      ['8640000000000000000000000']
    )

    expect((await hardhatDoraID.statusOf(alice.address)).authenticated).to.equal(true)
    expect((await hardhatDoraID.statusOf(bob.address)).authenticated).to.equal(false)
  })
})
