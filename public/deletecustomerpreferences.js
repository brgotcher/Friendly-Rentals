// Contains the logic for the Delete script on the customer preferences page
// Based on the videos from Week 8 (in case you need to reference them for an explanation)

function deleteCustomerPreferences(customerID, bodyID){
    $.ajax({
        url: '/customerpreferences/' + customerID + '&' + bodyID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};