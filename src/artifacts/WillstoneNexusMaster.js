export const WillstoneNexusMasterArtifact = {
  "abi": [
    {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "FEE_TIER",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint8",
          "internalType": "uint8"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "OWNER",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "address"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "publicPauseState",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "setPauseState",
      "inputs": [
        {
          "name": "_state",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "error",
      "name": "GovernanceUnauthorized",
      "inputs": []
    }
  ],
  "bytecode": "0x60c08060405234603d573360805260ff195f54165f55600160a05261018e9081610042823960805181818160680152610129015260a0518160d20152f35b5f80fdfe6080806040526004361015610012575f80fd5b5f3560e01c908163117803e31461011757508063367f2fc1146100f65780634c69a6c9146100b95763cdb88ad114610048575f80fd5b346100b55760203660031901126100b5576004358015158091036100b5577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031633036100a65760ff80195f54169116175f555f80f35b631e3ecf9760e21b5f5260045ffd5b5f80fd5b346100b5575f3660031901126100b557602060405160ff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b346100b5575f3660031901126100b557602060ff5f54166040519015158152f35b346100b5575f3660031901126100b5577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f3fea2646970667358221220e4a8ca573cc3e3117ad69cc90eef7db4bd57c15497c59df3ca2e2668bdac28dd64736f6c634300081c0033"
};