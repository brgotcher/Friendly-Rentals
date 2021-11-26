// Contains the logic for the Delete script on the bodies page
// Based on the videos from Week 8 (in case you need to reference them for an explanation)

function deleteBody(id){
    $.ajax({
        url: '/bodies/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};