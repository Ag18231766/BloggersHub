import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";



export interface postsInterface {
  id:number,
  user:{
    username:string
  },
  title:string,
  body:string,
  createdAt:string,
}




enum Month{
  Jan,
  Feb,
  Mar,
  April,
  May,
  June,
  July,
  Aug,
  Sept,
  Oct,
  Nov,
  Dec
}


export function PostElementComp({post}:{post:postsInterface}){
  const array = useRef<string[]>(post.body.split(" "));
  // const navigate = useNavigate();
  const date = useRef<string>(`${Month[Number(post.createdAt.substring(5,7))]}` + "-" + post.createdAt.substring(8,10) + "-" + post.createdAt.substring(0,4));
  const lowerbound = useRef<number>(0);
  const upperbound = useRef<number>(0);

  useMemo(() => {
    let i = 0;
    let size = 0;
    for(; i < array.current.length;i++){
      if(size >= 15){
        break;
      }
      size += array.current[i].length;
    }
    lowerbound.current = i - 1;
    size = 0;
    for(;i < array.current.length;i++){
      if(size >= 15){
        break;
      }
      size += array.current[i].length;
    }
    upperbound.current = i - 1;
    
  },[array]);

  

  const firstPart:string = array.current.slice(0,lowerbound.current).join(" ");
  const secondPart:string = array.current.slice(lowerbound.current + 1,upperbound.current).join(" ");
  return (
    <Link to={`/${post.id}`}>
      <div  className="w-full h-36 bg-gray-100 border-b border-gray-400">
        
        <div className="flex justify-start pl-7">
          <div>
            <div className="mt-4 flex">
              <div className="rounded-full w-6 h-6 bg-gray-300 text-gray-500 flex justify-center">{post.user.username.charAt(0)}</div>
              <span className="ml-3 mr-3 font-semibold text-gray-800 ">{post.user.username}</span>
              <span className="font-thin">{date.current}</span>
            </div>
            <div className="mt-4">
              <h1 className="font-bold text-lg">{post.title}</h1>
            </div>
            <div>
              <h2>{firstPart}</h2>
              <h2>{secondPart + "..."}</h2>
            </div>
          </div>
        </div>
        
      </div>
    </Link>
  )

}

