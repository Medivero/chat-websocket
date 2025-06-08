import { create } from "zustand"
import { LoginFormType, LoginUser } from "../services/Auth/loginUser"

interface useAuthStoreType{
    isAuth: boolean,
    setAuth: (LoginForm:LoginFormType) => void
}


export const useAuthStore = create<useAuthStoreType>()((set) => (
    {
        isAuth: false,
        setAuth: (LoginForm) => {
            LoginUser(LoginForm).then((res) => {
                if (res){
                    set({isAuth:true})
                }
                else{
                    set({isAuth:false})
                }
            })
        }
    }
))