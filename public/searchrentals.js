function searchRentalsByLastName() {
    var bodyDiv = document.getElementById("searchRentals");
    var textBox = bodyDiv.querySelectorAll("input[type=text");
    var lastName = textBox.value;
    window.location = '/rentals/searchByLastName/' + lastName;
}