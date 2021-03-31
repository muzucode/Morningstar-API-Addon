import axios from 'axios';

//API key goes here
const api_key = '[REDACTED]';

//Object containing all the endpoints/params
const req_set = {
    ac : {
        url: 'https://morning-star.p.rapidapi.com/market/v2/auto-complete',
        params: (ticker) => {
            return({q : ticker})
        },
    },
    rtdm : {
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
	},
	mov:{
		url: 'https://morning-star.p.rapidapi.com/market/v2/get-movers',
	},
	qts:{
		url: 'https://morning-star.p.rapidapi.com/market/v2/get-quotes',
		params: (id) => {
            return({performanceIds: id})
        },
	},
	glb:{
		url: 'https://morning-star.p.rapidapi.com/market/get-global-indices',
	},
	sum:{
		url: 'https://morning-star.p.rapidapi.com/market/get-summary',
	},
	rtds:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-realtime-data',
        params: (id) => {
			return({performanceId: id})
		}
	},
	mcrtd:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-mini-chart-realtime-data',
        params: (id) => {
			return({performanceId: id})
		}
	},
	pfv:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-price-fair-value',
        params: (id) => {
			return({performanceId: id})
		}
	},
	kst:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-key-stats',
        params: (id) => {
			return({performanceId: id})
		}	
	},
	arpt:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-analysis-report',
        params: (id) => {
			return({performanceId: id})
		}	
	},
	ttr:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-trailing-total-returns',
        params: (id) => {
			return({performanceId: id, dataType: 'd'})
		}	
	},
	ad:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-analysis-data',
        params: (id) => {
			return({performanceId: id})
		}	
	},
	fin:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-financials',
        params: (id) => {
			return({performanceId: id, interval: 'annual', reportType: 'A'})
		}	
	},
	exec:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-executive',
        params: (id) => {
			return({performanceId: id, keyExecutives:'keyExecutives'})
		}	
	},
	comp:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-competitors',
        params: (id) => {
			return({performanceId: id})
		}	
	},
	prof:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-profile',
        params: (id) => {
			return({performanceId: id})
		}	
	},
	ownr:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-ownership',
        params: (id) => {
			return({performanceId: id})
		}	
	},
	div:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-dividends',
        params: (id) => {
			return({performanceId: id})
		}		
	},
	shrt:{
		url: 'https://morning-star.p.rapidapi.com/stock/v2/get-short-interest',
        params: (id) => {
			return({performanceId: id})
		}		
	},
	hist:{
		url: 'https://morning-star.p.rapidapi.com/stock/get-histories',
        params: (id) => {
			return({PerformanceId: id})
		}		
	},
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

	//Get returns data
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
		//  console.log(response.data);
		}).catch(function (error) {
			console.error(error);
		});

		var data = this.onlyItem(ret)
		console.log(data);
		return(data);
	};

    //Get realtime data of performance ID (1 request)
	async getRtdMarketID(id) {
		var options = {
			method: 'GET',
			url: req_set.rtdm.url,
			params: req_set.rtdm.params(id),
			headers: {
				'x-rapidapi-key': api_key,
				'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		};

		var rtd;
		await axios.request(options).then(function (response) {
			rtd = response.data;
			//console.log(response.data);
		}).catch(function (error) {
				console.error(error);
		});
	
		return rtd;

	};

    //Get realtime data of ticker (2 requests)
	async getRtdMarket(ticker){
		var perfID = await this.getID(ticker);
		var rtd = await this.getRtdMarketID(perfID);

		//Get the values of the object in RTD
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
			//console.log(response.data);
		}).catch(function (error) {
				console.error(error);
		});

        var data = this.onlyItem(ts)

        console.log(data);

        return(data);

    };

	//Get movers data
	async getMovers(){
		var options = {
			method: 'GET',
			url: req_set.mov.url,
			headers: {
				'x-rapidapi-key': api_key,
				'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		};

		var data;
		await axios.request(options).then(function (response) {
			console.log(response.data);
			data = response.data;
		}).catch(function (error) {
			console.error(error);
		});

		return(data);
	};
	
	async getQuotes(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.qts.url,
			params: req_set.qts.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getGlobalIndices(){
		const options = {
			method: 'GET',
			url: req_set.glb.url,
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getSummary(){
		const options = {
			method: 'GET',
			url: req_set.sum.url,
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getRtdStock(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.rtds.url,
			params: req_set.rtds.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getMiniChart(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.mcrtd.url,
			params: req_set.mcrtd.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getPriceFairValue(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.pfv.url,
			params: req_set.pfv.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getKeyStats(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.kst.url,
			params: req_set.kst.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getAnalysisReport(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.arpt.url,
			params: req_set.arpt.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getTrailingTotalReturns(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.ttr.url,
			params: req_set.ttr.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getAnalysisData(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.ad.url,
			params: req_set.ad.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getFinancials(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.fin.url,
			params: req_set.fin.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getExecutives(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.exec.url,
			params: req_set.exec.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getCompetitors(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.comp.url,
			params: req_set.comp.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getProfile(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.prof.url,
			params: req_set.prof.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getOwnership(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.ownr.url,
			params: req_set.ownr.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getDividends(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.div.url,
			params: req_set.div.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getShortInterest(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.shrt.url,
			params: req_set.shrt.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

		  return(data);
	};

	async getHistories(ticker){
		const id = await this.getID(ticker);

		const options = {
			method: 'GET',
			url: req_set.hist.url,
			params: req_set.hist.params(id),
			headers: {
			  'x-rapidapi-key': api_key,
			  'x-rapidapi-host': 'morning-star.p.rapidapi.com'
			}
		  };
		  
		  var data;
		  await axios.request(options).then(function (response) {
			data = response.data;
			console.log(response.data);
		  }).catch(function (error) {
			console.error(error);
		  });

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
		//  console.log(response.data);
		}).catch(function (error) {
			console.error(error);
		});

		//Set return data
		var data = nlist;
		//console.log(data);

		async function createHeadlines(){
			var headlines = [];	
			await nlist.forEach(element => {
				headlines.push({
					sourceName: element.sourceName, 
					title: element.title
				})
			});
			return(headlines);
		}

		return({data: data, headlines: createHeadlines()});
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





//Take in user input ("Apple")

//Auto complete stock (get performance ID) --> results[0].performanceId