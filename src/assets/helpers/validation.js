export const emailValidate = (input) => {
    if(input === "") {
        return `Email is empty.`
    }
    else {
        const validRule = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(input.match(validRule)) {
            return true
        }
        else {
            return `Enter a correct email`
        }
    }
} 

export const passwordValidate = (input) => {
    if(input === "") {
        return `Password is empty.`
    } 
    else {
        if(input.length < 8) {
            return 'Password must be at least 8 characters.'
        }
    
        const char = { list: ["!", "@", "$", "%", "^", "&", "*"], hasChar: false };
        const numbers = { list: [1,2,3,4,5,6,7,8,9,0], hasNumber: false };
    
        for(let item of char.list) {
            if(input.includes(item)) {
                char.hasChar = true;
                break;
            }
        }
    
        for(let item of numbers.list) {
            if(input.includes(item)) {
                numbers.hasNumber = true;
                break;
            }
        }
    
        if(!numbers.hasNumber) {
            return `Password must contain at least one number`
        }
        if(!char.hasChar) {
            return `Password must contain at least one !@#$%^&*`
        }
    }
}

export const phoneValidation = (input) => {
    if(input === "") {
        return true;
    }
    else {
        const validRule = /^(?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/;
        if(input.match(validRule)) {
            return true
        }
        else {
            return `Enter a correct phone`
        }
    }
}