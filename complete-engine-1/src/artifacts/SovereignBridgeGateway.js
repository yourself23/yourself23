export const SovereignBridgeGatewayArtifact = {
  "abi": [
    {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "DESTINATION_WALLET",
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
      "name": "INITIAL_FLEET_NODES",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "PROPRIETOR",
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
      "name": "SYSTEM_DESTINATION",
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
      "name": "activeFleetNodes",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "infrastructureGuildVault",
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
      "name": "isBridgeActive",
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
      "name": "processBridgePayload",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "totalBridgedVolume",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "ProceedsRouted",
      "inputs": [
        {
          "name": "destination",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StateHealed",
      "inputs": [
        {
          "name": "diagnosticVector",
          "type": "string",
          "indexed": false,
          "internalType": "string"
        },
        {
          "name": "correctedVault",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "correctedNodes",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "BridgePaused",
      "inputs": []
    },
    {
      "type": "error",
      "name": "FallbackRoutingFailed",
      "inputs": []
    },
    {
      "type": "error",
      "name": "RevenueRoutingFailed",
      "inputs": []
    }
  ],
  "bytecode": "0x60c08060405234610083573360805273a34bd5fcf75718104e1e0bdd3c6a22a071a1c9c760a0525f80546001600160a81b03191674a34bd5fcf75718104e1e0bdd3c6a22a071a1c9c70117905560056001556104c090816100888239608051816101df015260a05181818160270152818161016d01528181610268015261030f0152f35b5f80fdfe608080604052600436101561009d575b50361561001a575f80fd5b3461002157005b5f8080807f00000000000000000000000000000000000000000000000000000000000000006040513481527fb7564d42554b9692271ec88e280ec9ad0f0b30bbc5e62557eea5918a4bd7cb7b602060018060a01b03841692a234905af1610086610425565b501561008e57005b6365c8c4e160e01b5f5260045ffd5b5f3560e01c908163029a7ba6146104075750806306655ee8146103ec5780631265f2cf146103cf57806315889d6e1461020e57806384039389146101ca578063a5ce64dc1461019c578063ab7be1ec14610158578063c5487a161461012d5763f1620db51461010c575f61000f565b34610129575f366003190112610129576020600154604051908152f35b5f80fd5b34610129575f366003190112610129575f5460405160089190911c6001600160a01b03168152602090f35b34610129575f366003190112610129576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610129575f36600319011261012957602060405173a34bd5fcf75718104e1e0bdd3c6a22a071a1c9c78152f35b34610129575f366003190112610129576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b5f366003190112610129575f54600881901c6001600160a01b03161580156103c5575b6102fe575b5060ff5f5416156102ef5734610252575b602060405160018152f35b6002543481018091116102db576002555f8080807f00000000000000000000000000000000000000000000000000000000000000006040513481527fb7564d42554b9692271ec88e280ec9ad0f0b30bbc5e62557eea5918a4bd7cb7b602060018060a01b03841692a234905af16102c7610425565b50610247576338e6a87f60e11b5f5260045ffd5b634e487b7160e01b5f52601160045260245ffd5b63a792dfa360e01b5f5260045ffd5b600190600582556101008260a81b037f000000000000000000000000000000000000000000000000000000000000000060081b16906affffffffffffffffffffff60a81b161717805f557f48cd845a394984cfccd6c089e4e888cc028b38be2a6c233eaea6a2a29c66e55460a06040519260408452602260408501527f435249544943414c5f53544154455f434f5252555054494f4e5f444554454354606085015261115160f21b608085015260056020850152600180831b039060081c1692a280610236565b5060015415610231565b34610129575f366003190112610129576020600254604051908152f35b34610129575f36600319011261012957602060405160058152f35b34610129575f3660031901126101295760209060ff5f541615158152f35b3d15610485573d9067ffffffffffffffff82116104715760405191601f8101601f19908116603f0116830167ffffffffffffffff8111848210176104715760405282523d5f602084013e565b634e487b7160e01b5f52604160045260245ffd5b60609056fea26469706673582212203eab5617ab1b2c36a723c2a7fe0b2f11ba91f96f22142f8b55e7b2c538ca98ee64736f6c634300081c0033"
};