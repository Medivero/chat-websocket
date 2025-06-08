import { ApiURL } from "../getApi"
import Cookies from 'js-cookie'


export interface LoginFormType{
    name:string,
    password:string
}

export async function LoginUser(LoginForm:LoginFormType){
    const res = await fetch(ApiURL+`/api/user/loginUser`,{
        method: "POST",
        headers: {
         'Content-Type': 'application/json',
         "Authorization": "Bearer "
        },
        body: JSON.stringify(LoginForm)
    })
    try{
        console.log(res.status)
        if (res.ok){
            const data = await res.json();
            Cookies.set("token",data.token)
            return true
        }
        else{
            throw new Error("Ошибка при попытке входа")
        }
    } catch (error){
        console.log(error)
        return false
    }
}