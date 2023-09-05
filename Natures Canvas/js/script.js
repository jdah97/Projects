// Navigation (Arrows)
$(document).ready(function() {
    var wrapper = $(".scroll-wrapper");
    var sections = $(".main-content");
    var currentSectionIndex = 0;

    // Function to navigate to the specified section
    function navigateToSection(index) {
        // Update the active link in the navigation menu
        $('.nav-thumbs a').removeClass('active');
        $('.nav-thumbs a').eq(index).addClass('active');
        
        // Calculate the distance to scroll the wrapper based on the new section index
        var scrollDistance = sections.eq(index).position().left;
        
        // Update the URL in the browser's address bar
        var newUrl = window.location.origin + window.location.pathname + "#" + sections.eq(index).attr('id');
        window.history.pushState({ path: newUrl }, '', newUrl);
        
        // Apply the transform to the wrapper to scroll to the new section
        wrapper.css("transform", "translateX(-" + scrollDistance + "px)");
    }

    // Navigate to the previous section when clicking the left arrow
    $(document).on("click", ".arrow-left", function() {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            navigateToSection(currentSectionIndex);
        }
    });
    
    // Navigate to the next section when clicking the right arrow
    $(document).on("click", ".arrow-right", function() {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            navigateToSection(currentSectionIndex);
        }
    });
});

// Navigation (Nav Bar)
$(document).ready(function() {
    const scrollWrapper = $(".scroll-wrapper");
    const navLinks = $(".nav-link");
  
    navLinks.on("click", function(event) {
        event.preventDefault();
    
        // Remove active class from all links
        navLinks.removeClass("active");
    
        // Add active class to clicked link
        $(this).addClass("active");
    
        // Get the target panel's index based on the clicked link
        const targetIndex = $(this).index();
    
        // Calculate the scroll distance based on the target panel's index and panel width
        const scrollDistance = targetIndex * 100;
    
        // Move the scroll wrapper
        scrollWrapper.css("transform", `translateX(-${scrollDistance}vw)`);

        // Update the URL hash based on the target panel's index
        window.history.pushState(null, null, `#panel-${targetIndex + 1}`);
    });
});

// Settings Menu
$(document).ready(function() {
    function openNav() {
        $(".side-nav").width(250);
    }
      
    function closeNav() {
        $(".side-nav").width(0);
    }

    // Function to run the page guide
    function navHelp() {
        $(".nav-help");
    }

    $(".settings").click(openNav);
    $(".close-settings").click(closeNav);
    $(".nav-help").click(navHelp);
});

// Loads bg images to avoid image flickering on first change
var bg1, bg2;
$(document).ready(function() {
    bg1 = new Image();
    bg1.src = "images/bg.jpg";

    bg2 = new Image();
    bg2.src = "images/bg2.jpg";

    // Check if user has a preference saved
    var preference = localStorage.getItem("preference");
    if (preference === "dark") {
        setDarkMode();
    } else if (preference === "light") {
        setLightMode();
    }
});

// Dark mode preference
function setDarkMode() {
    $("body").css("background-image", "url('" + bg1.src + "')");
    $(".alt-colour-text").css("color", "var(--text-colour-light)");
    $(".side-nav").css("background-color", "#c9c9c9");
    $(".toggle-button").text("Dark Mode");
    $(".toggle-button").addClass("light-mode").removeClass("dark-mode");
    localStorage.setItem("preference", "dark");
}

// Light mode preference
function setLightMode() {
    $("body").css("background-image", "url('" + bg2.src + "')");
    $(".alt-colour-text").css("color", "var(--text-colour-dark)");
    $(".side-nav").css("background-color", "#111111");
    $(".toggle-button").text("Light Mode");
    $(".toggle-button").addClass("dark-mode").removeClass("light-mode");
    localStorage.setItem("preference", "light");
}

// Toggle for light/dark mode
$(document).on("click", ".toggle-button", function() {
    if ($(this).hasClass("dark-mode")) {
            setDarkMode();
        } else {
            setLightMode();
        }
});

