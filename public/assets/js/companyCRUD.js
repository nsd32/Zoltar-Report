$(document).ready(function() {
    

    $(document).on('click', `.edit`,function() {
        console.log('Edit button clicked');
        var id = $(this).attr('data-value');
        console.log('View ID: ', id);
        
        $(`#viewEditName` + id).attr('disabled', false);
        $(`#viewEditId` + id).prop('disabled', false);
    });

    $(document).on('click', `.save`,function() {
        // event.preventDefault();
        var id = $(this).attr('data-value');
        var viewName = $(`#viewEditName` + id).val();
        var viewID = $(`#viewEditId` + id).val();
        console.log('Save button clicked');
        var info = {id:$(this).attr('data-value'),
                    view_name: viewName,
                    ga_view_id: viewID};
        console.log('View Info: ', info);
        
        $(`#viewEditName` + id).attr('disabled', true);
        $(`#viewEditId` + id).prop('disabled', true);


        console.log('View Name: ', viewName);
        console.log('View ID: ', viewID);

        // // Send the PUT request.
        // $.ajax("/view/edit/" + id, {
        //             type: "PUT",
        //             data: id,
        //             view_name: viewName,
        //             ga_view_id: viewID
        //     }).then(
        //             function() {
        //                     console.log("Updated ID: ", id);
        //                     // Reload the page to get the updated list
        //                     // location.reload();
        // });
        
        
        updateView(info);
        
        function updateView(viewData) {
            console.log('Updated ID: ', id);
            console.log('View Data: ', viewData);
            $.post('/view/edit/', viewData);
        };
    });



    $(document).on('click', '.delete', function() {
        console.log('Delete button clicked');
        var id = {id:$(this).attr('data-value')};
        console.log('Company ID: ', id);

        $.post('company/delete', id)
        .done(function(deldata) {
            console.log('Deleted Successfully')
        });

        $(this).closest('tr').remove();

    });


    // function updatePost(post) {
    //     $.ajax({
    //       method: "PUT",
    //       url: "/company",
    //       data: post
    //     })
    //     .done(function() {
    //       window.location.href = "/blog";
    //     });
    //   }
    // });


});