import Home from './components/Home.vue'
import Portfolio from './components/portfolio/Portfolio.vue'
import Stocks from './components/stocks/Stocks.vue'
import Activities from './components/activities/Activities.vue'

export const routes = [
    {path : '/', component : Home},
    {path: '/portfolio' , component : Portfolio},
    {path: '/market', component: Stocks},
    {path: '/activities', component: Activities}
];