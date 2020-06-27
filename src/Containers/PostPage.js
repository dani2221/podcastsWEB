import React,{ Component } from "react";
import axios from '../axiosinstance';
import './PostPage.css';
import Popup from 'reactjs-popup';
import Axios from "axios";
import { withRouter } from "react-router-dom";

class PostPage extends Component{

    state={
        id: '',
        title: '',
        shortbody: '',
        longbody: '',
        url: '',
        poster: '',
        date: '',
        likes: 0,
        error: null,
        posted: false
    };
    handletitleChange = (event) =>{
        this.setState({title: event.target.value});
    }
    handlesBodyChange = (event) =>{
        this.setState({shortbody: event.target.value});
    }
    handlelBodyChange = (event) =>{
        this.setState({longbody: event.target.value});
    }
    handleURLChange = (event) =>{
        this.setState({url: event.target.value});
    }
    handleSubmit = (event) =>{
        const order = {...this.state};
        let errMessage = '';
        let err = false;
        if(order.title.length>100){
            err = true;
            errMessage+='\n- Насловот е подолг од 100 букви ('+order.title.length+'/100)\n';
        }
        if(order.title.length===0){
            err = true;
            errMessage+='\n- Внеси наслов\n';
        }
        if(order.shortbody.length>350){
            err=true;
            errMessage+='\n- Краткиот опис е подолг од 350 букви ('+order.shortbody.length+'/350)\n';
        }
        if(order.shortbody.length===0){
            err=true;
            errMessage+='\n- Внеси краток опис\n';
        }
        if(order.longbody.length>1000){
            err=true;
            errMessage+='\n- Долгиот опис е подолг од 1000 букви ('+order.longbody.length+'/1000)\n';
        }
        if(!order.url.includes('.com')){
            err=true;
            errMessage+='\n- Инвалиден URL';
        }

        if(err){
            this.setState({error: errMessage,posted: true})
        }else{
            const uid = this.props.authUser.uid;
            let podcastNum = Math.floor(Math.random()*50000);
            order.uid = uid;
            order.podcastNum = podcastNum;

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            let username = '';
            order.poster=username;

            const comm = {
                name: 'Podcast_Bot',
                content: 'Ве молиме да ги прочитате правилата пред коментирање  https://podcastsmk.web.app/pravila',
                date: 90591435039324
            }
            order.comments=[comm];
            const dt = dd+'.'+mm+'.'+yyyy;
            order.date=dt;
            axios.put('/users/'+uid+'/podcasts/'+podcastNum+'.json',order).then(response=>{
                this.setState({posted: true})
            }).then(response=>{
                const uiddd =uid+'0eU';
                let urll = '/users/'+uiddd+'/podcasts/'+podcastNum+'/';
                this.props.history.push(urll);
            }).catch(response=>{
                errMessage+='Проблем со интернет';
                this.setState({error: errMessage,posted: true})
            });
        }
    }
    onClosingPopup = ()=>{
        this.setState({error:null,posted:false})
    }

    render(){
        let comp = null;
        if(this.state.error){
            comp = this.state.error;
        }
        else{
            comp = 'Успешно постирано';
        }
        
        return(
            
            <div className='MainDiv'>
                <Popup open={this.state.posted} onClose={this.onClosingPopup}>
                    <div>
                        <p>{comp}</p>
                        <input type='button' name="" value="Во ред" className='Post-box-inputS' onClick={this.onClosingPopup} />
                    </div>
                </Popup>
                <form>
                    <h1 className='Post-box-h1'>Нов подкаст</h1>
                    <input type="text" name="" placeholder="Наслов" className='Post-box-inputT' onChange={this.handletitleChange}/>
                    <input type="text" name="" placeholder="URL од soundcloud, youtube..." className='Post-box-inputT' onChange={this.handleURLChange}/>
                    <textarea type="text" name="" placeholder="Краток опис <200 букви " className='Post-box-inputTL' onChange={this.handlesBodyChange}/>
                    <textarea type="text" name="" placeholder="Долг опис <1000 букви" className='Post-box-inputTL' onChange={this.handlelBodyChange}/>
                    <input type='button' name="" value="Постирај" className='Post-box-inputS' onClick={this.handleSubmit} />
                </form>
            </div>
        );
    }
}

export default withRouter(PostPage);