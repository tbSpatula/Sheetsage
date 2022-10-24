import { useEffect,useCallback,useRef} from "react";

function keyCheck(key){
    const availableKeys = ['Pause','Backspace','Tab','NumLock','Enter','ShiftLeft','ControlLeft','AltLeft','Pause','CapsLock','Lang1','Lang2','Escape','Space','Numpad9','Numpad3','Numpad1','Numpad7','ArrowLeft','ArrowUp','ArrowRight','ArrowDown','F13','Numpad0','NumpadDecimal','Digit0','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Period','Semicolon','Backquote','Equal','Minus','KeyA','KeyB','KeyC','KeyD','KeyE','KeyF','KeyG','KeyH','KeyI','KeyJ','KeyK','KeyL','KeyM','KeyN','KeyO','KeyP','KeyQ','KeyR','KeyS','KeyT','KeyU','KeyV','KeyW','KeyX','KeyY','KeyZ','MetaLeft','MetaRight','ContextMenu','Numpad0','Numpad1','Numpad2','Numpad3','Numpad4','Numpad5','Numpad6','Numpad7','Numpad8','Numpad9','NumpadMultiply','NumpadAdd','NumpadDecimal','NumpadSubtract','NumpadDecimal','NumpadDivide','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','F13','F14','F15','F16','F17','F18','F19','F20','F21','F22','F23','F24','F25','F26','F27','F28','F29','F30','F31','F32','NumLock','ScrollLock','BracketLeft','BracketRight','Backquote','Backslash','Quote','Minus','Backslash','BracketRight','Minus','MediaTrackNext','MediaTrackPrevious','VolumeMute','VolumeDown','VolumeUp','Semicolon','Equal','Comma','Minus','Period','Slash','Backquote','IntlRo','NumpadComma','BracketLeft','Backslash','BracketRight','Quote','Backquote','OSLeft','AltRight','IntlBackslash','WakeUp']
    const keyExists = (availableKeys.filter(x => x === key)).length > 0
    if(!keyExists) throw SyntaxError(key + " is not a valid key")

    return key
}

function KeybindMemory(id){
    const idString = "keyrios."+id

    let returnObject = {}
    returnObject.exists = () => localStorage.getItem(idString) !== null
    returnObject.set = (key) => localStorage.setItem(idString,keyCheck(key))
    returnObject.get = () => {
        if(localStorage.getItem(idString) !== null) return localStorage.getItem(idString)
        throw SyntaxError("No such id found: "+idString)
    }

    return returnObject
}

function Flicker(props) {

    let triggered = useRef(false)
    const isFuncKeydown = typeof props.onkeydown === "function"
    const isFuncKeyup = typeof props.onkeyup === "function"

    const keyComparison = useCallback(() => {
        if( props.keybindId !== undefined && KeybindMemory(props.keybindId).exists()) return KeybindMemory(props.keybindId).get() 
        if(props.keybind !== undefined) return keyCheck(props.keybind)
        

    },[props])
    
    const keydown = useCallback( (event) => {
        if (!triggered.current && event.code === keyComparison()) {
            triggered.current = true ; props.onkeydown() 
        }
        event.preventDefault()
    },[props,keyComparison])
    const keyup = useCallback((event) => {
        if( event.code === keyComparison()){
            props.onkeyup() ; triggered.current = false
        }
    },[props,keyComparison])

    //on mount
    useEffect(() => {

        if(isFuncKeydown) document.addEventListener("keydown",keydown)
        if(isFuncKeyup) document.addEventListener("keyup",keyup)
        
        //on unmount
        return () => { 
            if(isFuncKeydown) document.removeEventListener("keydown",keydown)
            if(isFuncKeyup) document.removeEventListener("keyup",keyup)
        };
    }, [keyup,keydown,isFuncKeydown,isFuncKeyup]);
}

const setId = (id,key) => KeybindMemory(id).set(key) 
const getId = (id) => KeybindMemory(id).get()
const existsId = (id) => KeybindMemory(id).exists() 

let Keyrios = {
    Flicker: Flicker,
    setId: setId,
    getId: getId,
    existsId: existsId
}

export default Keyrios
