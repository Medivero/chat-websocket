import { ApiURL } from "./getApi";

async function getHistory(){
    const res = await fetch(ApiURL+"/api/chatHistory/getHistory",{
        method: "GET"
    })
    const data = res.json();
    return data;
}
export default getHistory;