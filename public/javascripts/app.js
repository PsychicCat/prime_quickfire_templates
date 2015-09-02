$(document).ready(function(){

    $('#submit').on('click', function(e){
        e.preventDefault();
        var firstname = $(this).parent().serializeArray()[0];
        var lastname = $(this).parent().serializeArray()[1];

        var data = {
            firstName: firstname.value,
            lastName: lastname.value
        };

        $.ajax({
            url: '/students',
            type: 'POST',
            data: data
        }).done(function(response, textStatus, jqXHR){
            console.log('Added student!');
        }).fail(function( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR, textStatus, errorThrown);
        }).always(function(){
            refreshStudentList();
        });
    });
});

function refreshStudentList(){
    $.ajax({
        url: '/students',
        type: 'GET',
        dataType: 'json',
    }).done(function(response, textStatus, jqXHR){
        $('#contents').empty();
        response.forEach(function(elem){
            var $li = $('<li>').text(elem.firstName + " " + elem.lastName);
            $('#contents').append($li);
        });
    }).fail(function( jqXHR, textStatus, errorThrown ) {
    console.log(jqXHR, textStatus, errorThrown);
    }).always(function(){
    console.log('Ajax complete!');
    });
}