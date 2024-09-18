enum SubscriptionTypes {
    NEW_HEADS = 'newHeads',
    NEW_PENDING_TRANSACTIONS = 'newPendingTransactions',
    NEW_DAG_BLOCK = 'newDagBlocks',
    NEW_DAG_BLOCK_FINALIZED = 'newDagBlocksFinalized',
    NEW_PBFT_BLOCK = 'newPbftBlocks',
}

class DAGBlock {
    constructor(
        public hash: string,
        public level: number,
        public pivot: string,
        public tips: string[],
        public timestamp: number
    ) {
    }

    static fromJSON(data: {
        hash: string;
        level: string;
        pivot: string;
        tips: string[];
        timestamp: string;
    }) {
        return new DAGBlock(
            data.hash,
            parseInt(data.level, 16),
            data.pivot,
            data.tips,
            parseInt(data.timestamp, 16)
        );
    }
}

class DAGBlockFinalized {
    constructor(
        public hash: string,
        public period: number
    ) {
    }

    static fromJSON(data: { block: string; period: string }) {
        return new DAGBlockFinalized(data.block, parseInt(data.period, 16));
    }
}

export class WSClient {
    private ws: WebSocket;
    private subscriptions: SubscriptionTypes[] = [];
    private subscriptionIds: {
        [key: string]: SubscriptionTypes;
    } = {};

    onGetBlock: Function;
    onNewHeads: Function;
    onBlockFinalized: Function;

    constructor(url: string, onGetBlock: Function, onBlockFinalized: Function, onNewHeads: Function) {
        this.ws = new WebSocket(url);
        this.onGetBlock = onGetBlock;
        this.onBlockFinalized = onBlockFinalized;
        this.onNewHeads = onNewHeads;

        console.log('Connected to websocket server');
        this.on(SubscriptionTypes.NEW_DAG_BLOCK, (data: any) => {
        })
        this.on(SubscriptionTypes.NEW_DAG_BLOCK_FINALIZED, (data: any) => {
        })
        // this.on(SubscriptionTypes.NEW_HEADS, (data: any) => {
        // })

        // this.subscribe(SubscriptionTypes.NEW_HEADS);
        // this.subscribe(SubscriptionTypes.NEW_PENDING_TRANSACTIONS);
        this.subscribe(SubscriptionTypes.NEW_DAG_BLOCK);
        this.subscribe(SubscriptionTypes.NEW_DAG_BLOCK_FINALIZED);
        // this.subscribe(SubscriptionTypes.NEW_PBFT_BLOCK);
        this.listen()
    }

    subscribe(event: SubscriptionTypes) {
        this.subscriptions.push(event);
    }

    on(event: SubscriptionTypes, callback: (data: any) => void) {
        this.ws.addEventListener('message', (msg: MessageEvent) => {
            const data = JSON.parse(msg.data);
            //s console.log(data);
            if (!data.method) {
                this.subscriptionIds[data.result] = this.subscriptions[data.id - 1];
            }
            if (data.method === 'eth_subscription') {
                const params = data.params;
                if (this.subscriptionIds[params.subscription] === event) {
                    let result = params.result;
                    //   console.log(event, result);
                    if (event === SubscriptionTypes.NEW_DAG_BLOCK) {
                        this.onGetBlock(result);
                    } else if (event === SubscriptionTypes.NEW_DAG_BLOCK_FINALIZED) {
                        this.onBlockFinalized(result);
                    } else if (event === SubscriptionTypes.NEW_HEADS) {
                        this.onNewHeads(result);
                    }
                }
            }
        });
    }

    listen() {
        this.ws.addEventListener('open', () => {
            for (let i = 0; i < this.subscriptions.length; i++) {
                this.ws.send(
                    JSON.stringify({
                        jsonrpc: '2.0',
                        id: i + 1,
                        method: 'eth_subscribe',
                        params: [this.subscriptions[i]],
                    })
                );
            }
        });
    }
}