# Morningstar API Addon (APIdojo/RapidAPI.com)

**DISCLAIMER: This is purely an addon to APIDojo.net's Morningstar API found on RapidAPI.com.  There is no affiliation between myself or any other party involved in the production of the API.  The whole point of this addon is to make accessing the Morningstar API simpler and more fluid.**

## Purpose

This addon is intended to help with accessing the Morningstar API provided by APIdojo on RapidAPI.com.  Additionally, documentation for accessing the endpoints is provided below. 

Furthermore, much of the API requires the user to know _performance IDs_ of securities in order to get info on them.  A big benefit of this addon is that the performance ID retrieval process is automated and allows for seamless requesting of _tickers_ rather than _performance IDs_.  On the contrary, a couple downsides to this method are listed in the _Example of use_ section.

**Note: There is a chance that some methods within the addon may not work over time depending on updates made to the API so I will be sure to make updates if requests come in. Thanks for understanding!**

The API can be found here: https://rapidapi.com/apidojo/api/morning-star/endpoints

## Example of use (Getting time series data of a security)

### Before (RapidAPI's example request)
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
### After (Addon's request)
```javascript
import sas from './Morningstar-API-Addon.js';

sas.getTimeSeries('AAPL');

```
### Benefits
1. Concise requests
2. Use of tickers as opposed to performance IDs
3. Readable code

### Notes (IMPORTANT)
1. Any request involving a ticker **will almost always use up two requests instead of one** (in case you are worried about requests made to the API for pricing purposes).  The reason for this is that the ticker must first be cross-referenced to a _performance ID_ (the API primarily runs off of performance IDs rather than tickers).
2. Many of the methods in this addon only allow get requests of a single ticker.  This is different from the API as you are able to request multiple performance IDs directly through the API.  **A future update will allow for _ticker clustering_.  In other words, you will be able to request multiple tickers at a time.**

## Getting started

1. Clone the repository
2. At the top of _Morningstar-API-Addon.js_ , input your API key (must get it through RapidAPI) within the brackets here: ``` const api_key = '[API KEY GOES HERE]'; ```.
3. Utilize any of the methods in _Morningstar-API-Addon.js_ by calling them through the ``` sas ``` variable in _app.js_.  ``` sas ``` is an instance of the ``` StockAPIService ``` class found in _Morningstar-API-Addon.js_.



## Documentation

### ```StockAPIService.getReturns(ticker)```

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input
```javascript 
sas.getReturns('AAPL');
```

#### Example output
```javascript
{
  marketReturn5Years: 35.762864,
  ticker: 'AAPL',
  marketReturn1Year: 93.43269,
  securityId: 'E0USA002US',
  exchange: 'XNAS',
  marketReturn3Years: 43.701513
}
```

