# Morningstar API Addon (APIdojo/RapidAPI.com)

**DISCLAIMER: This is purely an addon to APIDojo.net's Morningstar API found on RapidAPI.com.  There is no affiliation between myself or any other party involved in the production of the API.  The whole point of this addon is to make accessing the Morningstar API simpler and more fluid.**

## Purpose

This addon is intended to help with accessing the Morningstar API provided by APIdojo on RapidAPI.com.  Additionally, documentation for accessing the endpoints is provided below.  

**Note: There is a chance that some methods within the addon may not work over time depending on updates made to the API so I will be sure to make updates if requests come in. Thanks for understanding!**

The API can be found here: https://rapidapi.com/apidojo/api/morning-star/endpoints

## Example of use (Getting time series data of a security)

### Before 
```javascript
import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://morning-star.p.rapidapi.com/market/v2/get-time-series',
  params: {performanceIds: '0P0000OQN8,0P000000GY'},
  headers: {
    'x-rapidapi-key': '[API KEY GOES HERE]',
    'x-rapidapi-host': 'morning-star.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
```
### After
```javascript
import sas from './Morningstar-API-Addon.js';

sas.getTimeSeries('AAPL');

```
### Important notes (IMPORTANT)
1.) Any request involving a ticker **will almost always use up two requests instead of one** (in case you are worried about requests made to the API for pricing purposes).  The reason for this is that the ticker must first be cross-referenced to a _performance ID_ (the API primarily runs off of performance IDs rather than tickers).
2.) Many of the methods in this addon only allow get requests of a single ticker.  This is different from the API as you are able to request multiple performance IDs.  **A future update will allow for _ticker clustering_.  In other words, you will be able to request multiple tickers at a time.**

## Getting started

1. Clone the repository
2. At the top of _Morningstar-API-Addon.js_ , input your API key (must get it through RapidAPI) within the brackets here: ```javascript const api_key = '[API KEY GOES HERE]'; ```.
3. Utilize any of the methods in _Morningstar-API-Addon.js_ by calling them through the ```javascript sas ``` variable in _app.js_.  ```javascript sas ``` is an instance of the ```javascript StockAPIService ``` class found in _Morningstar-API-Addon.js_.



## Documentation

