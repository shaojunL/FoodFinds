import { auth } from "./auth.js"; 
import { onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const signInButton = document.getElementById("signInButton");
const emailInputEl = document.getElementById("emailInput"); 
const passwordInputEl = document.getElementById("passwordInput");  
const signInText = document.getElementById("signInText"); 
const createAccountHeaderButton = document.getElementById("createAccount"); 
const signInHeaderButton = document.getElementById("signIn"); 

signInText.innerText = ""; 

export const loginEmailPassword = async () => {
    const loginEmail = emailInputEl.value;
    const loginPassword = passwordInputEl.value; 
    try {
        let userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword); 
    } catch (error) {
        //show invalid password error 
        signInText.innerText = "Wrong email or password."; 
    }
}

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            if (window.location.pathname !== "/home.html") { 
                window.location.replace("./home.html"); 
            }
        } else {

        }
    })
}
monitorAuthState(); 

createAccountHeaderButton.addEventListener("click", ()=> {
    window.location.replace("./createAccount.html"); 
})

signInHeaderButton.addEventListener("click", ()=> {
    window.location.replace("./signIn.html"); 
})

signInButton.addEventListener("click", loginEmailPassword);  
