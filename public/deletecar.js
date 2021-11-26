// Contains the logic for the Delete script on the cars page
// Based on the videos from Week 8 (in case you need to reference them for an explanation)

function deleteCar(id){
    $.ajax({
        url: '/cars/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};