// Contact Form Error Handler
$(document).ready(function() {
    const currentPage = window.location.pathname.split('/').pop();

    // Checking if on the home page to avoid consol errors on pages without a form
    if (currentPage === 'index.html') {
        const firstNameInput = document.querySelector('input[name="first-name"]');
        const firstNameRegex = /[a-zA-Z]/;

        const lastNameInput = document.querySelector('input[name="last-name"]');
        const lastNameRegex = /[a-zA-Z]/;

        const phoneInput = document.querySelector('input[name="phone"]');
        const phoneRegex = /^\d{7,}$/;

        const emailInput = document.querySelector('input[name="email"]');
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

        const firstNameError = document.getElementById('first-name-error');
        const lastNameError = document.getElementById('last-name-error');
        const phoneError = document.getElementById('phone-error');
        const emailError = document.getElementById('email-error');

        // Function to handle input validation and error messages
        function validateInput(input, regex, errorElement, errorMessage) {
            if (!regex.test(input.value)) {
            input.classList.add('invalid-input');
            errorElement.innerHTML = errorMessage;
            errorElement.classList.add('error-message-active');
            } else {
            input.classList.remove('invalid-input');
            errorElement.textContent = '';
            errorElement.classList.remove('error-message-active');
            }
        }

        // 
        firstNameInput.addEventListener('blur', () => {
            const errorMessage = '\u26A0 Please enter a valid first name <br> Must only contain: <br> - Letters A-Z, a-z';
            validateInput(firstNameInput, firstNameRegex, firstNameError, errorMessage);
        });

        lastNameInput.addEventListener('blur', () => {
            const errorMessage = '\u26A0 Please enter a valid last name <br> Must only contain: <br> - Letters A-Z, a-z';
            validateInput(lastNameInput, lastNameRegex, lastNameError, errorMessage);
        });

        phoneInput.addEventListener('blur', () => {
            const errorMessage = '\u26A0 Please enter a valid phone number <br> Must only contain: <br> - Numbers 0-9 <br> - At least 7 numbers long';
            validateInput(phoneInput, phoneRegex, phoneError, errorMessage);
        });

        emailInput.addEventListener('blur', () => {
            const errorMessage = '\u26A0 Please enter a valid email address';
            validateInput(emailInput, emailRegex, emailError, errorMessage);
        });
    }
});

// Contact Form confirmation
$('#contact-form').submit(function(event) {
    event.preventDefault();

    // Popup information
    const sendButton = document.getElementById('send');
    const popupOverlay = document.getElementById('form-popup-overlay');
    const popupContent = document.getElementById('form-popup-content');
    const closePopupButton = document.getElementById('close-form-popup');
    const submitPopupButton = document.getElementById('submit-form-popup');
    const popupTitle = document.getElementById('form-popup-title');
    const popupText = document.getElementById('form-popup-text');

    // Get the values of form fields
    var firstName = $('#first-name').val();
    var lastName = $('#last-name').val();
    var phone = $('#phone').val();
    var email = $('#email').val();
    var artwork = $('#artwork option:selected').text();
    var message = $('#message').val(); 

    // Construct the confirmation message
    var confirmationMessage = "<table>";
        confirmationMessage += "<tr><td style='min-width: 100px;'><strong>First Name:</strong></td><td>" + firstName + "</td></tr>";
        confirmationMessage += "<tr><td><strong>Last Name:</strong></td><td>" + lastName + "</td></tr>";
        confirmationMessage += "<tr><td><strong>Phone:</strong></td><td>" + phone + "</td></tr>";
        confirmationMessage += "<tr><td><strong>Email:</strong></td><td>" + email + "</td></tr>";
        confirmationMessage += "<tr><td><strong>Artwork:</strong></td><td>" + artwork + "</td></tr>";
        confirmationMessage += "<tr><td style='vertical-align: top;'><strong>Message:</strong></td><td>" + message + "</td></tr>";
        confirmationMessage += "</table>";

    // Set up the click event listener for the send button
    sendButton.addEventListener('click', function (event) {
        event.preventDefault();
        popupTitle.innerHTML = "Does everything look correct?";
        popupText.innerHTML = confirmationMessage;
        popupOverlay.style.display = 'block';
        popupContent.style.display = 'block';
    });

    // Set up the close button event listener
    closePopupButton.addEventListener('click', function () {
        popupOverlay.style.display = 'none';
        popupContent.style.display = 'none';
    });

   // Set up the submit button event listener
    submitPopupButton.addEventListener('click', function () {
        // Clear the form fields
        $('#first-name').val('');
        $('#last-name').val('');
        $('#phone').val('');
        $('#email').val('');
        $('#artwork').val('');
        $('#message').val('');

        // Change the content of the message
        popupTitle.innerHTML = "Your request has been submitted!";
        popupText.innerHTML = "Thank you for submitting your request!<br/>We appreciate you taking the time to fill out the form. You should hear back from us soon.";

        // Remove submit button and display close button
        submitPopupButton.style.display = 'none';
        closePopupButton.innerHTML = "CLOSE";
    });
});

