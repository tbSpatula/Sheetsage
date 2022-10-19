function setUserPreference(key=""){
    const obj = JSON.parse(localStorage.getItem("userPreferences") || "{}")
    
    function set(value){
        obj[key] = value
        localStorage.setItem("userPreferences",JSON.stringify(obj))
    }

    return set
}

function getUserPreference(key){
    try {
        const userpref = JSON.parse(localStorage.getItem("userPreferences"))[key]
        return userpref
    } catch(error){
        return null
    }
}

export {getUserPreference,setUserPreference}
