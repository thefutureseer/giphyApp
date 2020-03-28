    var topics = [ "animals", "movies", "gym", "jokes", "scenery", "technology" ];

  //Render all the buttons on the list. (including the new button submited).
    function renderButton() {
      $("#topic-buttons").empty();

      for (var i = 0; i < topics.length; i++) {
        
        var a = $("<button>");
        a.addClass("gif-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#topic-buttons").append(a);
      }
    }

    function gifFun() {
  //Click a button to display name, rating and gifs, of the button label word/name
      $(".gif-btn").on("click", function() { 
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topic + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          var gifInf = response.data;

          for (var i = 0; i < gifInf.length; i++) {
            var gifDiv = $("<div>");
            var PRating = $("<p>").text(gifInf[i].rating);
            var PName = $("<p>").text(gifInf[i].title);

            var gif = $("<img>");
            gif.addClass("ply-gif-2");
            gif.attr("src", gifInf[i].images.fixed_height_still.url);
            gif.attr("data-still", gifInf[i].images.fixed_height_still.url);
            gif.attr("data-animate", gifInf[i].images.fixed_height.url);
            gif.attr("data-state", "still");
            
            gifDiv.prepend(PRating, PName);
            gifDiv.prepend(gif);

            $("#show-gif").prepend(gifDiv);
          }

    //Click a gif to play it or pause it
        $(".ply-gif-2").on("click", function() {
          var state = $(this).attr("data-state");
          
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
      });
    });
   };

 //Use the vulue from the input box to send to the list of topics and rerender the buttons 
    $("#btn-2").on("click", function(event) { 
      event.preventDefault();

      var inputTopic = $("#input-1").val().trim();
      
      console.log(inputTopic);
      topics.push(inputTopic);

      renderButton();
    });

 //Add event listeners
    $(document).on("click", ".gif-btn", gifFun);
    renderButton();