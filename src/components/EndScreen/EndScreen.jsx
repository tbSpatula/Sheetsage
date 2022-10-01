import "./EndScreen.sass"
import {IoReloadOutline} from "react-icons/io5"
import { getScoreList } from "../functions/scoreManager"
import {FaMedal} from "react-icons/fa"
import GoBackButton from "../miniComponents/GobackButton"

function DisplayValue(props) {
    return(
        <div>
            <span className="flex-18" > {props.id}:</span>
            <span className="flex-18">{props.value}</span>
        </div>
    )
}

export default function EndScreen(props){

    const className = "border button title-24 click"

    const isHighestScore = (getScoreList()).filter(x => x.clef === props.clef)[0].score <= props.points

    const HighscoreElement = () =>
    <div id="newHighscore" className="flex-18 themecolor">
       <FaMedal/> New Highscore
    </div>

    return(
        <div className="end_screeen_container width">

            <div className="title-36"> Completed </div>

            {isHighestScore ? <HighscoreElement/> : ""}
            <div className="border frame flex-24">
                <DisplayValue id="score" value={props.points}/>
                <DisplayValue id="elapsed time" value={props.elapsedTime + "s"}/>
            </div>

            <div className={className} onClick={() => props.onPlayAgain()}>
                Play Again <IoReloadOutline/>
            </div>
            <GoBackButton onClick={props.onGoBack}/>
        </div>
    )
} 