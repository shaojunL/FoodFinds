import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./auth.js";

const signOutButton = document.getElementById("signOutButton"); 

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            renderPage(user); 
            if (window.location.pathname !== "/mySavedRecipes.html") { 
                window.location.replace("./mySavedRecipes.html");      
            }
        } else {
           window.location.replace("./index.html"); 
        }
    })
}
monitorAuthState(); 

async function logout() {
    await signOut(auth);
}

signOutButton.addEventListener("click", logout); 