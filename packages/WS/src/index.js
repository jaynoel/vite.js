import { IPC_WS } from '@vite/vitejs-communication';
const websocket = require('websocket').w3cwebsocket;

class WS_RPC extends IPC_WS {
    constructor(path = 'ws://localhost:31420', timeout = 60000, options = {
        protocol: '',
        headers: '',
        clientConfig: '',
        retryTimes: 10,
        retryInterval: 10000
    }) {
        super({
            onEventTypes: ['error', 'close', 'connect'],
            sendFuncName: 'send',
            path
        });

        if (!path) {
            console.error( this.ERRORS.CONNECT(path) );
            return this.ERRORS.CONNECT(path);
        }

        this.timeout = timeout;
        this.protocol = options.protocol;
        this.headers = options.headers;
        this.clientConfig = options.clientConfig;

        this.reconnect();

        // Try to reconnect.
        let times = 0;
        this.on('connect', () => {
            times = 0;
        });
        this.on('close', () => {
            if (times > options.retryTimes) {
                return;
            }
            setTimeout(() => {
                times++;
                this.reconnect();
            }, options.retryInterval);
        });
    }

    reconnect() {
        this.socket = new websocket(this.path, this.protocol, undefined, this.headers, undefined, this.clientConfig);
        this.socket.onopen = () => {
            (this.socket.readyState === this.socket.OPEN) && this._connected();
        };
        this.socket.onclose = ()=>{
            this._closed();
        };
        this.socket.onerror = ()=>{
            this._errored();
        };
        this.socket.onmessage = (e) => {
            let data = (typeof e.data === 'string') ? e.data : '';
            this._parse([data]);
        };
    }

    disconnect() {
        this.socket && this.socket.close && this.socket.close();
    }
}

export default WS_RPC;