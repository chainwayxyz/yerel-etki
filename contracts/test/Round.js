const { expect } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { ethers } = require("hardhat")

describe("Round contract", function () {
    async function deployRoundFixture() {
        const [owner, grantOwner, donator1, donator2] = await ethers.getSigners()

        const Round = await ethers.getContractFactory("Round")

        const roundCtc = await Round.deploy(1672520400, 1675198800, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")

        await roundCtc.deployed()

        // Fixtures can return anything you consider useful for your tests
        return { Round, roundCtc, owner, grantOwner, donator1, donator2 }
    }

    async function registerGrant() {
        const [owner, grantOwner, donator1, donator2] = await ethers.getSigners()

        const Round = await ethers.getContractFactory("Round")

        const roundCtc = await Round.deploy(1672520400, 1675198800, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")

        await roundCtc.deployed()

        await roundCtc.connect(grantOwner).registerGrant("0xcc7F564f787bd2f68a9E44cAB265d05d68c92733", "ipfs_url")

        return { Round, roundCtc, owner, grantOwner, donator1, donator2 }
    }

    describe("Deployment", function () {
        it("Owner should be msg.sender", async function () {
            const { roundCtc, owner } = await loadFixture(deployRoundFixture)
            expect(await roundCtc.owner()).to.equal(owner.address)
        })
    })

    describe("Functionality", function () {
        describe("Before round start", function () {
            it("Should register grant", async function () {
                const { roundCtc, grantOwner } = await loadFixture(registerGrant)

                expect((await roundCtc.grants(0)).owner).to.equal(grantOwner.address)
            })

            it("Only grant owner can update grant", async function () {
                const { roundCtc, donator1 } = await loadFixture(registerGrant)

                await expect(roundCtc.connect(donator1).updateGrantPayee(0, donator1.address)).to.be.revertedWith("Not authorized!")
            })

            it("Shouldn't be able to donate", async function () {
                const { roundCtc, donator1 } = await loadFixture(registerGrant)

                await expect(roundCtc.connect(donator1).donate(0, 10000)).to.be.revertedWith("Round hasn't started yet!")
            })
        })

        describe("At round", async function () {
            const { roundCtc, grantOwner, donator1 } = await registerGrant()

            it("Shouldn't be able to register grant", async function () {
                await roundCtc.provider.send("evm_setNextBlockTimestamp", [1672525400])
                await roundCtc.provider.send("evm_mine")

                await expect(roundCtc.connect(grantOwner).registerGrant("0xcc7F564f787bd2f68a9E44cAB265d05d68c92733", "ipfs_url")).to.be.revertedWith("Round already started!")
            })

            it("Should be able to donate", async function () {
                await roundCtc.provider.send("evm_setNextBlockTimestamp", [1672525500])
                await roundCtc.provider.send("evm_mine")

                await roundCtc.connect(donator1).donate(0, 10000)

                expect(await roundCtc.grantDonations(0)).to.be.equal([10001])
            })
        })
    })
})