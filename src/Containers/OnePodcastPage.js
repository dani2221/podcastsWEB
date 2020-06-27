import React, {Component} from 'react'
import Podcast from '../Components/Podcast';
import Axios from '../axiosinstance'
import SearchBar from '../Components/SearchBar';
import ReactPlayer from 'react-player';
import './OnePodcastPage.css'
import Popup from 'reactjs-popup';
import CopyToClipboard from 'react-copy-to-clipboard';
import Comments from '../Components/Comments';
import { withRouter } from 'react-router-dom';

class OnePodcastPage extends Component{
    state = {
        link: '',
        title: '',
        views: 0,
        shortBody: '',
        longBody: '',
        author: '',
        date: '',
        copied: false,
        commentText: '',
        comments: [],
        commentPosted: false,
        commentPostedMessage: ''
    }
    componentDidMount(){
        let uid = this.props.match.params.uid;
        uid = uid.slice(0, -3);
        const pid = this.props.match.params.pid;
        let username = '';
        Axios.get('https://podcastmk-efccc.firebaseio.com/users/'+uid+'/username.json').then(response=>{
            username=response.data;
        }).then(response=>{
        Axios.get('https://podcastmk-efccc.firebaseio.com/users/'+uid+'/podcasts/'+pid+'.json').then(response=>{
            if(response.data===null){
                this.props.history.push('/404')
            }else{
            const values = Object.values(response.data.comments);
            this.setState({
                link: response.data.url,
                title: response.data.title,
                views: response.data.likes,
                shortBody: response.data.shortbody,
                longBody: response.data.longbody,
                author: username,
                date: response.data.date,
                comments: values
            })
        }
        });
    })

    }
    closePopup = ()=>
    {
        if(this.state.commentPostedMessage[0]!=='К'){
            this.setState({copied: false,commentPosted: false,commentText: ''})
        }else{
            this.setState({copied: false,commentPosted: false})
        }
    }
    onProgress = ()=>{
        const view = this.state.views+1;
        let uid = this.props.match.params.uid;
        uid = uid.slice(0, -3);
        const pid = this.props.match.params.pid;
        Axios.put('https://podcastmk-efccc.firebaseio.com/users/'+uid+'/podcasts/'+pid+'/likes.json',view);
    }
    authorClick = () => {
        let uid = this.props.match.params.uid;
        const url = '/users/'+uid+'/';
        this.props.history.push(url);
    }

    commentChanged = event => {
        this.setState({
            commentText: event.target.value
        })
    }
    postComment = ()=>{
        if(this.state.commentText.length>1000){
            const problem = 'Коментарот мора да биде под 1000 букви '+this.state.commentText.length+'/1000';
            this.setState({commentPosted: true,commentPostedMessage: problem})
        }else if(this.state.commentText.length===0){
            const problem = 'Коментарот несмее да е празен';
            this.setState({commentPosted: true,commentPostedMessage: problem})
        }
        else if(this.props.authUser===null){
            this.props.history.push('/login/')
        }else{
        const uuid = this.props.authUser.uid;
        let username = '';
        const date = Date.now();
        Axios.get('https://podcastmk-efccc.firebaseio.com/users/'+uuid+'/username.json').then(response=>{
                username = response.data;
            }).then(response=>{
                const comment = {
                    name: username,
                    content: this.state.commentText,
                    date: date
                }
                let uid = this.props.match.params.uid;
                uid = uid.slice(0, -3);
                const pid = this.props.match.params.pid;
                const rand = Math.floor(Math.random()*50000);
                Axios.put('https://podcastmk-efccc.firebaseio.com/users/'+uid+'/podcasts/'+pid+'/comments/'+rand+'.json',comment).then(response1=>{
                    this.setState({commentPosted: true,commentPostedMessage:'Успешно поставен коментар'});
                }).catch(()=>{
                    this.setState({commentPosted: true,commentPostedMessage:'Проблем при коментирање, пробајте повторно подоцна'});
                })
        }).catch(()=>{
            this.setState({commentPosted: true,commentPostedMessage:'Проблем при коментирање, пробајте повторно подоцна'});
        });}
    }

    render(){
        if(typeof this.state.comments === "undefined"){
            this.setState({comments: []});
        }
        let commentss = [...this.state.comments];
        commentss.sort((a,b)=>(a.date>b.date)? 1 : -1)
        return(
            <div width='100%'>
                <Popup open={this.state.copied} onClose={this.closePopup}>
                        <div>
                            <p>Линк до овој подкаст беше успешно ископиран во вашиот clipboard</p>
                            <input type='button' name="" value="Во ред" className='Post-box-inputS' onClick={this.closePopup} />
                        </div>
                </Popup>
                <Popup open={this.state.commentPosted} onClose={this.closePopup}>
                        <div>
                            <p>{this.state.commentPostedMessage}</p>
                            <input type='button' name="" value="Во ред" className='Post-box-inputS' onClick={this.closePopup} />
                        </div>
                </Popup>
                <div className='FullDiv'>
                    <div className='Containerr'> 
                        <ReactPlayer className='Player' url={this.state.link} width='80%' height='' onStart={()=>this.onProgress()}/>
                        <div style={{display:'block'}}>
                            <p className='Title'>{this.state.title}</p>
                            <div className='Infodiv'>
                                <p className='Info' >Слушатели: {this.state.views}</p>
                                <p className='Info' >{this.state.date}</p>
                                <p>{this.state.longBody}</p>
                            </div>
                        </div>
                    </div>
                    <div className='Share'>
                        <div className='Short' style={{fontWeight: '900',fontSize: '20px',color: '#6d6875',marginTop: '50px'}} onClick={()=>this.authorClick()}>
                            <p>{this.state.author}</p>
                        </div>
                        <div className='Short'>
                            <p>{this.state.shortBody}</p>
                        </div>
                        <CopyToClipboard text={'https://podcastsmk.web.app/users/'+this.props.match.params.uid+'/podcasts/'+this.props.match.params.pid+'/'}
                        onCopy={() => this.setState({copied: true})}>
                            <div className='Short' style={{fontWeight: '900',fontSize: '20px',maxHeight: '10px',paddingTop:'25px',boxShadow:'0 4px 8px 0 #388E8E',color: '#388E8E'}} >Сподели подкаст</div>
                        </CopyToClipboard>
                    </div>
                </div>
                <div style={{alignContent: 'center',alignItems:'center',alignSelf:'center'}}>
                    <Comments 
                        commentAmount={this.state.comments.length}
                        comments={commentss} 
                        postComment={()=>this.postComment()}
                        commentChanged={(event)=>this.commentChanged(event)}
                        commentText={this.state.commentText}
                        />
                </div>
            </div>
        )
    }
}

export default withRouter(OnePodcastPage);