import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ErrorMessage } from "../hooks/CheckSignIn";

interface AxiosReturnType {
    id:number;
    title:string;
}

export function SearchBar(){
    const [SearchedTitle,setSearchedTitle] = useState<AxiosReturnType[]>([]);
    const [title,setTitle] = useState<string>("");
    const message = useRef<string>("");
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            if(title === ""){
                return;
            }
            axios.get<{post:AxiosReturnType[]} | ErrorMessage>(`http://localhost:5000/api/v1/posts/${title}`,{
                headers:{
                    authheader:'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                if('message' in response.data){
                    message.current = (response.data as ErrorMessage).message;

                }else{
                    console.log(response.data.post as AxiosReturnType[]);
                    setSearchedTitle(() => [...(response.data as {post:AxiosReturnType[]}).post]);
                }
            })
        }, 600);
        return (() => {
            clearTimeout(timeout);
        })
    },[title])
    
    return (
        <div>
            <input type="text" placeholder="search here" onChange={(e) => {
                setTitle(() => e.target.value);
            }}></input>
            {message.current.length > 0 ? <div>{message.current}</div> : <div>{SearchedTitle.map((t) => <div key={t.id}>{t.title}</div>)}</div>}
        </div>
    )
}