// Contains the logic for the Delete script on the customers page
// Based on the videos from Week 8 (in case you need to reference them for an explanation)

function deleteCustomer(id){
    $.ajax({
        url: '/customers/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};