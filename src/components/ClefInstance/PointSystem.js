export default function pointsSystem(){
    const _self = this

    this.points = 0
    this.currentTime =  (new Date()).getTime()
    this.started = this.currentTime
    this.ended = 0
    this.comboMultiplier = 1

    const GetTimeDifMilliseconds = () => {
        const   absoluteTime = (new Date()).getTime(),
                dif = absoluteTime - _self.currentTime , 
                toMilliseconds = dif / 1000 
        if (toMilliseconds <= 1) _self.comboMultiplier += 1
        if (toMilliseconds > 1) _self.comboMultiplier = 1
        _self.currentTime = absoluteTime ; _self.ended = absoluteTime
        return toMilliseconds
    }

    this.getElapsedTime = () =>  (_self.ended - _self.started) / 1000

    this.setPoints = () => {
        const time = GetTimeDifMilliseconds()

        const DefaultPointsAmount = 200 
        const timeToPoints = time * 20
        const parsedPoints = DefaultPointsAmount - timeToPoints
        let withMultiplier = parsedPoints * _self.comboMultiplier
        if (withMultiplier < -200) withMultiplier = -200

        _self.points += Math.round(withMultiplier)
    }

    const idChangeTextContent = (id,textContent) => {
        const element = document.getElementById(id)
        if (element.textContent === textContent) return;
        element.textContent = textContent

        element.classList.remove("pop")
        setTimeout(() => {
            element.classList.add("pop")
        }, 10)
    }

    this.batchTextChange = (pointsId,comboId) => {
        idChangeTextContent(pointsId,_self.points) ; idChangeTextContent(comboId,"x"+_self.comboMultiplier)
    }
    this.pointsTextChange = (pointsId) => idChangeTextContent(pointsId,_self.points)
    this.comboTextChange = (comboId) => idChangeTextContent(comboId,"x"+_self.comboMultiplier)
}