import { SignUpUserSchemaType } from "@amartya_gupta/medium_type";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SignInUserSchemaType = Pick<SignUpUserSchemaType,'password' | 'email'>;
export function SignIn(){
    const [SignInInputs,SetSignInInputs] = useState<SignInUserSchemaType>({
      password:"",
      email:""
    });
    const [message,Setmessage] = useState<string>("");
    const navigation = useNavigate();

    async function SignInCall(){
      const response = await axios.post<{token:string} | {message:string}>('http://localhost:5000/api/v1/users/signinPassword',SignInInputs);
      if('message' in response.data){
        console.log('hi');
        Setmessage(() => (response.data as {message:string}).message);
      }else{
        localStorage.setItem("token",response.data.token);
        navigation('/');
      }
    }
    
    function SignUpCall(){
      navigation('/SignUp');
    }
    console.log('render' + message);
    return(
        <div className="h-screen flex justify-center flex-col "> 
          <div className="flex justify-center">
            <div>

              <div className="text-center">
                <div className="font-bold text-3xl mb-3">
                  Create an account
                </div>
                <span className="text-gray-600">
                  Already have an account
                </span>
                <button className="underline-offset-2 ml-2 underline" onClick={SignUpCall}>SignUp</button>
              </div>

              <div className="mt-12">
                <div className="mt-4">
                  <div>
                    <div className="mb-2">Email</div>
                    <div className="text-left">
                      <input className="w-full border-2" placeholder="email .." onChange={(e) => SetSignInInputs((t) => ({...t,email:e.target.value}))}></input>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <div className="mb-3">Password</div>
                    <div className="text-left">
                      <input type='password' className="w-full border-2" placeholder="password .." onChange={(e) => SetSignInInputs((t) => ({...t,password:e.target.value}))}></input>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-8">
                    <button className="w-full bg-blue-600 rounded-md text-white" onClick={SignInCall}>SignIn</button>
                  </div>
                </div>
                <div className="mt-4 text-gray-600">
                  {message.length !== 0 ? <div>{message}</div> : <></>}
                </div>
              </div>
            </div>
            <div>

            </div>
          </div>
         





          
        </div>
    )
}


