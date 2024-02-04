import { app } from "./app.js"; 
import { auth } from "./auth.js"; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, push, onValue, remove, update, set} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"; 

const database = getDatabase(app); 
const signOutButton = document.getElementById("signOutButton"); 
const helloText = document.getElementById("helloText"); 
const inputOneEl = document.getElementById("input1"); 
const inputTwoEl = document.getElementById("input2");
const saveButtonEl = document.getElementById("saveButton"); 
const showSavedDataButtonEl = document.getElementById("showInfo"); 
const showSavedDataTextEl = document.getElementById("savedInfo"); 

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
    helloText.innerHTML = "hello " + user.uid;
    saveButtonEl.addEventListener("click", function() {
        saveData(user.uid); 
    }); 
    showSavedDataButtonEl.addEventListener("click", function() {
        showSavedData(user.uid); 
    })
}

function saveData(uid) { 
    let userInDB = ref(database, `users/${uid}`); 
    update(userInDB, {
        input1: inputOneEl.value, 
        input2: inputTwoEl.value 
    }); 
}

function showSavedData(uid) {
    let userInDB = ref(database, `users/${uid}`);  

    onValue(userInDB, function(snapshot){
        showSavedDataTextEl.innerHTML = ""; 

        if (snapshot.exists()) {
            let dataArr = Object.entries(snapshot.val()); 
            console.log(dataArr); 
            showSavedDataTextEl.innerHTML = `Input 1: ${dataArr[0][1]}, Input 2: ${dataArr[1][1]}`; 
        }
    }); 
}

async function logout() {
    await signOut(auth);
}

signOutButton.addEventListener("click", logout); 