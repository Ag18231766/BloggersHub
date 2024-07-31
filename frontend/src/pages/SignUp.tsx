import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpUserSchemaType } from "@amartya_gupta/medium_type";
import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";



export function SignUp(){
    
    return (
    
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                <Auth></Auth>
            </div>
            <div className="invisible md:visible">
               <Quote></Quote>
            </div>
        </div>
    )
}


