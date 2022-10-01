import SVGpack from "../svg/SVGpack"
import "./ClefSelection.sass"
import { useState,useEffect,useRef } from "react"
import { getScoreList } from "../functions/scoreManager"
import UUID from "../functions/UUID"
function ClefOption(props) {
    const clef = props.clef
    const svg = props.svg
    const setter = props.setter

    const scores =getScoreList() === null ? [] : getScoreList().filter(x => x.clef === clef)

    const ScoreElement = () => <div className="flex-18 themecolor">
        best score: {scores[0].score}
    </div>

    function onclick() {
        setter(clef)
    }
    
    return (
        <div className={"clef_option " + clef} onClick={onclick}>
            <span>{clef}</span>
            {svg}
            {
                scores.length > 0 ? <ScoreElement/> : ""
            }
        </div>
    )
}

export default function ClefSelection(props){

    const [current,setcurrent] = useState("treble")
    const id =useRef( UUID("ClefSelection") )

    useEffect(() => {
        const actives = Array.from(document.getElementById(id.current).getElementsByClassName("active"))
        actives.forEach((x) => x.classList.remove("active"))
        if (current !== "") document.getElementById(id.current).getElementsByClassName(current)[0].classList.add("active")
        if(props.outputObject) props.outputObject.clef = current
    }, [current,id,props]);

    return(
        <div className=" title-24" id={id.current}>
            <ClefOption clef="treble" svg={<SVGpack.TrebleClef/>} setter={setcurrent}/>
            <ClefOption clef="bass" svg={<SVGpack.BassClef/>} setter={setcurrent}/>
            <ClefOption clef="alto" svg={<SVGpack.AltoClef/>} setter={setcurrent}/>
            <ClefOption clef="tenor" svg={<SVGpack.AltoClef/>} setter={setcurrent}/>
        </div>
    )
}