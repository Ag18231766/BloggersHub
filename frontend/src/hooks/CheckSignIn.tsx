import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function useCheckSignIn():[boolean]{

    // why anyone has to check for signin multiple times (this should be cached)
    const [isSignIn,SetSignIn] = useState<boolean>(false);
    console.log('hello')
  
    const navigation = useNavigate();

    useEffect(() => {
            axios.post<Token | ErrorMessage>('https://mediumclone-production.up.railway.app/api/v1/users/signin',"",{
                headers:{
                    authheader : 'Bearer ' + localStorage.getItem("token")
                }
            }).then((response) => {
                if('token' in response.data){
                    sessionStorage.setItem('username',(response.data as Token).username);
                    console.log('hi');
                    SetSignIn(true);
                }else{
                    navigation('/SignIn');
                }
            }).catch((err) => {
                console.log(err);
                navigation('/SignIn');
            })
    },[navigation])
    return [isSignIn];
}


export type Token = {
    token : string,
    username:string
}
export type ErrorMessage = {
    message : string
}


