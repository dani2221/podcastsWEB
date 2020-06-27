import React from 'react'
import { FirebaseContext } from '../FIREBASE/firebase';
import OnePodcastPage from './OnePodcastPage';
import { Router, withRouter } from 'react-router-dom';

const FireOnePodcastPage = (props)=>(
    <FirebaseContext.Consumer>
        {firebase => <OnePodcastPage firebase={firebase} authUser={props.authUser} match={props.match}/>}
    </FirebaseContext.Consumer>
)

export default withRouter(FireOnePodcastPage);