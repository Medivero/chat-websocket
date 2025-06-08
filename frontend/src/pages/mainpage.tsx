import { Suspense, useEffect, useState } from "react"
import { connect, sendMessage } from "../services/connectToWs";
import getHistory from "../services/getHistory";
import ChatTable from "../widgets/chatTable/chatTable";
import { Message } from "../interfaces/interfaces";
import { useForm } from "react-hook-form";

function MainPage(){
     const [connected, setConnected] = useState(false);
     const [history,setHistory] = useState<Message[]>();
     const [isMounting,setIsMounting] = useState(false)
     const MessageeForm = useForm();
    useEffect(() => {
        connect(setConnected);
        getHistory().then((data) => {
            setHistory(data)
        })
    },[])
    useEffect(() => {
        if (isMounting){
            getHistory().then((data) => {
                setHistory(data)
            })
        }
        else{
            setIsMounting(true)
        }
    },[connected])
    const getMessageForm = (data:any) => {
        const content = {
            content: data.message
        }
        try{
            sendMessage(content)
            MessageeForm.reset();
        } catch(error){
            console.log(error)
        }
        
    }
    return (
        <>
        <div className="p-[20px] flex flex-col gap-[20px]">
            <Suspense fallback="loading">
                <ChatTable history={history}></ChatTable>
            </Suspense>
            <form onSubmit={MessageeForm.handleSubmit(getMessageForm)} className="flex gap-[20px]">
                <input {...MessageeForm.register("message")} placeholder="Ваше сообщение" className="border"></input>
                <button type="submit" className="border">Отправить</button>
            </form>
        </div>
        </>
    )
}

export default MainPage;