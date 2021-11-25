function searchCarsByBodyType() {
    var bodyDiv = document.getElementById("searchBodies");
    var bodyChecks = bodyDiv.querySelectorAll("input[type=checkbox]");
    var checked = [];
    for (var i = 0; i < bodyChecks.length; i++) {
        var checkbox = bodyChecks[i];
        if (checkbox.checked) checked.push(checkbox.value);
    }
    qString = checked.join();
    window.location = '/cars/search/' + qString;
}