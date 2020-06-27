require('babel-register');
 
const router = require('./src/App').default;
const Sitemap = require('../').default;
 
(
    new Sitemap(router)
        .build('http://podcastsmk.web.app')
        .save('./sitemap.xml')
);