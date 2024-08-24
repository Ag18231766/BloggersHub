import { PostsRenderComponent } from "../components/PostsRender";
import { useCheckSignIn } from "../hooks/CheckSignIn";
import { Navbar } from "../components/Navbar";



export function Landing(){
  const IsSignIn = useCheckSignIn();


  
  return (
        <div>
            {IsSignIn ? <div><Navbar></Navbar>
              <PostsRenderComponent></PostsRenderComponent></div> : null}
           
        </div>
  )  
}
