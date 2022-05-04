import { Table, RefreshTable } from './table.js';

let InventoryTable = new Table(document.getElementById("inventory"),['Products','Class','Price','Quantity']);

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