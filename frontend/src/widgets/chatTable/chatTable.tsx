import { Message } from "../../interfaces/interfaces";

interface HistoryType{
    history:Message[]
}

function ChatTable({history}:HistoryType){
    console.log(history)
    return(
        <>
        <div className="border h-[500px] w-full flex flex-col py-[20px] px-[30px] overflow-y-scroll gap-[20px]">
            {history ? history.map((item) => (
                <div key={item.id} className="border-b w-full flex justify-between bg-gray-200">
                    <span>{item.content}</span>
                    <span className="text-[10px]">{item.time.split("T")[0]}</span>
                </div>
            )): ""}
        </div>
        </>
    )
}

export default ChatTable;