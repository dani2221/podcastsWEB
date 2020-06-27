import React from 'react'
import Login from './Login'
import { FirebaseContext } from '../FIREBASE/firebase';

const AuthPage = ()=>(
    <FirebaseContext.Consumer>
        {firebase => <Login firebase={firebase} />}
    </FirebaseContext.Consumer>
)

export default AuthPage;