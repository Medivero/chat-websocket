import { ApiURL } from "../getApi"
import Cookies from "js-cookie"
interface RegistrateUserType{
    name: string,
    password: string
}


export async function RegistrateUser(form:RegistrateUserType){
    const res = await fetch(ApiURL+"/api/user/createUser",{
        method:"POST",
        headers: {
         'Content-Type': 'application/json',
         "Authorization": `Bearer `
        },
        body: JSON.stringify(form)
    })
    try{
        if (res.ok){
            const data = await res.json();
            Cookies.set("token",data.token)
            return true
        }
        else{
            throw new Error(res.statusText)
        }
    } catch (error){
        console.log(error)
        return false
    }
}