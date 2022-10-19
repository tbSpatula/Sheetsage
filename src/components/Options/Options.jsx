
import Keyrios from "../functions/Keyrios"
import "./Options.sass"
import { useEffect,useState ,useRef} from "react"
import UUID from "../functions/UUID"
import {BiRightArrow} from "react-icons/bi"
import GoBackButton from "../miniComponents/GobackButton"

import Keybinds from "./Keybinds"
import Pallete from "./Pallete"

function BackdropAdd(props){

    useEffect(() => {

        const keyid = props.keyid

        const event = (e) => {
            e.preventDefault()
            try {
                Keyrios.setId(keyid,e.code)
                props.onComplete()
            } catch(error){

            }
        }
        document.addEventListener("keyup",event)
        return () => {
            document.removeEventListener("keyup",event)
        };
    }, [props]);

    return (
        <div className="center backdrop title-36" onClick={props.onComplete}>
            <div style={{textAlign: "center"}}>
            <span className="themecolor">{props.keyid}</span> <br/>
            Press a key to keybind <br/>    
            <span className="flex-18"> click anywhere to cancel </span>
            </div>
        </div>
    )
}

function DropDownOpt(props){

    const title = props.title

    const id = useRef(UUID(title))

    function toggle(){
        const element = document.getElementById(id.current)
        const element2 = document.getElementById(id.current + "title")
        const hasclass = element.classList.contains("active")

        if(hasclass) {
            element.classList.remove("active"); element2.classList.remove("active")
        }
        else {
            element.classList.add("active"); element2.classList.add("active")
        }
    }

    return(
        <>
            <div id={id.current + "title"} className="dropdowntitle title-24 button themecolor active" onClick={toggle}>
                <span>{title} </span> <BiRightArrow size={18}/>
            </div>
            <div id={id.current} className="dropdownelement active"> 
                {props.children}
            </div>
        </>
    )
}

export default function Options(props) {

    const [backdrop, setbackdrop] = useState(<></>)

    const keyvalues = (() => {
        let arr = []
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            arr.push( localStorage.getItem(localStorage.key( i ) ))
          }
        return arr
    })()

    return(
        <>
        {backdrop}
        <div className="center">
            <div id="keybindMenu" className="width">
                <DropDownOpt title="theme">
                    <Pallete/>
                </DropDownOpt>
                <DropDownOpt title="keybinds">
                    <Keybinds
                    keyvalues={keyvalues}
                    onClick={x => {
                        setbackdrop(<BackdropAdd keyid={x} onComplete={() => setbackdrop(<></>)}/>)
                    }}/>
                </DropDownOpt>
                
                <GoBackButton className="width" onClick={props.onGoBack}/>
            </div>
        </div>
        </>
    )
}