let foot_bar = document.querySelectorAll("footer span");
for (let i = 0; i < foot_bar.length; i++) {
  foot_bar[i].onclick = function () {
    if (i == 0) {
      location.href = "../index.html";
    }
    if (i == 1) {
      location.href = "../classify.html";
    }
    if (i == 2) {
      location.href = "../乐购商城App/shopCar.html";
    }
    if (i == 3) {
      location.href = "../乐购商城App/me.html";
    }
  };
}
