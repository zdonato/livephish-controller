// ==UserScript==
// @name         Live Phish Controller
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
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
        switch (e.data) {
            case '"play-pause"':
                playPause();
                break;
            case '"next-song"':
                nextSong();
                break;
            case '"previous-song"':
                previousSong();
                break;
            default:
                break;
        }
    }
})();