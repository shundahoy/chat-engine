import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDrFNWYGNSpJrzSVCegKigdXsCUQIqrtDw",
    authDomain: "chat-test-d04c0.firebaseapp.com",
    projectId: "chat-test-d04c0",
    storageBucket: "chat-test-d04c0.appspot.com",
    messagingSenderId: "456264335441",
    appId: "1:456264335441:web:b06d57722ab71a957df870",
  })
  .auth();
