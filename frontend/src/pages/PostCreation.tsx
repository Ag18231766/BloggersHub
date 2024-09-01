import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { TagArray, useGetTags } from "../hooks/GetTags";


interface PostInputsCreation{
    title:string,
    body:string,
    tags:string[]
}

export const PostCreation = () => {
    const [PostInputs,SetPostInputs] = useState<PostInputsCreation>({
        title:"",
        body:"",
        tags:[]
    });
    
    
    const {tags,message} = useGetTags();
    const navigate = useNavigate();

    return <div>
        <Navbar />
        <input id="inputId"></input>
        <div className="flex justify-center w-full pt-8"> 
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    SetPostInputs((t) => ({...t,title:e.target.value}))
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />

                <TextEditor onChange={(e) => {
                    SetPostInputs((t) => ({...t,body:e.target.value}))
                }} />
                <h1 className="font-extrabold mb-3">Tags</h1>
                <div className="overflow-x-auto h-36">
                    
                  {message.length > 0 ? <div>{message as string}</div> : <div className="border">{(tags as TagArray[]).map((t,index) => 
                        <div  key={index} >
                            <button onClick={() => SetPostInputs((x) => {
                                const SelectedTags = PostInputs.tags.filter((z) => z !== t.tag);
                                if(SelectedTags.length < PostInputs.tags.length){                                   
                                    return ({...x,tags:SelectedTags});
                                }else{
                                    return ({...x,tags:[...x.tags,t.tag]});
                                }

                            })} 
                            className={`cursor-pointer h-8 w-32  flex justify-center items-center ${PostInputs.tags.includes(t.tag) ? 'bg-slate-500' : 'bg-white'}`}>{t.tag}</button>
                        </div>)}
                    </div>}
                </div>
                <button onClick={async () => {
                    const response = await axios.post('https://mediumclone-production.up.railway.app/api/v1/posts/', PostInputs, {
                        headers: {
                            authheader: 'Bearer ' + localStorage.getItem("token")
                        }
                    });
                    navigate(`/${response.data.id}`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={15} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
    
}



