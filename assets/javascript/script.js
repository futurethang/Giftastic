var topics = [
    "Goonies",
    "ALF",
    "Star Trek",
    "Return of the Jedi",
    "Ren & Stimpy",
    "Labyrinth",
]

function buttonModel(arrItem) { // HTML MARKUP FOR BUTTON DOM ELEMENTS
    return "<button class='btn' data-search='" + arrItem + "'>" + arrItem + "</button>"
}

$("#submit_button").on("click", function (e) {
    e.preventDefault()
    var newTopic = $("#newTopic").val();
    console.log(newTopic);
    getNewTopic(newTopic);
    $("#newTopic").val('');
});

function getNewTopic(e) {
    $("#button-area").append(buttonModel(e));
}

var autoSize = function (img) {
    console.log("autoSize working")
    if (img.height > img.width) {
        img.height = '100%';
        img.width = 'auto';
    }
};

// CONSTRUCT THE BUTTONS FROM TOPICS ARRAY
for (let i = 0; i < topics.length; i++) {
    $("#button-area").append(buttonModel(topics[i]))
}


// ------- EVENT LISTENERS FOR THE GIFS AND BUTTONS THAT ARE GENERATED DYNAMICALLY --------

// DOCUMENT LISTENER FOR THE GIFS TO START AND PAUSE
$(document).on("click", ".gif", function () {
    console.log("triggered");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animated"));
        $(this).attr("data-state", "animated");
    } else if (state === "animated") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

// DOCUMENT LISTENER FOR THE BUTTONS TO CALL AJAX AND WRITE 10 GIFS
$(document).on("click", ".btn", function () {
    var searchTerm = $(this).attr("data-search");
    console.log(searchTerm);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=eG2Lv5jBWCBc6paULljFPRmKiTrwDLzI&limit=10";
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=ALF&limit=10&api_key=&eG2Lv5jBWCBc6paULljFPRmKiTrwDLzI";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var results = response.data;
        console.log(results);

        for (let i = 0; i < results.length; i++) { // LOOP TO OUTPUT 10 GIFS
            var still = results[i].images.original_still.url;
            var animated = results[i].images.downsized.url;
            var rating = results[i].rating;
            var img = "<img src='" + results[i].images.original_still.url + "' data-still=" + still + " data-animated=" + animated + " data-state='still' class='gif'/>";
            var ratingText = "Rated: <span class='rating'>" + rating + "</span>";
            var overlayDiv =   "<div class='overlay'><div class='text'>"+ ratingText +"</div></div>";
            var imgDiv = $("<div class='imgDiv'>");
            imgDiv.append(img)
            imgDiv.append(overlayDiv)
            $(".main-body").prepend(imgDiv);
        }
    })
});




