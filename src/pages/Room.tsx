import { useParams } from '@solidjs/router';
import { onMount, type Component } from 'solid-js';
import { Peer } from "peerjs";
import { userID } from '../signals/userID';

type RoomPageParams = {
    user_id: string;
    room_id: string;
};

const App: Component = () => {

    onMount(() => {
        console.assert(userID() !== null, "userID is null!");
        const peer = new Peer(userID());
        if (userID() === params.user_id) {
            acceptConnections(peer);
        }
        else {
            callHost(peer);
        }
    });

    const acceptConnections = (peer: Peer) => {
        // user is the host, accept connections
        console.log("User is the host! Accepting connections...");
        peer.on("connection", (conn) => {
            conn.on("data", (data) => {
                // Will print 'hi!'
                console.log(data);
            });
            conn.on("open", () => {
                console.log("Connection open");
                conn.send("hello!");
            });
            conn.on("iceStateChanged", (data) => {
                // Will print 'hi!'
                console.log("iceStateChanged", data);
            });
            conn.on("close", () => {
                // Will print 'hello!'
                console.error("closed");
            });
            conn.on("error", (error) => {
                // Will print 'hello!'
                console.error(error);
            });
        });
    }

  
    const callHost = (peer: Peer) => {
        console.log(`user is not the host, calling ${params.user_id}`);
        const conn = peer.connect(params.user_id);
       
        conn.on("open", () => {
            console.log("Connection open");
            conn.send("hi!");
        });
        conn.on("data", (data) => {
            console.log(data);
        });
        conn.on("close", () => {
            console.error("closed");
        });
        conn.on("error", (error) => {
            console.error(error);
        });

    }
    const params = useParams<RoomPageParams>();

    return (
        <div>
            {params.room_id}
        </div>
    );
};

export default App;
