import { CustomInput, Navbar } from "../components/Navbar";

export default function MobSearch(){
    return (
        <div>
            <Navbar></Navbar>
            <div className="mt-3 flex rounded-sm justify-center"><CustomInput isMobSearch={true}></CustomInput></div>
        </div>

    )
}