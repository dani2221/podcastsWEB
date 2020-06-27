import app, { initializeApp } from 'firebase/app';
import FirebaseContext,{withFirebase} from './context';
import 'firebase/auth';
import 'firebase/database';

 
const firebaseConfig = {
    apiKey: "AIzaSyDdPQk1fxiMzdB3JdCcAWdi_lAi9dhSt2U",
    authDomain: "podcastmk-efccc.firebaseapp.com",
    databaseURL: "https://podcastmk-efccc.firebaseio.com",
    projectId: "podcastmk-efccc",
    storageBucket: "podcastmk-efccc.appspot.com",
    messagingSenderId: "877515636487",
    appId: "1:877515636487:web:11945fcf27979253bacfa2",
    measurementId: "G-7QJECTY6XP"}
 
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  
  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: 'http://localhost:3000/myprofile'
    });
 
  user = uid => this.db.ref(`users/${uid}`);
 
  users = () => this.db.ref('users')

  post = postid => this.db.ref('podcasts/${postid}');


}
export default Firebase;
export { FirebaseContext,withFirebase };