import Web3 from 'web3';
import CONFIG from 'config/default.json';

let givenWeb3

export const getWeb3 = ({ provider, networkType } = {}) => {
  if (networkType) {
    return web3ByNetworkType[networkType]
  }

  if (provider) {
    givenWeb3 = null
    givenWeb3 = new Web3(provider)
    return givenWeb3
  }

  if (givenWeb3) return givenWeb3
}

export const main = new Web3(CONFIG.web3.ethereumProvider)
export const testnet = new Web3(CONFIG.web3.testnetProvider)

const web3ByNetworkType = {
  80001: testnet,
  1: main
}

export default givenWeb3