<template>
  <el-col :span="8" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">

    <div class="card" style="margin:15px;">
      <div class="card-body">
        <h5 class="card-title alert alert-danger">{{stock.name}} <small>(Price : <span class="text-success">{{stock.price | currency}}</span> Quantity: <span class="text-warning">{{stock.Quantity}})</span></small></h5>
        <el-input-number v-model="Quantity" :min="1" :max="stock.Quantity">

        </el-input-number>
        <br><br>
        <el-button round icon="el-icon-remove" type="danger" @click="sellStock" :disabled="insufficientQuantity || Quantity <= 0">{{ insufficientQuantity ? 'Not enough' : 'Sell' }}</el-button>
        <el-popover
          placement="right"
          width="420"
          trigger="click">
          <el-table :data="history" style="max-height:300px;overflow:auto">
            <el-table-column width="150" property="timestamp" label="Date"></el-table-column>
            <el-table-column width="120" property="content" label="Name"></el-table-column>
            <el-table-column width="100" property="price" label="Price"></el-table-column>
          </el-table>
          <el-button icon="el-icon-time" slot="reference" @click="name = stock.name">Price tracking</el-button>
        </el-popover>
      </div>
    </div>
    
  </el-col>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    props: ['stock'],
    data(){
        return {
            Quantity : 0,
            name: "",
            history: []
        }
    },
    computed: {
      insufficientQuantity(){
        return this.Quantity > this.stock.Quantity;
      },
      hist(){
        return this.$store.getters.getStockHistory;
      },
    },
    methods: {
        ...mapActions({
           placeSellOrder : 'sellStock'
        }),
       sellStock(){
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;
           
          const order = {
              stockId: this.stock.id,
              stockPrice: this.stock.price,

              Quantity : this.Quantity
          };
           
          this.placeSellOrder(order);

          const activities = {
                Quantity:"Quantity: " + this.Quantity,
                content: this.stock.name,
                price: 'Price: ' + this.stock.price,
                timestamp: dateTime,
                status: "SOLD",
                color: '#0bbd87'
            }
            
          this.$store.dispatch('stockHistory',activities);

          this.successSell();

          this.Quantity = 0;
       },
       successSell() {
            this.$notify.info({
            title: 'Successful sales',
            message: 'You just sold ' + this.Quantity + ' stocks of ' + this.stock.name + ' for $' + this.stock.price,
            offset: 0,
            duration: 8000
        });
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
