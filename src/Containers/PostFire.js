import React from 'react'
import PostPage from './PostPage'
import { FirebaseContext } from '../FIREBASE/firebase';
import { Router, withRouter } from 'react-router-dom';

const PostFire = props=>(
    <FirebaseContext.Consumer>
        {firebase => <PostPage firebase={firebase} authUser={props.authUser} match={props.match}/>}
    </FirebaseContext.Consumer>
)

export default withRouter(PostFire);