const fs = require("fs");
const colors = require("colors");
const { ethers } = require("hardhat");
async function main() {
    // get network
    let [owner] = await ethers.getSigners();
    console.log(owner.address);
    let network = await owner.provider._networkPromise;

    //QE token deployment
    const COINFLIP = await ethers.getContractFactory("Coinflip");
    const coinflipContract = await COINFLIP.deploy();

}

main()
    .then(() => {
        console.log("complete".green);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
