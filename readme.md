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

Get returns data of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getReturns('AAPL');
```

#### Example output:
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

### ```StockAPIService.getRtdMarket(ticker)```

Get real-time data of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getRtdMarket('AAPL');
```

#### Example output:
```javascript
{
  netChange: { value: 1.2094, filtered: false },
  previousClosePrice: { value: 122.15, filtered: false },
  adjustedClosePrice: { value: 122.15, filtered: false },
  name: { value: 'Apple', filtered: false },
  percentNetChange: { value: 0.9901, filtered: false },
  tradingStatus: { value: 'Open', filtered: false },
  lastPrice: {
    value: 123.3594,
    filtered: false,
    date: { value: '2021-04-01T11:36:55-04:00', filtered: false }
  }
}
```

### ```StockAPIService.getTimeSeries(ticker)```

Get time-series data of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getTimeSeries('AAPL');
```

#### Example output:
```javascript
{
  '0P000000GY': [
    {
      datetime: '2021-04-01T15:30:00Z',
      volume: 569393,
      lastPrice: 123.175,
      openPrice: 123.2751,
      lowPrice: 123.17,
      highPrice: 123.31
    },
    {
      datetime: '2021-04-01T15:25:00Z',
      volume: 535491,
      lastPrice: 123.2783,
      openPrice: 123.22,
      lowPrice: 123.19,
      highPrice: 123.34
    },
    ...
  ]
}
```

### ```StockAPIService.getMovers()```

Get _movers_actives, gainers,_ and _losers_ for the day

Returns: ```Object```

#### Example input:
```javascript 
sas.getMovers();
```

#### Example output:
```javascript
{
  actives: [
    {
      exchange: 'XNYS',
      lastPrice: 39.73,
      percentChange: 1.9241,
      performanceId: '0P0001EEPZ',
      priceChange: 0.75,
      standardName: 'NIO Inc ADR',
      ticker: 'NIO',
      volume: 68835976
    },
    {
      exchange: 'XNYS',
      lastPrice: 9.8,
      percentChange: -4.0147,
      performanceId: '0P00011H0G',
      priceChange: -0.4099,
      standardName: 'AMC Entertainment Holdings Inc Class A',
      ticker: 'AMC',
      volume: 37106466
    },
    ...
    gainers: [
    {
      exchange: 'XNAS',
      lastPrice: 75.0249,
      percentChange: 97.3301,
      performanceId: '0P00013YNE',
      priceChange: 37.0049,
      standardName: 'Liberty TripAdvisor Holdings Inc Class B',
      ticker: 'LTRPB',
      volume: 333215
    },
    {
      exchange: 'XNAS',
      lastPrice: 30.19,
      percentChange: 35.2599,
      performanceId: '0P0000064Q',
      priceChange: 7.87,
      standardName: 'Kelly Services Inc Class B',
      ticker: 'KELYB',
      volume: 306382
    },
    ...
    losers: [
    {
      exchange: 'XNAS',
      lastPrice: 108,
      percentChange: -15.625,
      performanceId: '0P00001SJ1',
      priceChange: -20,
      standardName: 'Discovery Inc Class B',
      ticker: 'DISCB',
      volume: 212163
    },
    {
      exchange: 'XNAS',
      lastPrice: 15.9499,
      percentChange: -14.0167,
      performanceId: '0P000003MK',
      priceChange: -2.6001,
      standardName: 'Microvision Inc',
      ticker: 'MVIS',
      volume: 17608811
    },
  ]
}
```

