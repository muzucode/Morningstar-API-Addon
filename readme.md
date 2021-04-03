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



## Documentation (Work in Progress)

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

Get movers: _actives_, _gainers_, and _losers_ for the day

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
    }
  ],
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
    }
  ],
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
    }
  ]
}
```


### ```StockAPIService.getQuotes(ticker)```

Get quote data of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getQuotes('AAPL');
```

#### Example output:
```javascript
{
  '0P000000GY': {
    name: 'Apple Inc',
    exchange: 'XNAS',
    region: 'USA',
    ticker: 'AAPL',
    price: 122.67,
    priceChange: 0.52,
    percentChange: 0.4257,
    openPrice: 123.66,
    volume: 55853864,
    yesterdayPrice: 122.15,
    dayHigh: 124.18,
    dayLow: 122.57,
    fiftyTwoWeekHigh: 145.09,
    fiftyTwoWeekLow: 59.225,
    currency: 'USD',
    marketPhase: 'Open',
    activityTimeUTC: '2021-04-01T19:03:11Z',
    exchangeActivityTimeLabel: '04/01/2021 03:03 PM EDT',
    securityId: '0P000000GY'
  }
}
```

### ```StockAPIService.getGlobalIndices()```

Get global indices

Returns: ```Object```

#### Example input:
```javascript 
sas.getGlobalIndices();
```

#### Example output:
```javascript
{
  realTimeLastUpdateDate: '2021-04-01T19:24:02.000Z',
  gmbIndexDataList: [
    {
      symbol: '33.10.!MSTAR',
      ticker: '!MSTAR',
      exchange: 33,
      securityType: 10,
      netChange: 99.57,
      netChangePer: 0.9854,
      companyName: 'Morningstar U.S. Market Index',
      marketStatus: 'Open',
      currency: 'USD',
      avgVolume: 0,
      volume: 0,
      recentTradingDayOpenPrice: 10171.18,
      lastClosePrice: 10104.91,
      lastPrice: 10204.48,
      lastUpdateDate: '2021-04-01T19:24:02.000Z',
      lastUpdateTime: '15:24:02.000',
      priceReturn1Week: 2.6856293,
      priceReturn1Month: 1.9260728,
      realTimeLastUpdateDate: '01-04-2021',
      realTimeLastUpdateTime: '15:24:02.000',
      isRunning: true
    },
    {
      symbol: '33.10.MSAUAUDP',
      ticker: 'MSAUAUDP',
      exchange: 33,
      securityType: 10,
      netChange: 18.21,
      netChangePer: 0.5814,
      companyName: 'Morningstar Australia Index PR AUD',
      marketStatus: 'Open',
      currency: 'AUD',
      avgVolume: 0,
      volume: 0,
      recentTradingDayOpenPrice: 3140.37,
      lastClosePrice: 3132.33,
      lastPrice: 3150.54,
      lastUpdateDate: '2021-04-01T19:23:49.000Z',
      lastUpdateTime: '15:23:49.000',
      priceReturn1Week: 0.5010781,
      priceReturn1Month: 0.5536763,
      realTimeLastUpdateDate: '01-04-2021',
      realTimeLastUpdateTime: '15:23:49.000',
      isRunning: false
    },
    ...
  ]
}
    

```

### ```StockAPIService.getSummary()```

Get market summary at request time

Returns: ```Object```

#### Example input:
```javascript 
sas.getSummary();
```

#### Example output:
```javascript
{
  MarketRegions: {
    USA: [ [Object], [Object], [Object], [Object] ],
    Europe: [ [Object], [Object], [Object], [Object] ],
    Asia: [ [Object], [Object], [Object], [Object] ],
    CAN: [ [Object], [Object], [Object], [Object] ]
  },
  Barometers: {
    ThreeYears: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    OneYear: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    ThreeMonths: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    OneWeek: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    OneDay: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    OneMonth: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ]
  },
  Timestamp: '2021-04-02T00:53:24Z'
} 

```

