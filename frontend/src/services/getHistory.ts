import { ApiURL } from "./getApi";
import Cookies from "js-cookie";
async function getHistory(){
    const res = await fetch(ApiURL+"/api/chatHistory/getHistory",{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${Cookies.get("token")}`
        }
    })
    const data = res.json();
    return data;
}
export default getHistory;