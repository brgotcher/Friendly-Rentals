function updateCar(id) {
	var row = document.getElementById("row" + id);
	var cel = row.firstChild.nextSibling;
	for (var i = 0; i < 6; i++) {
		cel = cel.nextElementSibling;
		var content = cel.textContent;
		cel.removeChild(cel.firstChild);
		var newInput = document.createElement('input');
		newInput.value=content;
		newInput.id = "row" + id + "cel" + i;
		cel.appendChild(newInput);
	}
	btn = document.getElementById("updateButton"+id);
	btn.textContent = "Save";
	// btn.onclick = saveCarUpdate(id);
	btn.onclick = function(){
		saveCarUpdate(id);
	}
}

function saveCarUpdate(id) {
	var row = document.getElementById("row" + id);
	var cel = row.firstChild.nextSibling.nextElementSibling;
	var bodyID = cel.firstElementChild.value;
	cel = cel.nextElementSibling;
	var make = cel.firstElementChild.value;
	cel = cel.nextElementSibling;
	var model = cel.firstElementChild.value;
	cel = cel.nextElementSibling;
	var year = cel.firstElementChild.value;
	cel = cel.nextElementSibling;
	var mileage = cel.firstElementChild.value;
	cel = cel.nextElementSibling;
	var available = cel.firstElementChild.value;

	$.ajax({
        url: '/cars/' + id,
        type: 'PUT',
        data: 'bodyID=' + bodyID + '&make=' + make + '&model=' + model + '&year=' + year + '&mileage=' + mileage + '&available=' + available + "&carID=" + id,
        success: function(result){
            window.location.reload(true);
        }
    })
}