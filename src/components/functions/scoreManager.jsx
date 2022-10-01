
const limitBy = "clef"
const scoresLimit = 25

export function addScore(score = 0, additionalValues = {}){
    const ListID = "scoresList_"

    let listArray = JSON.parse(localStorage.getItem(ListID)) || []

    const scoreObject = {
        score: score,
        ...additionalValues
    }

    listArray.push(scoreObject)
    listArray.sort((a,b) => b.score - a.score)
    if(listArray.filter(x => x.clef === additionalValues[limitBy]).length > scoresLimit) listArray.pop()

    localStorage.setItem(ListID,JSON.stringify(listArray))
}

export function getScoreList(){
    const ListID = "scoresList_" 
    return JSON.parse(localStorage.getItem(ListID)) || []
}