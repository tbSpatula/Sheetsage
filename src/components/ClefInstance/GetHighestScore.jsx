import {FaMedal} from "react-icons/fa"
import { getScoreList } from "../functions/scoreManager"

export default function GetHighestScore(props){

    const score = (getScoreList()).filter( x => x.clef === props.clef)

    const RegularElement = () =>
    <div id="highestScore" className="flex-18 themecolor">
        <FaMedal size={18}/>  {score[0].score}
    </div>

    return ( 
        <>
            {score.length > 0 ? <RegularElement/> : "" }
        </>
    )

}