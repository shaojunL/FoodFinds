const createAccountEl = document.getElementById("createAccount"); 
const signInEl = document.getElementById("signIn"); 

createAccountEl.addEventListener("click", ()=>{
    window.location.replace("./createAccount.html"); 
}); 

signInEl.addEventListener("click", ()=>{
    window.location.replace("./signIn.html"); 
}); 