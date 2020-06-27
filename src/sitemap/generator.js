import pkg from 'react-router-sitemap';
const { default: Sitemap, applyParams } = pkg;
import Axios from 'axios';
let users = [];
let podcasts = [];
Axios.get('https://podcastmk-efccc.firebaseio.com/users.json').then(response=>{
    Object.values(response.data).map(element=>{
        users.push(element);
    })
})
.then(()=>{
    const routes = [
        {
            path: '/',
        },
        {
            path: '/pravila',
        },
        {
            path: '/post',
        },
        {
            path: '/myprofile',
        }
    ]
    users.map(element=>{
        const obj = {
            path: '/users/'+element.uid
        }
        routes.push(obj);
    })
    users.map(element=>{
        podcasts = Object.values(element.podcasts);
        podcasts.map(el=>{
            try{
            const obj = {
                path: '/users/'+element.uid+'/podcasts/'+el.podcastNum
            }
            routes.push(obj);
            }catch(error){
                routes.push({path: 'ripppppppp'});
            }
            
        })
    })

    const sitemap = (
    new Sitemap(routes)
    .build('http://podcastsmk.web.app')
    .save("./sitemap.xml")
)})