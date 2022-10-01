const { expect } = require("chai");
const { MerkleTree } = require("merkletreejs");
const { ethers } = require("hardhat");

describe("Payout", function () {
    let sbt
    let payout
    let merkleTree

    it("should deploy payout with merkle root", async function () {
        const [owner, user] = await ethers.getSigners();

        const Payout = await ethers.getContractFactory("Payout");
        const SBT = await ethers.getContractFactory("SBT");

        // generate merkle tree with two nodes
        const merkleTree = new MerkleTree([
            ethers.utils.solidityPack(['uint256', 'address', 'uint256'], [0, "0x0000000000000000000000000000000000000000", "100"]),
            ethers.utils.solidityPack(['uint256', 'address', 'uint256'], [1, "0x0000000000000000000000000000000000000001", "100"])
        ], ethers.utils.keccak256, { sortPairs: true });

        // get merkle root
        const merkleRoot = merkleTree.getHexRoot();

        const sbt = await SBT.deploy();
        const payout = await Payout.deploy(merkleRoot, sbt.address);

        expect(await payout.root()).to.equal(merkleRoot);
    })

    beforeEach(async function () {
        const [owner, user1, user2, user3, user4] = await ethers.getSigners();
        
        const Payout = await ethers.getContractFactory("Payout");
        const SBT = await ethers.getContractFactory("SBT");

        // generate merkle tree with two nodes
        merkleTree = new MerkleTree([
            ethers.utils.solidityKeccak256(['uint256', 'address', 'uint256'], [0, user1.address, ethers.utils.parseEther("1")]),
            ethers.utils.solidityKeccak256(['uint256', 'address', 'uint256'], [1, user2.address, ethers.utils.parseEther("2")]),
            ethers.utils.solidityKeccak256(['uint256', 'address', 'uint256'], [2, user3.address, ethers.utils.parseEther("3")]),
            ethers.utils.solidityKeccak256(['uint256', 'address', 'uint256'], [3, user4.address, ethers.utils.parseEther("4")])
        ], ethers.utils.keccak256, { sortPairs: true });

        // get merkle root
        const merkleRoot = merkleTree.getHexRoot();

        sbt = await SBT.deploy();
        payout = await Payout.deploy(merkleRoot, sbt.address);

        sbt.grantRole(await sbt.MINTER_ROLE(), payout.address);
    })

    it("should receive ether", async function () {
        const [owner, user] = await ethers.getSigners();

        await user.sendTransaction({
            to: payout.address,
            value: ethers.utils.parseEther("1.0")
        });

        expect(await ethers.provider.getBalance(payout.address)).to.equal(ethers.utils.parseEther("1.0"));
    })

    it("should claim", async function () {
        const [owner, user1, user2] = await ethers.getSigners();

        await owner.sendTransaction({
            to: payout.address,
            value: ethers.utils.parseEther("10")
        })

        const node = ethers.utils.solidityKeccak256(['uint256', 'address', 'uint256'], [0, user1.address, ethers.utils.parseEther("1")])
        const proof = merkleTree.getHexProof(
            node
        );

        let beforeBalance = await user1.getBalance()

        await payout.connect(user1).claim(0, user1.address, ethers.utils.parseEther("1"), proof);

        expect(await sbt.balanceOf(user1.address)).to.equal(1);
        expect(await user1.getBalance()).gt(beforeBalance);
    })

    it("should not claim twice", async function () {
        const [owner, user1, user2] = await ethers.getSigners();

        await owner.sendTransaction({
            to: payout.address,
            value: ethers.utils.parseEther("10")
        })

        const node = ethers.utils.solidityKeccak256(['uint256', 'address', 'uint256'], [0, user1.address, ethers.utils.parseEther("1")])
        const proof = merkleTree.getHexProof(
            node
        );

        await payout.connect(user1).claim(0, user1.address, ethers.utils.parseEther("1"), proof);

        await expect(payout.connect(user1).claim(0, user1.address, ethers.utils.parseEther("1"), proof)).to.be.revertedWith("Already claimed.");
    })
});