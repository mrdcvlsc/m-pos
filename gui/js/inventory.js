import { FillTable, PrintStats, PrintPie } from './load-table.js';

let PieGraphQty, ItemSelected = document.getElementById('selected-item');

function UpdateTableRowEvents() {
  let TableRows = Array.from(document.getElementsByTagName("tr"));
  console.log(TableRows);
  console.log(TableRows.children);
  let Current;
  for(let i=0; i<TableRows.length; ++i) {
    TableRows[i].addEventListener('click', function(){
      console.log(TableRows[i]);
      try{
        Current.style.backgroundColor = '';
        Current.style.color = '';
        Current.style.outline = '';
      }
      catch(err){
        console.log('Initial Selection');
      }
      this.style.backgroundColor = 'rgb(7, 153, 153)';
      this.style.color = 'white';
      this.style.outline = '0.2em solid rgb(5, 185, 5)';
      Current = this;
      ItemSelected.value = Current.querySelector('td').innerText;
    });
  }
}

async function LoadResource() {
  let response = await fetch("/data/inventory");
  let data = await response.json();

  let totalCost = document.getElementById("total-cost");
  let totalQuantity = document.getElementById("total-quantity");

  FillTable(document.querySelector("table"),['Products','Class','Price','Quantity'],data);
  PrintStats(totalCost,totalQuantity,data);

  PieGraphQty = document.getElementById('quantity');
  PrintPie(PieGraphQty,data);
  UpdateTableRowEvents();
}
LoadResource();

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
  console.log('ClosePopUp()')
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
  else { // requirements meet

    // send post request
    fetch('/data/inventory', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        "itemname": ItemNameInput.value,
        "class": ClassInput.value,
        "price": PriceInput.value,
        "quantity": QuantityInput.value
      })
    }).then(function (response) {
      response.json().then(function (data) {
        
        console.log(data);

        // clear fields
        ItemNameInput.value = '';
        ClassInput.value = '';
        PriceInput.value = '';
        QuantityInput.value = '';

        // refresh the list
        LoadResource();

        // close popup window
        ClosePopUp(AddPopUp);
      });
    }).catch(function (error) {
      console.error(error);
    });
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