### ```StockAPIService.getRtdStock(ticker)```

Get real-time data of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getRtdStock('AAPL');
```

#### Example output:
```javascript
{
  status: 'OK',
  lastPrice: 123,
  bid: 123,
  bidSize: 17,
  ask: 123.05,
  askSize: 2,
  lotSize: 100,
  volume: 75089134,
  recentTradingDayOpenPrice: 123.66,
  dayRangeHigh: 124.18,
  dayRangeLow: 122.49,
  lastClose: 122.15,
  priceOfTradeAfter: 123,
  timeOfTradeAfter: '2021-04-01T20:14:54.000',
  recentTradingDay: '2021-04-01',
  lastUpdateTime: '2021-04-01T16:15:02.000',
  recentTradingDayJulian: '01-04-2021',
  tradingStatus: 'Post-Trading',
  marketCap: 2064935808000,
  dividendYield: 0.0066667,
  yearRangeHigh: 145.09,
  yearRangeLow: 59.225,
  currencyCode: 'USD',
  currencySymbol: '$',
  listedCurrency: 'USD',
  tradedCurrency: null,
  avgVolume: 631326.3064516129,
  exchangeID: 'XNAS',
  exchangeName: 'NASDAQ',
  exchangeTimeZone: 'EST',
  type: 'Equity',
  ts: '1617322494000',
  dayChange: 0.85,
  dayChangePer: 0.6959,
  bidMarket: '16',
  askMarket: '19',
  originationMarket: '16',
  message: '126.1.AAPL',
  lastUpdateRealTimeDate: '01-04-2021',
  lastUpdateRealTimeTime: '20:14:54.000',
  nav: null,
  oneDayReturn: null,
  navLastDate: null,
  navLastDate1: null,
  navLastTime: null,
  isBats: true
}
```

### ```StockAPIService.getMiniChart(ticker)```

Get real-time data of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getMiniChart('AAPL');
```

#### Example output:
```javascript
{
  iiv: null,
  status: 'OK',
  idsMessage: '126.1.AAPL',
  lastPrice: 123,
  priceOfTradeAfter: 123,
  timeOfTradeAfter: '2021-04-01T20:14:54.000',
  lastUpdateTime: '2021-04-01T16:15:02.000',
  tradingStatus: 'Post-Trading',
  dayChange: 0.85,
  dayChangePer: 0.6959,
  lastClose: 122.15,
  exchangeId: 'XNAS',
  ts: '1617322494000',
  currencyCode: 'USD'
}
```

### ```StockAPIService.getPriceFairValue(ticker)```

Get fair value data of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getPriceFairValue('AAPL');
```

#### Example output:
```javascript
{
  _meta: {
    responseStatus: '200700',
    hint: 'Securities successfully returned',
    performanceId: '0P000000GY'
  },
  columnDefs: [
    '2013', '2014',
    '2015', '2016',
    '2017', '2018',
    '2019', '2020',
    'YTD'
  ],
  chart: {
    chartDatums: { recent: [Object], yearly: [Array] },
    isQual: true,
    closePriceCurrency: null,
    realtimeCurrency: 'USD',
    lastCloseCurrency: 'USD',
    fairValCurrency: 'USD'
  },
  table: { rows: [ [Object], [Object], [Object] ] },
  userType: 'Free',
  footer: {
    asOfLabel: 'As of',
    asOfDate: '2021-04-01T00:00:00.000',
    indexLabel: 'Index:',
    indexName: 'Morningstar US Market TR USD'
  }
}
```

### ```StockAPIService.getKeyStats(ticker)```

Get key statistics of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getKeyStats('AAPL');
```

