import {Eth} from 'web3-eth';
import {Bzz} from 'web3-bzz';
import {Shh} from 'web3-shh';
import {Network} from 'web3-net';
import {Personal} from 'web3-eth-personal';
import {AbstractWeb3Module} from 'web3-core';
import * as Utils from 'web3-utils';
import Web3 from '../../src/Web3';

// Mocks
jest.mock('Eth');
jest.mock('Shh');
jest.mock('Bzz');
jest.mock('Network');
jest.mock('Personal');
jest.mock('Utils');

/**
 * Web3 test
 */
describe('Web3Test', () => {
    let web3;

    beforeEach(() => {
        web3 = new Web3('http://', {});
    });

    it('constructor check', () => {
        expect(web3.eth).toBeInstanceOf(Eth);

        expect(web3.shh).toBeInstanceOf(Shh);

        expect(web3.bzz).toBeInstanceOf(Bzz);

        expect(web3).toBeInstanceOf(AbstractWeb3Module);
    });

    it('sets the defaultGasPrice property', () => {
        web3.defaultGasPrice = 10;

        expect(web3.defaultGasPrice).toEqual(10);

        expect(Eth.mock.instances[0].defaultGasPrice).toEqual(10);

        expect(Shh.mock.instances[0].defaultGasPrice).toEqual(10);
    });

    it('sets the defaultGas property', () => {
        web3.defaultGas = 10;

        expect(web3.defaultGas).toEqual(10);

        expect(Eth.mock.instances[0].defaultGas).toEqual(10);

        expect(Shh.mock.instances[0].defaultGas).toEqual(10);
    });

    it('sets the transactionBlockTimeout property', () => {
        web3.transactionBlockTimeout = 10;

        expect(web3.transactionBlockTimeout).toEqual(10);

        expect(Eth.mock.instances[0].transactionBlockTimeout).toEqual(10);

        expect(Shh.mock.instances[0].transactionBlockTimeout).toEqual(10);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        web3.transactionConfirmationBlocks = 10;

        expect(web3.transactionConfirmationBlocks).toEqual(10);

        expect(Eth.mock.instances[0].transactionConfirmationBlocks).toEqual(10);

        expect(Shh.mock.instances[0].transactionConfirmationBlocks).toEqual(10);
    });

    it('sets the transactionPollingTimeout property', () => {
        web3.transactionPollingTimeout = 10;

        expect(web3.transactionPollingTimeout).toEqual(10);

        expect(Eth.mock.instances[0].transactionPollingTimeout).toEqual(10);

        expect(Shh.mock.instances[0].transactionPollingTimeout).toEqual(10);
    });

    it('sets the defaultAccount property', () => {
        Utils.toChecksumAddress.mockReturnValue('0x2');

        web3.defaultAccount = '0x1';

        expect(web3.defaultAccount).toEqual('0x2');

        expect(Eth.mock.instances[0].defaultAccount).toEqual('0x1');

        expect(Shh.mock.instances[0].defaultAccount).toEqual('0x1');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('0x1');
    });

    it('sets the defaultBlock property', () => {
        web3.defaultBlock = 10;

        expect(web3.defaultBlock).toEqual(10);

        expect(Eth.mock.instances[0].defaultBlock).toEqual(10);

        expect(Shh.mock.instances[0].defaultBlock).toEqual(10);
    });

    it('calls setProvider and returns true', () => {
        const ethMock = Eth.mock.instances[0];

        const shhMock = Shh.mock.instances[0];

        const bzzMock = Bzz.mock.instances[0];

        ethMock.setProvider = jest.fn().mockReturnValueOnce(true);
        shhMock.setProvider = jest.fn().mockReturnValueOnce(true);
        bzzMock.setProvider = jest.fn().mockReturnValueOnce(true);

        expect(web3.setProvider('http://localhost', 'net')).toEqual(true);

        expect(web3.currentProvider.host).toEqual('http://localhost');

        expect(ethMock.setProvider).toHaveBeenCalledWith('http://localhost', 'net');

        expect(shhMock.setProvider).toHaveBeenCalledWith('http://localhost', 'net');

        expect(bzzMock.setProvider).toHaveBeenCalledWith('http://localhost');
    });

    it('calls the static modules property and gets the expected object', () => {
        const modules = Web3.modules;

        const eth = new modules.Eth('http://', 'net');

        const net = new modules.Net('http://', 'net');

        const personal = new modules.Personal('http://', 'net');

        const shh = new modules.Shh('http://', 'net');

        const bzz = new modules.Bzz('http://');

        expect(eth).toBeInstanceOf(Eth);

        expect(net).toBeInstanceOf(Network);

        expect(personal).toBeInstanceOf(Personal);

        expect(shh).toBeInstanceOf(Shh);

        expect(bzz).toBeInstanceOf(Bzz);
    });

    it('calls the static givenProvider property and gets the result', () => {
        expect(Web3.givenProvider).toEqual(null);
    });

    it('calls the static utils property completness', () => {
        expect(Web3.utils).toHaveProperty('isBN');
        expect(Web3.utils).toHaveProperty('isBigNumber');
        expect(Web3.utils).toHaveProperty('toBN');
        expect(Web3.utils).toHaveProperty('toTwosComplement');
        expect(Web3.utils).toHaveProperty('isAddress');
        expect(Web3.utils).toHaveProperty('isHex');
        expect(Web3.utils).toHaveProperty('isHexStrict');
        expect(Web3.utils).toHaveProperty('asciiToHex');
        expect(Web3.utils).toHaveProperty('hexToAscii');
        expect(Web3.utils).toHaveProperty('toAscii');
        expect(Web3.utils).toHaveProperty('bytesToHex');
        expect(Web3.utils).toHaveProperty('numberToHex');
        expect(Web3.utils).toHaveProperty('checkAddressChecksum');
        expect(Web3.utils).toHaveProperty('fromAscii');
        expect(Web3.utils).toHaveProperty('fromDecimal');
        expect(Web3.utils).toHaveProperty('fromUtf8');
        expect(Web3.utils).toHaveProperty('fromWei');
        expect(Web3.utils).toHaveProperty('hexToBytes');
        expect(Web3.utils).toHaveProperty('hexToNumber');
        expect(Web3.utils).toHaveProperty('hexToNumberString');
        expect(Web3.utils).toHaveProperty('hexToString');
        expect(Web3.utils).toHaveProperty('hexToUtf8');
        expect(Web3.utils).toHaveProperty('keccak256');
        expect(Web3.utils).toHaveProperty('padLeft');
        expect(Web3.utils).toHaveProperty('leftPad');
        expect(Web3.utils).toHaveProperty('rightPad');
        expect(Web3.utils).toHaveProperty('padRight');
        expect(Web3.utils).toHaveProperty('sha3');
        expect(Web3.utils).toHaveProperty('randomHex');
        expect(Web3.utils).toHaveProperty('utf8ToHex');
        expect(Web3.utils).toHaveProperty('stringToHex');
        expect(Web3.utils).toHaveProperty('toChecksumAddress');
        expect(Web3.utils).toHaveProperty('toDecimal');
        expect(Web3.utils).toHaveProperty('toHex');
        expect(Web3.utils).toHaveProperty('toUtf8');
        expect(Web3.utils).toHaveProperty('toWei');
        expect(Web3.utils).toHaveProperty('isBloom');
        expect(Web3.utils).toHaveProperty('isTopic');
        expect(Web3.utils).toHaveProperty('jsonInterfaceMethodToString');
        expect(Web3.utils).toHaveProperty('soliditySha3');
        expect(Web3.utils).toHaveProperty('getUnitValue');
        expect(Web3.utils).toHaveProperty('unitMap');
        expect(Web3.utils).toHaveProperty('getSignatureParameters');
    });
});
