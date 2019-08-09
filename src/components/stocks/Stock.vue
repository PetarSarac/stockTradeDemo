<template>

    <el-col class="stock" :span="8" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <div class="card" style="margin:15px;">
            <div class="card-body">
                <h5 class="card-title alert alert-success">{{stock.name}} <small>(Price : <span class="text-success">{{stock.price | currency}})</span></small></h5>
                <!--<input class="form-control" :class="{danger : insufficientFunds}" type="number" placeholder="Quantity" v-model="Quantity">-->
                <el-input-number v-model="Quantity"  :min="1" :max="canBuy"></el-input-number>
                <br>
                <br>
                <el-badge :value="canBuy" class="item">
                    <el-button round type="success" class="btn btn-success" icon="el-icon-circle-plus" 
                        @click="buyStock" :disabled="insufficientFunds || Quantity <= 0">{{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
                    </el-button>
                </el-badge>
                <!--<p v-if="insufficientFunds" class="text-warning">Insufficient funds !</p>-->
            </div>
            
        </div>
       
    </el-col>


</template>

<script>

export default {
    data(){
        return {
            Quantity : 0,
            activities: []
        }
    },
    props: ['stock'],
    computed: {
        funds(){
            return this.$store.getters.funds;
        },
        insufficientFunds(){
            return this.Quantity * this.stock.price > this.funds;
        },
        canBuy(){
            return Math.floor(this.funds / this.stock.price);
        }
    },
    methods: {
        buyStock(){
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;

            
            const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    Quantity: this.Quantity
            };
            this.$store.dispatch('buyStock',order);
            this.successBuy();
            
            this.activities.unshift({
                Quantity: this.Quantity,
                content: this.stock.name,
                price: 'Price: ' + this.stock.price,
                timestamp: dateTime,
                color: '#0bbd87'
            })

            const activities = {
                Quantity:"Quantity: " + this.Quantity,
                content: this.stock.name,
                price: 'Price: ' + this.stock.price,
                timestamp: dateTime,
                status: "ACTIVE",
                color: '#0bbd87'
            }
            
            this.$store.dispatch('stockHistory',activities);
            
            this.Quantity = 0;
            
        },
        successBuy() {
            this.$notify.success({
            title: 'Successful purchase',
            message: 'You just bought ' + this.Quantity + ' stocks of ' + this.stock.name + ' for $' + this.stock.price,
            offset: 0,
            duration: 8000
        });
      }
    }
}
</script>


<style scoped>
    .danger {
        border: 1px solid red;
    }   
</style>