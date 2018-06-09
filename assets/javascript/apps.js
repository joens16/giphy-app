$(document).ready(function () { 

    var topics = ["Superman", "Batman", "Spiderman", "Iron Man", "black panther", "hulk", "wonder woman", "thor", "wolverine", "flash", "capitan america", "deadpool", "supergirl", "joker", "black widow", "cat women", "cyclops"];

    function displayHeroInfo() {
        var hero = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=x8n3AbY9IckIBiR5znC2purqDTWRctbd&limit=10";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#gifContainer").empty();
            var results = response.data;
            
            for (let i = 0; i < results.length; i++) {
            
                var heroImg = $("<img>");
                heroImg.addClass("heroImg");
                heroImg.attr("src", results[i].images.fixed_height_small_still.url);
                heroImg.attr("data-still", results[i].images.fixed_height_small_still.url);
                heroImg.attr("data-animate", results[i].images.fixed_height_small.url);
                heroImg.attr("data-state", "still");

                var showRating =$("<p>");
                showRating.text(results[i].rating);

                var newDiv = $("<div>");
                newDiv.addClass("divsInline");

                newDiv.append(heroImg, showRating);

                $("#gifContainer").append(newDiv);
            }
        });
    }

    $("#add-hero").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var superH = $("#hero-input").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(superH);
        // Calling renderButtons which handles the processing of our hero array
        generateButtons();
    });

    // Function for displaying hero data
    function generateButtons() {
        // Deletes the hero prior to adding new heroes
        // (this is necessary otherwise you will have repeat buttons)
        $("#heroButtons").empty();
        // Loops through the array of heroes
        for (var i = 0; i < topics.length; i++) {
            // Then dynamicaly generates buttons for each hero in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of hero to our button
            a.addClass("hero");
            // Added a data-attribute
            a.attr("data-name", topics[i]);
            // Provided the initial button text
            a.text(topics[i]);
            // Added the button to the buttons-view div
            $("#heroButtons").append(a);
        }
    }

    function gifStill() {

        var state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    }

    // Adding click event listeners to all elements with a class of "hero"
    generateButtons();
    $(document).on("click", ".hero", displayHeroInfo);
    $(document).on("click", ".heroImg", gifStill);
    
    // Calling the renderButtons function to display the intial buttons
})















