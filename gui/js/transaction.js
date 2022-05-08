import { Table, RefreshTable } from './table.js';

let InventoryTable = new Table(document.getElementById("inventory"),['Products','Class','Price','Quantity']);
let BuyTable       = new Table(document.getElementById("chosen")   ,['Products','Class','Price','Quantity']);

let SelectedItemname = document.getElementById('selected-item');

async function LoadInventory() {
  let response = await fetch("/data/inventory");
  let data = await response.json();

  if(RefreshTable(InventoryTable.data,data)) {
    InventoryTable.fillTable(data);
    InventoryTable.enableSelection(SelectedItemname);
  }
}

LoadInventory();
setInterval(LoadInventory,800);

// Filter Items
let Filter = null;
document.getElementById('filter').addEventListener('input', ()=> {
  if(Filter) {
    clearTimeout(Filter);
  }
  Filter = setTimeout(()=> {
    // Filter Action
  },1000);
});

// Buying an Item
document.querySelector('.abtn').addEventListener('click', ()=> {
  if(!InventoryTable.selected_tr) {
    alert('Select an Item First in the Available Products Table');
  }
  else if(
    document.getElementById('selected-quantity').value=='0' ||
    document.getElementById('selected-quantity').value=='') {
    alert('Input a Quantity First');
  }
  else {
    // Add Item Action
  }
});

// Removing an Item
document.querySelector('.rbtn').addEventListener('click', ()=> {
  if(!BuyTable.selected_tr) {
    alert('Select an Item First to be Removed in the Products to be Sold Table');
  }
  else {
    // Remove Item Action
  }
});

// Calculate Change
document.querySelector('.cbtn').addEventListener('click', ()=> {
  if(
    document.getElementById('payment').value=='0.0' ||
    document.getElementById('payment').value=='0' ||
    document.getElementById('payment').value==''
  ) {
    alert('Input a payment amount first');
  }
  else {
    // Calculate Change Action
  }
});

// Save Transactions
document.querySelector('.sbtn').addEventListener('click', ()=> {
  if(BuyTable.data) {
    // Save Transaction Action
  }
  else {
    alert('Fill the Product to be sold table first');
  }
});