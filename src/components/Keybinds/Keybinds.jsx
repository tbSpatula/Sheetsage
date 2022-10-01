
import Keyrios from "../functions/Keyrios"
import "./Keybinds.sass"
import { useEffect,useState ,useRef} from "react"
import UUID from "../functions/UUID"
import {BiRightArrow} from "react-icons/bi"
import GoBackButton from "../miniComponents/GobackButton"


function LoopThroughKeyBinds(props){

    const clickevent = props.onClick

    const keysToBind = ((() => {
        let arr = []
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            arr.push( localStorage.key( i ) )
          }
        return arr
    })()).filter(x => x.startsWith("keyrios.")).sort()

    const Container = (props) =>{ 

        const id = useRef(UUID("keybind"))

        useEffect(() => {
            const isMultiple = props.keyvalues.filter(x => x === props.keybind).length > 1 
            if(isMultiple) document.getElementById(id.current).classList.add("red")
            else try { document.getElementById(id.current).classList.remove("red") }
            catch (error) {}
        }, [props]);
        return (
            <div id={id.current} className="flex-18 frame " onClick={() => clickevent(props.keytitle)}>
                <span> {props.keytitle} </span> 
                <span className="gray-border"> {props.keybind}</span>
            </div> 
        )
    }

    return (
        <>
        {keysToBind.map(x => {
            const key = x.replace("keyrios.","")
            const keybind = Keyrios.getId(key)
            return ( 
                <Container 
                keyvalues={props.keyvalues}
                key={key}
                keytitle={key} 
                keybind={keybind}
                />
            )
        })}
        </>
    )
}

function BackdropAdd(props){

    useEffect(() => {

        const keyid = props.keyid

        const event = (e) => {
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
            Press any key  <br/>    
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

export default function Keybinds(props) {

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
                <DropDownOpt title="keybinds">
                    <LoopThroughKeyBinds 
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