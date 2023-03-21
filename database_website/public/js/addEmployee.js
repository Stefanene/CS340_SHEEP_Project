// Get the objects we need to modify
let addEmployeeForm = document.getElementById('addEmployeeForm');

// Modify the objects we need
addEmployeeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmail = document.getElementById("employeeEmail");
    let inputPassword = document.getElementById("employeePassword");
    let inputRank = document.getElementById("position_rank");

    // Get the values from the form fields
    let inputEmailValue = inputEmail.value;
    let inputPasswordValue = inputPassword.value;
    let inputRankValue = inputRank.value;

    // Put our data we want to send in a javascript object
    let data = {
        email: inputEmailValue,
        password: inputPasswordValue,
        position_rank: inputRankValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addEmployee", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmail.value = '';
            inputPassword.value = '';
            inputRank.value = '';
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
    let currentTable = document.getElementById("employeeTable");

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
    let rankCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.employeeID;
    emailCell.innerText = newRow.email;
    passwordCell.innerText = newRow.password;
    rankCell.innerText = newRow.position_rank;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteEmployee(newRow.employeeID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(emailCell);
    row.appendChild(passwordCell);
    row.appendChild(rankCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.employeeID);

    
    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("mySelectEmployeeTable");
    let option = document.createElement("option");
    option.text = newRow.email;
    option.value = newRow.employeeID;
    selectMenu.add(option);
}