#### Example output:
```javascript
{
  revenue3YearGrowth: { stockValue: '6.1900', indAvg: '5.2800' },
  netIncome3YearGrowth: { stockValue: '5.8900', indAvg: '8.4000' },
  operatingMarginTTM: { stockValue: '25.2400', indAvg: '23.1500' },
  netMarginTTM: { stockValue: '21.7300', indAvg: '19.5200' },
  roaTTM: { stockValue: '18.4100', indAvg: '12.9600' },
  roeTTM: { stockValue: '82.0900', indAvg: '62.0500' },
  debitToEquity: { stockValue: '1.4992', indAvg: '0.9188' },
  freeCashFlow: { cashFlowTTM: '80219000000', date: '2020-12-31T06:00:00.000' }
}
```

### ```StockAPIService.getAnalysisReport(ticker)```

Get analysis of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getAnalysisReport('AAPL');
```

#### Example output:
```javascript
{
  userType: 'Free',
  total: 280,
  rpsCovered: true,
  isLocalized: true,
  analysisReport: {
    headLine: 'Apple Enjoys Strong iPhone 12 Demand in December Quarter',
    investmentThesis: 'Apple’s competitive advantage stems from its ability to package hardware, software, services, and third-party applications into sleek, intuitive, and appealing devices. This expertise enables the firm to capture a premium on its hardware, unlike most of its peers. Despite its admirable reputation, loyal customer base, and unique products, the consu',
    investmentThesisDateUTC: '2020-10-30T03:13:00Z',
    economicMoat: null,
    economicMoatDateUTC: '2020-10-30T03:13:00Z',
    valuation: null,
    valuationDateUTC: '2021-01-28T05:08:00Z',
    risk: null,
    riskDateUTC: '2020-10-30T03:13:00Z',
    management: null,
    managementDateUTC: '2020-11-04T22:11:00Z',
    bullsSay: null,
    bearsSay: null,
    author: {
      authorId: 1919,
      authorName: 'Abhinav Davuluri',
      authorImage: 'https://im.mstar.com/Content/CMSImages/78x78/1919-adavulu-78x78.jpg',
      authorImageHeadshot: 'https://im.mstar.com/im/BetaSiteHeadshots/Abhinav-Davuluri_1919.jpg',
      email: 'abhinav.davuluri@morningstar.com',
      phoneNumber: '+1 312 244 7400',
      holdings: '',
      jobTitle: null,
      isPrimaryAuthor: true,
      profiles: [Array]
    }
  },
  analystNote: { note: null, title: null, date: null, author: null },
  lastUpdateBy: 1919
}
```

### ```StockAPIService.getTrailingTotalReturns(ticker)```

Get the trailing total returns of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getTrailingTotalReturns('AAPL');
```

