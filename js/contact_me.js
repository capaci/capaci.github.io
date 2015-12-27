var $contactForm = $('#contactForm');
$contactForm.submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: 'http://formspree.io/rafaelcapacipereira@gmail.com',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        beforeSend: function() {
            $("#btnSubmit").attr("disabled", true);
            $contactForm.append('<div class="alert alert--loading">Sending message…</div>');
        },
        success: function(data) {
            $contactForm.find('.alert--loading').hide();
            // $contactForm.append('<div class="alert alert--success">Message sent!</div>');


            $("#btnSubmit").attr("disabled", false);
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
            $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
            $('#success > .alert-success')
            .append('</div>');

            alert("fuuuuuck");
            //clear all fields
            $('#contactForm').trigger("reset");
        },
        error: function(err) {
            $contactForm.find('.alert--loading').hide();

            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
            $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
            $('#success > .alert-danger').append('</div>');
        }
    });
    return false;
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
