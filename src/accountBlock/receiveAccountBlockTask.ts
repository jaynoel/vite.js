import { isValidAddress } from  '~@vite/vitejs-wallet/address';
import { checkParams, isHexString } from '~@vite/vitejs-utils';

import Transaction from './transaction';

import { Address, Hex, ProviderType, AccountBlockBlock } from './type';

export class ReceiveAccountBlockTask {
    address: Address;

    private provider: ProviderType
    private _transaction: Transaction
    private _timer: any
    private successCB: Function
    private errorCB: Function

    constructor({ address, provider, privateKey }: {
        address: Address; provider: ProviderType; privateKey: Hex;
    }) {
        const err = checkParams({ address, provider, privateKey }, [ 'address', 'provider', 'privateKey' ], [ {
            name: 'address',
            func: isValidAddress
        }, {
            name: 'privateKey',
            func: isHexString
        } ]);
        if (err) {
            throw err;
        }

        this.address = address;
        this.provider = provider;

        this._transaction = new Transaction(address);
        this._transaction.setProvider(provider).setPrivateKey(privateKey);

        this._timer = null;

        this.successCB = null;
        this.errorCB = null;
    }

    start({
        checkTime = 3000,
        transctionNumber = 5
    }: {
        checkTime: number;
        transctionNumber: number;
    } = {
        checkTime: 3000,
        transctionNumber: 5
    }) {
        this.stop();

        const toReceive = () => {
            this._timer = setTimeout(async () => {
                await this.reveive(transctionNumber);
                if (!this._timer) {
                    return;
                }
                toReceive();
            }, checkTime);
        };
        toReceive();
    }

    stop() {
        this._timer && clearTimeout(this._timer);
        this._timer = null;
    }

    onError(errorCB: Function) {
        this.errorCB = errorCB;
    }

    onSuccess(successCB: Function) {
        this.successCB = successCB;
    }

    private async reveive(pageSize: number) {
        let unreceivedBlocks = null;
        try {
            unreceivedBlocks = await this.getUnreceivedBlocks(pageSize);
        } catch (error) {
            this.emitError({
                message: 'Get unreceivedAccountBlocks error',
                error
            });
            return;
        }

        if (!unreceivedBlocks.length) {
            this.emitSuccess({ message: 'Don\'t have unreceivedAccountBlocks.' });
            return;
        }

        const accountBlockList = [];
        for (let i = 0; i < unreceivedBlocks.length; i++) {
            const unreceivedBlock = unreceivedBlocks[i];
            const previousAccountBlock = accountBlockList.length
                ? accountBlockList[accountBlockList.length - 1]
                : null;

            const sendBlockHash = unreceivedBlock.hash;
            let accountBlock = null;

            try {
                accountBlock = await this.receiveAccountBlockByPrevious({
                    sendBlockHash: unreceivedBlock.hash,
                    previousAccountBlock
                });
                accountBlockList.push(accountBlock);
            } catch (error) {
                accountBlockList.length && this.emitSuccess({
                    message: 'Receive accountBlock success',
                    accountBlockList
                });

                this.emitError({
                    message: `Receive accountBlock ${ sendBlockHash } error`,
                    unreceivedHash: sendBlockHash,
                    error
                });
                return;
            }
        }

        this.emitSuccess({
            message: 'Receive accountBlock success',
            accountBlockList
        });
        return;
    }

    private emitSuccess(result: { message: string; accountBlockList?: AccountBlockBlock[] }) {
        this.successCB && this.successCB({
            status: 'ok',
            timestamp: new Date().getTime(),
            ...result
        });
    }

    private emitError(error: { message: string; error: any; unreceivedHash?: Hex; }) {
        this.errorCB && this.errorCB({
            status: 'error',
            timestamp: new Date().getTime(),
            ...error
        });
    }

    private async getUnreceivedBlocks(pageSize) {
        const data = await this.provider.request('ledger_getUnreceivedBlocksByAddress', this.address, 0, pageSize);
        if (!data || !data.length) {
            return [];
        }
        return data;
    }

    private receiveAccountBlockByPrevious({ sendBlockHash, previousAccountBlock }) {
        const accountBlock = this._transaction.receive({ sendBlockHash });

        if (!previousAccountBlock) {
            return accountBlock.autoSendByPoW();
        }

        accountBlock.setPreviousAccountBlock(previousAccountBlock);
        return accountBlock.sendByPoW();
    }
}
