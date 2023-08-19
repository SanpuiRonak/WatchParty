export enum Action {
    pause,
    play,
    seekTo,
}

export default class Command {
    action: Action;
    videoTimeStamp: number;
    actionTimeStamp: number;
    constructor(action: Action, videoTimeStamp: number) {
        this.action = action;
        this.videoTimeStamp = videoTimeStamp;
        this.actionTimeStamp = Date.now();
    }

}