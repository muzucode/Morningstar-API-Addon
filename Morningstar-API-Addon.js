import axios from 'axios';

//API key goes here
const api_key = 'e7d7f3ec36msh1ef294274676980p1b53dfjsn9c0f6bb4d0ec';

// Object containing all the endpoints/params
const req_set = {
    //Auto complete request url/params  
    ac : {
        url: 'https://morning-star.p.rapidapi.com/market/v2/auto-complete',
        params: (ticker) => {
            return({q : ticker})
        },
    },
	//Realtime data request url/params
    rtd : {
        url: 'https://morning-star.p.rapidapi.com/market/v2/get-realtime-data',
        params: (id) => {
			return({performanceIds: id})
		}
    },
    ts : {
        url: 'https://morning-star.p.rapidapi.com/market/v2/get-time-series',
        params: (id) => {
            return({performanceIds: id})
        }
    },
    ret : {
        url: 'https://morning-star.p.rapidapi.com/market/v2/get-returns',
        params: (id) => {
            return({performanceIds: id})
        }
    },
	nlist : {
		url: 'https://morning-star.p.rapidapi.com/news/list',
        params: (id) => {
            return({performanceId: id})
        }
	},
	nd:{
		url: 'https://morning-star.p.rapidapi.com/news/get-details',
        params: (id,sourceId) => {
            return({id: id, sourceId: sourceId})
        }
	}
};


class StockAPIService {

    //(Utility method) Selects the sole object and its values
    onlyItem(obj){
        var vals = Object.values(obj);
        var data = vals[0];
        return(data)
    }

    //Get performance ID of ticker (1 request)
	async getID(ticker) {
		var options = {
				method: 'GET',
				url: req_set.ac.url,
				params: req_set.ac.params(ticker),
				headers: {
					'x-rapidapi-key': api_key,
					'x-rapidapi-host': 'morning-star.p.rapidapi.com'
				}
			};

		var perfID;
		await axios.request(options).then(function (response) {
				perfID = response.data.results[0].performanceId;
		}).catch(function (error) {
				console.error(error);
		});

		return perfID;
	};

    //Get realtime data of performance ID (1 request)
	async getRtd(id) {
		var options = {
			method: 'GET',
			url: req_set.rtd.url,
			params: req_set.rtd.params(id),
			headers: {
				'x-rapidapi-key': api_key,
				'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		};

		var rtd;
		await axios.request(options).then(function (response) {
			rtd = response.data;
			// console.log(response.data);
		}).catch(function (error) {
				console.error(error);
		});
	
		return rtd;

	};

    //Get realtime data of ticker (2 requests)
	async getStockData(ticker){
		var perfID = await this.getID(ticker);
		var rtd = await this.getRtd(perfID);

		// Get the values of the object in RTD
		var vals = Object.values(rtd);
		var data = vals[0]
        console.log(data)
        
		return(data);

	};

    //Get time series data of a single stock (2 requests)
    async getTimeSeries(ticker){
        //Get id of ticker
        const id = await this.getID(ticker);

        var options = {
			method: 'GET',
			url: req_set.ts.url,
			params: req_set.ts.params(id),
			headers: {
				'x-rapidapi-key': api_key,
				'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		};

        var ts;
        await axios.request(options).then(function (response) {
			ts = response.data;
			// console.log(response.data);
		}).catch(function (error) {
				console.error(error);
		});

        var data = this.onlyItem(ts)

        console.log(data);

        return(data);

    };

	// Get returns data
    async getReturns(ticker){
        const id = await this.getID(ticker);

        var options = {
			method: 'GET',
			url: req_set.ret.url,
			params: req_set.ret.params(id),
			headers: {
				'x-rapidapi-key': api_key,
				'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		};

		var ret;
		await axios.request(options).then(function (response) {
			ret = response.data;
		//   console.log(response.data);
		}).catch(function (error) {
			console.error(error);
		});

		var data = this.onlyItem(ret)
		console.log(data);
		return(data);
	};

	//Get list of news sources and headlines
	async getNewsList(ticker){
		const id = await this.getID(ticker);
		
        var options = {
			method: 'GET',
			url: req_set.nlist.url,
			params: req_set.nlist.params(id),
			headers: {
				'x-rapidapi-key': api_key,
				'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		};

		var nlist;
		await axios.request(options).then(function (response) {
			nlist = response.data;
		//   console.log(response.data);
		}).catch(function (error) {
			console.error(error);
		});

	
		var data = nlist;
		console.log(data);
		return(data);
	};

	//Get specific news article (content is separated into objects)
	async getNewsDetails(id, sourceId){
		
		
		var options = {
			method: 'GET',
			url: req_set.nd.url,
			params: req_set.nd.params(id, sourceId),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		var nd;
		await axios.request(options).then(function (response) {
			nd = response.data;
		}).catch(function (error) {
			console.error(error);
		});

		var data = nd;
		console.log(data);
		return(data);
	};

};

export default new StockAPIService();





// Take in user input ("Apple")

// Auto complete stock (get performance ID) --> results[0].performanceId