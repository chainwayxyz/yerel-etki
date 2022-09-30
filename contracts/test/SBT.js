const { expect } = require("chai");

describe("SBT contract", function () {
    it("Should deploy correctly", async function () {
        const [owner] = await ethers.getSigners();

        const SBT = await ethers.getContractFactory("SBT");

        const sbt = await SBT.deploy();

        expect(await sbt.hasRole(await sbt.MINTER_ROLE(), owner.address)).to.equal(true);
        expect(await sbt.hasRole(await sbt.DEFAULT_ADMIN_ROLE(), owner.address)).to.equal(true);
    });

    it("Should mint correctly", async function () {
        const [owner, user] = await ethers.getSigners();

        const SBT = await ethers.getContractFactory("SBT");

        const sbt = await SBT.deploy();

        await sbt.safeMint(user.address)

        expect(await sbt.balanceOf(user.address)).to.equal(1);
    })

    it("Shouldn't transfer", async function () {
        const [owner, user] = await ethers.getSigners();

        const SBT = await ethers.getContractFactory("SBT");

        const sbt = await SBT.deploy();

        await sbt.safeMint(user.address)

        await expect(sbt.connect(user).transferFrom(user.address, owner.address, 1)).to.be.revertedWith("SBT: Only soulbound transfers allowed");
    })
});