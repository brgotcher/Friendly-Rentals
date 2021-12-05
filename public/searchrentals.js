function searchRentalsByLastName() {
    var bodyDiv = document.getElementById("searchRentals");
    var textBox = bodyDiv.getElementById("customerLast");
    var lastName = customerLast.value;
    window.location = '/rentals/searchByLastName/' + lastName;
}