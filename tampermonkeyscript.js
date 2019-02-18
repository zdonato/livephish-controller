// ==UserScript==
// @name         Live Phish Controller
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Zachary Donato
// @match        http://plus.livephish.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    function playPause() {
        document.querySelector('.play-toggle').click();
    }

    function nextSong() {
        document.querySelector('.next-track').click()
    }

    function previousSong() {
        document.querySelector('.prev-track').click()
    }
    var evtSrc = new EventSource("http://localhost:9000/livephish-controller");

    evtSrc.onmessage = function (e) {
        let data = JSON.parse(e.data);

        switch (data.control) {
            case "play-pause":
                playPause();
                break;
            case "next-song":
                nextSong();
                break;
            case "previous-song":
                previousSong();
                break;
            default:
                break;
        }
    }

        let currentSong = document.querySelector('.track-title').textContent;
        fetch('/current-song', {
            method: 'POST',
            body: JSON.stringify({song: currentSong}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then( res => res.json())
            .then( response => console.log("Success"))
            .catch( error => console.error(error));

})();