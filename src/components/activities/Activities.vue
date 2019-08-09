<template>
<div>
<el-row :gutter="0" type="flex" class="row-col">
    <el-divider><i class="el-icon-money" style="font-size:32px"></i><i class="el-icon-coin" style="font-size:32px"></i></el-divider>
        <el-row type="flex" align="middle">
            <el-col :span="12">
                <div class="card border-dark mb-3" style="max-width: 18rem;">
                    <div class="card-header">Finance <i class="el-icon-coin"></i></div>
                    <div class="card-body">
                        <h4 class="card-title">Current funds: <span class="text-success">{{funds | currency}}</span></h4>
                        <p class="card-text">Profit: <span style="color:rgb(11, 189, 135);font-weight:bold">
                                    {{profitFunds | currency}}</span>
                        Loss: <span style="color:orangered;font-weight:bold">
                                            {{lossFunds | currency}}
                            </span>
                        </p>
                    </div>
                </div>
            </el-col>    
            <el-col :span="12">
                <app-money-graph :funds="funds" :lossFunds="lossFunds" :profitFunds="profitFunds" :height="200"></app-money-graph> 
            </el-col>
        </el-row>    
</el-row>

    <el-divider><i class="el-icon-date" style="font-size:32px"></i><i class="el-icon-s-data" style="font-size:32px"></i></el-divider>

<el-row type="flex">
    <el-col :span="8" class="mt-2">
        
        <el-tabs v-model="activeName" @tab-click="changeName(activeName)">
            
            <el-tab-pane v-for="(item,index) in stocks" :key="index" :label="item.name" :name="item.name">
                
                <el-timeline>    
                    <el-timeline-item
                    v-for="(item, index) in history.slice(0,5)"
                    :key="index"
                    :icon="item.icon"
                    :type="item.type"
                    :color="item.status == 'SOLD' ? 'orangered' : item.color"
                    :size="item.size"
                    :timestamp="item.timestamp">
                    {{item.content}}
                    <br>
                    {{item.price}}
                    <br>
                    {{item.Quantity}}
                    
                    </el-timeline-item>         
                </el-timeline>
            
            </el-tab-pane>
            
        </el-tabs>
        
    </el-col>

    <el-col :span="16" class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <el-table
            :data="hist"
            style="width: 100%">
            <el-table-column
                prop="timestamp"
                label="Date"
                width="180">
            </el-table-column>
            <el-table-column
                prop="content"
                label="Name"
                width="180">
            </el-table-column>
            <el-table-column
                prop="Quantity"
                label="Quantity"
                width="180">
            </el-table-column>
            <el-table-column
                prop="price"
                label="Price">
            </el-table-column>
            <el-table-column
                prop="status"
                label="Status">
            </el-table-column>
        </el-table>
        <small v-if="hist.length == 0"><i>Log activity is empty</i></small>
    </el-col>
    
</el-row>   
</div>
</template>

<script>
import MoneyGraph from './MoneyGraph.vue'

export default {
    components: {
        appMoneyGraph: MoneyGraph
    },
    data(){
        return {
            history: [],
            name: "",
            activeName: "",
            fundsHistory: {
                startedFunds: 10000,
                profit: 0 ,
                loss: 0
            }
        }
    },
    methods: {
        changeName(value){
            this.name = value;
        }
    },
    computed: {
        hist(){
            return this.$store.getters.getStockHistory;
        },
        stocks(){
            return this.$store.getters.stocks;
        },
        funds(){
            return this.$store.getters.funds;
        },
        lossFunds(){
            if(this.funds < this.fundsHistory.startedFunds) {
                return this.fundsHistory.startedFunds - this.funds
            }else {
                return "0"
            }
        },
        profitFunds(){
            if(this.funds > this.fundsHistory.startedFunds) {
                return this.funds - this.fundsHistory.startedFunds 
            }else {
                return "0"
            }
        }
    },
    watch: {
        name(){
            this.history = [];
            let filteredArray = this.hist.filter(o => o.content == this.name);
            filteredArray.forEach(element => {
                this.history.push(element)
            });  
        }
         
    }

}


</script>

<style>
.el-table__empty-text{
    display: none;
}

.infinite-list {
    height: 350px;
}
h1,h2,h3,h4,h5 {
    color:#606266;
}
.finance {
    margin-left: 10px;
    font-style: italic;
    color: #606266;
}

.row-col {
    flex-direction: column;
}

</style>
