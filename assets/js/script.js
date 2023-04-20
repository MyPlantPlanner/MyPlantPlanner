// This js file is linked to the index.html
// Declarations  
var player;
// This code loads the IFrame Player API code asynchronously. This is the Youtube-recommended script loading method
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//  This function is called by YouTube once the the API is ready.It creates an &lt;iframe&gt; and sets up the video player inside.
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "400",
        width: "50%",
        videoId: "U3uB6ov76N0",
        events: {
            // API event handlers
            onReady: onPlayerReady
        }
    });
}

// The API will call this function when the video player is ready (in this case, start playing the video).
function onPlayerReady(event) {
    event.target.playVideo();
}

document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {
              const target = el.dataset.target;
              const $target = document.getElementById(target);
              el.classList.toggle('is-active');
              $target.classList.toggle('is-active');
          });
      });
  }
});