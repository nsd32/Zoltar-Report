$(document).ready(function() {
    var companyName = $('#companyName-input');
    var accountNo = $('#account-input');
    var propertyName = $('#propertyName-input');
    var trackingID = $('#trackingID-input');
    var viewName = $('#viewName-input');
    var viewID = $('#viewID-input');
    var conceptName = $('#accountSelect').find(":selected").val();

    // On Create Company click Submit information from companySubmit Function to Company, Property and View tables
    $(document).on('click', '#companySubmit', companySubmit);
    
    function companySubmit(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!companyName.val().trim() || !accountNo.val().trim() || !propertyName.val().trim() || !trackingID.val().trim() ||!viewName.val().trim() || !viewID.val().trim()) {
            console.log('No Company information submitted');
            return;
        }        
        
        // Insert into Company, Property and View tables (View breakdown in api-routes.js)
        insertCompany({
            company_name: companyName.val().trim(),
            account_number: accountNo.val().trim(),
            property_name: propertyName.val().trim(),
            tracking_id: trackingID.val().trim(),
            view_name: viewName.val().trim(),
            ga_view_id: viewID.val().trim()
        });

        $('#companyName').empty();
        $('#accountNo').empty();
        $('#propertyName').empty();
        $('#trackingID').empty();
        $('#viewName').empty();
        $('#viewID').empty();
       
        $('#createModal').modal('hide');

        setTimeout(function(){ window.location.href = '/customer'; }, 1500);
        
    }

    function insertCompany(companyData) {
        $.post('/company/new', companyData);
    }

});
