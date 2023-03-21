// Get the objects we need to modify
let addCustomerForm = document.getElementById('addCustomerForm');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmail = document.getElementById("customerEmail");
    let inputPassword = document.getElementById("customerPassword");

    // Get the values from the form fields
    let inputEmailValue = inputEmail.value;
    let inputPasswordValue = inputPassword.value;

    // Put our data we want to send in a javascript object
    let data = {
        email: inputEmailValue,
        password: inputPasswordValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addCustomer", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmail.value = '';
            inputPassword.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customerTable");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let passwordCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.customerID;
    emailCell.innerText = newRow.email;
    passwordCell.innerText = newRow.password;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.customerID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(emailCell);
    row.appendChild(passwordCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.customerID);

    
    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("mySelectCustomer");
    let option = document.createElement("option");
    option.text = newRow.email;
    option.value = newRow.customerID;
    selectMenu.add(option);
}