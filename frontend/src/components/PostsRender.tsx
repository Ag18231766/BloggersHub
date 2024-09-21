import { useCallback, useEffect, useRef, useState } from "react";
import { PostElementComp, postsInterface } from "./PostElement";
import axios from "axios";
import { Spinner } from "./Spinner";


type AxiosReturnType = {
    posts: postsInterface[]
}
export type ErrorMessage = {
    message: string
}
interface OptionalProps{
    title?:string
}
export function PostsRenderComponent({title}:OptionalProps) {
    const [PostElement, SetPostElement] = useState<AxiosReturnType['posts']>([]);
    const [message, SetMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [count, setCount] = useState<number>(1);
    const length = useRef<number>(0);
    

    

    // if title not included in the dependency array then whenever title changes it will not fetch different set of blogs
    const fetch = useCallback(async function () {
        try {
            let response;
            
            if(title === undefined){
                response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/yourposts/${count}`, {
                    headers: {
                        authheader: 'Bearer ' + localStorage.getItem('token')
                    }
                });     
            }else{
                response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/allposts/?title=${title}&&count=${count}`, {
                    headers: {
                        authheader: 'Bearer ' + localStorage.getItem('token')
                    }
                });
            }

            if ((response.data as AxiosReturnType).posts.length === 0) {
                length.current = 0;
                return;
            }
            if ('message' in response.data) {
                SetMessage(() => (response.data as ErrorMessage).message);
            } else {
                setIsLoading(() => false);
                SetPostElement((t) => ([...(t), ...(response.data as AxiosReturnType).posts]));
            }
            setCount((c) => c + 1);

        } catch (err) {
            console.log(err);
        }

    }, [count,title]);

    useEffect(() => {
        SetPostElement([]);
        setIsLoading(true);
        setCount(1);
        console.log('default');
        if(title === undefined){
            console.log('your');
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/yourposts/1`, {
                headers: {
                    authheader: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                if ('message' in response.data) {
                    SetMessage(() => (response.data as ErrorMessage).message);
                } else {
                    setIsLoading(() => false);
                    SetPostElement((t) => ([...(t), ...(response.data as AxiosReturnType).posts]));
                }
            });
        }else{
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/allposts/?title=${title}&&count=1`, {
                headers: {
                    authheader: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                if ('message' in response.data) {
                    SetMessage(() => (response.data as ErrorMessage).message);
                } else {
                    setIsLoading(() => false);
                    SetPostElement((t) => ([...(t), ...(response.data as AxiosReturnType).posts]));
                }
            });
        }
    }, [title]);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 80) {
                console.log('hi');
                fetch();
                if (length.current === 0) {
                    window.removeEventListener('scrollend', handleScroll);
                }
            }
        };
        window.addEventListener('scrollend', handleScroll);
        return (() => {
            window.removeEventListener('scrollend', handleScroll);
        });
    }, [fetch]);

    

    function render() {
        if (isLoading) {
            return <div className="h-screen flex justify-center items-center"><Spinner></Spinner></div>
        } else if (message.length > 0) {
            return <div>{message}</div>
        }else {
            return (
                <div className="flex justify-center mt-4">
                    <div className="w-4/6">
                        {PostElement.map((t,index) => (
                            <div key={index}>
                                <PostElementComp post={t} key={index} />
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    }
   
    return (
        <div>
            {render()}
        </div>
    );
}