#### Example output:
```javascript
{
  returnDate: '2021-04-01T05:00:00.000',
  trailingTotalReturnsList: [
    {
      name: 'AAPL',
      trailing1DayReturn: '0.69587',
      trailing1WeekReturn: '1.99851',
      trailing1MonthReturn: '-3.74834',
      trailing3MonthReturn: '-7.14824',
      trailing6MonthReturn: '5.66829',
      trailingYearToDateReturn: '-7.14824',
      trailing1YearReturn: '105.58715',
      trailing3YearReturn: '44.02793',
      trailing5YearReturn: '35.69792',
      trailing10YearReturn: '26.41196',
      trailing15YearReturn: '30.97328'
    },
    {
      name: 'Consumer Electronics',
      trailing1DayReturn: '0.00000',
      trailing1WeekReturn: '1.51926',
      trailing1MonthReturn: '-1.47906',
      trailing3MonthReturn: '-6.11984',
      trailing6MonthReturn: '11.28748',
      trailingYearToDateReturn: '-6.11984',
      trailing1YearReturn: '102.00561',
      trailing3YearReturn: '43.86543',
      trailing5YearReturn: '36.29106',
      trailing10YearReturn: '26.29825',
      trailing15YearReturn: '25.55807'
    },
    {
      name: 'Morningstar US Market TR USD',
      trailing1DayReturn: '1.27531',
      trailing1WeekReturn: '2.98366',
      trailing1MonthReturn: '2.32540',
      trailing3MonthReturn: '7.36229',
      trailing6MonthReturn: '21.72158',
      trailingYearToDateReturn: '7.36229',
      trailing1YearReturn: '71.30381',
      trailing3YearReturn: '17.62091',
      trailing5YearReturn: '16.78492',
      trailing10YearReturn: '13.94772',
      trailing15YearReturn: '10.28433'
    },
    {
      name: '+/-Consumer Electronics',
      trailing1DayReturn: '0.69587',
      trailing1WeekReturn: '0.47925',
      trailing1MonthReturn: '-2.26928',
      trailing3MonthReturn: '-1.02840',
      trailing6MonthReturn: '-5.61919',
      trailingYearToDateReturn: '-1.02840',
      trailing1YearReturn: '3.58154',
      trailing3YearReturn: '0.16250',
      trailing5YearReturn: '-0.59314',
      trailing10YearReturn: '0.11371',
      trailing15YearReturn: '5.41521'
    },
    {
      name: '+/-Morningstar US Market TR USD',
      trailing1DayReturn: '-0.57944',
      trailing1WeekReturn: '-0.98515',
      trailing1MonthReturn: '-6.07374',
      trailing3MonthReturn: '-14.51053',
      trailing6MonthReturn: '-16.05329',
      trailingYearToDateReturn: '-14.51053',
      trailing1YearReturn: '34.28334',
      trailing3YearReturn: '26.40702',
      trailing5YearReturn: '18.91300',
      trailing10YearReturn: '12.46424',
      trailing15YearReturn: '20.68895'
    }
  ]
}
```

### ```StockAPIService.getAnalysisData(ticker)```

Get analysis data of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getAnalysisData('AAPL');
```

#### Example output:
```javascript
{
  ticker: 'AAPL',
  isQuan: false,
  userType: 'Free',
  valuation: {
    fairValue: '_PO_',
    fairValueDate: '2021-01-28T00:00:00.000',
    assessment: '_PO_',
    assessmentDate: '2021-04-02T00:00:00.000',
    uncertainty: '_PO_',
    moat: '_PO_',
    moatDate: '2021-04-02T00:00:00.000',
    moatTrendEvaluate: 'Stable',
    premiumDisc: '_PO_',
    stewardship: '_PO_',
    stewardshipDate: '2021-04-02T00:00:00.000',
    premDiscDelta: '_PO_',
    oneStar: '_PO_',
    oneStarDate: '2021-04-02T00:00:00.000',
    fiveStar: '_PO_',
    fiveStarDate: '2021-04-02T00:00:00.000',
    fairValCurrency: 'USD',
    bf2: '_PO_',
    bf3: '_PO_',
    bf4: '_PO_',
    bf5: '_PO_',
    lastClose: '_PO_',
    startRating: '_PO_',
    lastCloseCurrency: 'USD'
  },
  companyProfile: "Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), and TV boxes (Apple TV), among others. The iPhone makes up the majority of Apple’s total revenue. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Card, and Apple Pay, among others. Apple's products run internally developed software and semiconductors, and the firm is well known for its integration of hardware, software and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers. The company generates roughly 40% of its revenue from the Americas, with the remainder earned internationally."
}
```

### ```StockAPIService.getFinancials(ticker)```

Get financial statements of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getFinancials('AAPL');
```

