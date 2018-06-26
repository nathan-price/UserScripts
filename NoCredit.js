// ==UserScript==
// @name         NoCredit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  automatically skip the credits
// @author       You
// @match        *://*.netflix.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var time_pressed = null, refresh_interval = 800, guard_interval = 10000;
    var skips = [{div:'div.skip-credits', except:'skip-credits-hidden', button:'a.nf-icon-button.nf-flat-button.no-icon', log:'Skipped Intro'}, {div:'div.WatchNext-still-hover-container', except:false, button:'div.WatchNext-still-hover-container', log:'Skipped Credits'}];

    setInterval(function () {
        for (let skip of skips) {
            let element = document.querySelector(skip.div);
            if (element && (!skip.except || !element.classList.contains(skip.except))) {
                console.log(skip.log);
                var time_delta = new Date() - time_pressed;
                if (time_pressed === null || time_delta > guard_interval) {
                    document.querySelector(skip.button).click();
                    time_pressed = new Date();
                }
            }
        }
    }, refresh_interval);
})();
