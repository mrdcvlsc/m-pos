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
    let quantity = document.getElementById('selected-quantity').value;
    let DeductedQuantity = InventoryTable.data[InventoryTable.selected_index].quantity - quantity;
    
    if(DeductedQuantity < 0) {
      alert('Not enough item');
    }
    else {
      InventoryTable.data[InventoryTable.selected_index].quantity = DeductedQuantity;
      BuyTable.data.push({
        "itemname": InventoryTable.data[InventoryTable.selected_index].itemname,
        "class": InventoryTable.data[InventoryTable.selected_index].class,
        "price": InventoryTable.data[InventoryTable.selected_index].price,
        "quantity": quantity
      });

      // update database - subtract quantity
      fetch(`/data/inventory/${InventoryTable.data[InventoryTable.selected_index].itemname.replaceAll(' ','&+')}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({
          "itemname": InventoryTable.data[InventoryTable.selected_index].itemname,
          "class": InventoryTable.data[InventoryTable.selected_index].class,
          "price": InventoryTable.data[InventoryTable.selected_index].price,
          "quantity": DeductedQuantity
        })
      }).then(function (response) {
        response.json().then(function (data) {
          console.log('Transaction Quantity Subtracted',data);

          // rerender tables
          InventoryTable.fillTable(InventoryTable.data);
          InventoryTable.enableSelection();
          InventoryTable.selected_tr = null;

          BuyTable.fillTable(BuyTable.data);
          BuyTable.enableSelection();
        });
      }).catch(function (error) {
        console.error('ERROR in : Edit>Confirm>fetch()\n',error);
      });
    }
  }
});

// Removing an Item
document.querySelector('.rbtn').addEventListener('click', ()=> {
  if(!BuyTable.selected_tr) {
    alert('Select an Item First to be Removed in the Products to be Sold Table');
  }
  else {
    // Re-Add the item in the database
    // update database - subtract quantity
    fetch(`/data/inventory/${BuyTable.data[BuyTable.selected_index].itemname.replaceAll(' ','&+')}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({
        "itemname": BuyTable.data[BuyTable.selected_index].itemname,
        "class": BuyTable.data[BuyTable.selected_index].class,
        "price": BuyTable.data[BuyTable.selected_index].price,
        "quantity": DeductedQuantity
      })
    }).then(function (response) {
      response.json().then(function (data) {
        console.log('Transaction Quantity Readded',data);

        // rerender tables
        InventoryTable.fillTable(InventoryTable.data);
        InventoryTable.enableSelection();
        InventoryTable.selected_tr = null;

        BuyTable.data.splice(BuyTable.selected_index,1);
        BuyTable.fillTable(BuyTable.data);
        BuyTable.enableSelection();
        BuyTable.selected_tr = null;
      });
    }).catch(function (error) {
      console.error('ERROR in : Edit>Confirm>fetch()\n',error);
    });
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
  if(BuyTable.data.length>0) {
    // Save Transaction Action
  }
  else {
    alert('Fill the Product to be sold table first');
  }
});

BuyTable.data = [];