#### Example output:
```javascript
{
  incomeStatement: {
    _meta: {
      companyId: '0C00000ADA',
      statementType: 'income-statement',
      periodReport: 'Success',
      latestReport: 'Success'
    },
    columnDefs: [ '2018', '2019', '2020', 'TTM' ],
    filingIdList: [ '196175848', '249245111', '305794031', null ],
    columnDefs_labels: [ '20180930', '20190930', '20200930', '20201231' ],
    rows: [ [Object], [Object], [Object], [Object], [Object] ],
    footer: {
      currency: 'USD',
      currencySymbol: '$',
      orderOfMagnitude: 'Billion',
      fiscalYearEndDate: '09-30'
    }
  },
  balanceSheet: {
    _meta: {
      companyId: '0C00000ADA',
      statementType: 'balance-sheet',
      periodReport: 'Success',
      latestReport: 'Success'
    },
    columnDefs: [ '2017', '2018', '2020', 'Q1 2021' ],
    filingIdList: [ null, '196175848', '305794031', '319017311' ],
    columnDefs_labels: [ '', '20180930', '20200930', '20201231' ],
    rows: [ [Object], [Object], [Object], [Object], [Object] ],
    footer: {
      currency: 'USD',
      currencySymbol: '$',
      orderOfMagnitude: 'Billion',
      fiscalYearEndDate: '09-30'
    }
  },
  cashFlow: {
    _meta: {
      companyId: '0C00000ADA',
      statementType: 'cash-flow',
      periodReport: 'Success',
      latestReport: 'Success'
    },
    columnDefs: [ '2018', '2019', '2020', 'TTM' ],
    filingIdList: [ '196175848', '249245111', '305794031', null ],
    columnDefs_labels: [ '20180930', '20190930', '20200930', '20201231' ],
    rows: [ [Object], [Object], [Object], [Object] ],
    footer: {
      currency: 'USD',
      currencySymbol: '$',
      orderOfMagnitude: 'Billion',
      fiscalYearEndDate: '09-30'
    }
  }
}
```

### ```StockAPIService.getExecutives(ticker)```

Get executive insights for a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getExecutives('AAPL');
```

#### Example output:
```javascript
{
  rows: [
    {
      type: 'person',
      personId: 'PS000028BK',
      name: 'Timothy D. Cook',
      title: 'Director and Chief Executive Officer',
      holding: '837374.0000',
      memberSince: '1998',
      age: '59',
      totalCompensation: [Array],
      compensation: [Array]
    },
    {
      type: 'person',
      personId: 'PS00007GV6',
      name: 'Luca Maestri',
      title: 'Senior Vice President and Chief Financial Officer',
      holding: '110272.0000',
      memberSince: '2014',
      age: '56',
      totalCompensation: [Array],
      compensation: [Array]
    },
    {
      type: 'person',
      personId: 'PS00003BJC',
      name: 'Katherine L. Adams',
      title: 'Senior Vice President, General Counsel and Secretary',
      holding: '316581.0000',
      memberSince: '2017',
      age: '56',
      totalCompensation: [Array],
      compensation: [Array]
    },
    {
      type: 'person',
      personId: 'PS00005TC8',
      name: 'Jeffery Williams',
      title: 'Chief Operating Officer',
      holding: '489260.0000',
      memberSince: '2010',
      age: '57',
      totalCompensation: [Array],
      compensation: [Array]
    },
    {
      type: 'person',
      personId: 'PS0000B6SC',
      name: "Deirdre O'Brien",
      title: 'Senior Vice President, Retail and People',
      holding: '135888.0000',
      memberSince: '2019',
      age: '54',
      totalCompensation: [Array],
      compensation: [Array]
    },
    {
      type: 'person',
      personId: 'PS0000A2NI',
      name: 'Chris Kondo',
      title: 'Senior Director, Corporate Accounting and Principal Accounting Officer',
      holding: '26876.0000',
      memberSince: '2015',
      age: null,
      totalCompensation: [Array],
      compensation: [Array]
    },
    {
      type: 'total',
      personId: 'totalKeyCompensation',
      name: 'Compensation for all Key Executives',
      totalCompensation: [Array],
      compensation: [Array]
    }
  ],
  datesDef: [ '2015', '2016', '2017', '2018', '2019' ],
  currency: 'USD'
}
```

### ```StockAPIService.getCompetitors(ticker)```

Get competitor info for a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getCompetitors('AAPL');
```

