import axios, { AxiosResponse } from "axios";
import {  useState } from "react";
import { TagArray, useGetTags } from "../hooks/GetTags";


interface PostInputsCreation{
    title:string,
    body:string,
    tags:string[]
}



export function PostCreation(){
    return (
        <div>
            <div><Creation></Creation></div>
        </div>
    )
}


type PostReturnType = {title:string} | {message:string};


function Creation(){
    const [PostInputs,SetPostInputs] = useState<PostInputsCreation>({
        title:"",
        body:"",
        tags:[]
    });
    const {tags,message} = useGetTags();
    const [isCreated,SetCreated] = useState<string>("");
    
    async function Post(){
        const response = await axios.post<PostReturnType>('http://localhost:5000/api/v1/posts/',PostInputs,{
            headers:{
                authheader: 'Bearer ' + localStorage.getItem('token')
            }
        });
        if('title' in response.data){
            SetCreated(() => (response.data as {title:string}).title);
        }else{
            SetCreated(() => (response.data as {message:string}).message);
        }
    }

    if(isCreated.length > 0){
        return (
            <div>{isCreated}</div>
        )
    }

    return (
        <div>
            <input type="text" placeholder="add title .." onChange={(e) => SetPostInputs((t) => ({...t,title:e.target.value}))}></input>
            <input type="text" placeholder="add body ..." onChange={(e) => SetPostInputs((t) => ({...t,body:e.target.value}))}></input>
            <div>
                {message.length > 0 ? <div>{message as string}</div> : <div>{(tags as TagArray[]).map((t,index) => 
                 <div key={index}>
                    <TagComponent tag={t.tag}></TagComponent>
                    <button onClick={() => SetPostInputs((x) => ({...x,tags:[...x.tags,t.tag]}))}>Add</button>
                 </div>)}
                </div>}
            </div>
            <button onClick={Post}>Post</button>
        </div>
    )
    
}

function TagComponent({tag}:{tag:string}){
    return(
        <div>{tag}</div> 
    )
}


