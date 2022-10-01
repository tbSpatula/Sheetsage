export default function is_function(input){
    const is = typeof input === "function"
    if(is){
        return input
    } else {
        const error = new Error("Not of type 'function'")
        throw error
    }
}