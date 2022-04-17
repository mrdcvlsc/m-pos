import { PopulateTable } from './load-table.js';

const PRODUCT = 0;
const CLASS = 1;
const PRICE = 2;
const QUANTITY = 3;

// INITIAL LOADS
let response = await fetch("/data/inventory");
let { data } = await response.json();
console.log('data = ', data);

PopulateTable(document.querySelector("table"),['Products','Class','Price','Quantity'],data);

let totalCost = document.getElementById("total-cost");
let totalQuantity = document.getElementById("total-quantity");

DisplayStats(totalCost,totalQuantity,data);

// FUNCTIONS

async function DisplayStats(CostOutput, QuantityOutput, data=null) {
  let CostSum = '₱0';
  let QuantitySum ='0x';

  if(data) {
    console.log(data);
    CostSum = 0.0;
    QuantitySum = 0;

    for(let i=0; i<data.length; ++i) {
      console.log(data[i])
      CostSum += data[i][PRICE] * data[i][QUANTITY];
      QuantitySum += data[i][QUANTITY];
    }

    CostSum = `₱${CostSum}`;
    QuantitySum = `${QuantitySum}x`;
  }

  CostOutput.value = CostSum;
  QuantityOutput.value  = QuantitySum;
}

let  products = data.map(col => col[PRODUCT]);
let  quantities = data.map(col => col[QUANTITY]);

let PieGraphQty = document.getElementById('quantity');
new Chart(PieGraphQty, {
  type: 'pie',
  data: {
    labels: products,
    datasets: [{
      data: quantities,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(98, 224, 82)',
        'rgb(230, 115, 230)',
        'rgb(169, 115, 230)',
        'rgb(115, 226, 230)',
        'rgb(66, 160, 47)'
      ],
      hoverOffset: 20
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Total Product Quantity Ratio'
      },
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    borderWidth: 0.4
  }
});
