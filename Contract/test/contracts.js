const { ethers } = require("hardhat");
const { toBigNum } = require("./utils.js");

var owner;
const provider = ethers.provider;

var coinflipContract;

async function increaseOwnerFunds() {
  // Get the owner's account
  const [owner] = await ethers.getSigners();

  // Set the desired balance for the owner's account
  const provider = ethers.provider;
  await provider.send("hardhat_impersonateAccount", [owner.address]); // Impersonate the owner's account
  await provider.send("hardhat_setBalance", [
    owner.address,
    "0x10000000000000000000000000000", // 100 ETH in hex format
  ]);

  // Verify the updated balance
  const updatedBalance = await ethers.provider.getBalance(owner.address);
  console.log("Updated balance:", ethers.utils.formatEther(updatedBalance));
}

// increaseOwnerFunds();

describe("deploy contracts", function () {
  it("Create account", async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    console.log("This is owner address : ", owner.address);
    const balance = await provider.getBalance(owner.address);
    console.log("After amount", balance);
    var tx = await owner.sendTransaction({
      to: addr1.address,
      value: ethers.utils.parseUnits("3", 18),
    });
    await tx.wait();
  });

  it("deploy contracts", async function () {
    //QE token deployment
    const COINFLIP = await ethers.getContractFactory("Coinflip");
    coinflipContract = await COINFLIP.deploy();
    await coinflipContract.deployed();
  });
});

describe("contracts test", function () {
  it("contract test", async () => {
    let tx = await coinflipContract.fundContract({
      value: toBigNum("4", 18),
    });
    let txFlip = await coinflipContract
      .connect(addr1)
      .flip(1, { value: toBigNum("1", 18) });
    await txFlip.wait;
    let receipt = await txFlip.wait();
    // console.log(receipt.events);
    for (const event of receipt.events) {
      console.log(`Event ${event.event} with args ${event.args}`);
    }
    txFlip = await coinflipContract
      .connect(addr1)
      .flip(1, { value: toBigNum("1", 18) });
    await txFlip.wait;
    receipt = await txFlip.wait();
    // console.log(receipt.events);
    for (const event of receipt.events) {
      console.log(`Event ${event.event} with args ${event.args}`);
    }

    txFlip = await coinflipContract
      .connect(addr1)
      .flip(1, { value: toBigNum("1", 18) });
    await txFlip.wait;
    receipt = await txFlip.wait();
    // console.log(receipt.events);
    for (const event of receipt.events) {
      console.log(`Event ${event.event} with args ${event.args}`);
    }
  });
});
