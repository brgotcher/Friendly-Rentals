function searchRentalsByLastName() {
    var textBox = document.getElementById("customerLast");
    var lastName = textBox.value;
    window.location = '/rentals/searchByLastName/' + lastName;
}