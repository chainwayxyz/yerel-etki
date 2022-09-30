const { ethers, BigNumber } = require('ethers')
const { BigNumber: bn } = require('bignumber.js')

// const ROUND_POOL_ADDR = ""
// const MATCH_FUND_ADDR = ""

// const roundABI = require('../artifacts/contracts/Round.sol/Round.json')
// const matchFundABI = require('../artifacts/contracts/MatchingFund.sol/MatchingFund.json')

// const provider = new ethers.providers.JsonRpcProvider(process.env.WEB3_PROVIDER_URL)

// const roundContract = new ethers.Contract(ethers.utils.getAddress(ROUND_POOL_ADDR), roundABI, provider)
// const matchFundContract = new ethers.Contract(ethers.utils.getAddress(MATCH_FUND_ADDR), matchFundABI)



function sqrt(value) {
    return BigNumber.from(new bn(value.toString()).sqrt().toFixed().split('.')[0])
}

const main = async () => {
    const matchBalance = await provider.getBalance(MATCH_FUND_ADDR)
    const grantCount = await roundContract.functions.grantCount()

    // const grantCount = 4
    // const matchBalance = ethers.utils.parseUnits("1000", "ether")

    // const allGrantDonations = [
    //     [ethers.utils.parseUnits("1", "ether"), ethers.utils.parseUnits("5", "ether")],
    //     [ethers.utils.parseUnits("1", "ether"), ethers.utils.parseUnits("5", "ether"), ethers.utils.parseUnits("10", "ether"), ethers.utils.parseUnits("15", "ether")],
    //     [ethers.utils.parseUnits("7", "ether")],
    //     [ethers.utils.parseUnits("2", "ether"), ethers.utils.parseUnits("1", "ether"), ethers.utils.parseUnits("1", "ether")]
    // ]

    let cumulativeQuadSum = BigNumber.from(0)
    let idToQuadSum = new Array(grantCount)
    let idToSum = new Array(grantCount).fill(BigNumber.from(0))
    for (let i = 0; i < grantCount; i++) {
        const grantDonations = await roundContract.functions.getGrantDonationAmounts(i)
        // const grantDonations = allGrantDonations[i]
        let x = BigNumber.from(0)

        grantDonations.forEach((donation) => {
            x = x.add(sqrt(donation))
            idToSum[i] = donation.add(idToSum[i])
        })

        x = x.pow(2)

        idToQuadSum[i] = x
        cumulativeQuadSum = cumulativeQuadSum.add(x)
    }

    let idToTotalAmount = new Array(grantCount)
    for (let i = 0; i < grantCount; i++) {
        const receiveFromMatch = idToQuadSum[i].mul(matchBalance).div(cumulativeQuadSum)
        idToTotalAmount[i] = idToSum[i].add(receiveFromMatch)
    }

    console.log(idToTotalAmount.map((val) => {
        return val.toString()
    }))
}


main()