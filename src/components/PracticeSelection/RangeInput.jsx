import { useState } from "react"

export default function RangeInput(props){

    const min = props.min 
    const max = props.max
    const textid = props.textid
    
    const [value, setvalue] = useState(0)

    return( 
        <div className="input">
            <div> {textid} <span className="val"> {value} </span> </div>
            <input type="range" min={min} max={max} value={value} onChange={(x) =>{ if(props.output) props.output(x.target.value) ; setvalue(x.target.value) } }/>
        </div>
    )
}