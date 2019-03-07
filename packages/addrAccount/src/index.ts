import * as privToAddr from '@vite/vitejs-privtoaddr';
import client from '@vite/vitejs-client';
import { Snapshot_Gid } from '@vite/vitejs-constant';

import { Hex, Address } from "./type";

export default class AddrAccount {
    address: Address
    realAddress: string
    _client: client

    constructor({ address, client, realAddress }: {
        address: Address, client: client, realAddress: Hex
    }) {
        if (!privToAddr.isValidHexAddr(address)) {
            throw `Illegal address ${address}.`;
        }

        this.address = address;
        this.realAddress = realAddress ? realAddress : privToAddr.getAddrFromHexAddr(this.address);

        this._client = client;
    }

    getBalance() {
        return this._client.buildinLedger.getBalance(this.address);
    }

    getOnroad() {
        return this._client.onroad.getAccountOnroadInfo(this.address);
    }

    getOnroadBlocks({
        index, pageCount = 50
    }) {
        return this._client.onroad.getOnroadBlocksByAddress(this.address, index, pageCount);
    }

    getBlocks({
        index, pageCount = 50
    }) {
        return this._client.ledger.getBlocksByAccAddr(this.address, index, pageCount);
    }

    getAccountBalance() {
        return this._client.ledger.getAccountByAccAddr(this.address);
    }

    getLatestBlock() {
        return this._client.ledger.getLatestBlock(this.address);
    }

    getBlockByHeight(height) {
        return this._client.ledger.getBlockByHeight(this.address, height);
    }

    getBlocksByHash({
        hash, num
    }) {
        return this._client.ledger.getBlocksByHash(this.address, hash, num);
    }

    getBlocksByHashInToken({
        hash, tokenId, num
    }) {
        return this._client.ledger.getBlocksByHashInToken(this.address, hash, tokenId, num);
    }

    getFittestSnapshotHash(sendblockHash) {
        return this._client.ledger.getFittestSnapshotHash(this.address, sendblockHash);
    }

    getPledgeQuota() {
        return this._client.pledge.getPledgeQuota(this.address);
    }

    getPledgeList({
        index, pageCount
    }) {
        return this._client.pledge.getPledgeList(this.address, index, pageCount);
    }

    getRegistrationList() {
        return this._client.register.getRegistrationList(Snapshot_Gid, this.address);
    }

    getVoteInfo() {
        return this._client.vote.getVoteInfo(Snapshot_Gid, this.address);
    }

    getTxList({
        index, pageCount = 50, totalNum = null
    }) {
        return this._client.buildinLedger.getTxList({
            addr: this.address, index, pageCount, totalNum
        });
    }
}
