document.addEventListener("mousemove", function (e) {
  let heart = document.createElement("span");
  let x = e.pageX;
  let y = e.pageY;
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  let size = Math.random() * 100;
  heart.style.fontSize = size - 10 + "px";

  let transformValue = Math.random() * 360;
  heart.style.transform = `rotate(${transformValue}deg)`;

  document.body.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, 3000);
});
