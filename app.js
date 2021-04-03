import sas from './Morningstar-API-Addon.js';

// Example: How to pull headlines based on a ticker
// var headlines = [];
// sas.getNewsList('tsla')
// .then((res) => {
//     return(res.headlines)
// })
// .then((res) => {
//     res.forEach((headline) => {
//         headlines.push(headline);
//     });
//     console.log(headlines);
// });
    
sas.getCompetitors('AAPL');
