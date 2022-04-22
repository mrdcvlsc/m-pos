// POST
fetch('http://localhost:8080/data/inventory', {
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
fetch('http://localhost:8080/data/inventory/Spandals&+SUPER-XXXL', {
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

// DELETE
fetch('http://localhost:8080/data/inventory/Spandals&+SUPER-XXXLL', {
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