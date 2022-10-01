
import ClefSelection from "./ClefSelection"
import "./PracticeSelection.sass"
import {GiMusicalNotes} from "react-icons/gi"
import { useRef } from "react"


export default function PracticeSelection(props){

    const optsObj = useRef({})
    const onStart = props.onStart


    const startButton = 
    <div className="border button title-24" onClick={() => onStart(optsObj.current)}>
        start <GiMusicalNotes/>
    </div>

    return(
        <div className="center"> 

            <div className="gridContainer">
                <div id="practiceSelection" className="width">
                    <ClefSelection outputObject={optsObj.current}/>
                    {startButton} 
                </div>
            </div> 

        </div>
    )
}