async function getHistory(){
    const res = await fetch("http://localhost:5050/api/chatHistory/getHistory",{
        method: "GET"
    })
    const data = res.json();
    return data;
}
export default getHistory;