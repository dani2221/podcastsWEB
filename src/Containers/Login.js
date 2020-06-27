import React,{Component} from 'react';
import './Login.css';
import './PostPage.css';
import Popup from 'reactjs-popup';

class Login extends Component{

    state={
        login:{
            email: '',
            password: ''
        },
        signup:{
            username: '',
            email: '',
            password: ''
        },
        forgot:{
            email:''
        },
        good: false,
        errMesage: '',
        verified: false
    }

    loginE = (event)=>{
        const prevState = {...this.state};
        prevState.login.email=event.target.value;
        this.setState(prevState);
    }
    loginP = (event)=>{
        const prevState = {...this.state};
        prevState.login.password=event.target.value;
        this.setState(prevState);
    }
    signU = (event)=>{
        const prevState = {...this.state};
        prevState.signup.username=event.target.value;
        this.setState(prevState);
    }
    signE = (event)=>{
        const prevState = {...this.state};
        prevState.signup.email=event.target.value;
        this.setState(prevState);
    }
    signP = (event)=>{
        const prevState = {...this.state};
        prevState.signup.password=event.target.value;
        this.setState(prevState);
    }
    forgot = (event)=>{
        const prevState = {...this.state};
        prevState.forgot.email=event.target.value;
        this.setState(prevState);
    }

    submitSignUp = ()=>{
        const {username,email,password} = this.state.signup;
        if(username==''){
            this.setState({good: true, errMesage: 'Внеси Username'});
        }else
        if(username.length>20){
            this.setState({good: true, errMesage: 'Username несмее да биде над 20 букви'});
        }else{

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                  .user(authUser.user.uid)
                  .set({
                    username,
                    email,
                  });
              })
            .then(() => {
                return this.props.firebase.doSendEmailVerification();
              })
            .then(()=>{
                this.props.firebase.doSignOut()
                .then(()=>{
                this.setState({
                login:{
                    email: '',
                    password: ''
                },
                signup:{
                    username: '',
                    email: '',
                    password: ''
                },
                forgot:{
                    email:''
                },
                good: true,
                errMesage: 'Ве молиме кликнете на линкот што ви го испративме на мејл\n за да ја потврдите вашата регистрација'})
            });
            })
            .catch(error => {
                this.setState({good: true, errMesage: 'Тој username или email се веќе зафатени'});
            });
        }

        
    }
    submitSignIn = ()=>{
        const {email,password} = this.state.login;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({
                    login:{
                        email: '',
                        password: ''
                    },
                    signup:{
                        email: '',
                        password: ''
                    },
                    forgot:{
                        email:''
                    },
                    good: false,
                    errMesage: ''
                });
            })
            .catch(error => {
                this.setState({good: true, errMesage: 'Погрешен емаил или лозинка'});
            });

    }
    closePopup = ()=>
    {
        this.setState({
            login:{
                email: '',
                password: ''
            },
            signup:{
                username: '',
                email: '',
                password: ''
            },
            forgot:{
                email:''
            },
            good: false,
            errMesage: ''
        });
    }
    submitPasswordReset = ()=>{
        this.props.firebase.doPasswordReset(this.state.forgot.email)
        .then(()=>{
            this.setState({
                login:{
                    email: '',
                    password: ''
                },
                signup:{
                    username: '',
                    email: '',
                    password: ''
                },
                forgot:{
                    email:''
                },
                good: true,
                errMesage: 'Линк за ресетирање на пасвордот беше пратен на вашиот емаил'
            });
        })
        .catch(()=>{
            this.setState({
                login:{
                    email: '',
                    password: ''
                },
                signup:{
                    username: '',
                    email: '',
                    password: ''
                },
                forgot:{
                    email:''
                },
                good: true,
                errMesage: 'Инвалидна емаил адреса'
            });
        })
    }

    render(){
        return(
            <div>
                <Popup open={this.state.good} onClose={this.closePopup}>
                    <div>
                        <p>{this.state.errMesage}</p>
                        <input type='button' name="" value="Во ред" className='Post-box-inputS' onClick={this.closePopup} />
                    </div>
                </Popup>
                        <div className='LoginDisplay'>
                            <h1 className='Post-box-h1'>Најави се</h1>
                        <form className="form">
                            <input type="email" placeholder="Email" className='Post-box-inputT' onChange={this.loginE} value={this.state.login.email}/>
                            <input type="password" placeholder="Password" className='Post-box-inputT'onChange={this.loginP} value={this.state.login.password}/>
                            <input type="button" className='Post-box-inputS' value='Sign in' onClick={this.submitSignIn}/>
                        </form>
                        </div>
                        <div className='LoginDisplay'>
                        <h1 className='Post-box-h1'>Регистрирај се</h1>
                        <form className="form">
                            <input type="text" placeholder="Username" className='Post-box-inputT' onChange={this.signU} value={this.state.signup.username}/>
                            <input type="text" placeholder="Email" className='Post-box-inputT' onChange={this.signE} value={this.state.signup.email}/>
                            <input type="password" placeholder="Password" className='Post-box-inputT' onChange={this.signP} value={this.state.signup.password}/>
                            <input type="button" className='Post-box-inputS' value='Sign up' onClick={this.submitSignUp}/>
                        </form>
                        </div>
                        <div className='LoginDisplay'>
                        <h1 className='Post-box-h1'>Го заборави <br/>пасвордот?</h1>
                        <form className="form">
                            <input type="text" placeholder="Email" className='Post-box-inputT' onChange={this.forgot} value={this.state.forgot.email}/>
                            <input type="button" className='Post-box-inputS' value='Send' onClick={this.submitPasswordReset}/>
                        </form>
                        </div>
            </div>

        )
    }
}
export default Login;