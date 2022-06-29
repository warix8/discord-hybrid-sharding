export const Events = {
    ERROR: 'warn',
    WARN: 'error',
};

export const DefaultOptions = {
    http: {
        api: 'https://discord.com/api',
        version: '10',
    },
};

export const Endpoints = {
    botGateway: '/gateway/bot',
};

export enum messageType {
    'CLIENT_SPAWN_NEXT_CLUSTER' = 'CLIENT_SPAWN_NEXT_CLUSTER',
    'CLIENT_RESPAWN' = 'CLIENT_RESPAWN',
    'CLIENT_RESPAWN_ALL' = 'CLIENT_RESPAWN_ALL',
    'CLIENT_MAINTENANCE' = 'CLIENT_MAINTENANCE',
    'CLIENT_MAINTENANCE_ENABLE' = 'CLIENT_MAINTENANCE_ENABLE',
    'CLIENT_MAINTENANCE_DISABLE' = 'CLIENT_MAINTENANCE_DISABLE',
    'CLIENT_MAINTENANCE_ALL' = 'CLIENT_MAINTENANCE_ALL',
    'CLIENT_READY' = 'CLIENT_READY',
    'CUSTOM_REQUEST' = 'CUSTOM_REQUEST',
    'CUSTOM_REPLY' = 'CUSTOM_REPLY',
    'CUSTOM_MESSAGE' = 'CUSTOM_MESSAGE',
    'HEARTBEAT' = 'HEARTBEAT',
    'HEARTBEAT_ACK' = 'HEARTBEAT_ACK',
    'CLIENT_BROADCAST_REQUEST' = 'CLIENT_BROADCAST_REQUEST',
    'CLIENT_BROADCAST_RESPONSE' = 'CLIENT_BROADCAST_RESPONSE',
    'CLIENT_EVAL_REQUEST' = 'CLIENT_EVAL_REQUEST',
    'CLIENT_EVAL_RESPONSE' = 'CLIENT_EVAL_RESPONSE',
    'CLIENT_MANAGER_EVAL_REQUEST' = 'CLIENT_MANAGER_EVAL_REQUEST',
    'CLIENT_MANAGER_EVAL_RESPONSE' = 'CLIENT_MANAGER_EVAL_RESPONSE',
    'MANAGER_BROADCAST_REQUEST' = 'MANAGER_BROADCAST_REQUEST',
    'MANAGER_BROADCAST_RESPONSE' = 'MANAGER_BROADCAST_RESPONSE',
}

/*export const messageType = createEnum([
    'CLIENT_SPAWN_NEXT_CLUSTER',
    'CLIENT_RESPAWN',
    'CLIENT_RESPAWN_ALL',
    'CLIENT_MAINTENANCE',
    'CLIENT_MAINTENANCE_ENABLE',
    'CLIENT_MAINTENANCE_DISABLE',
    'CLIENT_MAINTENANCE_ALL',
    'CLIENT_READY',
    'CUSTOM_REQUEST',
    'CUSTOM_REPLY',
    'CUSTOM_MESSAGE',
    'HEARTBEAT',
    'HEARTBEAT_ACK',
    'CLIENT_BROADCAST_REQUEST',
    'CLIENT_BROADCAST_RESPONSE',
    'CLIENT_EVAL_REQUEST',
    'CLIENT_EVAL_RESPONSE',
    'CLIENT_MANAGER_EVAL_REQUEST',
    'CLIENT_MANAGER_EVAL_RESPONSE',
    'MANAGER_BROADCAST_REQUEST',
    'MANAGER_BROADCAST_RESPONSE',
]);

function createEnum(keys: string[]): object {
    const obj = {};
    for (const [index, key] of keys.entries()) {
        if (key === null) continue;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        obj[key] = index;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        obj[index] = key;
    }
    return obj;
}*/
