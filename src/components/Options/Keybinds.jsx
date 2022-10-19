
import UUID from "../functions/UUID"
import { useEffect,useRef } from "react"
import Keyrios from "../functions/Keyrios"

export default function Keybinds(props){

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