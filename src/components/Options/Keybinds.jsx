
import UUID from "../functions/UUID"
import { useEffect,useRef } from "react"
import Keyrios from "keyrios"

export default function Keybinds(props){

    const clickevent = props.onClick

    const keysToBind = JSON.parse(localStorage.getItem("keyrios"))

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

    function loopThrough(){
        let arr = []
        const keys = Object.keys(keysToBind)
        keys.forEach(x => {
            const key = x
            const keybind = Keyrios.getId(key)
            console.log(keybind)
            arr.push( 
                <Container 
                keyvalues={props.keyvalues}
                key={key}
                keytitle={key} 
                keybind={keybind}
                />
            )
        })
        console.log(arr)
        return arr
    }

    return (
        <>
        { loopThrough()}
        </>
    )
}