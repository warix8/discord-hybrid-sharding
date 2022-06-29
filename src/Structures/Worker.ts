import { Worker as Worker_Thread, parentPort, workerData, ResourceLimits, TransferListItem, SHARE_ENV } from 'worker_threads';

interface WorkerOptions {
    clusterData?: unknown;
    workerData?: unknown;
    argv?: unknown[] | undefined;
    execArgv?: string[] | undefined;
    env?: NodeJS.Dict<string> | typeof SHARE_ENV | undefined;
    eval?: boolean | undefined;
    stdin?: boolean | undefined;
    stdout?: boolean | undefined;
    stderr?: boolean | undefined;
    trackUnmanagedFds?: boolean | undefined;
    transferList?: TransferListItem[];
    resourceLimits?: ResourceLimits | undefined;
}

class Worker {
    process: Worker_Thread;
    workerOptions: WorkerOptions;
    file: string;
    
    constructor(file: string, options: WorkerOptions = {}) {
        this.file = file;
        this.process = null;

        this.workerOptions = {};

        // Custom options
        if (options.clusterData) this.workerOptions.workerData = options.clusterData;

        if (options.argv) this.workerOptions.argv = options.argv;
        if (options.execArgv) this.workerOptions.execArgv = options.execArgv;
        if (options.env) this.workerOptions.env = options.env;
        if (options.eval) this.workerOptions.eval = options.eval;
        if (options.stdin) this.workerOptions.stdin = options.stdin;
        if (options.stdout) this.workerOptions.stdout = options.stdout;
        if (options.stderr) this.workerOptions.stderr = options.stderr;
        if (options.trackUnmanagedFds) this.workerOptions.trackUnmanagedFds = options.trackUnmanagedFds;
        if (options.transferList) this.workerOptions.transferList = options.transferList;
        if (options.resourceLimits) this.workerOptions.resourceLimits = options.resourceLimits;
    }

    spawn() {
        return (this.process = new Worker_Thread(this.file, this.workerOptions));
    }

    respawn() {
        this.kill();
        return this.spawn();
    }

    kill() {
        this.process?.removeAllListeners();
        return this.process?.terminate();
    }

    send(message: unknown) {
        return new Promise((resolve) => {
            this.process?.postMessage(message);
            resolve(this);
        });
    }
}

class WorkerClient {
    ipc: Worker_Thread;
    constructor() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.ipc = parentPort;
    }
    send(message: unknown) {
        return new Promise<void>((resolve) => {
            this.ipc?.postMessage(message);
            resolve();
        });
    }

    getData() {
        return workerData;
    }
}

export { Worker, WorkerClient };
