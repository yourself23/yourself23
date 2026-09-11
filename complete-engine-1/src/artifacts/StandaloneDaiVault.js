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
    }
  ],
  "bytecode": "0x60c0346100d157601f61069d38819003918201601f19168301916001600160401b038311848410176100d5578084926060946040528339810103126100d15780516001600160a01b03811691908290036100d157604060208201519101519180156100c2576080523360a0523060018060a01b03195f5416175f55600155600255600160ff1960035416176003556040516105b390816100ea823960805181818160e50152610153015260a05181818161043c01528181610492015261053e0152f35b63f6b2911f60e01b5f5260045ffd5b5f80fd5b634e487b7160e01b5f52604160045260245ffdfe60806040526004361015610011575f80fd5b5f3560e01c8063063c27f81461046b5780631b2df850146104275780631c31f710146103a557806338af3eed1461037e5780635bd521341461031c578063637c9b98146102c557806395538619146102a3578063ca18b76214610114578063e606df87146100d0578063ea84c747146100b35763fe25010314610092575f80fd5b346100af575f3660031901126100af576020600254604051908152f35b5f80fd5b346100af575f3660031901126100af576020600154604051908152f35b346100af575f3660031901126100af576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b346100af575f3660031901126100af5760ff6003541615610294575f546040516370a0823160e01b81526001600160a01b0391821660048201819052917f00000000000000000000000000000000000000000000000000000000000000001690602081602481855afa908115610248575f91610262575b506001541115610253576020602491604051928380926370a0823160e01b82523060048301525afa908115610248575f91610216575b506002548091106102075760407fa04e4ba211dc9ed1eaac966903bc04e30bdf9b776cc2e0a527af3bb85cdf1ebf918151908152426020820152a2602060405160018152f35b635b722d6d60e01b5f5260045ffd5b90506020813d602011610240575b816102316020938361051a565b810103126100af5751826101c1565b3d9150610224565b6040513d5f823e3d90fd5b6322de4a1360e01b5f5260045ffd5b90506020813d60201161028c575b8161027d6020938361051a565b810103126100af57518361018b565b3d9150610270565b63ff0376e760e01b5f5260045ffd5b346100af575f3660031901126100af57602060ff600354166040519015158152f35b346100af5760403660031901126100af577fa7b481ef9e3a5eac7633cf2365eaa23c4030f0ed5f48689936908332e04e1ee8604060043560243561030761053c565b816001558060025582519182526020820152a1005b346100af5760203660031901126100af576004358015158091036100af5760207f42c2fc3c4044ce65703b4a17c632fd7f79238cdf98791bee5dff1db9f2b6bb1c9161036661053c565b60ff196003541660ff821617600355604051908152a1005b346100af575f3660031901126100af575f546040516001600160a01b039091168152602090f35b346100af5760203660031901126100af576004356001600160a01b038116908190036100af576103d361053c565b8015610418575f548160018060a01b0382167fb71544b29568c67a08426b3182d30b2e28caddd685d3d8897da44a0e2b286cf15f80a36001600160a01b031916175f55005b63f6b2911f60e01b5f5260045ffd5b346100af575f3660031901126100af576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b346100af575f3660031901126100af5761048361053c565b478061048b57005b5f808080937f00000000000000000000000000000000000000000000000000000000000000005af13d15610515573d67ffffffffffffffff811161050157604051906104e1601f8201601f19166020018361051a565b81525f60203d92013e5b156104f257005b63440e9b7360e01b5f5260045ffd5b634e487b7160e01b5f52604160045260245ffd5b6104eb565b90601f8019910116810190811067ffffffffffffffff82111761050157604052565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316330361056e57565b637821c43b60e11b5f5260045ffdfea264697066735822122059beb4270de1f0f4fa4cae286333070ce0d1e39436ce6ae59e4be21d6eeaf37964736f6c634300081c0033"
};