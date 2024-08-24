import { useState } from "react";
import { TagArray } from "../hooks/GetTags"
import axios from "axios";
export function TagRender({tags}:{tags:TagArray[]}){
    // Question : can I do this and signup in one single db call (may be it can be done with state management where props are transported to any component).

    const [tagSelected,SetSeletedTag] = useState<string[]>([]);

    async function Send(){
        const response = await axios.put<{message:string}>('http://localhost:5000/api/v1/users/postTags',{tagArr:tagSelected},{
            headers: {
                authheader : 'Bearer ' + localStorage.getItem('token')
            } 
        })
        return (
            <div className="h-screen"><div className="flex justify-center flex-col">{response.data.message}</div></div>
        )
    }
    
    return (
        <div className="h-screen flex justify-center">
            <div className="h-full w-4/6 flex justify-center">
                <div className="w-full">
                    <h1 className="text-5xl mb-28 flex justify-center">
                        BloggersHub
                    </h1>
                    <div className="w-full mb-5 flex justify-center">
                        What are you interested in?
                    </div>
                    <span className="w-full text-gray-600 flex justify-center">Choose three or more</span>
                    {tags.length > 0 ? 
                        <div className="w-full mt-8 ml-4 mr-4">
                            <div >{tags.map((t) => <button onClick={() => SetSeletedTag((x) => [...x,t.tag])} key={t.id} type="button" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{t.tag}</button>)}</div>
                        </div>:
                        null
                    }
                    <div className="w-full flex justify-center mt-2">
                        <button onClick={Send} type="button" className="text-white bg-gray-700 hover:bg-gray-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">AddTags</button>
                    </div>
                </div>
                

            </div>

        </div>
    )
}

