import { FillTable } from './load-table.js';

async function LoadInventory() {
  let response = await fetch("/data/inventory");
  let data = await response.json();

  FillTable(document.querySelector(".inventory"),['Products','Class','Price','Quantity'],data);
}
LoadInventory();