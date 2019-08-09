import Vue from 'vue'
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

export const loadData = ({commit}) => {
    let loadingInstance = Loading.service();
    Vue.http.get('data.json')
    .then(response => {
        return response.json()
    })
    .then(data => {
        if(data){
            const stocks = data.stocks;
            const funds = data.funds;
            const stockPortfolio = data.stockPortfolio;
            const history = data.history;

            const portfolio = {
                funds,
                stockPortfolio
            }

            commit('SET_STOCKS',stocks);
            commit('STOCK_HISTORY_SERVER',history);
            commit('SET_PORTFOLIO',portfolio);
            loadingInstance.close();
            Message.success({
                message: 'Loaded !',
                type: 'success'
            })
        }
    })
}