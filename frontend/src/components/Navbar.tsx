import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Navbar(){
    
    const navigation = useNavigate();
    function GoToLanding(){
        navigation('/');
    }
    function GoToPostCreation(){
        navigation(`/PostCreation/${sessionStorage.getItem('username')}`)
    }
    function GoToSignIn(){
        navigation('/SignIn');
    }
    function GoToSignUp(){
        navigation('/SignUp')
    }
    function GoToMobSearch(){
        navigation('/MobSearch')
    }
    function SignOut(){
        localStorage.removeItem('token');
        navigation('/SignIn');
    }
    
    
    
    
    return(
        <div className="flex justify-between bg-yellow-500 p-5 text-white">
            {sessionStorage.length > 0 ?
                <div className="  md:hidden">
                <label className="cursor-pointer">
                    {/* insert an icon */}
                    Collapse
                    <input className="peer scale-0" type="checkbox" />
                    <div className="block max-h-1 overflow-hidden  text-white  peer-checked:max-h-52 peer-checked:max-w-60">
                        <p onClick={GoToMobSearch} className="cursor-pointer">Search</p>
                        <p onClick={GoToLanding} className="cursor-pointer">Landing</p>
                        <p onClick={SignOut} className=" cursor-pointer">SignOut</p>
                    </div>    
                </label>
            </div>:
                <div className="  md:hidden">
                    <label className="cursor-pointer">
                        {/* insert an icon */}
                        Collapse
                        <input className="peer scale-0" type="checkbox" />
                        <div className="block max-h-1 overflow-hidden bg-gray-600 text-white  peer-checked:max-h-52 peer-checked:max-w-60">
                            <p onClick={GoToSignUp} className="cursor-pointer">SignUp</p>
                            <p onClick={GoToSignIn} className="cursor-pointer">Login</p>
                            <p onClick={GoToLanding} className="cursor-pointer">Landing</p>
                        </div>    
                    </label>
                </div>
            }
            <div className="text-white">BloggerHub </div>
            <CustomInput isMobSearch={false}></CustomInput>
            <div className="hidden md:flex justify-between">
                <div onClick={GoToLanding} className="mr-3 cursor-pointer">Landing</div>
                <div onClick={GoToPostCreation} className="cursor-pointer">NewPost</div> 
                <div onClick={SignOut} className="ml-3 cursor-pointer">SignOut</div>               
            </div>
            {sessionStorage.length > 0 ? 
                <div className="w-8 h-8 rounded-full bg-gray-600 flex justify-center items-center">
                    <div className="text-white">{(sessionStorage.getItem('username') as string).charAt(0)}</div>
                </div>
                :
                <div className="flex justify-between">
                    <div onClick={GoToSignUp} className="hidden md:block mr-3 cursor-pointer">SignUp</div>
                    <div onClick={GoToSignIn} className="cursor-pointer">Login</div>
                </div>
                
            }

            
            
        </div>
        
        
    )
}

export function CustomInput({isMobSearch}:{isMobSearch:boolean}){
    const [title,setTitle] = useState<string>("");
    const navigation = useNavigate();
    function Render(title:string){
        console.log('hi');
        navigation(`/search/?title=${title}`)
    }
    return (
        <input className={`${!isMobSearch ? "hidden" : null} ml-2 md:block text-black rounded-sm outline-none`} type="text" placeholder="search other posts.." onKeyDown={(e) => {
            if(e.key === 'Enter'){
                Render(title);
            }
        }} onChange={(e) => {
            setTitle(() => e.target.value);
        }}></input>
    )
}