import { app } from "./app.js"; 
import { auth } from "./auth.js"; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const myProfileBannerEl = document.getElementById("myProfileBanner"); 
const mySavedRecipesBannerEl = document.getElementById("mySavedRecipesBanner"); 
const createAccountEl = document.getElementById("createAccount"); 
const signInEl = document.getElementById("signIn"); 

myProfileBannerEl.style.visibility = "hidden"; 
mySavedRecipesBannerEl.style.visibility = "hidden"; 

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            //show banners 
            myProfileBannerEl.style.visibility = "visible"; 
            mySavedRecipesBannerEl.style.visibility = "visible"; 

            //Sign out button instead of create account button
            createAccountEl.innerText = "Sign Out"; 
            createAccountEl.addEventListener("click", logout); 

            //hide Sign in button visibility 
            signInEl.style.visibility = "hidden"; 
        } else {
            //hide banners
            myProfileBannerEl.style.visibility = "hidden"; 
            mySavedRecipesBannerEl.style.visibility = "hidden"; 

            createAccountEl.addEventListener("click", ()=>{
                window.location.replace("./createAccount.html"); 
            }); 
            
            signInEl.addEventListener("click", ()=>{
                window.location.replace("./signIn.html"); 
            }); 

            //restore Create account button visibility 
            createAccountEl.innerText = "Create Account"; 

            //show Sign in button
            signInEl.style.visibility = "visible"; 
        }
    })
}
monitorAuthState(); 

async function logout() {
    await signOut(auth);
}
