var topics = []

function renderButtons() {

// Deleting the movies prior to adding new movies
// (this is necessary otherwise you will have repeat buttons)
$("#buttons").empty();

// Looping through the array of movies
for (var i = 0; i < topics.length; i++) {

  // Then dynamicaly generating buttons for each movie in the array
  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
  var a = $("<button>");
  // Adding a class of movie-btn to our button
  a.addClass("thing-button");
  // Adding a data-attribute
  a.attr("data-thing", topics[i]);
  // Providing the initial button text
  a.text(topics[i]);
  // Adding the button to the buttons-view div
  $("#buttons").append(a);
}
}

// This function handles events where a movie button is clicked
$("#add-topic").on("click", function(event) {
event.preventDefault();
console.log("click")
// This line grabs the input from the textbox
var topic = $("#topic-input").val().trim();
$("#topic-input").val("");
// Adding movie from the textbox to our array
topics.push(topic);

// Calling renderButtons which handles the processing of our movie array
renderButtons();
});
    
    
    

    // Adding click event listen listener to all buttons
    $(document.body).on("click", ".thing-button", function() {
      // Grabbing and storing the data-animal property value from the button
      var thing = $(this).attr("data-thing");
      console.log(thing)

      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        thing + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < 10; i++) {

            // Creating and storing a div tag
            var newDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var newP = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var newImage = $("<img state='still' class='clickable' animated-url='" + results[i].images.fixed_height.url + "' still-url='" +results[i].images.fixed_height_still.url +"'>");
            // Setting the src attribute of the image to a property pulled off the result item
            newImage.attr("src", results[i].images.fixed_height_still.url);

            // Appending the paragraph and image tag to the animalDiv
            newDiv.append(newP);
            newDiv.append(newImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gif-location").prepend(newDiv);
          }
        });
    });

     
    $(document.body).on("click", ".clickable", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
          console.log("click")
        $(this).attr("src", $(this).attr("animated-url"));
        $(this).attr("state", "animate");
      } else {
        $(this).attr("src", $(this).attr("still-url"));
        $(this).attr("state", "still");
      }
    });