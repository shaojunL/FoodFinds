import { app } from "./app.js"; 
import { auth } from "./auth.js"; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"; 
import { submitForm } from "./test.js";
const database = getDatabase(app); 

const myProfileBannerEl = document.getElementById("myProfileBanner"); 
const mySavedRecipesBannerEl = document.getElementById("mySavedRecipesBanner"); 
const createAccountEl = document.getElementById("createAccount"); 
const signInEl = document.getElementById("signIn"); 
const autoFillDiv = document.getElementById("autofill"); 
const checkBoxEl = document.getElementById("autofillButton"); 
export const dietaryRestrictionSelectEl = document.getElementById("selectDietaryRestrictions"); 
export const cuisinePreferenceSelectEl = document.getElementById("cuisine");
export const ingredientsSelectEl = document.getElementById("ingredient");  
const submitButtonEl = document.getElementById("submit-button"); 

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

            //show autofill option 
            autoFillDiv.style.visibility = "visible"; 
            checkBoxEl.addEventListener("click", ()=> {
                if (checkBoxEl.checked) {
                    console.log("checked")
                    autofill(user.uid);
                } else {
                    clearForm(); 
                    console.log("unchecked"); 
                }
            }); 

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

            //hide autofill function
            autoFillDiv.style.visibility = "hidden"; 
            clearForm(); 
        }
    })
}
monitorAuthState(); 

function autofill(uid) {
    let userInDB = ref(database, `users/${uid}`); 
    onValue(userInDB, function(snapshot){
        if (snapshot.exists()) {
            let dataArr = Object.entries(snapshot.val()); 
            let dietaryRestrictionVal = dataArr[0][1]; 
            let cuisinePreferenceVal = dataArr[1][1]; 
            dietaryRestrictionSelectEl.value = dietaryRestrictionVal; 
            cuisinePreferenceSelectEl.value = cuisinePreferenceVal; 
        }
    }); 
}

function clearForm() {
    dietaryRestrictionSelectEl.value = ""; 
    cuisinePreferenceSelectEl.value = ""; 
}

async function logout() {
    await signOut(auth);
}

submitButtonEl.addEventListener("click", () => {
    submitForm(); 
})