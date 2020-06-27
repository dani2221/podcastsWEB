import React from 'react'
import ProfilePage from './ProfilePage'
import { FirebaseContext } from '../FIREBASE/firebase';

const ProfileFire = (props)=>(
    <FirebaseContext.Consumer>
        {firebase => <ProfilePage firebase={firebase} authUser={props.authUser}/>}
    </FirebaseContext.Consumer>
)

export default ProfileFire;