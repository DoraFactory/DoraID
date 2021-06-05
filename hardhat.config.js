require('@nomiclabs/hardhat-waffle')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.2',
  paths: {
    sources: './contract/code',
    tests: './contract/test',
    cache: './contract/cache',
    artifacts: './contract/artifacts',
  },
}
