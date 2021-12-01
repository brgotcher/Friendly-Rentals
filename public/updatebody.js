// change the cells in a row of the table to text inputs with the current data prefilled
function updateBody(id) {
	// identify the current row based on the provided id
	var row = document.getElementById("row" + id);
	var cel = row.firstChild.nextSibling;
	//iterate the cells in the row, copy the content, delete and replace with a text input, replace
	//content as value
	for (var i = 0; i < 6; i++) {
		cel = cel.nextElementSibling;
		var content = cel.textContent;
		cel.removeChild(cel.firstChild);
		var newInput = document.createElement('input');
		newInput.value=content;
		newInput.id = "row" + id + "cel" + i;
		cel.appendChild(newInput);
	}
	// change the "update" button to a "save" button that will call the saveBodyUpdate function
	btn = document.getElementById("updateButton"+id);
	btn.textContent = "Save";
	// btn.onclick = saveCarUpdate(id);
	// saveBodyUpdate function has to be wrapped in another function in order to not be run automatically
	// whenever updateBody is run
	btn.onclick = function(){
		saveBodyUpdate(id);
	}
}

// send the updated information to the database when the user hits the save button
function saveBodyUpdate(id) {
	var row, cel;
	// set up attributes as objects in an array so they can be updated within the loop
	var type = {val: 0},
		ratePerDay = {val: 0};
	var attributes = [type, ratePerDay];
	row = document.getElementById("row" + id);
	cel = row.firstChild.nextSibling.nextElementSibling;
	// iterate through each field and save the values
	for (var i = 0; i < attributes.length; i++) {
		attributes[i].val = cel.firstElementChild.value;
		cel = cel.nextElementSibling;
	}


	//send the values to the db
	$.ajax({
        url: '/bodies/' + id,
        type: 'PUT',
        data: 'type=' + type.val + '&ratePerDay=' + ratePerDay.val + "&bodyID=" + id,
        success: function(result){
            window.location.reload(true);
        }
    })
}