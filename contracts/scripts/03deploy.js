const { ethers } = require('hardhat')

const merkleRoot = require('./tree.json')['rootHash']

const main = async () => {
    const [ owner ] = await ethers.getSigners()

    console.log('Deploying SBT')
    const SBT = await ethers.getContractFactory("SBT")
    //  Round starts in 10 minutes ends in 10 days
    const sbtCtc = await SBT.deploy()
    await sbtCtc.deployed()
    console.log('SBT contract:', sbtCtc.address)


    console.log('Deploying Payout Contract')
    const Payout = await ethers.getContractFactory("Payout")
    const payoutCtc = await Payout.deploy(merkleRoot, sbtCtc.address)
    await payoutCtc.deployed()
    console.log('MatchingFund contract:', payoutCtc.address)

    console.log('Granting payout contract minter role')
    await sbtCtc.grantRole(await sbtCtc.MINTER_ROLE(), payoutCtc.address)
}

main()