// change the cells in a row of the table to text inputs with the current data prefilled
function updateCustomer(id) {
    // identify the current row based on the provided id
    var row = document.getElementById("row" + id);
    var cel = row.firstChild.nextSibling;
    //iterate the cells in the row, copy the content, delete and replace with a text input, replace
    //content as value
    for (var i = 0; i < 8; i++) {
        cel = cel.nextElementSibling;
        var content = cel.textContent;
        cel.removeChild(cel.firstChild);
        var newInput = document.createElement('input');
        newInput.value = content;
        newInput.id = "row" + id + "cel" + i;
        cel.appendChild(newInput);
    }
    // change the "update" button to a "save" button that will call the saveCustomerUpdate function
    btn = document.getElementById("updateButton" + id);
    btn.textContent = "Save";
    // saveCustomerUpdate function has to be wrapped in another function in order to not be run automatically
    // whenever updateCustomer is run
    btn.onclick = function () {
        saveCustomerUpdate(id);
    }
}

// send the updated information to the database when the user hits the save button
function saveCustomerUpdate(id) {
    var row, cel;
    // set up attributes as objects in an array so they can be updated within the loop
    var customerFirst = { val: 0 },
        customerLast = { val: 0 },
        phone = { val: 0 },
        email = { val: 0 },
        street = { val: 0 },
        city = { val: 0 },
        state = { val: 0 },
        zip = { val: 0 };
    var attributes = [customerFirst, customerLast, phone, email, street, city, state, zip];
    row = document.getElementById("row" + id);
    cel = row.firstChild.nextSibling.nextElementSibling;
    // iterate through each field and save the values
    for (var i = 0; i < attributes.length; i++) {
        attributes[i].val = cel.firstElementChild.value;
        cel = cel.nextElementSibling;
    }

    //send the values to the db
    $.ajax({
        url: '/customers/' + id,
        type: 'PUT',
        data: 'customerFirst=' + customerFirst.val + '&customerLast=' + customerLast.val + '&phone=' + phone.val + '&email=' + email.val + '&street=' + street.val + '&city=' + city.val + '&state=' + state.val + '&zip=' + zip.val + "&customerID=" + id,
        success: function (result) {
            window.location.reload(true);
        }
    })
}