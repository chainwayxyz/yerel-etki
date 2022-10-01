export const contracts = {
    "Round": {
        "address": "0x4EaA76AcaF20463cfC0233a6eEfc3989aBa14582",
        "abi": [
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_startTime",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_endTime",
                  "type": "uint256"
                }
              ],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "donator",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "Donation",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "payee",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "ipfsURL",
                  "type": "string"
                }
              ],
              "name": "GrantRegistration",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "payoutCtc",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "Payout",
              "type": "event"
            },
            {
              "inputs": [
                {
                  "internalType": "uint16",
                  "name": "_id",
                  "type": "uint16"
                }
              ],
              "name": "donate",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "endTime",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "getAllGrants",
              "outputs": [
                {
                  "components": [
                    {
                      "internalType": "uint16",
                      "name": "id",
                      "type": "uint16"
                    },
                    {
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                    },
                    {
                      "internalType": "uint48",
                      "name": "createdAt",
                      "type": "uint48"
                    },
                    {
                      "internalType": "uint48",
                      "name": "lastUpdated",
                      "type": "uint48"
                    },
                    {
                      "internalType": "address",
                      "name": "payee",
                      "type": "address"
                    },
                    {
                      "internalType": "string",
                      "name": "ipfsURL",
                      "type": "string"
                    },
                    {
                      "internalType": "uint256",
                      "name": "totalDonation",
                      "type": "uint256"
                    }
                  ],
                  "internalType": "struct Round.Grant[]",
                  "name": "",
                  "type": "tuple[]"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint16",
                  "name": "_id",
                  "type": "uint16"
                }
              ],
              "name": "getGrantDonationAmounts",
              "outputs": [
                {
                  "internalType": "uint256[]",
                  "name": "",
                  "type": "uint256[]"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "grantCount",
              "outputs": [
                {
                  "internalType": "uint16",
                  "name": "",
                  "type": "uint16"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint16",
                  "name": "",
                  "type": "uint16"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "grantDonations",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint16",
                  "name": "",
                  "type": "uint16"
                }
              ],
              "name": "grants",
              "outputs": [
                {
                  "internalType": "uint16",
                  "name": "id",
                  "type": "uint16"
                },
                {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "internalType": "uint48",
                  "name": "createdAt",
                  "type": "uint48"
                },
                {
                  "internalType": "uint48",
                  "name": "lastUpdated",
                  "type": "uint48"
                },
                {
                  "internalType": "address",
                  "name": "payee",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "ipfsURL",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "totalDonation",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address payable",
                  "name": "_payoutAddress",
                  "type": "address"
                }
              ],
              "name": "payout",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "_payee",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "_ipfsURL",
                  "type": "string"
                }
              ],
              "name": "registerGrant",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "startTime",
              "outputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint16",
                  "name": "_id",
                  "type": "uint16"
                },
                {
                  "internalType": "string",
                  "name": "_newURL",
                  "type": "string"
                }
              ],
              "name": "updateGrantIPFSURL",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint16",
                  "name": "_id",
                  "type": "uint16"
                },
                {
                  "internalType": "address",
                  "name": "_newOwner",
                  "type": "address"
                }
              ],
              "name": "updateGrantOwner",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint16",
                  "name": "_id",
                  "type": "uint16"
                },
                {
                  "internalType": "address",
                  "name": "_newPayee",
                  "type": "address"
                }
              ],
              "name": "updateGrantPayee",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ],
    },
    "Match": {
        "address": "0xECa1859010B026f2AF93066E7a2ecb16f8023a48",
        "abi": [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "donator",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "Donation",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "OwnershipTransferred",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "payoutCtc",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "Payout",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "donate",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "owner",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "paidOut",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address payable",
                  "name": "_payoutAddr",
                  "type": "address"
                }
              ],
              "name": "payout",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "renounceOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
                }
              ],
              "name": "transferOwnership",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ],
    },
}