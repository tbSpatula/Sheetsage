import "./sass/AlphabetHotbar.sass"

import json from "./json/alphabetHotbar.json"

import UUID from "../functions/UUID"
import is_function from "../functions/ISFUNCTION"

import React from "react"
import Keyrios from "../functions/Keyrios"

function ButtonBuilder(props){
    
    return(
        <div className="alphabet_hotbar_element">
            <button className="border regular-24" onClick={() => props.onClick()} id={props.id}>
                <div> {props.display} </div>
            </button>
        </div>
    )
}

//fucking kill me for this

function button_loop(callback){

    return json.map((current) =>{

        const id = UUID("alphabet_hotbar_key")

        //set key events
        const classlist = () => document.getElementById(id).classList
        const keydown = () => {
            callback(current)
            classlist().add("active")
        }
        const keyup = () => {
            classlist().remove("active")
        }

        return (
            <React.Fragment key={current.index}>
                <ButtonBuilder
                    id={id}
                    onClick={() => callback(current)}
                    display={current.display}
                />
                <Keyrios.Flicker
                    keybindId={current.keyID}
                    keybind={current.keyinput}
                    onkeydown={keydown}
                    onkeyup={keyup}
                />
            </React.Fragment>
        )
    })
}

export default function AlphabetHotbar(props){

    const output = is_function(props.output)

    return(
        <div className="alphabet_hotbar_container width" id={UUID("alphabet_hotbar_container")}>
            {button_loop(output)}
        </div>
    )
}

/**
 * To change keyboard input go over to "./json/alphabetHotbar.json" and play around with the "keyinput" key
 * handled in Button_loop()
 */