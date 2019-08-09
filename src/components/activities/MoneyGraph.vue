<script>
import { Doughnut } from 'vue-chartjs'

export default {
    props:['funds','lossFunds','profitFunds'],
    
    extends: Doughnut,
    mounted () {
        // Overwriting base render method with actual data.
        this.renderChart({
        labels: ['Loss', 'Current Money', 'Profit'],
        datasets: [{
                data: [this.lossFunds, this.funds, this.profitFunds],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(11, 189, 135)'
                ]
            }]
        })
    },
    watch: {
        funds(){
            this.renderChart({
            labels: ['Loss', 'Current Money', 'Profit'],
            datasets: [{
                    data: [this.lossFunds, this.funds, this.profitFunds],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(11, 189, 135)'
                    ]
                }]
            })
        }
    }
}
</script>
