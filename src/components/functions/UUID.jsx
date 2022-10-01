
// 3,012,192,716,517,082 possible combinations without counting title

export default function UUID(title = ""){

    const chars = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm~!@$%^&*()_+-=,./';:\"?><[]\\{}|`#".split("")
    const char_length = chars.length
    const get_random = () => chars[Math.floor(Math.random() * char_length)]
    let str = title + "_"

    for (let x = 0; x < 12 ; x++) {
        str+= get_random()
    }

    return str
}