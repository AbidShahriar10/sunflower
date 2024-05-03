/*
Poem by Shreya
*/

var lines = [
  "<span id='title'>> CLICK <</span><br/>",
  "A drop of a thought of you <span id='brightens'>brightens</span> my day.",
  "Reminiscing the <span id='time'>time</span> spent with you <br/> <span id='cheers'>cheers</span> me up even when you’re <span id='far'>far</span> away.",
  "It’s true that times are <span id='difficult'>difficult</span> and stakes are<br/> <span id='high'>high</span>.","but it's doesn't matter cause i <span id='animated'>love</span> you truly.",
];

var backgroundColors = [];
var i = 0;

function ready() {
  i = 0;
  var text = document.querySelector(".text");
  var top = document.querySelector("#top");
  var bottom = document.querySelector("#bottom");
  console.log("start");
  text.innerHTML = lines[i];
  window.addEventListener(
    "click",
    function () {
      i = (i + 1) % 5;
      console.log(i);
      if (i % 2 == 0) {
        top.style.width = "10%";
        bottom.style.width = "10%";
        console.log("even");
      } else {
        top.style.width = "90%";
        bottom.style.width = "90%";
        console.log("odd");
      }
      //thanks CSS Tricks!!
      text.preventDefault;
      text.classList.remove("fade-in");
      void text.offsetWidth;
      text.classList.add("fade-in");
      text.innerHTML = lines[i];
    },
    false
  );
}
document.addEventListener("DOMContentLoaded", ready);
