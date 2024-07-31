import { useState } from "react";
import { useGetTags } from "../hooks.tsx/GetTags";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Tags = {
    id :number,
    tag:string
}

export function TagsRender(){
    const {tags,message} = useGetTags();
    const [SelectedTags,SetSelectedTags] = useState<Tags[]>([]);
    const navigation = useNavigate();
    
    async function AddTags(){
        if(SelectedTags.length === 0){
            return (
                <div>Please select tags</div>
            )
        }

        const response = await axios.post<{message:string}>('http://localhost:5000/api/v1/users/postTags',{tagArr : SelectedTags},{
            headers : {
                authheader : 'Bearer ' + localStorage.getItem('token')
            }
        })   
        if(response.data.message === "tags added successfully"){
            navigation('/Dashboard')
        }else{
            console.log(response.data.message)
        }
    }
    return (
        <div>
            {
            message.length > 0 ? <div>{message}</div> : 
                tags.map((t,index) => <div key={index}><button onClick={() => {SetSelectedTags((temp) => [...temp,{tag:t.tag,id:t.id}]);}} key={index}>{t.tag}</button></div>)
            }
            <button onClick={AddTags}>Save & Continue</button>
        </div>
    )
}