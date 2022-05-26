// -------------------- GLOBALS -------------------
let StartDate = document.getElementById('start');
let EndDate = document.getElementById('end');
let Reports = document.querySelector('.reports');

// -------------------- EVENTS -------------------
document.querySelector('.gn').addEventListener('click',async function(){
  let data = await GetTimeFrameData(StartDate.value,EndDate.value);
  await GenerateReports(data);
});

// -------------------- FUNCTIONS -------------------
async function GetTimeFrameData(StartDate, EndDate) {
  let response = await fetch(`/data/transactions/${StartDate}/${EndDate}`);
  let data = await response.json();
  return data;
}

function PrintLine(canvas,labels,values,name='n/a') {
  let LineChart = new Chart(canvas, {
    type: 'line',
    data : {
      labels: labels, // ['m','t','w','th','f','s','s'],
      datasets: [{
        label: name,
        data: values, // [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
  });

  return LineChart;
}

function PrintPie(canvas,products,quantities,title='N/A') {
  
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
          text: title
        },
        legend: {
          display: true
        },
        datalabels: {
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map(data => {
              sum += data;
            });
            let percentage = (value*100 / sum).toFixed(2)+"%";
            return percentage;
          },
          color: '#fff',
        }

      },
      responsive: true,
      maintainAspectRatio: false,
      borderWidth: 0.4
    }
  });

  return PieChart;
}

async function GenerateReports(data) {

  Reports.innerHTML = '';

  // Iterate Through Data
  let PieOrganize = {};
  let LineDataValues = {};

  for(let i=0; i<data.length; ++i) {
    // pie chart data extraction
    if(typeof PieOrganize[data[i].itemname] === 'undefined') {
      PieOrganize[data[i].itemname] = {
        itemname : data[i].itemname,
        price    : data[i].price,
        quantity : data[i].quantity
      }
    } else {
      PieOrganize[data[i].itemname].quantity += data[i].quantity;
    }

    // line chart data extraction
    if(typeof LineDataValues[formatDate_yyyy_mm_dd(data[i].buydate)] === 'undefined') {
      LineDataValues[formatDate_yyyy_mm_dd(data[i].buydate)] = {
        totalAmount : data[i].price * data[i].quantity,
        totalQuantity : data[i].quantity
      }
    } else {
      LineDataValues[formatDate_yyyy_mm_dd(data[i].buydate)].totalAmount += data[i].price * data[i].quantity
      LineDataValues[formatDate_yyyy_mm_dd(data[i].buydate)].totalQuantity += data[i].quantity
    }
  }

  // Calculate Pie Charts Data

  let products = [];
  let quantity = [];
  let totalAmount = [];

  for(let [key,value] of Object.entries(PieOrganize)) {
    products.push(value.itemname);
    quantity.push(value.quantity);
    totalAmount.push(value.quantity*value.price);
  }

  // Calculate Line Charts Data

  let DatesBetween = getDates(
    new Date(StartDate.value),
    new Date(EndDate.value)
  );

  let LineAmountParsedValues = [];
  let LineQuantityParsedValues = [];

  for(let i=0; i<DatesBetween.length; ++i) {
    if(typeof LineDataValues[DatesBetween[i]] === 'undefined') {
      LineAmountParsedValues.push(0);
      LineQuantityParsedValues.push(0);
    } else {
      LineAmountParsedValues.push(LineDataValues[DatesBetween[i]].totalAmount);
      LineQuantityParsedValues.push(LineDataValues[DatesBetween[i]].totalQuantity);
    }
  }

  // Add to html

  let CanvasQuantity = document.createElement('canvas');
  let CanvasTotals = document.createElement('canvas');
  let CanvasLineDayAmount = document.createElement('canvas');
  let CanvasLineDayQuantity = document.createElement('canvas');

  let PieContainerQuantity = document.createElement('div');
  let PieContainerAmount = document.createElement('div');
  let LineContainerAmount = document.createElement('div');
  let LineContainerQuantity = document.createElement('div');

  let PieTextQuantity = document.createElement('p');
  let PieTextAmount = document.createElement('p');
  let LineTextAmount = document.createElement('p');
  let LineTextQuantity = document.createElement('p');

  PieTextQuantity.innerText = 'Sold Items Quantity Ratio';
  PieTextAmount.innerText = 'Sold Items Revenue Ratio';
  LineTextAmount.innerText = 'Amount Daily Totals';
  LineTextQuantity.innerText = 'Quantity Daily Totals';

  PieContainerQuantity.appendChild(CanvasQuantity);
  PieContainerAmount.appendChild(CanvasTotals);
  LineContainerAmount.appendChild(CanvasLineDayAmount);
  LineContainerQuantity.appendChild(CanvasLineDayQuantity);

  PrintPie(CanvasQuantity,products,quantity,'Quantity Sold');
  PrintPie(CanvasTotals,products,totalAmount,'Product Revenu');
  PrintLine(CanvasLineDayAmount,DatesBetween,LineAmountParsedValues,'Total Amount Sold');
  PrintLine(CanvasLineDayQuantity,DatesBetween,LineQuantityParsedValues,'Total Quantity Sold');

  Reports.appendChild(PieTextQuantity);
  Reports.appendChild(PieContainerQuantity);

  Reports.appendChild(PieTextAmount);
  Reports.appendChild(PieContainerAmount);

  Reports.appendChild(LineTextAmount);
  Reports.appendChild(LineContainerAmount);

  Reports.appendChild(LineTextQuantity);
  Reports.appendChild(LineContainerQuantity);
}

function getDates(start_date, end_date) {
  var date_range = new Array();
  var st_date = new Date(start_date);
  while (st_date <= end_date) {
       let month  = ("0" + (st_date.getMonth() + 1)).slice(-2);
       let day   = ("0" + st_date.getDate()).slice(-2);     
       let date = [st_date.getFullYear(), month, day].join("-");
       date_range.push(date);
       st_date.setDate(st_date.getDate() + 1);
  }
  return date_range;
}

function formatDate_yyyy_mm_dd(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}