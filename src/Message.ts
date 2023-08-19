export enum MessageType {
    participantID = "pid",
    command = "cmd"
}
export default class Message {
    type: MessageType;
    data: any;
    constructor(type: MessageType, data: any) {
        this.type = type;
        this.data = data;
    }
}