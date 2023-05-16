// ==UserScript==
// @name        Rule34Hentai QoL
// @namespace   r34h-qol
// @description Various quality of life improvements for Rule34Hentai
// @match       https://*.rule34hentai.net/*
// @version     1.2
// @grant none
// ==/UserScript==

/**
 * Resizes the video to fit the display size
 * @param $video The video to resize
 */
function resize($video) {
    let newWidth = $video.parent().width();
    $video.width(newWidth).height(null);
}

/**
* The function that loads on the post view
* It assigns jQuery, and for each video - autoplays, loops, shows controls,
* and binds a resize function to the window resize.
*/

function postView() {
    let $ = window.jQuery;
    let $videos = $("video");
    $videos.each(function (index, element) {
        element.autoplay = true;
        element.loop = true;
        element.controls = true;
        element.play();
    });
    $(window).resize(() => resize($videos));
    resize($videos);
}

function listView() {
    let $ = window.jQuery;

    // Create the play button SVG
    const $playButton = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="play-button"><polygon points="5 3 19 12 5 21"></polygon></svg>');

    // Set the CSS properties for the play button
    $playButton.css({
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%)',
        'width': '48px',
        'height': '48px',
        'opacity': '0.7',
        'z-index': '9999',
        'cursor': 'pointer'
    });
    let $images = $("img");
    $images.each(function (_, image) {
        let $image = $(image);
        let $parent = $image.parent();
        let imgType = image.alt.split("//").at(-1).trim();
        if (["mp4", "webm"].includes(imgType) && $parent.hasClass("thumb")) {

            // Append the play button SVG to the image element
            $parent.css('position', 'relative').append($playButton.clone());
        }
    })
}

//Post View
if (window.location.href.startsWith("https://rule34hentai.net/post/view")) {
    window.addEventListener("load", postView);
    window.addEventListener("focus", postView);
}

//List View
if (window.location.href.startsWith("https://rule34hentai.net/post/list")) {
    window.addEventListener("load", listView);
}
