import { auth } from "./auth.js"; 
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
 
const createAccountButtonEl = document.getElementById("createAccountButton"); 
const emailInputEl = document.getElementById("emailInput");
const passwordInputEl = document.getElementById("passwordInput"); 
const messageTextEl = document.getElementById("messageText"); 
const createAccountHeaderButton = document.getElementById("createAccount"); 
const signInHeaderButton = document.getElementById("signIn"); 

messageTextEl.innerText = ""; 

const createAccount = async() => {
    const loginEmail = emailInputEl.value;
    const loginPassword = passwordInputEl.value; 
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword); 
        messageTextEl.innerText = "Account successfully created."; 
        messageTextEl.style.backgroundColor = "green";
    } catch (error) { 
        messageTextEl.innerText = "Failed to create account."; 
        messageTextEl.style.backgroundColor = "red";
    }
}

createAccountHeaderButton.addEventListener("click", ()=> {
    window.location.replace("./createAccount.html"); 
})

signInHeaderButton.addEventListener("click", ()=> {
    window.location.replace("./signIn.html"); 
})

createAccountButtonEl.addEventListener("click", ()=> {
    createAccount(); 
}); 