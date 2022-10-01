const { ethers } = require('hardhat')

const MATCHING_FUND_ADDR = ""

const main = async () => {
    const [ owner ] = await ethers.getSigners()

    console.log('Closing matching found')
    const MatchingFund = await ethers.getContractFactory("MatchingFund")
    const matchingFundCtc = await MatchingFund.attach(MATCHING_FUND_ADDR)
    await matchingFundCtc.closeFund()
}

main()