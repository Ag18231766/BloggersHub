import { SignUpUserSchemaType } from "@amartya_gupta/medium_type";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const [SignUpInputs,SetSignUpInputs] = useState<SignUpUserSchemaType>({
        email:"",
        password:"",
        username:""
    });
    const [message,SetMessage] = useState<string>("");
    const navigation = useNavigate();

    async function SignUpCall(){
        try {
            const response = await axios.post<{token:string} | {message:string}>('https://mediumclone-production.up.railway.app/api/v1/users/signup',SignUpInputs);
        
            if ('message' in response.data) {
                SetMessage(() => (response.data as {message:string}).message);
            }else{
                localStorage.setItem("token",response.data.token);
                navigation("/AddInterests");
            }
        } catch (error) {
            console.error('Request error:', error);
        }
    }

    function GoToSignIn(){
        navigation('/SignIn');
    }
    
    return (
    
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center ">
                <div >
                    <div className="text-center">
                        <div className="font-bold text-3xl mb-3">
                            Create an account
                        </div>
                        <span className="text-gray-600">
                            Already have an account
                        </span>
                        <button className="underline-offset-2 ml-2 underline" onClick={GoToSignIn}>SignIn</button>
                    </div>
                    <div className="mt-12">
                        <div >
                            <div>
                                <div className="text-left mt-4">
                                    Username
                                </div>
                                <div className="text-left ">
                                    <input className="border mt-1 w-full" type="text" placeholder="username .." onChange={(e) => SetSignUpInputs((t) => ({...t,username:e.target.value}))}></input>
                                </div>
                            </div>
                        </div>
                        <div >
                            <div>
                                <div className="text-left mt-4">
                                    Email
                                </div>
                                <div className="text-left ">
                                    <input className="border mt-1 w-full" type="text" placeholder="email ..." onChange={(e) => SetSignUpInputs((t) => ({...t,email:e.target.value}))}></input>
                                </div>
                            </div>
                        </div>
                        <div >
                            <div>
                                <div className="text-left mt-4">
                                    Password
                                </div>
                                <div className="text-left ">
                                    <input className="border mt-1 w-full" type="password" placeholder="password ..." onChange={(e) => SetSignUpInputs((t) => ({...t,password:e.target.value}))}></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <button className="w-full bg-blue-600 rounded-md text-white" onClick={SignUpCall}>SignIn</button>
                        </div>
                        {message.length > 0 ? <div>{message}</div>:null}
                    </div>  
                </div>    
            </div>
        </div>
    )
}