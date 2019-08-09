import stocks from '../../data/stocks.js'


const state = {
    stocks: [],
    stockHistory: []
};

const mutations = {
    'SET_STOCKS' (state,stocks){
        state.stocks = stocks;
    },
    'STOCK_HISTORY' (state,order){
        if (typeof state.stockHistory == 'undefined') { //Check if array exist (if you load empty data from firebase it will not exist)
            state.stockHistory = []
        }
        state.stockHistory.unshift(order);
    },
    'STOCK_HISTORY_SERVER' (state,order){
        state.stockHistory = order;
    },
    'RND_STOCKS'(state){
        state.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + Math.random() -0.5));
        });
    }
};

const actions = {
    buyStock : ({commit},order) => {
        commit('BUY_STOCK',order);
    },
    stockHistory : ({commit},order) => {
        commit('STOCK_HISTORY',order);
    },
    initStocks : ({commit}) => {
        commit('SET_STOCKS',stocks);
    },
    randomizeStocks : ({commit}) =>{
        commit('RND_STOCKS');
    }
};

const getters = {
    stocks: state => {
        return state.stocks;
    },
    getStockHistory: state => {
        return state.stockHistory;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};