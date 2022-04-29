import { PrintStats, PrintPie, Table } from './table.js';

let PieGraphQty, SelectedTR, SelectedItemname = document.getElementById('selected-item');
let Selection = null, PieChart = null;

let InventoryTable = new Table(document.getElementById("inventory"),['Products','Class','Price','Quantity']);

function UpdateTableRowEvents() {
  let TableRows = Array.from(document.getElementsByTagName("tr"));
  let Current;
  for(let i=0; i<TableRows.length; ++i) {
    TableRows[i].addEventListener('click', function(){

      try{
        Current.style.backgroundColor = '';
        Current.style.color = '';
        Current.style.outline = '';
      }
      catch(err){
        console.log('Initial Selection');
      }
      
      SelectedTR = this;
      this.style.backgroundColor = 'rgb(7, 153, 153)';
      this.style.color = 'white';
      this.style.outline = '0.2em solid rgb(5, 185, 5)';
      
      Current = this;
      
      SelectedItemname.value = Current.querySelector('td').innerText;

      let rowValues = Array.from(Current.children);

      Selection = {
        itemname : rowValues[0].innerText,
        class : rowValues[1].innerText,
        price : rowValues[2].innerText.replaceAll('₱',''),
        quantity : rowValues[3].innerText.replaceAll('x','')
      };
    });
  }
}

async function LoadResource() {
  let response = await fetch("/data/inventory");
  let data = await response.json();

  let totalCost = document.getElementById("total-cost");
  let totalQuantity = document.getElementById("total-quantity");

  InventoryTable.fillTable(data);
  // FillTable(document.getElementById("inventory"),['Products','Class','Price','Quantity'],data);
  PrintStats(totalCost,totalQuantity,data);
  UpdateTableRowEvents();

  PieGraphQty = null;
  PieGraphQty = document.getElementById('quantity');

  if(PieChart) {
    PieChart.destroy();
  }
  PieChart = PrintPie(PieGraphQty,data);
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
  PopUpContainer.style.display = 'none';
  LabelHeadings.style.display = '';
  PieGraphQty.style.display = 'block';
  ShowPopUpBox.style.display = 'none';

  Selection = null;
  SelectedItemname.value = 'None';

  try{
    SelectedTR.style.backgroundColor = '';
    SelectedTR.style.color = '';
    SelectedTR.style.outline = '';
  }
  catch(err) {
    console.log('ClosePopUp() : No rows selected yet to be clear');
  }
}

AddButton.addEventListener('click', event => {
  DisplayPopUp(AddPopUp);
});

EditButton.addEventListener('click', event => {

  if(Selection) {

    let ItemNameInput = EditPopUp.querySelector("#edit-itemname");
    let ClassInput = EditPopUp.querySelector("#edit-class");
    let PriceInput = EditPopUp.querySelector("#edit-price");
    let QuantityInput = EditPopUp.querySelector("#edit-quantity");
    
    ItemNameInput.value = Selection.itemname;
    ClassInput.value = Selection.class;
    PriceInput.value = Selection.price;
    QuantityInput.value = Selection.quantity;

    DisplayPopUp(EditPopUp);
  }
  else {
    alert('Make a selection first by clicking an item in the inventory list');
  }
});

DeleteButton.addEventListener('click', event => {
  if(Selection) {
    let ItemName = document.getElementById('del-name');
    ItemName.innerText = `Remove "${Selection.itemname}" from the inventory?`;
    DisplayPopUp(DeletePopUp);
  }
  else {
    alert('Make a selection first by clicking an item in the inventory list');
  }
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
        
        console.log('ADD',data);

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
      console.error('ERROR in : Add>Confirm>fetch()\n',error);
    });
  }
});

addCancle.addEventListener('click', event => {
  ClosePopUp(AddPopUp);
});

editConfirm.addEventListener('click', event => {

  let ItemNameInput = EditPopUp.querySelector("#edit-itemname");
  let ClassInput = EditPopUp.querySelector("#edit-class");
  let PriceInput = EditPopUp.querySelector("#edit-price");
  let QuantityInput = EditPopUp.querySelector("#edit-quantity");

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

    // send put request
    fetch(`/data/inventory/${Selection.itemname.replaceAll(' ','&+')}`, {
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({
        "itemname": ItemNameInput.value,
        "class": ClassInput.value,
        "price": PriceInput.value,
        "quantity": QuantityInput.value
      })
    }).then(function (response) {
      response.json().then(function (data) {
        console.log('EDIT',data);

        // clear fields
        ItemNameInput.value = '';
        ClassInput.value = '';
        PriceInput.value = '';
        QuantityInput.value = '';

        // refresh the list
        LoadResource();

        // close popup window
        ClosePopUp(EditPopUp);
      });
    }).catch(function (error) {
      console.error('ERROR in : Edit>Confirm>fetch()\n',error);
    }); 
  }
});

editCancle.addEventListener('click', event => {
  ClosePopUp(EditPopUp);
});

deleteConfirm.addEventListener('click', event => {

  fetch(`/data/inventory/${Selection.itemname.replaceAll(' ','&+')}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'delete'
  }).then(function (response) {
    response.json().then(function (data) {
      console.log('DELETE',data);

      // refresh the list
      LoadResource();

      // close popup window
      ClosePopUp(DeletePopUp);
    });
  }).catch(function (error) {
    console.error('ERROR in : Delete>Confirm>fetch()\n',error);
  });
});

deleteCancle.addEventListener('click', event => {
  ClosePopUp(DeletePopUp);
});