import {ImExit} from "react-icons/im"

export default function GoBackButton(props) {
    
    return(
        <div className={props.className} style={{marginInline: "auto"}}>
            <div id="goBackButton" className="border button title-24 click " onClick={props.onClick}>
                Go Back <ImExit/>
            </div>
        </div>
    )
}