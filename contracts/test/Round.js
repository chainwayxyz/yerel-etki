const { expect } = require("chai");

describe("Round contract", function () {
  it("After deployment owner should be msg.sender", async function () {
    const [owner] = await ethers.getSigners();

    const Round = await ethers.getContractFactory("Round");

    const roundCtc = await Round.deploy(1672520400, 1675198800, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");

    expect(await roundCtc.owner()).to.equal(owner.address);
  });
});