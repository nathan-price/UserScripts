// ==UserScript==
// @name         NoFriends
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  redirect netflix shows to something better
// @author       You
// @match        *://*.netflix.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function inRanges(ranges, num) {
        for (let range of ranges) if (range[0]<=num && num<=range[1]) return true;
        return false;
    }
    function pickRange(range) {
        return Math.floor(Math.random() * (range[1] - range[0] + 1) ) + range[0];
    }
    function check() {
        let url = window.location.href;
        let regex = /watch\/([0-9]*)/i;
        let friends = [[70273997, 70274231]];
        let office = [[70069628, 70069654], [70080624, 70080646], [70105212, 70105212], [70108687, 70108700], [70126223, 70126250], [70151933, 70151958], [70189006, 70189031], [70210965, 70210988], [70286845, 70286867]];
        let tng = [70177889, 70178039];
        let match = url.match(regex);
        if (!match) return;
        let id = match[1];
        if (inRanges(friends, id) || inRanges(office, id) || id == 0) window.location.href = "https://www.netflix.com/watch/"+pickRange(tng);
    }
    setInterval(check, 1000);
})();
