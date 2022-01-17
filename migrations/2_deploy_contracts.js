const MyToken = artifacts.require('MyToken.sol');
const MyTokenSale = artifacts.require('MyTokenSale.sol');


module.exports = async function(deployer){

    const addr = await web3.get.ethAccounts();

    await deployer.deploy(MyToken, 1000000000);
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address);

    let tokenInstance = await MyToken.deployed();
    await tokenInstance.transfer(MyTokenSale.address, 100000000);
};