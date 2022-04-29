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

class Table {
  constructor(htmlTable, headings) {
    this.table = htmlTable;
    this.thead = this.table.querySelector("thead");
    this.tbody = this.table.querySelector("tbody");

    this.headings = headings;
    this.data = null;
    this.selection = null;
    this.selected_tr = null;

    // set headings
    for(let i=0; i<this.headings.length; ++i) {
      let th = document.createElement("th");
      th.textContent = this.headings[i];
      this.thead.appendChild(th);
    }
  }

  fillTable(data) {
    try{      
      // clear
      this.tbody.innerHTML = "";
  
      // populate rows items
      for(let i=0; i<data.length; ++i) {
  
        let tr = document.createElement("tr");

        for(let element in data[i]) {
          let td = document.createElement('td');
          if(`${element}`==='price')
            td.textContent = `₱${data[i][element]}`;
          else if(`${element}`==='quantity')
            td.textContent = `${data[i][element]}x`;
          else
            td.textContent = data[i][element];
          tr.appendChild(td);
        }
  
        this.tbody.appendChild(tr);
      }
    }
    catch(err){
      console.error(err);
    }
  }

  /**
   * 
   * @param {HTMLInputElement} input when specified, if a click even occured
   * the innerText of the first child of the selected <tr> will be displayed
   * in the <input> tag.
   */
  enableSelection(input=null) {
    let tr_array = Array.from(this.tbody.children);
    let previous_tr;
    let itself = this;

    for(let tr of tr_array) {
      tr.addEventListener('click', function(){
        try{
          previous_tr.style.backgroundColor = '';
          previous_tr.style.color = '';
          previous_tr.style.outline = '';
        }
        catch(err){
          console.log('Initial Selection');
        }
        
        this.style.backgroundColor = 'rgb(7, 153, 153)';
        this.style.color = 'white';
        this.style.outline = '0.2em solid rgb(5, 185, 5)';
        
        previous_tr = this;
        
        if(input)
          input.value = previous_tr.querySelector('td').innerText;
  
        let rowValues = Array.from(previous_tr.children);
  
        let selected = {
          itemname : rowValues[0].innerText,
          class : rowValues[1].innerText,
          price : rowValues[2].innerText.replaceAll('₱',''),
          quantity : rowValues[3].innerText.replaceAll('x','')
        };

        TableSetSelection(itself,selected,this);
      });
    }
  }
}

function TableSetSelection(table,selection,selected_tr) {
  table.selection = selection;
  table.selected_tr = selected_tr;
}

function PrintPie(canvas,data) {
  let products = data.map(item => item.itemname);
  let quantities = data.map(item => item.quantity);
  
  let PieChart = new Chart(canvas, {
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

  return PieChart;
}
export { PrintStats, PrintPie, Table };