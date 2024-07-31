import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export function useCheckSignIn():[boolean,string]{
    const [isSignIn,SetSignIn] = useState<boolean>(false);
    const username = useRef<string>("");
    const navigation = useNavigate();

    useEffect(() => {
        axios.post<Token | ErrorMessage>('http://localhost:3000/api/v1/users/signin',"",{
            headers:{
                authheader : localStorage.getItem("token")
            }
        }).then((response) => {
            if('token' in response.data){
                username.current = (response.data as Token).username;
                SetSignIn(true);
            }else{
                navigation('/SignIn');
            }
        })
    },[])
    return [isSignIn,username.current];
}


export type Token = {
    token : string,
    username:string
}
export type ErrorMessage = {
    message : string
}


