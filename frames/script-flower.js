var n = document.getElementById("button");

n.onclick = function () {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
  n.remove();
};
