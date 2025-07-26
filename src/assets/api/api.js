export const organiseList_auth = (list, authType) => {
    const data = {};
    for(let item of list) {
        if(item.name === "email") {
            if(authType === "signUp") {
                data['emailAddress'] = item.value; 
            }
            if(authType === "login") {
                data['identifier'] = item.value; 
            }
        }
        if(item.name === 'password') {
            data['password'] = item.value; 
        }
    }
    return data;
}