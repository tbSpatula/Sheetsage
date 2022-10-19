export default function processPallete(arr){
    document.documentElement.setAttribute("style","")
    const values = ["dark","lightest","light-2","light","background","theme"]
    arr.forEach((value,index) => {
        const variable = "--" + values[index]
        document.documentElement.style.setProperty(variable,value)
    });
}