
function BassClef(props){
    return (
        <img className={props.className} id={props.id} src={require("./Bass_clef.svg").default} alt="Bass clef" height={props.size}/>
        ) 
}


function TrebleClef(props){
    return (
        <img className={props.className} id={props.id} src={require("./Treble_clef.svg").default} alt="Treble clef" height={props.size}/>
        ) 
}

function AltoClef(props){
    return (
        <img className={props.className} id={props.id} src={require("./Alto_clef.svg").default} alt="Alto clef" height={props.size}/>
        ) 
}

const SVGpack = {
    "BassClef": BassClef,
    "TrebleClef": TrebleClef,
    "AltoClef": AltoClef
}

export default SVGpack