window.onload = function () {
  let qr = document.querySelector(".qr");
  let login = document.querySelector(".login");
  let img1 = document.querySelector(".box").firstElementChild;
  let img2 = document.querySelector(".qr").firstElementChild;
  let title = document.querySelectorAll(".f_title li");
  console.log(title,no_pwd,accound);
  for (let i = 0; i < title.length; i++) {
    title[i].onclick = function () {
      for (let j = 0; j < title.length; j++) {
        title[j].classList.remove("active");
      }
      this.classList.add("active");
      if(i==0){
        accound.style=`display:block`;
        no_pwd.style=`display:none`;
      }if(i==1){
        accound.style=`display:none`;
        no_pwd.style=`display:block`;
      }
    };
  }
  img1.onclick = function () {
    login.style = `display:none`;
    qr.style = `display:block`;
  };
  img2.onclick = function () {
    qr.style = `display:none`;
    login.style = `display:block`;
  };
};
