import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD6fCoQ7Y43DKqRoQA8o3hCywm45LIOUdM",
  authDomain: "banded-cumulus-325818.firebaseapp.com",
  projectId: "banded-cumulus-325818",
  storageBucket: "banded-cumulus-325818.appspot.com",
  messagingSenderId: "498577249009",
  appId: "1:498577249009:web:6cdd4a6c2f5c37cc238f50"
};

  export const Firebase= firebase.initializeApp(firebaseConfig);
 //named export