window.onload = function () {
  let list = document.querySelectorAll("ul li");
  let area = document.querySelector(".box");
  peo1.onclick = function () {
    this.style = `background:pink;`;
    peo2.style = `background: #1e6fff;`;
    btn.onclick = function () {
      let tDOM = document.createElement("p");
      tDOM.style = `height:60px;`;
      let tDOM3 = document.createElement("span");
      tDOM3.innerText = "客服";
      tDOM3.style = `float:left`;
      let tDOM2 = document.createElement("div");
      tDOM2.className = "txtl";
      tDOM2.innerText = txt1.value;
      area.appendChild(tDOM);
      tDOM.appendChild(tDOM3);
      tDOM.appendChild(tDOM2);
    };
  };
  peo2.onclick = function () {
    this.style = `background:pink;`;
    peo1.style = `background: #1e6fff;`;
    btn.onclick = function () {
      let tDOM = document.createElement("p");
      tDOM.style = `height:60px;`;
      let tDOM3 = document.createElement("span");
      tDOM3.innerText = "用户";
      tDOM3.style = `float:right`;
      let tDOM2 = document.createElement("div");
      tDOM2.className = "txtr";
      tDOM2.innerText = txt1.value;
      area.appendChild(tDOM);
      tDOM.appendChild(tDOM3);
      tDOM.appendChild(tDOM2);
    };
  };
};
