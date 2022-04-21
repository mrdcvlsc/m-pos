import { PopulateTable } from './load-table.js';

const PRODUCT = 0;
const CLASS = 1;
const PRICE = 2;
const QUANTITY = 3;

// INITIAL LOADS
let response = await fetch("/data/inventory");
let { data } = await response.json();

PopulateTable(document.querySelector("table"),['Products','Class','Price','Quantity'],data);

let totalCost = document.getElementById("total-cost");
let totalQuantity = document.getElementById("total-quantity");

DisplayStats(totalCost,totalQuantity,data);

// FUNCTIONS

async function DisplayStats(CostOutput, QuantityOutput, data=null) {
  let CostSum = '₱0';
  let QuantitySum ='0x';

  if(data) {
    CostSum = 0.0;
    QuantitySum = 0;

    for(let i=0; i<data.length; ++i) {
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

// main button events

const LabelHeadings = document.querySelector("thead");
const PopUpContainer = document.querySelector(".popup-container");

const AddPopUp = document.querySelector(".add-box");
const EditPopUp = document.querySelector(".edit-box");
const DeletePopUp = document.querySelector(".delete-box");

const AddButton = document.querySelector(".add");
const EditButton = document.querySelector(".edit");
const DeleteButton = document.querySelector(".delete");

function DisplayPopUp(ShowPopUpBox) {
  PopUpContainer.style.display = 'flex';
  LabelHeadings.style.display = 'none';
  PieGraphQty.style.display = 'none';
  ShowPopUpBox.style.display = 'block';
}

function ClosePopUp(ShowPopUpBox) {
  PopUpContainer.style.display = 'none';
  LabelHeadings.style.display = '';
  PieGraphQty.style.display = 'block';
  ShowPopUpBox.style.display = 'none';
}

AddButton.addEventListener('click', event => {
  DisplayPopUp(AddPopUp);
});

EditButton.addEventListener('click', event => {
  DisplayPopUp(EditPopUp);
});

DeleteButton.addEventListener('click', event => {
  DisplayPopUp(DeletePopUp);
});

// popup action buttons

const addConfirm = document.querySelector(".add0");
const addCancle = document.querySelector(".add1");

const editConfirm = document.querySelector(".edit0");
const editCancle = document.querySelector(".edit1");

const deleteConfirm = document.querySelector(".delete0");
const deleteCancle = document.querySelector(".delete1");

addConfirm.addEventListener('click', event => {

  let ItemNameInput = AddPopUp.querySelector("#add-itemname");
  let ClassInput = AddPopUp.querySelector("#add-class");
  let PriceInput = AddPopUp.querySelector("#add-price");
  let QuantityInput = AddPopUp.querySelector("#add-quantity");
  
  if(ItemNameInput.value==='') {
    alert('Fill Up Item Name');
  }
  else if(ClassInput.value==='') {
    alert('Fill Up Class');
  }
  else if(PriceInput.value==='') {
    alert('Fill Up Price');
  }
  else if(QuantityInput.value==='') {
    alert('Fill Up Quantity');
  }
  else {

    // clear fields
    ItemNameInput.value = '';
    ClassInput.value = '';
    PriceInput.value = '';
    QuantityInput.value = '';

    // close popup window
    ClosePopUp(AddPopUp);
  }
});

addCancle.addEventListener('click', event => {
  ClosePopUp(AddPopUp);
});

editConfirm.addEventListener('click', event => {
  ClosePopUp(EditPopUp);
});

editCancle.addEventListener('click', event => {
  ClosePopUp(EditPopUp);
});

deleteConfirm.addEventListener('click', event => {
  ClosePopUp(DeletePopUp);
});

deleteCancle.addEventListener('click', event => {
  ClosePopUp(DeletePopUp);
});