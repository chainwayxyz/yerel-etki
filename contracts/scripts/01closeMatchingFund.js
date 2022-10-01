const { ethers } = require('hardhat')

const main = async () => {
    const [ owner ] = await ethers.getSigners()

    console.log('Closing matching found')
    const MatchingFund = await ethers.getContractFactory("MatchingFund")
    const matchingFundCtc = await MatchingFund.deployed()
    await matchingFundCtc.closeFund()
}

main()