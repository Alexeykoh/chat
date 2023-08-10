import { io } from "socket.io-client";

const IP = process.env.IP;
const PORT = process.env.PORT;
const address = `http://${IP}:${PORT}`;

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : address;

export const socket = io(URL);
