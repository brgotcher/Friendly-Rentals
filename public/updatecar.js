// change the cells in a row of the table to text inputs with the current data prefilled
function updateCar(id) {
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
	// change the "update" button to a "save" button that will call the saveCarUpdate function
	btn = document.getElementById("updateButton"+id);
	btn.textContent = "Save";
	// btn.onclick = saveCarUpdate(id);
	// saveCarUpdate function has to be wrapped in another function in order to not be run automatically
	// whenever updateCar is run
	btn.onclick = function(){
		saveCarUpdate(id);
	}
}

// send the updated information to the database when the user hits the save button
function saveCarUpdate(id) {
	var row, cel;
	var bodyID = {val: 0},
		make = {val: 0},
		model = {val: 0},
		year = {val: 0},
		mileage = {val: 0},
		available = {val: 0};
	var attributes = [bodyID, make, model, year, mileage, available];
	row = document.getElementById("row" + id);
	cel = row.firstChild.nextSibling.nextElementSibling;
	for (var i = 0; i < attributes.length; i++) {
		attributes[i].val = cel.firstElementChild.value;
		cel = cel.nextElementSibling;
	}
	// var row = document.getElementById("row" + id);
	// var cel = row.firstChild.nextSibling.nextElementSibling;
	// var bodyID = cel.firstElementChild.value;
	// cel = cel.nextElementSibling;
	// var make = cel.firstElementChild.value;
	// cel = cel.nextElementSibling;
	// var model = cel.firstElementChild.value;
	// cel = cel.nextElementSibling;
	// var year = cel.firstElementChild.value;
	// cel = cel.nextElementSibling;
	// var mileage = cel.firstElementChild.value;
	// cel = cel.nextElementSibling;
	// var available = cel.firstElementChild.value;

	$.ajax({
        url: '/cars/' + id,
        type: 'PUT',
        data: 'bodyID=' + bodyID.val + '&make=' + make.val + '&model=' + model.val + '&year=' + year.val + '&mileage=' + mileage.val + '&available=' + available.val + "&carID=" + id,
        success: function(result){
            window.location.reload(true);
        }
    })
}