import { FillTable, PrintStats, PrintPie } from './load-table.js';

const PRODUCT = 0;
const CLASS = 1;
const PRICE = 2;
const QUANTITY = 3;

// INITIAL LOADS
let response = await fetch("/data/inventory");
let data = await response.json();

let totalCost = document.getElementById("total-cost");
let totalQuantity = document.getElementById("total-quantity");

FillTable(document.querySelector("table"),['Products','Class','Price','Quantity'],data);
PrintStats(totalCost,totalQuantity,data);
PrintPie(data);

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