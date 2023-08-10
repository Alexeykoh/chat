import {useEffect, useState} from "react";
import {socket} from "./socket.js";
import ChatForm from "./components/widgets/chat-form/UI/chat-form.jsx";
import ListMessages from "./components/entities/list-messages/UI/list-messages.jsx";

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	//
	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);


		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
		};
	}, []);

	return (
		<>
			<div className="chat">
				<ListMessages/>
				<ChatForm>

				</ChatForm>
			</div>
		</>
	);
}

export default App;
