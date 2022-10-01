// eslint-disable-next-line
const renderAbc = (require("abcjs")).renderAbc

function Range(start = 0,end = 0){
    const range = end - start
    const array = [...Array(range+1).keys()]
    array.forEach((x,index)=> {
        array[index] = start + x
    })
    return array
}

function excludeArray(array = [],start = 0, end = 0){
    const indexStart = array.indexOf(start)
    const indexEnd = array.indexOf(end)

    return array.filter((x,index) =>  index < indexStart || index > indexEnd )
}

//  monoid for object parsing, example:
//      opts(options_object).opt("width",(value) => setwidth(value))
//  resizes width of svg to fit perfectly
function opts(a){return{opt:function(b,c){if(a[b]){let d=a[b];c(d,b)}return this}}} ; function resizeSVG(b){var a=b.getBBox();b.setAttribute("width",a.x+a.width+a.x)}
//converts a number to a key sting and a key string to note
const to = (() => {
    const
        keys = "bagfedc".split(""),
        keysReversed = "cdefgab".split("")

    function note(number = 0) {

        const isNegative = number < 0 

        const char = isNegative ? "'" : ","
        const additiveChar = isNegative ? "'" : ""
        const chosenKeys = isNegative ? keysReversed : keys
        number = Math.abs(number)
    
    
        let product = ""
        for(let n = number; n > 0; n += -7){
            if(n >= 8) product += char
            else product = chosenKeys[n-1] + additiveChar + product
        }
        return product
    
    }

    function number(note = ""){ 

        const isNegative = note.match(/^[abcdefg](?=['])[']*$/gm) !== null 
        const keysChosen = isNegative ? keysReversed : keys
        
        const key = note.match(/^[abcdefg](?![abcdefg])(?=[,'])|^[abcdefg](?![abcdefg])$/gm)
        const keyAmount = keysChosen.indexOf(key[0]) + 1

        const sevens = note.match(/(?<![abcdefg])[']|[,]/gm)
        const sevensAmount = sevens !== null ? sevens.length * 7 : 0 

        const additiveAmount = isNegative ? -1 : 1

        return (keyAmount + sevensAmount) * additiveAmount
    }

    return {
        note: note,
        number: number
    }

})()

const clefs = {
    "treble": {
        start: "f",
        end: "e,",
    },
    "bass": {
        start: "a,,",
        end: "g,,,",
    },
    "tenor": {
        start: "e,",
        end: "d,,",
    },
    "alto": {
        start: "g,",
        end: "f,,",
    }
}

export default function sheet(target_id,options = {}){

    let onCorrectFunctions = []
    let onIncorrectFunctions = []
    let onCompleteFunctions = []
    
    this.onCorrect = (callback = () => {}) => onCorrectFunctions.push(callback)
    this.onIncorrect = (callback = () => {}) => onIncorrectFunctions.push(callback)
    this.onComplete = (callback = () => {}) => onCompleteFunctions.push(callback)
    const loopTroughFunctionsArray = (array) => array.length > 0 ? array.forEach(func => func()) : undefined

    let gameInstance = {
        notesPerRound: 10,
        ledgerLineAmount: 2 ,
        clef: "treble",
        difficulty_multiplier: 1,
        corrects: 0,
        fails: 0,
    }

    opts(options)
    .opt("clef",(value) => {
        if(clefs[value] === undefined) throw SyntaxError(`Clef ${value} is not valid.`)
        gameInstance.clef = value
    })


    let keys = (() => {
        const 
            start =  to.number(clefs[gameInstance.clef].start) - gameInstance.ledgerLineAmount  ,
            end = to.number(clefs[gameInstance.clef].end) + gameInstance.ledgerLineAmount ,
            _self = [] 
            let range = Range(0,end-start)
            const randomNote = (range) => {
                const random = range[Math.round(Math.random() * (range.length-1))]
                range.splice(range.indexOf(random),1)
                return {
                    number: start + random,
                    note: to.note(start + random),
                    key: to.note(start + random).replace(/[,'_^]/g,"").toUpperCase()
                }
            }

        for (let x = 0; x < gameInstance.notesPerRound; x++) {
           _self.push(randomNote(range))
        }

        return _self

    })()
    const notesString = (() => {
        let _self = ""
        for(let x = 0; x < keys.length; x++){
            _self += keys[x].note + " "
        }
        return _self
    })()

    const abcjsString = `
        L: 1/4
        V: RH clef=${gameInstance.clef}
        ${notesString} 
    `
    
    //render clef and resize to fit 
    renderAbc(target_id ,abcjsString , {
        paddingleft: 0, paddingright: 0, paddingtop: 0,
        add_classes: true, selectionColor: "inherit",
        responsive: true, staffwidth: 250,
    })
    resizeSVG(document.getElementById(target_id).getElementsByTagName("svg")[0])


    let currentNoteIndex = 0
    const addClassToCurrent = (index,_class) => {
        try {
            document.getElementById(target_id).getElementsByClassName(`abcjs-n${index}`)[0].classList.add(_class)
            return true
        } catch (error) {
            return false
        }
    }

    this.getMultiplier = () => gameInstance.difficulty_multiplier
    this.getGameInstance = () => gameInstance
    // goes through notes in sheet 
    this.gess = (key) => {
        const isComplete = currentNoteIndex >= keys.length
        if (isComplete) return null
        
        const isCorrect = keys[currentNoteIndex].key === key

        if (isCorrect) {
            const adder = addClassToCurrent(currentNoteIndex,"correct")
            if(adder) {
                loopTroughFunctionsArray(onCorrectFunctions) 
                gameInstance.corrects += 1
            }
        } else {
            const adder = addClassToCurrent(currentNoteIndex,"incorrect")
            if (adder) {
                loopTroughFunctionsArray(onIncorrectFunctions)
                gameInstance.fails += 1
            }
        }

        if(currentNoteIndex + 1 === keys.length) loopTroughFunctionsArray(onCompleteFunctions)
        currentNoteIndex++
        

    }
}

/**
 * dificulty variables:
 *      LEDGER LINES -> more ledger lines = harder
 *      BIG NOTE JUMPS -> bigger note jumps = harder
 *      SHARP AND FLAT NOTES -> harder to read
 *      
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */