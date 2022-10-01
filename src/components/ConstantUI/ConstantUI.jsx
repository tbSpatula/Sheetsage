import {BsGear} from "react-icons/bs"
import {BiLogInCircle} from "react-icons/bi"
import {AiOutlineHome} from "react-icons/ai"
import "./ConstantUI.sass"
import WebTitle from "../miniComponents/WebTitle"


export default function ConstantUI(props){
    
    return(
        <>
            <div className="width2-5" id="ConstantUI-top">
                <WebTitle >
                    <div className="icons">
                        <AiOutlineHome className="button" size={24} onClick={props.onHome}/>
                        <BsGear className="button" size={24} onClick={ props.onOptions}/>
                        <BiLogInCircle className="button" size={24} />
                    </div>
                </WebTitle>
            </div>
            <div className="width2-5 flex-18 gray" id="ConstantUI-bot">
                <div>
                    <span className="button" onClick={props.onAbout}> about </span>•  
                    <span className="button" onClick={props.onPrivacyPolicy}> privacy policy </span>• 
                    <span className="button"> contact me </span>
                </div>
                <div id="versionDisplay" className="button"> beta v1.0.0 </div>
            </div>
        </>
    )
}