import React from 'react'
import SearchBar from './SearchBar';
import './Comments.css'
import '../Containers/PostPage.css'

const Comments = props =>{

    return(
        <div className='CommentDiv'>
            <form>
                <input className='Post-box-inputT' type="text" placeholder="Твојот коментар" onChange={props.commentChanged} style={{width:'80%',textAlign: 'start'}} value={props.commentText}/>
                <input type='button' className='Post-box-inputS' onClick={props.postComment} value='Коментирај'/>
            </form>
            <p className='CommentTitle'>Kоментари: {props.commentAmount}</p>
            <hr/>
            {props.comments.map((comment,index)=>{
                return (
                <div key={index}>
                    <p className='CommentTitle' style={{fontSize: 'large',color:'#CF9893'}}>{comment.name}</p>
                    <p className='CommentTitle' style={{fontSize: 'smaller', fontWeight: '200'}}>{comment.content}</p>
                    <hr/>
                </div>);
            })}
        </div>
    );
}
export default Comments;