// src/composables/eth-wallet-composable.js

import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'
import { ethers } from "ethers";
import detectEthereumProvider from '@metamask/detect-provider';
const log = require('debug')('admin:eth-wallet')

const DAPP_CHAIN_ID = '0x7a69';

export default function ethWalletComposable(context) {
  const provider = window.ethereum;
  const walletReady = ref(false);
  const wallet = reactive({
    detected: false,
    available: false,
    chainId: 0,
    address: '',
    balance: '',
    provider: null
  })

  let hasAccountRequest = null;    // true if connect wallet request 
  let walletProvider = null;

  onMounted(async () => {
    const detectedProvider = await detectEthereumProvider()

    if (detectedProvider) {
      log('Ethereum successfully detected!')

      wallet.detected = true;

      provider.on("connect", onWalletAvailable);
      provider.on("accountsChanged", accountChanged);
      provider.on("chainChanged", chainChanged);
      provider.on("disconnect", disconnected);

    } else {
      // if the provider is not detected, detectEthereumProvider resolves to null
      console.error('Please install MetaMask!')
      return null
    }
  })

  // --------
  onBeforeUnmount(() => {
    if (provider) {
      provider.removeListener("connect", onWalletAvailable);
      provider.removeListener("accountsChanged", accountChanged);
      provider.removeListener("chainChanged", chainChanged);
      provider.removeListener("disconnect", disconnected);
    }
  })

  async function onWalletAvailable(connectionInfo) {

    wallet.available = provider.isConnected();

    if (wallet.available) {
      try {
        wallet.chainId = await provider.request({
          method: 'eth_chainId'
        })
        chainChanged(wallet.chainId)
      }
      catch (e) {
        console.log('onWalletAvailable-error', e)
      }
    }
  }

  async function chainChanged(chainId) {
    log("...chainChanged: %s", chainId);

    wallet.chainId = chainId;
    let needRequest = hasAccountRequest
    hasAccountRequest = false

    // check
    if (chainId == DAPP_CHAIN_ID) {
      try {
        let accounts = await provider.request({ method: "eth_accounts" });

        // already connected and selected
        accountChanged(accounts);

        if (accounts.length == 0 && needRequest) {
          await requestAccounts()
        }
      }
      catch (e) {
        console.log('chainChanged-error', e)
      }
    }
    else {
      resetWallet()
    }
  }

  async function accountChanged(accounts) {
    if (null == walletProvider) {
      log('--- new eth provider ')
      walletProvider = new ethers.providers.Web3Provider(window.ethereum);

      wallet.provider = walletProvider
    }

    log("--- accountChanged : %O", accounts);

    if (accounts.length > 0) {
      wallet.address = accounts[0];

      wallet.signer = walletProvider.getSigner()

      let gwei = await walletProvider.getBalance(wallet.address);
      wallet.balance = ethers.utils.formatUnits(gwei, "ether");

      log('Wallet balance : %s', wallet.balance)

      walletReady.value = true

    } else {
      resetWallet()
    }
  }

  function disconnected(error) {
    log("...disconnect: %O", error);
    resetWallet()
  }

  function resetWallet() {
    wallet.address = ''
    wallet.balance = 0
    wallet.signer = null

    walletReady.value = false
  }

  async function switchChain(chainId) {
    if (!provider) {
      window.alert("Install wallet (Metamask) first");
      return false;
    }

    if (wallet.chainId != chainId) {
      log("switching to chain : %s", chainId);

      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainId }],
        });
        return true;

      } catch (switchError) {
        if (switchError.code === 4902) {
          // TODO: addChain()
        } else {
          if (switchError.code === 4001) {
            log('User rejected switch chain to : %s', chainId)
          }
          else {
            log("Ethereum change network error : %O", switchError);
          }
        }
        return false;
      }
    }
    else {
      log("--- switchChain(chainId) : chainId =  %s", chainId);
      return true
    }
  }

  async function requestAccounts() {
    try {
      let accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      // accountChanged(accounts)
    } catch (e) {
      if (e.code === 4001) {
        log('User rejected to connect wallet')
      }
      else {
        console.error('connectWallet', e);
      }
    }
  }

  async function connectWallet() {
    if (wallet.chainId == DAPP_CHAIN_ID) {
      requestAccounts()
      return
    }

    // change chain first
    // after chain changed, request wallet again
    hasAccountRequest = true
    await switchChain(DAPP_CHAIN_ID)
  }

  return {
    wallet,
    walletReady,
    switchChain,
    connectWallet,
  }
}