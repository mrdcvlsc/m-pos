import { Table, RefreshTable } from './table.js';

let InValSelectedItem = document.getElementById('selected-item');
let InValSelectedQuantity = document.getElementById('selected-quantity');
let InValFilter = document.getElementById('filter');

let InValTotalPrice = document.getElementById('total-price');
let InValPayment = document.getElementById('payment');
let InValChange = document.getElementById('change');

let InventoryTable = new Table(document.getElementById("inventory"),['Products','Class','Price','Quantity']);
let BuyTable       = new Table(document.getElementById("chosen")   ,['Products','Class','Price','Quantity']);

var CanBeSaved = false;

async function LoadInventory() {
  let response = await fetch("/data/inventory");
  let data = await response.json();

  if(RefreshTable(InventoryTable.data,data)) {
    InventoryTable.fillTable(data);
    InventoryTable.enableSelection(InValSelectedItem);
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
    InValSelectedQuantity.value=='0' ||
    InValSelectedQuantity.value=='') {
    alert('Input a Quantity First');
  }
  else {
    // Add Item Action
    let quantity = InValSelectedQuantity.value;
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
      
      // subtract quantity to the database
      fetch(`/data/inventory/sub-qty/${InventoryTable.data[InventoryTable.selected_index].itemname.replaceAll(' ','&+')}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({
          "quantity": quantity
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

          InValFilter.value = '';
          InValSelectedItem.value = 'None';
          InValSelectedQuantity.value = 0;
          
          let CurrentTotal = 0;
          for(let i=0; i<BuyTable.data.length; ++i) {
            CurrentTotal += BuyTable.data[i].price * BuyTable.data[i].quantity;
          }

          InValTotalPrice.value = `₱${CurrentTotal}`;
        });
      }).catch(function (error) {
        console.error('ERROR in : transaction>subtract item quantity>fetch()\n',error);
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
    // Re-Add the quantity in the database    
    fetch(`/data/inventory/add-qty/${BuyTable.data[BuyTable.selected_index].itemname.replaceAll(' ','&+')}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({
        "quantity": BuyTable.data[BuyTable.selected_index].quantity
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

        let CurrentTotal = 0;
        for(let i=0; i<BuyTable.data.length; ++i) {
          CurrentTotal += BuyTable.data[i].price * BuyTable.data[i].quantity;
        }

          InValTotalPrice.value = `₱${CurrentTotal}`;
      });
    }).catch(function (error) {
      console.error('ERROR in : transaction>re-add item quantity>fetch()\n',error);
    });
  }
});

// Calculate Change
document.querySelector('.cbtn').addEventListener('click', ()=> {

  let CurrentTotal = 0;
  for(let i=0; i<BuyTable.data.length; ++i) {
    CurrentTotal += BuyTable.data[i].price * BuyTable.data[i].quantity;
  }

  // convert payment
  let Payment = InValPayment.value;

  if(BuyTable.data.length<1) {
    alert('No Items to Buy : Add an item first');
  }
  else if(
    document.getElementById('payment').value=='0.0' ||
    document.getElementById('payment').value=='0' ||
    document.getElementById('payment').value==''
  ) {
    alert('No payment Value : Input a payment amount first');
  }
  else if(CurrentTotal>Payment) {
    alert('Payment is not enough');
  }
  else {
    // Calculate Change Action
    let ChangeAmount = Payment - CurrentTotal;
    InValChange.value = `₱${ChangeAmount}`;
    CanBeSaved = true;
  }
});

// Save Transactions
document.querySelector('.sbtn').addEventListener('click', ()=> {
  if(BuyTable.data.length>0 && CanBeSaved) {
    // Save Transaction Action
  }
  else {
    alert('Fill the Product to be sold and calculate change');
  }
});

BuyTable.data = [];