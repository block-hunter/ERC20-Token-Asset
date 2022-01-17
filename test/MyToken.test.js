const Token = artifacts.require("MyToken");

// Chai Setup
const chai = require('chai');

const BN = web3.utils.BN;
const chaiBn = require('chai-bn')(BN);
chai.use(chaiBn)

let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async accounts => {
    const [ initialHolder, recipient, anotherAccount ] = accounts;

    it('All tokens should be in my account', async () => {
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();

        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it('I can send tokens account 1 to account 2', async () => {
        const sendTokens = 100;
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();

        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("It's not possible send tokens account 1 has", async () => {
        let instance = await Token.deployed();
        let balanceOfAccount = await instance.balanceOf(initialHolder);
        await expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.a.rejected;

        //check if balance is same
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });

})
