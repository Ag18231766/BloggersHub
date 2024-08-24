import { useEffect, useState } from "react";
import { postsInterface } from "../components/PostElement";
import axios from "axios";



export default function useBlog({id}:{id:string}){
    const [loading,Setloading] = useState<boolean>(true);
    const [blog,Setblog] = useState<postsInterface>();

    useEffect(() => {
        axios.get<{post:postsInterface}>(`https://mediumclone-production.up.railway.app/api/v1/posts/${id}`,{
            headers: {
                authheader: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            Setblog(() => response.data.post);
            Setloading(() => true);
        })
    },[id])

    return {
        loading,
        blog

    }

    
}