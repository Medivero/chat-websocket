import { Box, Button, Input, Typography } from "@mui/material";
import { useForm } from "react-hook-form"
import { useAuthStore } from "../../store/authstore";
import { useState } from "react";
import { RegistrateUser } from "../../services/Auth/Registrate";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const LoginForm = useForm();
    const navigate = useNavigate();
    const RegistrateForm = useForm();
    const {setAuth} = useAuthStore();
    const [isRegistrate,setIsRegistrate] = useState(false);
    const getLoginForm = (data:any) => {
        console.log(data)
        setAuth(data)
    }
    const getRegistrateForm = (data:any) => {
        if (data.currpassword === data.password){
            const newData = {
                name: data.name,
                password: data.password
            }
            RegistrateUser(newData).then((res) => {
                if (res === true){
                    setAuth(newData)
                    navigate("/")
                }
            });
        }
        else{
            return
        }
    }
    const LoginFormComponent = () => {
        return (
            <form onSubmit={LoginForm.handleSubmit(getLoginForm)} className="flex flex-col gap-[10px]">
                <Typography className="text-center font-medium text-[20px]">Log-in</Typography>
                <Input {...LoginForm.register("name",{required:true})} type="text" placeholder="Логин" className="text-[20px]"></Input>
                <Input {...LoginForm.register("password",{required:true})} type="password" placeholder="Пароль" className="text-[20px]"></Input>
                <Button type="submit" className="bg-gray-500 text-white">Отправить</Button>
            </form>
            )
    }
    const RegistrateFormComponent = () => {
        return (
            <form onSubmit={RegistrateForm.handleSubmit(getRegistrateForm)} className="flex flex-col gap-[10px]">
                <Typography className="text-center font-medium text-[20px]">Registrate</Typography>
                <Input {...RegistrateForm.register("name",{required:true})} type="text" placeholder="Логин" className="text-[20px]"></Input>
                <Input {...RegistrateForm.register("password",{required:true})} type="password" placeholder="Пароль" className="text-[20px]"></Input>
                <Input {...RegistrateForm.register("currpassword",{required:true})} type="password" placeholder="Подтверждение пароля" className=" text-[15px]"></Input>
                <Button type="submit" className="bg-gray-500 text-white">Отправить</Button>
            </form>
        )
    }

    return (
        <>
        <div className="w-full">
            <div className="w-full flex justify-center items-center">
                <Box className="w-[700px] h-[500px] rounded-lg flex flex-col justify-center items-center shadow-[20px_10px_50px_0px]">
                    {isRegistrate ? <RegistrateFormComponent/> : <LoginFormComponent></LoginFormComponent>}
                    <Button onClick={() => setIsRegistrate(!isRegistrate)} className="mt-[50px]">{isRegistrate ? "Войти": "Регистрация"}</Button>
                </Box>
            </div>
        </div>
        </>
    )
}