#### Example output:
```javascript
{
  userType: 'Free',
  main: {
    ticker: 'AAPL',
    name: 'Apple Inc',
    instrumentId: '126.1.AAPL',
    fairValue: '_PO_',
    moat: '_PO_',
    assessment: '_PO_',
    starRating: '_PO_',
    priceSale: '7.256192',
    priceBook: '31.181079',
    priceEarnings: '33.153639',
    priceFair: '_PO_',
    isQuant: false,
    exchangeId: null,
    shareClassId: null,
    securityType: null,
    dividendYield: '0.0067',
    investmentStyle: '2',
    bf2: '151.9',
    bf3: '112.70000',
    bf4: '83.30000',
    bf5: '58.8',
    premiumDisc: '26',
    performanceId: '0P000000GY',
    uncertaintyCurrent: '_PO_',
    fairValCurrency: 'USD',
    analyst: 'Abhinav Davuluri, Sector Strategist',
    fairValDate: '2021-01-28T05:06:22Z',
    starRatingDate: '2021-04-01T21:30:00Z',
    lastCloseDB: 123,
    lastCloseCurrencyDB: 'USD'
  },
  competitors: [
    {
      ticker: 'GOOGL',
      name: 'Alphabet Inc A',
      instrumentId: '126.1.GOOGL',
      fairValue: '_PO_',
      moat: '_PO_',
      assessment: '_PO_',
      starRating: '_PO_',
      priceSale: '8.555315',
      priceBook: '6.451591',
      priceEarnings: '41.128670',
      priceFair: '_PO_',
      isQuant: false,
      exchangeId: null,
      shareClassId: null,
      securityType: null,
      dividendYield: null,
      investmentStyle: '3',
      bf2: '4037.75',
      bf3: '2995.75000',
      bf4: '2214.25000',
      bf5: '1563',
      premiumDisc: '-18',
      performanceId: '0P000002HD',
      uncertaintyCurrent: '_PO_',
      fairValCurrency: 'USD',
      analyst: 'Ali Mogharabi, Senior Equity Analyst',
      fairValDate: '2021-02-03T14:31:23Z',
      starRatingDate: '2021-04-01T21:30:00Z',
      lastCloseDB: 2129.78,
      lastCloseCurrencyDB: 'USD'
    },
    {
      ticker: 'HPQ',
      name: 'HP Inc',
      instrumentId: '126.1.HPQ',
      fairValue: '_PO_',
      moat: '_PO_',
      assessment: '_PO_',
      starRating: '_PO_',
      priceSale: '0.766',
      priceBook: null,
      priceEarnings: '12.338141',
      priceFair: '_PO_',
      isQuant: false,
      exchangeId: null,
      shareClassId: null,
      securityType: null,
      dividendYield: '0.0231',
      investmentStyle: '1',
      bf2: '35.65',
      bf3: '26.45000',
      bf4: '19.55000',
      bf5: '13.8',
      premiumDisc: '39',
      performanceId: '0P000002O2',
      uncertaintyCurrent: '_PO_',
      fairValCurrency: 'USD',
      analyst: 'Mark Cash, Senior Equity Analyst',
      fairValDate: '2021-02-26T05:50:33Z',
      starRatingDate: '2021-04-01T21:30:00Z',
      lastCloseDB: 32.05,
      lastCloseCurrencyDB: 'USD'
    },
    {
      ticker: 'MSFT',
      name: 'Microsoft Corp',
      instrumentId: '126.1.MSFT',
      fairValue: '_PO_',
      moat: '_PO_',
      assessment: '_PO_',
      starRating: '_PO_',
      priceSale: '12.088725',
      priceBook: '14.034952',
      priceEarnings: '38.167554',
      priceFair: '_PO_',
      isQuant: false,
      exchangeId: null,
      shareClassId: null,
      securityType: null,
      dividendYield: '0.0088',
      investmentStyle: '3',
      bf2: '355.05',
      bf3: '289.30000',
      bf4: '236.70000',
      bf5: '184.1',
      premiumDisc: '-8',
      performanceId: '0P000003MH',
      uncertaintyCurrent: '_PO_',
      fairValCurrency: 'USD',
      analyst: 'Dan Romanoff, Equity Analyst',
      fairValDate: '2021-01-27T03:16:10Z',
      starRatingDate: '2021-04-01T21:30:00Z',
      lastCloseDB: 242.35,
      lastCloseCurrencyDB: 'USD'
    }
  ]
}

```

