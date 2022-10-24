import {setUserPreference,getUserPreference} from "../functions/UserPreferences"
import "./Pallete.sass"
import processPallete from "../functions/processPallete"

function ThemeElement(props){
    // eslint-disable-next-line
    const [dark,lightest,light2,light,background,theme] = props.themeColors

    const style = {
        color: theme ,
        backgroundColor: background,
        textShadow: "none"
    }

    function onclick(){
        setUserPreference("theme")(props.themeColors)
        const colors = getUserPreference("theme")
        processPallete(colors)
    }

    return (
        <div style={style} className="flex-18 pointer button" onClick={onclick}>
            {props.themeName}
        </div>
    )
}

export default function Pallete() {
    
    return (
        <div id="pallete">
            <ThemeElement 
                themeColors={["black","gainsboro","darkgray","gray","#f1f1f1","#002366"]}
                themeName={"light"}
            />
            <ThemeElement 
                themeColors={["#a5a5a5","#080808","#0052eb","#383838","#181818","#0052eb"]}
                themeName={"dark"}
            />  
            <ThemeElement 
                themeColors={["#00121e","#d8e8f5","#7fa6b7","#699ecb","#f4f7ff","#0058ff"]}
                themeName={"cloud"}
            />
        </div>
    )
}