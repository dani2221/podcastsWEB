import React,{Component} from 'react';
import Podcast from '../Components/Podcast'
import Axios from 'axios';
import './ProfilePage.css';
import {NavLink, withRouter} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Popup from 'reactjs-popup';
import ProfileFire from './ProfileFire';

class ProfilePage extends Component{
    state={
        username: '',
        email: '',
        views: '',
        mypodcasts: [],
        copied: false
    }
    componentDidMount(){
        Axios.get('https://podcastmk-efccc.firebaseio.com/users/'+this.props.authUser.uid+'.json').then(response=>{
            let views = 0;
            let pdcc = [];
            try{
                pdcc = Object.values(response.data.podcasts)
                
            }catch{
                pdcc = [];
            }
            for(var i=0;i<pdcc.length;i++){
                if(pdcc[i]===null){
                    pdcc.splice(i,1);
                }
            }
            pdcc.map(podk=>{
                views+=podk.likes;
            });
            
            this.setState({
                username: response.data.username,
                email: response.data.email,
                views: views,
                mypodcasts: pdcc
            });
        }).then(()=>{
            let podcastss = [...this.state.mypodcasts];
            podcastss.sort((a,b)=>(a.likes<b.likes? 1:-1));
            this.setState({mypodcasts: podcastss});
        }
        )
    }
    closePopup = ()=>
    {
        this.setState({copied: false})
    }
    podcastClick = pindex => {
        const update = [...this.state.mypodcasts]
        const targetPodcast = update[pindex];
        const rng = this.genererateRandomThreeLetters();
        const url = '/users/'+targetPodcast.uid+rng+'/podcasts/'+targetPodcast.podcastNum+'/';
        this.props.history.push(url);
    }
    genererateRandomThreeLetters = ()=>{
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 3; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));    
        }
        return result;
    }
    render(){
        return(
            <div>
                <div>
                    {/* <table width='100%'>
                        <tr width='100%'> 
                            <th><h1 className='hhh'>{this.state.username}</h1></th>
                            <div className='vl'/>
                            <h4 className='end'>Слушатели: {this.state.views}</h4>  
                        </tr>
                        {/* <tr>
                            <button className='PP-button1' onClick={this.props.firebase.doSignOut} style={{display: 'block', marginLeft: '30px'}}>Log out</button>
                            <h6 className='stat'>{this.state.email}</h6>
                        </tr> 
                    </table> */}
                    <Popup open={this.state.copied} onClose={this.closePopup}>
                        <div>
                            <p>Линк до овој профил беше успешно ископиран во вашиот clipboard</p>
                            <input type='button' name="" value="Во ред" className='Post-box-inputS' onClick={this.closePopup} />
                        </div>
                    </Popup>
                    <div className='divvv'>
                        <p className='hhh'>{this.state.username}</p>
                        <p className='stat'>{this.state.email}</p>
                    </div>
                    <div className='vl'/>
                    <h4 className='end'>Слушатели: {this.state.views}</h4> 
                    <hr style={{marginTop:'30px',marginBottom:'30px'}}/>
                    <CopyToClipboard text={'https://podcastsmk.web.app/users/'+this.props.authUser.uid+'rt0/'}
                    onCopy={() => this.setState({copied: true})}>
                        <button className='PP-button1' style={{fontSize: '15px',color: '#388E8E'}} >Сподели профил</button>
                    </CopyToClipboard>
                    <NavLink to='/post' className='PP-button1'>Нов подкаст</NavLink>

                    <button className='PP-button1' onClick={this.props.firebase.doSignOut} >Log out</button>
                    
                    <h3 style={{fontWeight: '900', color: '#6d6875'}}>Мои подкасти:</h3>
                    
                </div>
                <div>
                    {this.state.mypodcasts.map((podc,index)=>{
                        return <Podcast 
                        key = {podc.podcastNum}
                        title={podc.title} 
                        shortbody={podc.shortbody}
                        longbody={podc.longbody}
                        url={podc.url} 
                        likes={podc.likes}
                        poster={podc.poster}
                        date={podc.date}
                        podcastClick = {()=>this.podcastClick(index)}/>
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(ProfilePage);