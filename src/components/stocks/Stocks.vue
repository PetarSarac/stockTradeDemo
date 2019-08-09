<template>
    <div>
        <div class="row">

        <app-stock v-for="(stock, index) in stocks" :key="index" :stock="stock"></app-stock>
            
        </div>
    </div>
</template>

<script>

import Stock from './Stock.vue'

export default {
    data(){
        return {
            newAct: []
        }
    },
    components: {
        appStock:Stock
    },
    computed : {
        stocks() {
            return this.$store.getters.stocks;
        }
    }
}
</script>
