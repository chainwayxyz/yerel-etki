const { ethers } = require('hardhat')


const main = async () => {
    const [owner, grantOwner1, grantOwner2, grantOwner3,  payee1, payee2, payee3, grantDonator1, grantDonator2, grantDonator3, matchingFundDonator] = await ethers.getSigners()

    console.log('Deploying round')
    const Round = await ethers.getContractFactory("Round")
    const roundCtc = await Round.deploy(1672520400, 1675198800)
    await roundCtc.deployed()
    console.log('Round contract:', roundCtc.address)

    console.log('Deploying Matching Fund')
    const MatchingFund = await ethers.getContractFactory("MatchingFund")
    const matchingFundCtc = await MatchingFund.deploy(0)
    await matchingFundCtc.deployed()
    console.log('MatchingFund contract:', matchingFundCtc.address)

    console.log('Someone donates 1000 AVAX to the matching fund')
    await matchingFundCtc.connect(matchingFundDonator).donate({value: ethers.utils.parseUnits('1000', 'ether')})

    console.log('Registering grants')
    await roundCtc.connect(grantOwner1).registerGrant(payee1.address, 'mock_ipfs_url1')
    await roundCtc.connect(grantOwner2).registerGrant(payee2.address, 'mock_ipfs_url2')
    await roundCtc.connect(grantOwner3).registerGrant(payee3.address, 'mock_ipfs_url3')


    console.log('Wind up time')
    await ethers.provider.send("evm_setNextBlockTimestamp", [1672521400])
    await ethers.provider.send("evm_mine")

    console.log('Direct grant donations')
    /*
        0 -> 10 2 8
        1 -> 6 2
        2 -> 20
    */
    await roundCtc.connect(grantDonator1).donate(0, {value: ethers.utils.parseUnits('10', 'ether')})
    await roundCtc.connect(grantDonator2).donate(0, {value: ethers.utils.parseUnits('2', 'ether')})
    await roundCtc.connect(grantDonator3).donate(0, {value: ethers.utils.parseUnits('8', 'ether')})

    await roundCtc.connect(grantDonator1).donate(1, {value: ethers.utils.parseUnits('6', 'ether')})
    await roundCtc.connect(grantDonator2).donate(1, {value: ethers.utils.parseUnits('2', 'ether')})

    await roundCtc.connect(grantDonator1).donate(2, {value: ethers.utils.parseUnits('20', 'ether')})

    console.log('Round ends')
    await ethers.provider.send("evm_setNextBlockTimestamp", [1675198900])
    await ethers.provider.send("evm_mine")


    console.log('Matching fund closes')
    await matchingFundCtc.functions.closeFund()

    console.log('You can run createPayoutMerkleTree.js now')
}   

main()