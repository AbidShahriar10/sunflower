// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var amplitudeHorizontal = 60;
var amplitudeVertical = 30;
var bulgeHorizontal = 1;
var bulgeVertical = 5;
var firefliesCount = 207;
var firefliesHeight = 450;
var firefliesOffset = 0;
var swarmWave = 200;

$(document).ready(function () {
  $("#fireflies div").each(function (index) {
    var left = $(this).position().left;
    var top = $(this).position().top;
    $(this).data("goalLeft", left);
    $(this).data("goalTop", top);
  });

  // Start animation loop
  animate();

  // Show fireflies
  //$('#fireflies div').css('visibility', 'visible');

  // Set the browser height
  //$(window).resize(resizeBrowser);
  //resizeBrowser();
});

function animate() {
  requestAnimFrame(animate);
  animateFireflies($(window).scrollTop());
}

// Animate the fireflies
function animateFireflies(scrollPosition) {
  var total = Math.max($(document).height() - $(window).height(), 1);
  var distanceToGoal = Math.max(total - scrollPosition, 0);
  //console.log(distanceToGoal);
  if (distanceToGoal < 0) {
    $("#fireflies").css("position", "absolute");
    $("#fireflies").css("top", total);
  } else {
    $("#fireflies").css("position", "fixed");
    $("#fireflies").css("top", 0);
  }

  $("#fireflies div").each(function (index) {
    // Get goal positions of the firefly
    var goalLeft = $(this).data("goalLeft");
    var goalTop = $(this).data("goalTop") + firefliesOffset;

    if (distanceToGoal > 0) {
      // Move firefly from goal position to create swarm
      // Coefficients are set based on modulo with coprime numbers to create sense of randomness
      var horizontalPeriod = 1 + (index % 11);
      var verticalPeriod = 1 + (index % 13);
      var horizontalDirection = index % 2 == 0 ? 1 : -1;
      var verticalDirection = index % 3 == 0 ? 1 : -1;
      var angle = distanceToGoal / total;
      var angle = angle * angle;
      var left =
        goalLeft +
        Math.sin(horizontalPeriod * angle) *
          amplitudeHorizontal *
          horizontalDirection;
      var top =
        goalTop +
        Math.sin(verticalPeriod * angle) *
          amplitudeVertical *
          verticalDirection;

      // Move firefly to make the swarm bulge
      // Coefficients are set based on modulo again
      var middleDistance = 1 - Math.abs(480 - left) / 480;
      var bulgePeriod = 1 + (index % 5);
      left =
        480 -
        Math.cos(distanceToGoal / total) *
          Math.cos(distanceToGoal / total) *
          bulgeHorizontal *
          (480 - left);
      top -=
        Math.sin((Math.PI / 2.0) * middleDistance) *
        bulgeVertical *
        verticalDirection *
        (top - goalTop);

      // Move the whole swarm in a wave
      left -= Math.sin((Math.PI * 2.0 * distanceToGoal) / total) * swarmWave;
      $(this).css("left", left);
      $(this).css("top", top);

      // Fade firefly to make the swarm grow and twinkle
      var startFade = ((index % 23) - 1) * (total / 23);
      var endFade = startFade + total / 23;
      var alpha = Math.min(
        (scrollPosition - startFade) / (endFade - startFade),
        1.0
      );
      alpha *= Math.abs(
        Math.cos(((index % 31) * distanceToGoal) / total) + 0.3
      );
      $(this).css({ opacity: alpha });
    } else {
      $(this).css("left", goalLeft);
      $(this).css("top", goalTop);
      $(this).css({ opacity: 1 });
    }
  });
}

function resizeBrowser() {
  // Center fireflies vertically
  firefliesOffset =
    ($(window).height() - firefliesHeight - $(window).height() / 2) / 2;

  // Crop content
  var contentHeight =
    6900 +
    Math.max($(window).height() - firefliesHeight, 0) -
    Math.max($(window).height() - firefliesHeight - 270, 0) / 3;
  $("#content").css("height", contentHeight);
  $("#text").css("height", contentHeight - 6800);
}
