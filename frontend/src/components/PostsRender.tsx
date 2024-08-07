import { useCallback, useEffect, useRef, useState } from "react";
import { PostElementComp, postsInterface } from "./PostElement";
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

export function PostsRenderComponent(){
    const [PostElement,SetPostElement] = useState<AxiosReturnType['userposts']>({
        username:"",
        posts:[],
    });
    const [message,SetMessage] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [count,setCount] = useState<number>(2);
    const length = useRef<number>(0);

    const fetch = useCallback(async function(){
        try{
            
            const response = await axios.get<AxiosReturnType | ErrorMessage>(`http://localhost:5000/api/v1/posts/yourposts/${count}`,{
                headers:{
                    authheader: 'Bearer ' + localStorage.getItem('token')
                }
            });
            
            if((response.data as AxiosReturnType).userposts.posts.length === 0){
                length.current = 0;
                return;
            }
            if('message' in response.data){
                SetMessage(() => (response.data as ErrorMessage).message);
            }else{
                setIsLoading(() => false);
                SetPostElement((t) => ({username:(response.data as AxiosReturnType).userposts.username,posts:[...(t.posts),...(response.data as AxiosReturnType).userposts.posts]}));
            }
            setCount((c) => c + 1);

        }catch(err){
            console.log(err);
        }

    },[count])

    useEffect(() => {
         axios.get<AxiosReturnType | ErrorMessage>(`http://localhost:5000/api/v1/posts/yourposts/1`,{
            headers:{
                authheader: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if('message' in response.data){
                SetMessage(() => (response.data as ErrorMessage).message);
            }else{
                setIsLoading(() => false);
                SetPostElement((t) => ({username:(response.data as AxiosReturnType).userposts.username,posts:[...(t.posts),...(response.data as AxiosReturnType).userposts.posts]}));
            }
        })
    },[]);

    useEffect(() => {
        const handleScroll = () => {
            const {scrollTop,clientHeight,scrollHeight} = document.documentElement;

            if(scrollTop + clientHeight >= scrollHeight - 20){
                console.log('hi');
                fetch();
                if(length.current == 0){
                    window.removeEventListener('scrollend',handleScroll);
                }
            }
        }
        window.addEventListener('scrollend',handleScroll);
        return (() => {
            window.removeEventListener('scrollend',handleScroll);
        })
    },[fetch]);

    function render(){
        if(isLoading){
            return <div>loading ...</div>
        }else if(message.length > 0){
            return <div>message</div>
        }else{
            return PostElement.posts.map((t) => <div key={t.id}><PostElementComp key={t.id}  post={t} username={PostElement.username}></PostElementComp></div>)
        }
    }

    return (
        <div>
            {render()}
        </div>
    )



}

