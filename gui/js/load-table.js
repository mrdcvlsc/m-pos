/**
 * 
 * @param {Object} HTML_TABLE 
 * @param {Array} HEADINGS
 * @param {Array} DATA
 */

const PRODUCT = 0;
const CLASS = 1;
const PRICE = 2;
const QUANTITY = 3;

function PopulateTable(HTML_TABLE, HEADINGS, DATA) {

  let TABLE_HEADING = HTML_TABLE.querySelector("thead");
  let TABLE_BODY = HTML_TABLE.querySelector("tbody");
  
  // clear
  TABLE_HEADING.innerHTML = "";
  TABLE_BODY.innerHTML = "";

  // set headings
  for(let i=0; i<HEADINGS.length; ++i) {
    let Label = document.createElement("th");
    Label.textContent = HEADINGS[i];
    TABLE_HEADING.appendChild(Label);
  }

  // populate rows items
  for(let CURRENT_ROW=0; CURRENT_ROW<DATA.length; ++CURRENT_ROW) {
    let Row = document.createElement("tr");

    let ProductName = document.createElement("td");
    ProductName.textContent = DATA[CURRENT_ROW][PRODUCT];
    Row.appendChild(ProductName);

    let ProductClass = document.createElement("td");
    ProductClass.textContent = DATA[CURRENT_ROW][CLASS];
    Row.appendChild(ProductClass);
    
    let ProductPrice = document.createElement("td");
    ProductPrice.textContent = `₱${DATA[CURRENT_ROW][PRICE]}`;
    Row.appendChild(ProductPrice);

    let ProductQuantity = document.createElement("td");
    ProductQuantity.textContent = `${DATA[CURRENT_ROW][QUANTITY]}x`;
    Row.appendChild(ProductQuantity);

    TABLE_BODY.appendChild(Row);
  }
}

export { PopulateTable };

// /** This is the Original Function Just in Case Needed Later
//  * 
//  * @param {Object} HTML_TABLE 
//  * @param {Array} HEADINGS
//  * @param {Array} DATA
//  */
// async function PopulateTable(HTML_TABLE, HEADINGS, DATA) {

//   let TABLE_HEADING = HTML_TABLE.querySelector("thead");
//   let TABLE_BODY = HTML_TABLE.querySelector("tbody");
  
//   // clear
//   TABLE_HEADING.innerHTML = "";
//   TABLE_BODY.innerHTML = "";

//   // set headings
//   for(let i=0; i<HEADINGS.length; ++i) {
//     let Label = document.createElement("th");
//     Label.textContent = HEADINGS[i];
//     TABLE_HEADING.appendChild(Label);
//   }

//   // populate rows items
//   for(let i=0; i<DATA.length; ++i) {
//     let Row = document.createElement("tr");
//     for(let j=0; j<DATA[i].length; ++j) {
//       let Value = document.createElement("td");
//       Value.textContent = DATA[i][j];
//       Row.appendChild(Value);
//     }
//     TABLE_BODY.appendChild(Row);
//   }
// }

// export { PopulateTable };