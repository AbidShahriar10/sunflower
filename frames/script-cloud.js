// element selectors
const background = document.querySelector(".background");
const cloud = document.querySelector(".cloud");

// making a new rain drop div
const makeItRain = () => {
  const tear = document.createElement("div");
  tear.classList.add("cloudTear");

  // when each tear hits the ground it is removed from the DOM
  tear.addEventListener("animationend", (item) => {
    const thisTearDrop = item.path[0];
    background.removeChild(thisTearDrop);
  });

  // getting a dynamic position for each tear which is always inside the cloud
  const cloudLeft = cloud.getBoundingClientRect().left;
  const cloudRight = cloud.getBoundingClientRect().width + cloudLeft - 20;
  const tearPosRandom =
    Math.floor(Math.random() * (cloudRight - cloudLeft + 1)) + cloudLeft + "px";
  const tearPosVert =
    cloud.getBoundingClientRect().bottom -
    cloud.getBoundingClientRect().height +
    "px";

  // assign the dynamic position values
  tear.style.left = tearPosRandom;
  tear.style.bottom = tearPosVert;

  // appead the tear div to the background so it can fall to the ground
  background.append(tear);
};

// make it rain every 0.1 seconds
setInterval(makeItRain, 100);
