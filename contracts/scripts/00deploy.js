const { ethers } = require('hardhat')


const main = async () => {
    const [ owner ] = await ethers.getSigners()

    console.log('Deploying round')
    const Round = await ethers.getContractFactory("Round")
    //  Round starts in 10 minutes ends in 10 days
    const now = Math.floor(Date.now() / 1000)
    const roundCtc = await Round.deploy(now + 10 * 60, now + 10 * 24 * 60 * 60)
    await roundCtc.deployed()
    console.log('Round contract:', roundCtc.address)


    console.log('Deploying Matching Fund')
    const MatchingFund = await ethers.getContractFactory("MatchingFund")
    const matchingFundCtc = await MatchingFund.deploy(ethers.utils.parseUnits("5000", "ether"))
    await matchingFundCtc.deployed()
    console.log('MatchingFund contract:', matchingFundCtc.address)
}

main()