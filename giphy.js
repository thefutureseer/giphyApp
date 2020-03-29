
$(document).ready(function() {
  var topics = [ "animals", "movies", "gym", "jokes", "scenery", "technology" ];
  
  //Render all the buttons on the list. (including the new button submited).
  function renderButton(arrayToUse, classToUse, areaToPlace) {
    $(areaToPlace).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToUse);
      a.attr("data-name", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToPlace).append(a);
    }
  }
  //Click a button to display name, rating and gifs, of the button label word/name
  function gifFun() {
    $(document).on("click", ".gif-btn", function() { 
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
          var PRating = $("<p>").text("Rating of GIF: " + gifInf[i].rating);
          var PName = $("<p>").text("Gif entitled: " + gifInf[i].title);

          var gif = $("<img>");
          gif.addClass("ply-gif-2");
          gif.attr("src", gifInf[i].images.fixed_height_still.url);
          gif.attr("data-still", gifInf[i].images.fixed_height_still.url);
          gif.attr("data-animate", gifInf[i].images.fixed_height.url);
          gif.attr("data-state", "still");
          
          gifDiv.prepend(PRating, PName);
          gifDiv.prepend(gif);

          $("#hide-1").css("display","block");

          $("#show-gif").prepend(gifDiv);
        }

      });
    });
  };

//Click a gif to play it or pause it
  $(document).on("click", ".ply-gif-2", function() {
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
      
  //Use the vulue from the input box to send to the list of topics and rerender the buttons 
  $("#btn-2").on("click", function(event) { 
    event.preventDefault();

    var inputTopic = $("#input-1").val().trim();
    function isEmpty(val){
      if(val) {         
        topics.push(inputTopic);
      renderButton(topics, "gif-btn", "#topic-buttons");
      } else {
        alert("Please enter a topic you love.")
        console.log("error");
      }
      return (val === undefined || val == null || val.length <= 0) ? true : false;

    }
  isEmpty()
  });
  
  //Add event listeners
    $(document).on("click", ".gif-btn", gifFun);
    renderButton(topics, "gif-btn", "#topic-buttons");
  });