import AlphabetHotbar from "./AlphabetHotbar"
import GetHighestScore from "./GetHighestScore"
import "./sass/SheetNote.sass"
import "./sass/ClefInstance.sass"
import { useRef, useReducer, useCallback,useEffect} from "react"
import UUID from "../functions/UUID"
import sheet from "./AbcjsConstructor" 
import pointsSystem from "./PointSystem"
import { addScore } from "../functions/scoreManager"


const idPlayAnimation = (id) => {
    document.getElementById(id).classList.remove("pop")
    setTimeout(() => {
        document.getElementById(id).classList.add("pop")
    }, 10)
}

export default function ClefInstance(props){

    const sheetObject = useRef()
    const pointsObject = useRef(new pointsSystem())
    const SheetAmount = useRef(1)
    const corrects = useRef(0)
    const fails = useRef(0)

    const [,forceUpdate] = useReducer(x => x + 1, 0);
    const handleUpdate = useCallback(() => { 
        forceUpdate()
    },[forceUpdate])

    const id = UUID("sheet_container")
    const points_id = UUID("points")
    const combo_id = UUID("combo")
    const current_id = UUID("current")

    const Keyboard = useRef(
            <AlphabetHotbar
                output={ (x) => sheetObject.current.gess(x.key)}
            />
        ,[]
    )

    useEffect(() => {
        //check if game is completed
        if (SheetAmount.current >= 4) {
            const points = pointsObject.current.points * sheetObject.current.getMultiplier()
            let eventObject = {}
                eventObject.elapsedTime = pointsObject.current.getElapsedTime()
                eventObject.corrects = corrects.current
                eventObject.fails = fails.current

            addScore(points,{
                ...eventObject,
                ...props.optionsObject
            })
            if(typeof props.onComplete === "function") props.onComplete({...eventObject,clef: props.optionsObject.clef,points: points})
            return
        }
        document.getElementById(current_id).textContent = SheetAmount.current + "/3"
        SheetAmount.current++

        //shorten syntax 
        const _sheet = sheetObject.current = new sheet(id,props.optionsObject) ; idPlayAnimation(id)
        const _points = pointsObject.current

        _sheet.onComplete(() => {
            setTimeout( handleUpdate , 250);
        })
        _sheet.onCorrect((x) => {
            _points.setPoints() ; _points.batchTextChange(points_id,combo_id)
            corrects.current++
        })
        _sheet.onIncorrect(() => {
            _points.comboMultiplier = 1 ; _points.comboTextChange(combo_id)
            _points.ended = (new Date()).getTime()
            fails.current++
        })
        
    }, [id,combo_id,points_id,handleUpdate,props,current_id])
    
    return(
        <div className="clef_instance_container width">
            <div>
                <div className="music_sheet_points_container flex-18">
                    <span className="pop " id={points_id}> 0</span>
                    <span className="pop " id={combo_id}> x1</span>
                    <span className="pop " id={current_id}> 1/3</span>
                </div>
                <GetHighestScore clef={props.optionsObject.clef}/>
            </div>

            <div className="music_sheet_container" id={id}> </div>
            {Keyboard.current}
            
        </div>
    )
}