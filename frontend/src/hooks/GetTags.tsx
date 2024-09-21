import axios from "axios";
import { useEffect, useState } from "react";
import { ErrorMessage } from "./CheckSignIn";

export type TagReturnType = {
    arr:TagArray[]
};
export type TagArray = {
    tag:string,
    id:number
}

export function useGetTags():{tags:TagArray[] , message:string}{
    const [TagArr,SetTagArr] = useState<TagArray[]>([]);
    const [message,Setmessage] = useState<string>("");
    useEffect(() => {
        try{
            axios.get<TagReturnType | ErrorMessage>(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tags/tag`,{
                headers:{
                    authheader: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(
                (response) => {
                    if('message' in response.data){
                        Setmessage(() => (response.data as ErrorMessage).message);
                    }else{
                        const array = (response.data as TagReturnType).arr;
                        SetTagArr(() => array);
                        if(message.length > 0){
                            Setmessage(() => "");
                        }
                    }
                }
            ) 
        }catch(err){
            console.log(err);
        }
    },[message])
    return {tags:TagArr,message:message};
}