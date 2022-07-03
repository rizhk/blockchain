import { Web3ProviderState } from 'reducers';

export type Web3Action =
  | {
      type: 'SET_WEB3_PROVIDER';
      provider?: Web3ProviderState['provider'];
      web3Provider?: Web3ProviderState['web3Provider'];
      address?: Web3ProviderState['address'];
      network?: Web3ProviderState['network'];
    }
  | {
      type: 'SET_ADDRESS';
      address?: Web3ProviderState['address'];
    }
  | {
      type: 'SET_NETWORK';
      network?: Web3ProviderState['network'];
    }
  | {
      type: 'RESET_WEB3_PROVIDER';
    };
