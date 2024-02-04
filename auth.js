import { app } from "./app.js"; 
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
export const auth = getAuth(app);