### ```StockAPIService.getProfile(ticker)```

Get profile of a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getProfile('AAPL');
```

#### Example output:
```javascript
{
  '0P000000GY': {
    ticker: { value: 'AAPL', filtered: false },
    website: { value: 'https://www.apple.com', filtered: false },
    headquarterCountry: { value: 'United States', filtered: false },      
    contactEmail: { value: 'tgala@apple.com', filtered: false },
    stockType: { value: 'Cyclical', filtered: false },
    headquarterAddress1: { value: 'One Apple Park Way', filtered: false },
    industry: { value: 'Consumer Electronics', filtered: false },
    stockStarRating: {
      value: '1',
      filtered: true,
      date: [Object],
      text: [Object],
      type: [Object]
    },
    fiscalYearEndDate: { value: '2021-09-30', filtered: false },
    headquarterCity: { value: 'Cupertino', filtered: false },
    headquarterState: { value: 'CA', filtered: false },
    reportDate: { value: '2020-12-31', filtered: false },
    phone: { value: '+1 408 996-1010', filtered: false },
    universe: { value: 'EQ', filtered: false },
    headquarterPostalCode: { value: '95014', filtered: false },
    exchange: { value: 'XNAS', filtered: false },
    companyProfile: {
      value: "Apple designs a wide variety of consumer electronic devices, including smartphones (iPhone), tablets (iPad), PCs (Mac), smartwatches (Apple Watch), and TV boxes (Apple TV), among others. The iPhone makes up the majority of Apple’s total revenue. In addition, Apple offers its customers a variety of services such as Apple Music, iCloud, Apple Care, Apple TV+, Apple Arcade, Apple Card, and Apple Pay, among others. Apple's products run internally developed software and semiconductors, and the firm is well known for its integration of hardware, software and services. Apple's products are distributed online as well as through company-owned stores and third-party retailers. The company generates roughly 40% of its revenue from the Americas, with the remainder earned internationally.",
      filtered: false
    },
    fax: { value: '+1 408 974-2483', filtered: false },
    totalEmployees: { value: 147000, filtered: false },
    sector: { value: 'Technology', filtered: false }
  }
}

```

### ```StockAPIService.getOwnership(ticker)```

Get ownernship info for a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getOwnership('AAPL');
```

#### Example output:
```javascript
{
  isRestricted: false,
  userType: 'Free',
  country: 'USA',
  rows: [
    {
      secId: 'FOUSA00FQU',
      name: 'Vanguard Total Stock Mkt Idx Inv',
      totalSharesHeld: 2.5699409927129317,
      totalAssets: 4.73305,
      currentShares: 431444161,
      changeAmount: -1051272,
      changePercentage: -0.24307123724009358,
      date: '2021-02-28T00:00:00.000',
      trend: '_PO_',
      starRating: '4'
    },
    {
      secId: 'FOUSA00FS1',
      name: 'Vanguard 500 Index Investor',
      totalSharesHeld: 1.9419843322316004,
      totalAssets: 6.02461,
      currentShares: 326022194,
      changeAmount: 5176211,
      changePercentage: 1.613300859060467,
      date: '2021-02-28T00:00:00.000',
      trend: '_PO_',
      starRating: '4'
    },
    ...
  ],
  columnDefs: [
    { columnId: 'name', dataType: 'string' },
    { columnId: 'starRating', dataType: 'string' },
    { columnId: 'totalSharesHeld', dataType: 'number' },
    { columnId: 'totalAssets', dataType: 'number' },
    { columnId: 'trend', dataType: 'number' },
    { columnId: 'currentShares', dataType: 'number' },
    { columnId: 'changeAmount', dataType: 'number' },
    { columnId: 'changePercentage', dataType: 'number' },
    { columnId: 'date', dataType: 'string' }
  ]
}
```

