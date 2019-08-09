<template>
   <el-row :gap="20">
       <el-col :span="12" :offset="6" :xs="{offset: 0,span: 24}">
           <div class="welcome-text">
                <h1>Welcome</h1>
                <p>This is simple demo app for buy/sell stocks.</p>
                <el-divider></el-divider>
                <p>You can navigate through navigation to: </p>

                <ul class="text-left list-group">
                    <li class="list-group-item">Portoflio <span class="font-italic">(Which includes your bought stocks)</span></li>
                    <li class="list-group-item">Stocks <span class="font-italic">(Where you can buy some stock from market)</span></li>
                    <li class="list-group-item">Activities <span class="font-italic">(Where you can see your Stocks history and other financial informations)</span></li>
                    <li class="list-group-item">Randomize stocks <span class="font-italic">(Clicking on it will change the price of each stock)</span></li>
                    <li class="list-group-item">Save or Load <span class="font-italic">(Save or Load data from firebase)</span></li>
                </ul>
                
                <el-divider></el-divider>
                <p class="font-italic alert alert-warning">The app is in beta phase and error may occur.</p>
            </div>
       </el-col>       
   </el-row>
</template>
<script>
export default {
    computed:{
        funds(){
            return this.$store.getters.funds;
        }
    }
}

</script>


<style scoped>
.welcome-text {
    text-align: center;
}
</style>
