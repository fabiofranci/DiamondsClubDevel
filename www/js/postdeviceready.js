function playAudio(encodedUrl) {
    url=Base64.decode(encodedUrl);
    alert("playAudio on "+url);
    var my_media = new Media(url,
        // success callback
        function () { console.log("playAudio():Audio Success"); },
        // error callback
        function (err) { console.log("playAudio():Audio Error: " + err); }
    );
    // Play audio
    my_media.play();
}


