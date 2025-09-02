importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCHaBdK41yP7DsTnSMtg707hUunU-tISeM",
  authDomain: "my-future-talk.firebaseapp.com",
  databaseURL: "https://my-future-talk-default-rtdb.firebaseio.com",
  projectId: "my-future-talk",
  storageBucket: "my-future-talk.firebasestorage.app",
  messagingSenderId: "373261190733",
  appId: "1:373261190733:web:95aec6dc4d96608b637e04",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();