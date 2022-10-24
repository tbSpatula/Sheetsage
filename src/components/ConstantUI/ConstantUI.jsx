import {BsGear} from "react-icons/bs"
//import {BiLogInCircle} from "react-icons/bi"
import {AiOutlineHome} from "react-icons/ai"
import "./ConstantUI.sass"
import WebTitle from "../miniComponents/WebTitle"


export default function ConstantUI(props){
    
    return(
        <>
            <div className="width2-5" id="ConstantUI-top">
                <WebTitle >
                    <div className="icons">
                        <AiOutlineHome className="button" size={20} onClick={props.onHome}/>
                        <BsGear className="button" size={20} onClick={ props.onOptions}/>
                        {
                        //<BiLogInCircle className="button" size={24} />
                        }
                    </div>
                </WebTitle>
            </div>
        </>
    )
}