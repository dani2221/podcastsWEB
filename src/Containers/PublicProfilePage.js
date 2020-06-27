import React,{Component} from 'react';
import Podcast from '../Components/Podcast'
import Axios from 'axios';
import './ProfilePage.css';
import {NavLink} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Popup from 'reactjs-popup';


export default class PublicProfilePage extends Component{
    state={
        username: '',
        views: '',
        mypodcasts: [],
        copied: false,
        Render: false
    }
    componentDidMount(){
        let uidd = this.props.match.params.uid;
        uidd = uidd.slice(0, -3);
        Axios.get('https://podcastmk-efccc.firebaseio.com/users/'+uidd+'.json').then(response=>{
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
                views+=podk.likes
            });
            if(response.data===null){
                this.setState({
                    username: '404 - Не е пронајден тој корисник',
                    email: '',
                    views: '/',
                    mypodcasts: [],
                    Render: false
                });
            }else{
            this.setState({
                username: response.data.username,
                email: response.data.email,
                views: views,
                mypodcasts: pdcc,
                Render: true
            });
        }
        }).then(()=>{
            let podcastss = [...this.state.mypodcasts];
            podcastss.sort((a,b)=>(a.likes<b.likes? 1:-1));
            this.setState({mypodcasts: podcastss});
        }
        )
    }
    onProgress = (pindex)=>{
        const updateViews = [...this.state.mypodcasts]
        updateViews[pindex].likes+=1;
        Axios.put('https://podcastmk-efccc.firebaseio.com/users/'+updateViews[pindex].uid+'/podcasts/'+updateViews[pindex].podcastNum+'.json',updateViews[pindex]);
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
        let desc = null;
        if(this.state.views<20){
            desc= 'Почетник подкастер';
        }else if(this.state.views<50){
            desc= 'Вешт подкастер';
        }else if(this.state.views<200){
            desc= 'Искусен подкастер';
        }else if(this.state.views<500){
            desc= 'Напреден подкастер';
        }else{
            desc= 'Подкаст бог';
        }
        return(
            <div>
                <div>
                    <Popup open={this.state.copied} onClose={this.closePopup}>
                        <div>
                            <p>Линк до вашиот профил беше успешно ископиран во вашиот clipboard</p>
                            <input type='button' name="" value="Во ред" className='Post-box-inputS' onClick={this.closePopup} />
                        </div>
                    </Popup>
                    <div className='divvv'>
                        <p className='hhh'>{this.state.username}</p>
                        {this.state.Render?<p className='stat'>{desc}</p>:''}
                    </div>
                    {this.state.Render?<div className='vl'/>:''}
                    {this.state.Render?<h4 className='end'>Слушатели: {this.state.views}</h4> : ''}
                    <hr style={{marginTop:'30px',marginBottom:'30px'}}/>
                    <CopyToClipboard text={'https://podcastsmk.web.app/users/'+this.props.match.params.uid+'/'}
                    onCopy={() => this.setState({copied: true})}>
                        <button className='PP-button1' style={{fontSize: '15px',color: '#388E8E'}} >Сподели профил</button>
                    </CopyToClipboard>
                    
                    {this.state.Render?<h3 style={{fontWeight: '900', color: '#6d6875'}}>Подкасти:</h3>:''}
                    
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
                        plusLike = {()=>this.onProgress(index)}
                        podcastClick = {()=>this.podcastClick(index)}/>
                    })}
                </div>
            </div>
        );
    }
}