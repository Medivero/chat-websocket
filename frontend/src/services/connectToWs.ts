import { Client} from '@stomp/stompjs';

import SockJS from 'sockjs-client';
import { ApiURL } from './getApi';

let stompClient: any = null;

const socket = new SockJS(ApiURL+"/chat/");
export function connect(setConnected:Function){
  stompClient = new Client({
    webSocketFactory: () => {
        return socket
    },
    onConnect: () => {
      console.log('WebSocket connected');
      stompClient.subscribe('/topic/messages', (message: { body: string; }) => {
        const data = JSON.parse(message.body);
        console.log("Получено сообщение")
        setConnected(data)
      });
    },
    onStompError: (error) => {
        console.log(error)
    },
    onWebSocketError: (error) => {
        console.log(error)
    },
    onWebSocketClose: (msg) => {
        console.log(msg)
    }
  })
  stompClient.activate();
};

export const sendMessage = (message: any) => {
    if (stompClient && stompClient.connected === true){
        stompClient.publish({
            destination: '/app/send',
            body: JSON.stringify(message),
        });
    }
    else{
        console.log("something went wrong")
    }
  
};