### ```StockAPIService.getDividends(ticker)```

Get dividend info for a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getDividends('AAPL');
```

#### Example output:
```javascript
{
  rows: [
    {
      label: 'Dividend Per Share',
      salDataId: 'dividends.per.share.label',
      datum: [Array]
    },
    {
      label: 'Trailing Dividend Yield %',
      salDataId: 'trailing.dividends.yield.label',
      datum: [Array],
      percentage: true
    },
    {
      label: 'Buyback Yield %',
      salDataId: 'buyback.yield.label',
      datum: [Array],
      percentage: true
    },
    {
      label: 'Total Yield %',
      salDataId: 'total.yield.label',
      datum: [Array],
      percentage: true
    },
    {
      label: 'Payout Ratio %',
      salDataId: 'payout.ratio.label',
      datum: [Array],
      percentage: true
    }
  ],
  columnDefs_labels: [
    'tabular.data.label.column.year',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    'dividends.headers.current',
    'dividends.headers.oneyearttm',
    'dividends.headers.fiveyear'
  ],
  dividendData: {
    label: [
      'exdividend.date.label',
      'declaration.date.label',
      'record.date.label',
      'payable.date.label',
      'dividend.type.label',
      'dividend.amount.label'
    ],
    upcomingData: [],
    dividendHistory: [ [Object], [Object], [Object], [Object], [Object] ]
  },
  quoteData: [
    {
      name: 'dividendYield',
      label: 'Dividend Yield',
      salDataId: 'dividend.yield.label',
      date: '2021-04-03T00:00:00.000',
      value: '0.0067'
    },
    {
      name: 'divReinvestmentPlan',
      label: 'Div Reinvestment Plan',
      salDataId: 'div.reinvestment.plan.label',
      date: '2021-02-05T00:00:00.000',
      value: 'No'
    }
  ],
  footer: {
    asOfLabel: 'As of',
    distributionCurrency: 'USD',
    asOfDate: '2021-04-03T00:00:00.000'
  }
}
```

### ```StockAPIService.getShortInterest(ticker)```

Get short interest info for a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getShortInterest('AAPL');
```

#### Example output:
```javascript
{
  sharesOutstanding: 16788.096,
  floatShares: 16778.3045,
  sharesShorted: 107011007,
  sharesShortedDate: '2021-03-15T05:00:00.000',
  floatSharesShorted: 0.6378,
  daysToConver: 1,
  sharesShortedChanged: 6.1624,
  previousSharesShortedDate: '2021-02-26T06:00:00.000'
}
```

### ```StockAPIService.getHistories(ticker)```

Get histories info for a security

```ticker``` | Type: ```String```

Returns: ```Array```

#### Example input:
```javascript 
sas.getHistories('AAPL');
```

#### Example output:
```javascript
[
  {
    RequestKey: '0P000000GY',
    '1D': [],
    '3M': [
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      ... 354 more items
    ],
    '1Y': [
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      ... 543 more items
    ],
    '5Y': [
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object]
    ],
    MAX: [
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      ... 387 more items
    ]
  }
]
```

### ```StockAPIService.getSplits(ticker)```

Get splits info for a security

```ticker``` | Type: ```String```

Returns: ```Object```

#### Example input:
```javascript 
sas.getSplits('AAPL');
```

#### Example output:
```javascript
{
  splitHistory: [
    { date: '2020-08-31T05:00:00.000', ratio: '4:1' },
    { date: '2014-06-09T05:00:00.000', ratio: '7:1' },
    { date: '2005-02-28T06:00:00.000', ratio: '2:1' },
    { date: '2000-06-21T05:00:00.000', ratio: '2:1' },
    { date: '1987-06-16T05:00:00.000', ratio: '2:1' }
  ],
  splitOffHistory: []
}
```
