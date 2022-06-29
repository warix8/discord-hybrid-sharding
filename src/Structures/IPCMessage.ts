import ClusterClient from '../Core/ClusterClient.js';
import ClusterManager from '../Core/ClusterManager.js';
import { messageType } from '../Util/Constants.js';
import Util from '../Util/Util.js';

export interface Message {
    _sCustom?: boolean;
    nonce?: string;
    _type?: messageType;
}

class BaseMessage {
    nonce: string;
    private _raw: Message;
    private _type: messageType;
    private _sCustom: boolean;

    constructor(message: Message = {}) {
        /**
         * Creates a Message ID for identifying it for further Usage such as on replies
         * @type {string}
         */
        this.nonce = message.nonce || Util.generateNonce();
        message.nonce = this.nonce;

        /**
         * Destructs the Message Object and initializes it on the Constructor
         * @type {string}
         */
        this._raw = this.destructMessage(message);

    }

    /**
     * Destructs the Message Object and initializes it on the Constructor
     * @param {object} message The Message, which was passed in the Constructor
     */
    destructMessage(message: Message) {
        for (const [key, value] of Object.entries(message)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this[key] = value;
        }
        this.nonce = message.nonce;
        this._type = message._type || messageType.CUSTOM_MESSAGE;
        if(message._type === messageType.CUSTOM_MESSAGE){
            this._sCustom = true;
            message._sCustom = true;
        }
        return message;
    }

    toJSON() {
        return this._raw;
    }
}

class IPCMessage extends BaseMessage {
    instance: ClusterManager|ClusterClient;
    _sRequest: any;
    constructor(instance: ClusterManager|ClusterClient, message: Message) {
        super(message);

        /**
         * Instance, which can be the ParentCluster or the ClusterClient
         * @type {ClusterManager|ClusterClient}
         */
        this.instance = instance;

        /**
         * The Base Message, which is saved on the raw field.
         * @type {BaseMessage}
         */
        this.raw = new BaseMessage(message).toJSON();
    }

    /**
     * Sends a message to the cluster's process/worker or to the ParentCluster.
     * @param {BaseMessage} message Message to send to the cluster/client
     * @returns {Promise<*>}
     */
    async send(message: BaseMessage = {}): Promise<unknown> {
        if (typeof message !== 'object') throw new TypeError('The Message has to be a object');
        message._type = messageType.CUSTOM_MESSAGE;
        message = new BaseMessage(message);
        return this.instance.send(message.toJSON());
    }

    /**
     * Sends a Request to the cluster's process/worker or to the ParentCluster.
     * @param {BaseMessage} message Request to send to the cluster/client
     * @returns {Promise<reply>}
     */
    async request(message: BaseMessage): Promise<reply> {
        if (typeof message !== 'object') throw new TypeError('The Message has to be a object');
        message.nonce = this.nonce;
        message._type = messageType.CUSTOM_REQUEST;
        message._sRequest = true;
        message._sReply = false;
        message = new BaseMessage(message);
        return this.instance.request(message.toJSON());
    }

    /**
     * Sends a Reply to Message from the cluster's process/worker or the ParentCluster.
     * @param {BaseMessage} message Reply to send to the cluster/client
     * @returns {Promise<reply>}
     */
    async reply(message: BaseMessage): Promise<reply> {
        if (typeof message !== 'object') throw new TypeError('The Message has to be a object');
        message.nonce = this.raw.nonce;
        message._type = messageType.CUSTOM_REPLY;
        message._sReply = true;
        message._sRequest = false;
        message._result = {...message}
        message = new BaseMessage(message);
        return this.instance.send(message.toJSON());
    }
}
export { IPCMessage, BaseMessage };
