import { auth } from "./auth.js"; 
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const mainButtonEl = document.getElementById("mainButton"); 
const createAccountButtonEl = document.getElementById("createAccountButton"); 
const emailInputEl = document.getElementById("emailInput");
const passwordInputEl = document.getElementById("passwordInput"); 
const messageTextEl = document.getElementById("messageText"); 
messageTextEl.innerText = ""; 

const createAccount = async() => {
    const loginEmail = emailInputEl.value;
    const loginPassword = passwordInputEl.value; 
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword); 
        messageTextEl.innerText = "Account successfully created."; 
    } catch (error) { 
        messageTextEl.innerText = "Failed to create account."; 
    }
}


mainButtonEl.addEventListener("click", ()=> {
    window.location.replace("./index.html"); 
}); 

createAccountButtonEl.addEventListener("click", ()=> {
    createAccount(); 
}); 