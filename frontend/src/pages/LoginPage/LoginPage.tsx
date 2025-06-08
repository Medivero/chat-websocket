import { Box, Button, Input } from "@mui/material";
import { useForm } from "react-hook-form"
import { useAuthStore } from "../../store/authstore";

export default function LoginPage(){
    const LoginForm = useForm();
    const {setAuth} = useAuthStore();
    const getInputForm = (data:any) => {
        console.log(data)
        setAuth(data)
    }
    return (
        <>
        <div className="w-full">
            <div className="w-full flex justify-center items-center">
                <Box className="w-[700px] h-[500px] rounded-lg flex flex-col justify-center items-center shadow-[20px_10px_50px_0px]">
                    <form onSubmit={LoginForm.handleSubmit(getInputForm)} className="flex flex-col gap-[10px]">
                        <Input {...LoginForm.register("name")} placeholder="Логин" className="text-[20px]"></Input>
                        <Input {...LoginForm.register("password")} placeholder="Пароль" className="text-[20px]"></Input>
                        <Button type="submit" className="bg-gray-500 text-white">Отправить</Button>
                    </form>
                </Box>
            </div>
        </div>
        </>
    )
}