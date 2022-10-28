import keyrios from "keyrios";
import { useEffect } from "react"

export default function InputElement(props){

    useEffect(() => {
        const event = keyrios.flicker(props.keybind,props.onkeydown,props.onkeyup,props.keybindID)
        return () => {
            event()
        };
    }, [props]);

    return(
        <>
        </>
    )
}