import { useParams } from '@solidjs/router';
import { onMount, type Component, Show, createSignal } from 'solid-js';
import { Peer } from "peerjs";
import { userID } from '../signals/userID';
import Command, { Action } from '../Command';
import Message, { MessageType } from '../Message';

type RoomPageParams = {
    user_id: string;
    room_id: string;
};



interface HTMLVideoElementWithCaptureStream extends HTMLVideoElement {
    captureStream(): MediaStream;
}


const App: Component = () => {
    let videoPlayer: HTMLVideoElementWithCaptureStream | undefined;
    const params = useParams<RoomPageParams>();
    const peer = new Peer(userID());

    onMount(() => {
        console.assert(userID() !== null, "userID is null!");

        //TODO get video from user
        if (videoPlayer) videoPlayer.src = "/assets/Sintel.2010.1080p.webm";
        else console.error("videoPlayer is not defined!");

        startPeerConnection();
    });

    const startPeerConnection = () => {
        peer.on('open', _id => {
            if (userID() === params.user_id) {
                acceptConnectionsFromParticipant(peer);
            }
            else {
                acceptCallFromHost(peer);
                connectToHost(peer);
            }
        });
    }

    const acceptConnectionsFromParticipant = (peer: Peer) => {
        peer.on('connection', function (conn) {
            conn.on('open', function () {
                conn.on('data', function (data) {
                    hostMessageHandler(peer, data);
                });
            });
        });
    }

    const connectToHost = (peer: Peer) => {
        const conn = peer.connect(
            params.user_id,
            {
                reliable: true,
            });
        conn.on('open', function () {
            conn.on('data', function (data) {
                console.log('Data Received', data);
            });
            conn.send(new Message(MessageType.participantID, { participantID: userID() }));
        });
    }

    const acceptCallFromHost = (peer: Peer) => {
        peer.on('call', function (call) {
            call.answer();
            call.on('stream', function (stream) {
                //TODO make sure videoPlayer is defined
                if (!videoPlayer) {
                    console.error("videoPlayer is not defined!");
                    return;
                }
                videoPlayer.srcObject = stream;
            });
        }
        );
    }

    const hostMessageHandler = (peer: Peer, message: any) => {
        if (!message.type) {
            console.error("No message type provided!", message);
            return;
        }

        switch (message.type) {
            case MessageType.participantID:
                if (!message.data.participantID) {
                    console.error("No participant ID provided!", message);
                    return;
                }
                callParticipant(peer, message.data.participantID);
                break;
            case MessageType.command:
                console.log("Command: ", message.data);
                break;
        }
    }

    const callParticipant = (peer: Peer, participantID: string) => {
        if (!videoPlayer) {
            console.error("videoPlayer is not defined!");
            return;
        }
        const stream = videoPlayer.captureStream();
        peer.call(participantID, stream);
    }

    return (
        <div>
            <p>User ID: {userID()} {(userID() === params.user_id) ? " 👑" : ""}</p>
            <p>Room ID: {params.room_id}</p>
            <video ref={videoPlayer} controls autoplay muted width="100%">
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default App;
