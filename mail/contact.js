$(function () {
    // Obfuscated email parts
    const user = "gotsanjay";
    const domain = "gmail.com";
    const email = user + "21@" + domain;
    const formAction = "https://formsubmit.co/" + email;

    // Set the form's action dynamically
    $("#contactForm").attr("action", formAction);

    // On form submit
    $('#contactForm').on('submit', function (event) {
        const name = $('#name').val();
        const userEmail = $('#email').val();

        // Inject reply-to if missing
        if (!$('input[name="_replyto"]').length) {
            $('<input>').attr({
                type: 'hidden',
                name: '_replyto',
                value: userEmail
            }).appendTo('#contactForm');
        }

        // Get IST time
        const formattedTime = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: true,
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
        $('#time').val(formattedTime);

        // Disable the button to prevent duplicate submits
        const $button = $('#sendMessageButton');
        $button.prop("disabled", true);

        // Let the form submit naturally, but also show feedback after a short delay
        setTimeout(() => {
            $('#success').html("<div class='alert alert-success'>")
                .find('.alert-success')
                .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
                    `<strong>Thanks ${name}, your message is on the way! 📬</strong>`);
        }, 300);

        // Fallback: handle failure if formsubmit is blocked or network fails
        $(this).on('error', function () {
            $('#success').html("<div class='alert alert-danger'>")
                .find('.alert-danger')
                .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
                    `<strong>Sorry ${name}, we couldn’t send your message. Please try again later.</strong>`);
        });

        // Re-enable button after 1.5 seconds
        setTimeout(() => {
            $button.prop("disabled", false);
        }, 1500);
    });

    // Clear success/error messages when focusing the name field
    $('#name').focus(function () {
        $('#success').html('');
    });

    // Handle tab clicks (Bootstrap)
    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});
