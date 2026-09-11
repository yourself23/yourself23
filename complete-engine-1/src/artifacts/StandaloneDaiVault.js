export const StandaloneDaiVaultArtifact = {
  "abi": [
    {
      "type": "constructor",
      "inputs": [
        {
          "name": "_tokenAddress",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "_initialThreshold",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_initialAmount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "DAI_TOKEN",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "address",
          "internalType": "contract IERC20"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "MANAGER",
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
      "name": "beneficiary",
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
      "name": "configureBoundaries",
      "inputs": [
        {
          "name": "_newFloor",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "_newWeight",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "executeAutoReplenish",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "isReplenishmentActive",
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
      "name": "replenishmentAmount",
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
      "name": "replenishmentThreshold",
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
      "name": "rescueNativeFunds",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setBeneficiary",
      "inputs": [
        {
          "name": "_newBeneficiary",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "toggleReplenishment",
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
      "type": "event",
      "name": "BeneficiaryMigrated",
      "inputs": [
        {
          "name": "previousBeneficiary",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newBeneficiary",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "BoundaryUpdated",
      "inputs": [
        {
          "name": "structuralFloor",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "replenishmentWeight",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "StatusToggled",
      "inputs": [
        {
          "name": "activeState",
          "type": "bool",
          "indexed": false,
          "internalType": "bool"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "VaultReplenished",
      "inputs": [
        {
          "name": "target",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "totalRefilled",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        },
        {
          "name": "timestamp",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "CircuitBreakerActive",
      "inputs": []
    },
    {
      "type": "error",
      "name": "GuardUnauthorized",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InsufficientVaultLiquidity",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidZeroAddress",
      "inputs": []
    },
    {
      "type": "error",
      "name": "NativeRescueFailed",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ReserveThresholdNotMet",
      "inputs": []
    },
    {
      "type": "error",
      "name": "TokenTransferFailed",
      "inputs": []
    }
  ],
  "bytecode": "0x60c0346100d157601f61071e38819003918201601f19168301916001600160401b038311848410176100d5578084926060946040528339810103126100d15780516001600160a01b03811691908290036100d157604060208201519101519180156100c2576080523360a0523060018060a01b03195f5416175f55600155600255600160ff19600354161760035560405161063490816100ea823960805181818160e50152610152015260a0518181816104bd0152818161051301526105bf0152f35b63f6b2911f60e01b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe60806040526004361015610011575f80fd5b5f3560e01c8063063c27f8146104ec5780631b2df850146104a85780631c31f7101461042657806338af3eed146103ff5780635bd521341461039d578063637c9b98146103465780639553861914610324578063ca18b76214610114578063e606df87146100d0578063ea84c747146100b35763fe25010314610092575f80fd5b346100af575f3660031901126100af576020600254604051908152f35b5f80fd5b346100af575f3660031901126100af576020600154604051908152f35b346100af575f3660031901126100af576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b346100af575f3660031901126100af5760ff6003541615610315575f546040516370a0823160e01b81526001600160a01b03918216600482018190527f00000000000000000000000000000000000000000000000000000000000000009092169190602081602481865afa908115610288575f916102e3575b5060015411156102d4576040516370a0823160e01b8152306004820152602081602481865afa908115610288575f916102a2575b50600254809110610293576044826020937fa04e4ba211dc9ed1eaac966903bc04e30bdf9b776cc2e0a527af3bb85cdf1ebf604080518681524288820152a25f604051958694859363a9059cbb60e01b8552600485015260248401525af1908115610288575f9161024d575b501561023e57602060405160018152f35b63022e258160e11b5f5260045ffd5b90506020813d602011610280575b816102686020938361059b565b810103126100af575180151581036100af578161022d565b3d915061025b565b6040513d5f823e3d90fd5b635b722d6d60e01b5f5260045ffd5b90506020813d6020116102cc575b816102bd6020938361059b565b810103126100af5751836101c1565b3d91506102b0565b6322de4a1360e01b5f5260045ffd5b90506020813d60201161030d575b816102fe6020938361059b565b810103126100af57518361018d565b3d91506102f1565b63ff0376e760e01b5f5260045ffd5b346100af575f3660031901126100af57602060ff600354166040519015158152f35b346100af5760403660031901126100af577fa7b481ef9e3a5eac7633cf2365eaa23c4030f0ed5f48689936908332e04e1ee860406004356024356103886105bd565b816001558060025582519182526020820152a1005b346100af5760203660031901126100af576004358015158091036100af5760207f42c2fc3c4044ce65703b4a17c632fd7f79238cdf98791bee5dff1db9f2b6bb1c916103e76105bd565b60ff196003541660ff821617600355604051908152a1005b346100af575f3660031901126100af575f546040516001600160a01b039091168152602090f35b346100af5760203660031901126100af576004356001600160a01b038116908190036100af576104546105bd565b8015610499575f548160018060a01b0382167fb71544b29568c67a08426b3182d30b2e28caddd685d3d8897da44a0e2b286cf15f80a36001600160a01b031916175f55005b63f6b2911f60e01b5f5260045ffd5b346100af575f3660031901126100af576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b346100af575f3660031901126100af576105046105bd565b478061050c57005b5f808080937f00000000000000000000000000000000000000000000000000000000000000005af13d15610596573d67ffffffffffffffff81116105825760405190610562601f8201601f19166020018361059b565b81525f60203d92013e5b1561057357005b63440e9b7360e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b61056c565b90601f8019910116810190811067ffffffffffffffff82111761058257604052565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031633036105ef57565b637821c43b60e11b5f5260045ffdfea264697066735822122064b8815395673936a069e1ce5863581af8570250725e0ba33d5fd5440f837f3564736f6c634300081c0033"
};