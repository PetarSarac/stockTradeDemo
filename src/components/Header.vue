<template>
  <div class="app-header"  v-loading.fullscreen="loading">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="0"><router-link tag="el-menu-item" to="/">Home</router-link></el-menu-item>
      <el-menu-item index="1"><router-link tag="el-menu-item" to="/portfolio">Portfolio</router-link></el-menu-item>
      <el-menu-item index="2"><router-link tag="el-menu-item" to="/market">Market</router-link></el-menu-item>
      <el-menu-item index="3"><router-link tag="el-menu-item" to="/activities">Activities</router-link></el-menu-item>
      <el-menu-item index="4" @click="endDay">Randomioze price</el-menu-item>
      <el-submenu index="5">
        <template slot="title">Save/Load</template>
        <el-menu-item index="5-1" @click="saveData">Save</el-menu-item>
        <el-menu-item index="5-2" @click="loadData">Load</el-menu-item>
      </el-submenu>
      <el-menu-item>
        <i class="el-icon-money text-success">Funds: {{funds | currency}} </i>
      </el-menu-item>
      <el-menu-item class="user-avatar">
        <el-tooltip class="item" effect="dark" content="Comming soon" placement="top-start">
          <el-avatar shape="square" :size="50" :src="userAvatarUrl"></el-avatar>
        </el-tooltip>
      </el-menu-item>
    </el-menu>
  </div>
</template>


<script>
import {mapActions} from 'vuex'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            isDropdownShowed : false,
            loading: false,
            userAvatarUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
        }
    },
    computed:{
        funds(){
            return this.$store.getters.funds;
        }
    },
    methods: {
        ...mapActions({
            randomizeStocks: 'randomizeStocks',
            fetchData:'loadData'
        }),
        endDay(){
          this.$confirm('This will randomize price of all stocks. Continue?', 'Warning', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: 'Stocks are randomized'
              });
              this.randomizeStocks();
            }).catch(() => {
              this.$message({
                type: 'info',
                message: 'Canceled'
              });          
            });
        },
        successSave() {
          this.$message({
            message: 'Saved !',
            type: 'success'
          });
        },
        saveData(){
          this.loading = true
          
            const data = {
                funds: this.$store.getters.funds,
                stockPortfolio: this.$store.getters.stockPortfolio,
                stocks: this.$store.getters.stocks,
                history: this.$store.getters.getStockHistory
            }

            this.$http.put('data.json',data).then(response =>{
              this.loading = false
              this.successSave()
            });
        },
        loadData(){
            this.fetchData();
        }
    }
}
</script>

<style>
.app-header {
    margin-bottom: 20px;
}
.user-avatar {
  float: right !important;
}
</style>