// Page Guide Animator
$(document).ready(function() {
    const guide = $('#page-guide');
    const rect = $('#rect');
    const popup = $('#popup');
    const stepTitle = $('#step-title');
    const stepText = $('#step-text');
    const nextBtn = $('#next-btn');
    let step = 1;

    // Function to display the guide
    function showGuide() {
        guide.css('display', 'block');
        showStep(step);
    }

    // Runs through the steps for the guide
    function showStep(step) {
        switch(step) {
            case 1:
                rect.attr({
                    'x': '-2.5vw',
                    'y': '0vh',
                    'height': '100vh',
                    'width': '10vw',
                    'rx': '2.5%'
                });
                popup.attr({
                    'top': '30vh',
                    'left': '10vw',
                })
                stepTitle.text('Step 1');
                stepText.text('Getting around the site is quite easy! You can use the arrows on the sides of the page, here...');
                nextBtn.text('NEXT')
                break;
            case 2:
                rect.animate({
                    'x': '92.5vw',
                }, 500);
                popup.animate({
                    'top': '30vh',
                    'left': '65vw',
                }, 500)
                stepTitle.text('Step 1');
                stepText.text('And here!');
                nextBtn.text('NEXT')
                break;
            case 3:
                rect.animate({
                    'x': '0vw',
                    'y': '87.5vh',
                    'width': '100vw',
                    'height': '100vh',
                    'rx': '2.5%'
                }, 500);
                popup.animate({
                    'top': '65vh',
                    'left': '40vw',
                }, 500)
                stepTitle.text('Step 2');
                stepText.text('Alternatively, you can use the nav bar along the bottom of the page');
                nextBtn.text('CLOSE')
                break;
        }

        // Add event listener to next button
        nextBtn.on('click', function() {
            step++;
            if (step <= 3) {
                showStep(step);
            } else {
                guide.css('display', 'none');
            }
        });
    }

    // Add event listener to navigation help link
    $('.nav-help').on('click', showGuide);
});

// Artwork Medium Popup Maker
$(document).ready(function() {
    const artworkMediumLinks = document.querySelectorAll('.artwork-medium');
    const popupOverlay = document.getElementById('medium-popup-overlay');
    const popupContent = document.getElementById('medium-popup-content');
    const closePopupButton = document.getElementById('close-medium-popup');
    const popupTitle = document.getElementById('medium-popup-title');
    const popupText = document.getElementById('medium-popup-text');

    // Pre-saved titles
    const titles = {
        'stippling': 'Stippling',
        'white-pencil': 'White Pencil on Black Paper',
        'photography': 'Photography',
        'acrylic-canvas': 'Acrylic on Canvas',
        'acrylic-paper': 'Acrylic on Paper'
    };

    // Pre-saved messages
    const messages = {
        'stippling': 'Detailed drawing technique using small dots or marks. Achieves shading, texture, and tonal effects. Precise control for intricate and realistic drawings. Common in pen and ink, illustrations, and tattoo art.',
        'white-pencil': 'Unique technique creating striking contrast. Adds highlights, details, and intricate designs with precision. Emphasizes light and shadow. Ideal for portraits, still life, and dramatic compositions.',
        'photography': 'Capturing moments through the lens. The art of preserving memories and telling stories through visual imagery. Explores various subjects, landscapes, people, and events. Harnesses light, composition, and perspective to create powerful and evocative photographs.',
        'acrylic-canvas': 'A versatile medium combining vibrant colors and durability. Ideal for textured artworks, blending techniques, and precise brushwork. Offers portability and stability for artists on the go.',
        'acrylic-paper': 'Versatile medium for artists. Quick-drying, vibrant colors, and various textures. Ideal for sketches, studies, and mixed media art.'
    };

    // Set up the click event listener for each artwork medium link
    artworkMediumLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const medium = link.getAttribute('data-medium');
            popupTitle.innerHTML = titles[medium];
            popupText.innerHTML = messages[medium];
            popupOverlay.style.display = 'block';
            popupContent.style.display = 'block';
        });
    });

    // Set up the close button event listener
    closePopupButton.addEventListener('click', function () {
        popupOverlay.style.display = 'none';
        popupContent.style.display = 'none';
    });
});