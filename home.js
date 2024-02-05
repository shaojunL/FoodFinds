import { app } from "./app.js"; 
import { auth } from "./auth.js"; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, push, onValue, remove, update, set} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"; 

const database = getDatabase(app); 
const signOutButton = document.getElementById("signOutButton"); 
const emailAddressEl = document.getElementById("emailAddress"); 
const dietaryRestrictionInputEl = document.getElementById("dietaryRestrictionInput"); 
const cuisinePreferenceInputEl = document.getElementById("cuisinePreferenceInput"); 
const saveButtonEl = document.getElementById("saveButton"); 
const editInfoButtonEl = document.getElementById("editInfo"); 

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user) {
            renderPage(user); 
            if (window.location.pathname !== "/home.html") { 
                window.location.replace("./home.html");      
            }
        } else {
           window.location.replace("./index.html"); 
        }
    })
}
monitorAuthState(); 

function renderPage(user) {
    emailAddressEl.innerHTML = user.email;
    saveButtonEl.addEventListener("click", function() {
        saveData(user.uid); 
    }); 
    showSavedData(user.uid); 
}

function saveData(uid) { 
    let userInDB = ref(database, `users/${uid}`); 
    update(userInDB, {
        input1: dietaryRestrictionInputEl.value, 
        input2: cuisinePreferenceInputEl.value 
    }); 

    onValue(userInDB, function(snapshot){
        if (snapshot.exists()) {
            let dataArr = Object.entries(snapshot.val()); 
            replaceInputWithText(dataArr); 
        }
    }); 

    saveButtonEl.style.visibility = "hidden"; 
}

function editData(dataArr, uid, dietaryRestrictionTextEl, cuisinePreferenceTextEl){
    replaceTextwithInput(dietaryRestrictionTextEl, cuisinePreferenceTextEl); 
    editInfoButtonEl.style.visibility = "hidden"; 
    saveButtonEl.addEventListener("click", ()=>{
        showSavedData(uid); 
        saveData(uid); 
    }); 
    saveButtonEl.style.visibility = "visible"; 
}

function replaceTextwithInput(dietaryRestrictionTextEl, cuisinePreferenceTextEl) {
    dietaryRestrictionTextEl.replaceWith(dietaryRestrictionInputEl); 
    cuisinePreferenceTextEl.replaceWith(cuisinePreferenceInputEl); 
}

function replaceInputWithText(dataArr, uid) {
    let dietaryRestrictionTextEl = document.createElement("h3"); 
    let cuisinePreferenceTextEl = document.createElement("h3"); 
    dietaryRestrictionInputEl.replaceWith(dietaryRestrictionTextEl); 
    cuisinePreferenceInputEl.replaceWith(cuisinePreferenceTextEl); 
    dietaryRestrictionTextEl.innerText = dataArr[0][1]; 
    cuisinePreferenceTextEl.innerText = dataArr[1][1]; 

    editInfoButtonEl.addEventListener("click", () => {
        editData(dataArr, uid, dietaryRestrictionTextEl, cuisinePreferenceTextEl); 
    });
}

function showSavedData(uid) {
    let userInDB = ref(database, `users/${uid}`); 
    onValue(userInDB, function(snapshot){
        if (snapshot.exists()) {
            let dataArr = Object.entries(snapshot.val()); 
            replaceInputWithText(dataArr, uid); 
        }
    }); 
    saveButtonEl.style.visibility = "hidden"; 
    editInfoButtonEl.style.visibility = "visible"; 
}

async function logout() {
    await signOut(auth);
}

signOutButton.addEventListener("click", logout); 