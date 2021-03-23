import sas from './Morningstar-API-Addon.js';

var headlines = [];
sas.getNewsList('tsla')
.then((res) => {
    return(res.headlines)
})
.then((res) => {
    res.forEach((headline) => {
        headlines.push(headline);
    });
    console.log(headlines);
});
    





//await console.log(headlines);
