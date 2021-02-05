import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAJMBf4D8NaYnW8HGqIB3J5s7YATVvwOz0",
    authDomain: "snapchat-clone-7566f.firebaseapp.com",
    projectId: "snapchat-clone-7566f",
    storageBucket: "snapchat-clone-7566f.appspot.com",
    messagingSenderId: "869814028611",
    appId: "1:869814028611:web:6ed31ed3ddbec8545347f6"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, storage, provider };
  