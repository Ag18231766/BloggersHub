import { useEffect, useState } from "react";
import { postsInterface } from "../components/PostElement";
import axios from "axios";

type AxiosReturnType = {
    userposts:{
        username:string,
        posts:postsInterface[]
    }
}
export type ErrorMessage = {
    message : string
}
interface UseGetPostsReturnType {
    posts: AxiosReturnType['userposts'];
    message: string;
}
export function useGetPosts():UseGetPostsReturnType{
    const [PostElement,SetPostElement] = useState<AxiosReturnType['userposts']>({
        username:"",
        posts:[],
    });
    const [message,SetMessage] = useState<string>("");

    useEffect(() => {
        axios.get<AxiosReturnType | ErrorMessage>(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/yourposts/1`,{
            headers:{
                authheader: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if('message' in response.data){
                SetMessage(() => (response.data as ErrorMessage).message);
            }else{
                SetPostElement((t) => ({username:(response.data as AxiosReturnType).userposts.username,posts:[...(t.posts),...(response.data as AxiosReturnType).userposts.posts]}));
            }
        }).catch((err) => {
            console.log(err);
        })
    },[]);
    return {posts:PostElement,message:message};
}
