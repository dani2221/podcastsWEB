import React from 'react'
import ReactPlayer from 'react-player'
import './Podcast.css'

const Podcast = props =>{

    return(
        <div className='Podcast-card'>
            <div onClick={props.podcastClick}>
            <p className='Podcast-body'>{props.likes+" слушатели"}</p>

            {/* <ReactPlayer className='Podcast-link' url={props.url} width='100%' height='100%' onStart={props.plusLike} progressInterval='10000000'/> */}
            <h3 className='Podcast-title' onClick={props.podcastClick}>{props.title}</h3>
            </div>
            <div className='Podcast-container'>
                <p className='Podcast-body' onClick={props.podcastClick}>{props.shortbody}</p>
                <table className='Podcast-table'>
                    <tbody>
                    <tr>
                        <th className='Podcast-Poster' onClick={props.authorClick}>{props.poster}</th>
                        <th className='Podcast-Date'>{props.date}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Podcast;