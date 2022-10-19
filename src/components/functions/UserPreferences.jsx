function setUserPreference(key=""){
    const obj = JSON.parse(localStorage.getItem("userPreferences") || "{}")
    
    function set(value){
        obj[key] = value
        localStorage.setItem("userPreferences",JSON.stringify(obj))
    }

    return set
}

function getUserPreference(key){
    return JSON.parse(localStorage.getItem("userPreferences"))[key]
}

export {getUserPreference,setUserPreference}
