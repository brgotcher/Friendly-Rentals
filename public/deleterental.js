// Contains the logic for the Delete script on the rental page
// Based on the videos from Week 8 (in case you need to reference them for an explanation)

function deleteRental(id){
    $.ajax({
        url: '/rentals/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};