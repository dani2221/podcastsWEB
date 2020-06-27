import React, { Component } from 'react';
import './App.css';
import logo from './Photos/logo.png';
import PodcastPage from './Containers/PodcastPage'
import PostPage from './Containers/PostPage';
import Login from './Containers/Login';
import {BrowserRouter, Route, NavLink, Switch, Router} from 'react-router-dom';
import { FirebaseContext } from './FIREBASE/firebase';
import AuthPage from './Containers/AuthPage';
import { withFirebase } from './FIREBASE/firebase';
import ProfilePage from './Containers/ProfilePage';
import PostFire from './Containers/PostFire';
import ProfileFire from './Containers/ProfileFire';
import PublicProfilePage from './Containers/PublicProfilePage';
import FireOnePodcastPage from './Containers/FireOnePodcastPage';
import Pravila from './Components/pravila';
const NotFoundPage = ()=>{
  return(
    <div>
      <h1>404 - Оваа страна не е пронајдена</h1>
    </div>
  )
}

class App extends Component {

  state = {
    authUser: null,
    verified: false
  };
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      
      if(authUser){
        this.setState({ authUser })
        authUser.emailVerified
        ? this.setState({verified: true})
        : this.setState({verified: false});
      }else{
        this.setState({ authUser: null });
        this.setState({verified: false});
      }
        
    });
  }
  goHome = ()=>{
    this.props.history.push('/');
  }


  render(){
  return (
    <div className="App">
      <BrowserRouter>
      <header className='App-header'>
        <a href='/' style={{margin: '0px', padding: '0px'}}>
          <img src={logo} className='App-logo App-header' style={{"pointer-events": "all"}}/>
        </a>
        <div className='App-header-right'>
          <NavLink to='/myprofile'>Мој профил</NavLink>
        </div>
      </header>
        <div>
          <Switch>
          <Route exact path='/' component={PodcastPage} />
          <Route path='/post'
          render={this.state.verified ? (authUser)=><PostFire authUser={this.state.authUser}/>: ()=><AuthPage/>} />
          <Route path='/login' 
          render={this.state.verified ? (authUser)=><ProfileFire authUser={this.state.authUser}/>: ()=><AuthPage/>}/>
          <Route path='/myprofile' 
          render={this.state.verified ? (authUser)=><ProfileFire authUser={this.state.authUser}/>: ()=><AuthPage/>}/>
          <Route exact path='/users/:uid' component={PublicProfilePage}/>
          <Route path='/users/:uid/podcasts/:pid' render={(authUser)=><FireOnePodcastPage authUser={this.state.authUser}/>}/>
          <Route path='/pravila' component={Pravila}/>
          <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
  }
}

export default withFirebase(App);
