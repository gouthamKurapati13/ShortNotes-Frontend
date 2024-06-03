export const validateEmail = (email) => { 
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

export const getInitials = (username) => {
    let res="";
    const words = username.split(" ");
    for (let i=0; i<Math.min(2, words.length); i++)
        res += words[i][0];
    return res.toUpperCase();
}