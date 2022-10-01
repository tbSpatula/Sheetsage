import Keyrios from "./Keyrios"

export let keysToBind = [
    "A note", "KeyA",
    "B note", "KeyB",
    "C note", "KeyC",
    "D note", "KeyD",
    "E note", "KeyE",
    "F note", "KeyF",
    "G note", "KeyG",
]

export default function keybindInit(){
    for (let index = 0; index < keysToBind.length ; index+= 2) {
        const key = keysToBind[index]
        const bind = keysToBind[index + 1]
    
        if(!(Keyrios.existsId(key))){
            Keyrios.setId(key,bind)
        }
    }
}

