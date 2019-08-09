<template>
    <div>
        <small v-if="stocks.length == 0" class="alert alert-warning"><i>Portfolio is empty! Go to stocks and buy some stock</i></small>
        <app-stock v-for="(stock, index) in stocks" :key="index" :stock="stock"></app-stock>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock.vue';

    export default {
        
        computed: {
            ...mapGetters({
                stocks:'stockPortfolio'
            })
        },
        components: {
            appStock : Stock
        }
    }
</script>