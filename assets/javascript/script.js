var topics = [
    "Climate Change",
    "ALF",
    "Star Trek",
    "Country Music",
    "Books",
    "Buffalo Wings",
    "Adventure Time",
]

// var $buttonModel = ("<button class='btn' data-topic='" + searchString + "' id='" + id + "'></button>");

function buttonModel(arrItem) { // HTML MARKUP FOR BUTTON DOM ELEMENTS
    return "<button class='btn' data-search='" + arrItem + "'>" + arrItem + "</button>"
}

// CONSTRUCT THE BUTTONS FROM TOPICS ARRAY
for (let i = 0; i < topics.length; i++) {
    $("#button-area").append(buttonModel(topics[i]))
}

function addAnimateListener() {
    $(document).on("click", ".gif", function() {
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
}

$(".btn").on("click", function() {
    var searchTerm = $(this).attr("data-search");
    console.log(searchTerm);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=eG2Lv5jBWCBc6paULljFPRmKiTrwDLzI&limit=10";
    // var queryURL = "https://api.giphy.com/v1/gifs/search?q=ALF&limit=10&api_key=&eG2Lv5jBWCBc6paULljFPRmKiTrwDLzI";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        var results = response.data;
        console.log(results);
        
        for (let i = 0; i < results.length; i++) { // LOOP TO OUTPUT 10 GIFS
            var still = results[i].images.original_still.url;
            var animated = results[i].images.downsized.url;
            var img = "<img src='"+ results[i].images.original_still.url +"' data-still="+ still + " data-animated="+ animated +" data-state='still' class='gif'/>";
            $(".main-body").append(img);            
        }
    })
    addAnimateListener();
});





