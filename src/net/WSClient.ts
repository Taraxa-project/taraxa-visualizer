enum SubscriptionTypes {
    NEW_DAG_BLOCK = 'newDagBlocks',
    NEW_DAG_BLOCK_FINALIZED = 'newDagBlocksFinalized',
    NEW_PBFT_BLOCK = 'newPbftBlocks',
}

export class WSClient {
    private ws: WebSocket;
    private subscriptions: SubscriptionTypes[] = [];
    private subscriptionIds: {
        [key: string]: SubscriptionTypes;
    } = {};

    onGetBlock: Function;
    onNewPBFT: Function;
    onBlockFinalized: Function;

    constructor(url: string, onGetBlock: Function, onBlockFinalized: Function, onNewPBFT: Function) {
        this.ws = new WebSocket(url);
        this.onGetBlock = onGetBlock;
        this.onBlockFinalized = onBlockFinalized;
        this.onNewPBFT = onNewPBFT;
        this.on(SubscriptionTypes.NEW_DAG_BLOCK)
        this.on(SubscriptionTypes.NEW_DAG_BLOCK_FINALIZED)
        this.on(SubscriptionTypes.NEW_PBFT_BLOCK)
        this.subscribe(SubscriptionTypes.NEW_DAG_BLOCK);
        this.subscribe(SubscriptionTypes.NEW_DAG_BLOCK_FINALIZED);
        this.subscribe(SubscriptionTypes.NEW_PBFT_BLOCK);
        this.listen()
    }

    subscribe(event: SubscriptionTypes) {
        this.subscriptions.push(event);
    }

    on(event: SubscriptionTypes) {
        this.ws.addEventListener('message', (msg: MessageEvent) => {
            const data = JSON.parse(msg.data);
            if (!data.method) {
                this.subscriptionIds[data.result] = this.subscriptions[data.id - 1];
            }
            if (data.method === 'eth_subscription') {
                const params = data.params;
                if (this.subscriptionIds[params.subscription] === event) {
                    let result = params.result;
                    if (event === SubscriptionTypes.NEW_DAG_BLOCK) {
                        this.onGetBlock(result);
                    } else if (event === SubscriptionTypes.NEW_DAG_BLOCK_FINALIZED) {
                        this.onBlockFinalized(result);
                    } else if (event === SubscriptionTypes.NEW_PBFT_BLOCK) {
                        this.onNewPBFT(result.pbft_block);
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