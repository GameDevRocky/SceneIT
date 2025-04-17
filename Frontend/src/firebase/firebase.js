import { initializeApp } from "firebase/app"; import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
const firebaseConfig = { apiKey: "AIzaSyDbGAU0jeX8pvdqM5MP7rNlHD7vVoGzEcQ",
     authDomain: "sceneit-1aa98.firebaseapp.com", 
     projectId: "sceneit-1aa98", 
     storageBucket: "sceneit-1aa98.firebasestorage.app", 
     messagingSenderId: "239652049139",
      appId: "1:239652049139:web:873db68a8132714427a786", 
      measurementId: "G-NWHFWWJDTM" }; 


      const app = initializeApp(firebaseConfig)
      const auth = getAuth(app)
      export {app, auth};