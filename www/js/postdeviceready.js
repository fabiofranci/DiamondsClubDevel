    function playAudio(encodedUrl) {
        url=Base64.decode(encodedUrl);
        console.log(my_media);
        if (my_media) {
            my_media.pause();
        }
        if (encodedUrl!=audioAttuale) {
            my_media = new Media(url,
                // success callback
                function () { console.log("playAudio():Audio Success"); },
                // error callback
                function (err) { console.log("playAudio():Audio Error: " + err); }
            );
            my_media.play();
            audioAttuale=encodedUrl;
        }
    }

