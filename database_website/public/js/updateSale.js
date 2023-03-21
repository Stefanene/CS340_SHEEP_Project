
// Get the objects we need to modify
let updateSale = document.getElementById('updateSaleForm');

// Modify the objects we need
updateSale.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let saleID = document.getElementById("mySelectSale");
    let storeID = document.getElementById("mySelectStore");
    let customerID = document.getElementById("mySelectCustomer");
    let time = document.getElementById("time_of_sale_update");
    let employeeID = document.getElementById("mySelectEmployee");


    // Get the values from the form fields
    let saleIDValue = saleID.value;
    let storeIDValue = storeID.value;
    let customerIDValue = customerID.value;
    let timeValue = time.value;
    let employeeIDValue = employeeID.value;

    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(saleIDValue)) 
    {
        return;
    }
    if (isNaN(storeIDValue)) 
    {
        return;
    }
    if (isNaN(customerIDValue)) 
    {
        return;
    }
    //WIP, time value cannot be checked for null
    // if (isNaN(timeValue)) 
    // {
    //     return;
    // }

    // Put our data we want to send in a javascript object
    let data = {
        saleID: saleIDValue,
        storeID: storeIDValue,
        customerID: customerIDValue,
        time_of_sale: timeValue,
        employeeID: employeeIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateSale", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, saleIDValue);
            inputStore.value = '';
            inputCustomer.value = '';
            time_of_sale_value.value = '';
            inputEmployee.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, saleID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("saleTable");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == saleID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let sid = updateRowIndex.getElementsByTagName("td")[1];
            let cid = updateRowIndex.getElementsByTagName("td")[2];
            let time_of_sale = updateRowIndex.getElementsByTagName("td")[3];
            let eid = updateRowIndex.getElementsByTagName("td")[4];

            // update the price
            sid.innerHTML = parsedData[0].sid;
            cid.innerHTML = parsedData[0].cid;
            time_of_sale.innerHTML = parsedData[0].time_of_sale;
            eid.innerHTML = parsedData[0].eid;
       }
    }
}
