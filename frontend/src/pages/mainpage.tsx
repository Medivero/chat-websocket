import { useEffect, useState } from "react"
import { connect, sendMessage } from "../services/connectToWs";
import getHistory from "../services/getHistory";

function MainPage(){
     const [connected, setConnected] = useState(false);
     const [history,setHistory] = useState();
     const [isMounting,setIsMounting] = useState(false)
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
    const getMessageForm = (event:any) => {
        event.preventDefault()
        const content = {
            content: event.target.message.value
        }
        sendMessage(content)
        
    }
    return (
        <>
        <div className="p-[20px]">
            <form onSubmit={getMessageForm} className="flex gap-[20px]">
                <input name="message" placeholder="" className="border"></input>
                <button type="submit" className="border">Отправить</button>
            </form>
            
            {
                history ? (
                    <>
                        <div className="flex flex-col">
                            {history.map((item,index) => (
                                <div key={index}>
                                    {item.content}
                                </div>
                            ))}
                        </div>
                    </>
                ) : ""
            }
            
        </div>
        </>
    )
}

export default MainPage;