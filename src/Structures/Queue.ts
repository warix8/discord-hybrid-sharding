import Util from '../Util/Util';

interface Item {
    // eslint-disable-next-line no-unused-vars
    run(...a: unknown[]): Promise<unknown>;
    time? : number;
    args: number[],
    timeout: number,
}

export default class Queue {
    options: { auto?: boolean; timeout?: number; };
    queue: Item[];
    paused: boolean;
    constructor(options: {
        auto?: boolean;
        timeout?: number;
    } = {}) {
        this.options = options;
        this.queue = [];
        this.paused = false;
    }

    /**
     * Starts the queue and run's the item functions
     * @returns {Promise<Queue>}
     */
    async start(): Promise<Queue|void> {
        if (!this.options.auto) {
            return new Promise<void>(resolve => {
                const interval = setInterval(() => {
                    if (this.queue.length === 0) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 200);
            });
        }

        const length = this.queue.length;
        for (let i = 0; i < length; i++) {
            if(!this.queue[0]) continue;
            const timeout = this.queue[0].timeout;
            await this.next();
            await Util.delayFor(timeout);
        }
        return this;
    }

    /**
     * Goes to the next item in the queue
     * @returns {Promise<any>}
     */
    async next() {
        if (this.paused) return;
        const item = this.queue.shift();
        if (!item) return true;
        return item.run(...item.args);
    }

    /**
     * Stop's the queue and blocks the next item from running
     * @returns {Queue}
     */
    stop() {
        this.paused = true;
        return this;
    }

    /**
     * Resume's the queue
     * @returns {Queue}
     */
    resume() {
        this.paused = false;
        return this;
    }

    /**
     * Adds an item to the queue
     * @param item
     * @returns {Queue}
     */
    add(item: Item) {
        this.queue.push({
            run: item.run,
            args: item.args,
            time: Date.now(),
            timeout: item.timeout ?? this.options.timeout,
        });
        return this;
    }
}
