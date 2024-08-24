
import { FullBlog } from "../components/FullBlog";


import {useParams} from "react-router-dom";
import useBlog from "../hooks/BlogId";
import { Navbar } from "../components/Navbar";
import { Spinner } from "../components/Spinner";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (!loading || !blog) {
        console.log(blog);
        return <div>
            
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner></Spinner>
                </div>
            </div>
        </div>
    }
    return <div>
        <Navbar></Navbar>
        <FullBlog blog={blog} />
    </div>
}