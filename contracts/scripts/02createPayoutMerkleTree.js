const { BigNumber } = require('ethers')
const { ethers } = require('hardhat')
const { BigNumber: bn } = require('bignumber.js')
const { MerkleTree } = require('merkletreejs')
const fs = require('fs');


const roundContract = (await ethers.getContractFactory("Round")).deployed()
const matchFundContract = (await ethers.getContractFactory("MatchingFund")).deployed()


function sqrt(value) {
    return BigNumber.from(new bn(value.toString()).sqrt().toFixed().split('.')[0])
}

const main = async () => {
    const matchBalance = await ethers.provider.getBalance(matchFundContract.address)
    const grantCount = await roundContract.grantCount()

    let cumulativeQuadSum = BigNumber.from(0)
    let idToQuadSum = new Array(grantCount)
    let idToSum = new Array(grantCount).fill(BigNumber.from(0))

    for (let i = 0; i < grantCount; i++) {
        const grantDonations = (await roundContract.getGrantDonationAmounts(i))[0]

        let x = BigNumber.from(0)

        grantDonations.forEach((donation) => {
            x = x.add(sqrt(donation))
            idToSum[i] = donation.add(idToSum[i] ? idToSum[i]: 0)
        })

        x = x.pow(2)

        idToQuadSum[i] = x
        cumulativeQuadSum = cumulativeQuadSum.add(x)
    }

    //  grantId -> claimableAmount
    let idToTotalAmount = new Array(grantCount)
    for (let i = 0; i < grantCount; i++) {
        const receiveFromMatch = idToQuadSum[i].mul(matchBalance).div(cumulativeQuadSum)
        idToTotalAmount[i] = idToSum[i].add(receiveFromMatch)
    }


    const leaves = []
    const info = []
    for (let i = 0; i < grantCount; i++) {
        const grant = await roundContract.grants(i)
        const payeeAddr = grant.payee

        const rawLeaf = ethers.utils.solidityPack(['uint256', 'address', 'uint256'], [i, payeeAddr, idToTotalAmount[i]])
        const leaf = ethers.utils.keccak256(rawLeaf)
        leaves.push(leaf)
        info.push({
            index: i,
            receiver: payeeAddr,
            amount: idToTotalAmount[i].toString(),
            leaf: leaf
        })
    }

    const tree = new MerkleTree(leaves, ethers.utils.keccak256, { sortPairs: true });
    const root = tree.getHexRoot();

    const jsonData = {
        rootHash: root,
        leaves: leaves,
        tree: info
    }

    fs.writeFile("./tree.json", JSON.stringify(jsonData), function err(error) {
        console.log(error)
    })
}


main()