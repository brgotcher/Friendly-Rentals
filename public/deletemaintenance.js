// Contains the logic for the Delete script on the maintenance page
// Based on the videos from Week 8 (in case you need to reference them for an explanation)

function deleteMaintenance(id){
    $.ajax({
        url: '/maintenance/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};