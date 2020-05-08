import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

function Socket({ testProperty, toggleTest, getMovies }) {
    const [response, setResponse] = useState("");
    const [handle, setHandle] = useState("");
    const [message, setmessage] = useState("");
    const [socket, setSocket] = useState();

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        socket.on("chat", (data) => {
            setResponse(data);
        });

        setSocket(socket);
    }, []);

    async function login() {
        try {
            const res = await fetch(
                "http://localhost:4000/api/user/login",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: "brianbcao@gmail.com",
                        password: "123456",
                    }),
                }
            );
            const { token } = await res.json();
            console.log(token);

            document.cookie = `accessToken=${token}`;
            window.sessionStorage.accessToken = token;
            
        } catch (e) {
            console.log("ERROR!!!!!!!!!!");
            console.log(new Error("error is me" + e));
        }
    }

    function emit() {
        //name of message
        console.log("emit!");
        socket.emit("chat", { message });
    }

    return (
        <div>
            TEST: {response.message}
            <div>
                <input
                    id="handle"
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="Hande"
                />
                <input
                    id="message"
                    type="text"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                    placeholder="Message"
                />
                <button id="send" onClick={emit}>
                    Send
                </button>

                <button id="login" onClick={login}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Socket;
