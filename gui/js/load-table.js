/**
 * 
 * @param {Object} HTML_TABLE 
 * @param {Array} HEADINGS
 * @param {Array} DATA
 */

const PRODUCT = 0;
const CLASS = 1;
const PRICE = 2;
const QUANTITY = 3;

function PrintStats(CostOutput, QuantityOutput, data=null) {
  let CostSum = '₱0';
  let QuantitySum ='0x';

  if(data) {
    CostSum = 0.0;
    QuantitySum = 0;

    for(let i=0; i<data.length; ++i) {
      CostSum += data[i].price * data[i].quantity;
      QuantitySum += data[i].quantity;
    }

    CostSum = `₱${CostSum}`;
    QuantitySum = `${QuantitySum}x`;
  }

  CostOutput.value = CostSum;
  QuantityOutput.value  = QuantitySum;
}

function FillTable(HTML_TABLE, HEADINGS, DATA) {

  let TABLE_HEADING = HTML_TABLE.querySelector("thead");
  let TABLE_BODY = HTML_TABLE.querySelector("tbody");
  
  // clear
  TABLE_HEADING.innerHTML = "";
  TABLE_BODY.innerHTML = "";

  // set headings
  for(let i=0; i<HEADINGS.length; ++i) {
    let Label = document.createElement("th");
    Label.textContent = HEADINGS[i];
    TABLE_HEADING.appendChild(Label);
  }

  // populate rows items
  for(let CURRENT_ROW=0; CURRENT_ROW<DATA.length; ++CURRENT_ROW) {

    let Row = document.createElement("tr");

    let ProductName = document.createElement("td");
    ProductName.textContent = DATA[CURRENT_ROW].itemname;
    Row.appendChild(ProductName);

    let ProductClass = document.createElement("td");
    ProductClass.textContent = DATA[CURRENT_ROW].class;
    Row.appendChild(ProductClass);
    
    let ProductPrice = document.createElement("td");
    ProductPrice.textContent = `₱${DATA[CURRENT_ROW].price}`;
    Row.appendChild(ProductPrice);

    let ProductQuantity = document.createElement("td");
    ProductQuantity.textContent = `${DATA[CURRENT_ROW].quantity}x`;
    Row.appendChild(ProductQuantity);

    TABLE_BODY.appendChild(Row);
  }
}

function PrintPie(canvas,data) {
  let products = data.map(item => item.itemname);
  let quantities = data.map(item => item.quantity);
  
  new Chart(canvas, {
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
}
export { FillTable, PrintStats, PrintPie };