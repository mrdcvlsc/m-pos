// POST
fetch('/data/inventory', {
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'post',
  body: JSON.stringify({
    "itemname": "Spandals SUPER-XXXL",
    "class": "Footware",
    "price": 10,
    "quantity": 1
  })
}).then(function (response) {
  response.json().then(function (data) {
    console.log(data);
  });
}).catch(function (error) {
  console.error(error);
});

// UPDATE
fetch('/data/inventory/Spandals&+SUPER-XXXL', {
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'put',
  body: JSON.stringify({
    "itemname": "Spandals SUPER-XXXLL",
    "class": "Footware Cool",
    "price": 100,
    "quantity": 11
  })
}).then(function (response) {
  response.json().then(function (data) {
    console.log(data);
  });
}).catch(function (error) {
  console.error(error);
});

// ADD QUANTITY
fetch('/data/inventory/add-qty/Blue-Shirt', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'put',
  body: JSON.stringify({
    "quantity": 1
  })
}).then(function (response) {
  response.json().then(function (data) {
    console.log('ADDED QUANTITY',data);
  });
}).catch(function (error) {
  console.error(error);
});

// SUB QUANTITY
fetch('/data/inventory/sub-qty/Blue-Shirt', {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'put',
  body: JSON.stringify({
    "quantity": 1
  })
}).then(function (response) {
  response.json().then(function (data) {
    console.log('SUBTRACTED QUANTITY',data);
  });
}).catch(function (error) {
  console.error(error);
});

// DELETE
fetch('/data/inventory/Spandals&+SUPER-XXXLL', {
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'delete'
}).then(function (response) {
  response.json().then(function (data) {
    console.log(data);
  });
}).catch(function (error) {
  console.error(error);
});

// TRANSACTIONS

// POST
fetch('/data/transactions', {
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'post',
  body: JSON.stringify({
    "buydate": "2022-05-13T06:17:59.751Z",
    "itemname": "From Browser",
    "class": "Test Data",
    "price": 10,
    "quantity": 2
  })
}).then(function (response) {
  response.json().then(function (data) {
    console.log(data);
  });
}).catch(function (error) {
  console.error(error);
});