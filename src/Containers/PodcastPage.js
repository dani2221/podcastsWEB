import React, {Component} from 'react'
import Podcast from '../Components/Podcast';
import Axios from '../axiosinstance'
import SearchBar from '../Components/SearchBar';
import { Redirect } from 'react-router-dom';
import '../App.css'
import InfiniteScroll from "react-infinite-scroll-component";

export default class PodcastPage extends Component{

    state={
        allpodcasts: [],
        podcasts: [],
        items: [],
        hasMore: true,
        num: 1

    };
    onProgress = (pindex)=>{
        const updateViews = [...this.state.podcasts]
        updateViews[pindex].likes+=1;
        Axios.put('https://podcastmk-efccc.firebaseio.com/users/'+updateViews[pindex].uid+'/podcasts/'+updateViews[pindex].podcastNum+'.json',updateViews[pindex]);
    }
    componentDidMount(){
        Axios.get('https://podcastmk-efccc.firebaseio.com/users.json').then(response=>{
            if(this.state.podcasts.length===0 && response.data!=null){
                let val = null;
                try{
                    val = Object.values(response.data);
                }catch(error){};
                let arr = [];
                val.forEach(element => {
                    let list =null;
                    try{
                        list = Object.values(element.podcasts);
                    }catch(error){};
                    try{
                    for(var i=0;i<list.length;i++){
                        if(list[i]===null){
                            list.splice(i,1);
                        }
                    }
                    list.forEach(el => {
                        if(typeof el === 'object'){
                            el.poster = element.username;
                            arr.push(el);
                        }
                    });
                    }catch(error){};
                });

                arr.map(el=>{
                    const dts = el.date.split('.',3);
                    const dateval = (parseInt(dts[2])-2000)*365+(parseInt(dts[1])*30)+(parseInt(dts[0]));
                    el.dateval = dateval;
                });

                arr.sort((a,b)=>(a.dateval<b.dateval ? 1:-1));
                this.setState({podcasts: arr, allpodcasts: arr});
            }
        });
    }

    searchChanged = event => {
        let podcasts = [];
        const apodcasts = [...this.state.allpodcasts];
        apodcasts.map(pdc=>{
            if(pdc.title.toLowerCase().includes(event.target.value.toLowerCase()) || pdc.poster.toLowerCase().includes(event.target.value.toLowerCase()) || pdc.date.includes(event.target.value)){
                podcasts.push(pdc);
            }
        })
        this.setState({
            podcasts: podcasts
        })

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
    podcastClick = pindex => {
        const update = [...this.state.podcasts]
        const targetPodcast = update[pindex];
        const rng = this.genererateRandomThreeLetters();
        const url = '/users/'+targetPodcast.uid+rng+'/podcasts/'+targetPodcast.podcastNum+'/';
        this.props.history.push(url);
    }
    authorClick = pindex => {
        const update = [...this.state.podcasts]
        const targetPodcast = update[pindex];
        const rng = this.genererateRandomThreeLetters();
        const url = '/users/'+targetPodcast.uid+rng+'/';
        this.props.history.push(url);
    }
    render(){
        return(
        <div className='bcImage'>
            <SearchBar searchChanged={(event)=>this.searchChanged(event)}/>
            {this.state.podcasts.map( (podc,index) => {
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
                podcastClick = {()=>this.podcastClick(index)}
                authorClick={()=>this.authorClick(index)}
                />}
                )
            }
        </div>
        )
    };

}