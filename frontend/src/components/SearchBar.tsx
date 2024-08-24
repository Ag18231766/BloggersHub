
import { PostsRenderComponent } from "./PostsRender";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "./Navbar";



export function SearchBar(){
    const [searchParams] = useSearchParams(); 
    const title = searchParams.get('title');
    
    return (
        <div>
            <Navbar></Navbar>
            <PostsRenderComponent title={title as string}></PostsRenderComponent>
            
        </div>
    )
}