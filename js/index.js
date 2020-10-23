window.onload = function () {
  //banner轮播1
  var mySwiper1 = new Swiper("#swiper-container1", {
    direction: "horizontal", // 垂直切换选项
    autoplay: true,
    loop: true,
    // 如果需要分页器
    pagination: {
      el: ".swiper-pagination",
    },
  });
  mySwiper1.el.onmouseover = function () {
    mySwiper1.autoplay.stop();
  };
  mySwiper1.el.onmouseout = function () {
    mySwiper1.autoplay.start();
  };

  //banner轮播2
  var mySwiper2 = new Swiper("#swiper-container2", {
    direction: "horizontal", // 垂直切换选项
    autoplay: true,
    loop: true,
    slidesPerView: "4", //默认1, 同时显示的slides数量,auto 代表根据轮播图的宽度排列
    spaceBetween: 10, //轮播图之间的间距
    // 如果需要前进后退按钮
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  mySwiper2.el.onmouseover = function () {
    mySwiper2.autoplay.stop();
  };
  mySwiper2.el.onmouseout = function () {
    mySwiper2.autoplay.start();
  };

  //banner轮播3
  var mySwiper3 = new Swiper(".swiper3", {
    direction: "horizontal", // 垂直切换选项
    autoplay: true,
    loop: true,
    // 如果需要前进后退按钮
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  mySwiper3.el.onmouseover = function () {
    mySwiper3.autoplay.stop();
  };
  mySwiper3.el.onmouseout = function () {
    mySwiper3.autoplay.start();
  };
  //banner轮播4
  var mySwiper4 = new Swiper(".swiper4", {
    direction: "horizontal", // 垂直切换选项
    autoplay: true,
    loop: true,
    // 如果需要前进后退按钮
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  mySwiper4.el.onmouseover = function () {
    mySwiper4.autoplay.stop();
  };
  mySwiper4.el.onmouseout = function () {
    mySwiper4.autoplay.start();
  };
  //banner轮播5
  var mySwiper5 = new Swiper(".swiper5", {
    direction: "horizontal", // 垂直切换选项
    autoplay: true,
    loop: true,
    // 如果需要前进后退按钮
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  mySwiper5.el.onmouseover = function () {
    mySwiper5.autoplay.stop();
  };
  mySwiper5.el.onmouseout = function () {
    mySwiper5.autoplay.start();
  };
  //banner轮播6
  var mySwiper6 = new Swiper(".swiper6", {
    direction: "horizontal", // 垂直切换选项
    autoplay: true,
    loop: true,
    // 如果需要前进后退按钮
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  mySwiper6.el.onmouseover = function () {
    mySwiper6.autoplay.stop();
  };
  mySwiper6.el.onmouseout = function () {
    mySwiper6.autoplay.start();
  };
  // banner列表移入效果
  let list = document.querySelectorAll(".banner_list ul li");
  for (var i = 0; i < list.length; i++) {
    list[i].onmouseover = function () {
      this.className = "on";
    };
    list[i].onmouseout = function () {
      this.className = "";
    };
  }

  // 倒计时
  setInterval(function () {
    var nowTime = new Date(); //获取当前时间
    //创建目标日期
    var endTime = new Date("2021-9-1 00:00:00");
    var seconds = parseInt((endTime.getTime() - nowTime.getTime()) / 1000); //两个时间点的时间差(秒)
    var d = parseInt(seconds / 3600 / 24); //得到天数
    var h = parseInt((seconds / 3600) % 24); //小时
    var m = parseInt((seconds / 60) % 60); //分钟
    var s = parseInt(seconds % 60); //秒

    if (h < 10) {
      h = "0" + h;
    } else {
      h = h;
    }
    if (m < 10) {
      m = "0" + m;
    } else {
      m = m;
    }
    if (s < 10) {
      s = "0" + s;
    } else {
      s = s;
    }
    document.querySelector(".hour").innerText = h;
    document.querySelector(".minute").innerText = m;
    document.querySelector(".second").innerText = s;
  }, 1000);

  // 边栏显示
  let sl = document.querySelector(".slide_l");
  let sr = document.querySelector(".slide_r");
  window.onscroll = function () {
    let wh = document.documentElement.scrollTop;
    if (wh > 500) {
      sl.style = `display:block`;
      sr.style = `display:block`;
      mask_t.style = `display:block`;
      mask_t.appendChild(myform);
      myform.style = `
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      `;
    } else {
      sl.style = `display:none`;
      sr.style = `display:none`;
      mask_t.style = `display:none`;
      rbox.insertBefore(myform, car);
      myform.style = `
      position:relative;
      `;
    }
  };
  // 左边栏定位
  sl_arr = document.querySelectorAll(".slide_l li");
  sl_arr[sl_arr.length - 1].onclick = function () {
    //设置计时器
    let timeid = setInterval(function () {
      // 动态获取滚动高度
      let ttop = document.documentElement.scrollTop;
      // 自定义一个总的时间time
      let time = 400;
      // 用获取到的高度  除以  定义的时间得到当前的速度
      let speed = ttop / time;
      //当前的高度为  =获取到的高度-（当前速度*定时器的时间）——以
      // 此进行循环，且speed会随着ttop的高度的减少而变慢-则减少的高度也慢慢变小
      document.documentElement.scrollTop = ttop - speed * 10;
      // 当高度小于等于0时，清除定时器
      if (ttop <= 0) clearInterval(timeid);
    }, 10);
  };
  // tab选项卡切换
  let tab = document.querySelectorAll(".cloth_title ul li");
  let c_tab = document.querySelectorAll("#cloth .cloth_tab");
  for (let i = 0; i < tab.length; i++) {
    tab[i].onclick = function () {
      for (let j = 0; j < c_tab.length; j++) {
        c_tab[j].style = `display:none`;
      }
      for (let x = 0; x < tab.length; x++) {
        tab[x].className = "";
      }
      this.className = "cloth_a";
      if (i == 1) {
        c_tab[0].style = `display:block`;
      } else if (i == 2) {
        c_tab[1].style = `display:block`;
      }
    };
  }

  let tab2 = document.querySelectorAll(".baby_title ul li");
  let c_tab2 = document.querySelectorAll("#baby .cloth_tab");
  for (let i = 0; i < tab2.length; i++) {
    tab2[i].onclick = function () {
      for (let j = 0; j < c_tab2.length; j++) {
        c_tab2[j].style = `display:none`;
      }
      for (let x = 0; x < tab.length; x++) {
        tab2[x].className = "";
      }
      this.className = "baby_a";
      if (i == 1) {
        c_tab2[0].style = `display:block`;
      } else if (i == 2) {
        c_tab2[1].style = `display:block`;
      }
    };
  }

  let tab3 = document.querySelectorAll(".life_title ul li");
  let c_tab3 = document.querySelectorAll("#life .cloth_tab");
  for (let i = 0; i < tab3.length; i++) {
    tab3[i].onclick = function () {
      for (let j = 0; j < c_tab3.length; j++) {
        c_tab3[j].style = `display:none`;
      }
      for (let x = 0; x < tab.length; x++) {
        tab3[x].className = "";
      }
      this.className = "life_a";
      if (i == 1) {
        c_tab3[0].style = `display:block`;
      } else if (i == 2) {
        c_tab3[1].style = `display:block`;
      }
    };
  }

  let tab4 = document.querySelectorAll(".live_title ul li");
  let c_tab4 = document.querySelectorAll("#live .cloth_tab");
  for (let i = 0; i < tab4.length; i++) {
    tab4[i].onclick = function () {
      for (let j = 0; j < c_tab4.length; j++) {
        c_tab4[j].style = `display:none`;
      }
      for (let x = 0; x < tab.length; x++) {
        tab4[x].className = "";
      }
      this.className = "live_a";
      if (i == 1) {
        c_tab4[0].style = `display:block`;
      } else if (i == 2) {
        c_tab4[1].style = `display:block`;
      }
    };
  }

  let bkcolor = ["#00b262", "#feb80f", "#ff72fd", "#006fff", "#f60"];
  let li_list = document.querySelectorAll(".slide_l li");
  let floor = document.querySelectorAll(".floor");
  for (let k = 0; k < li_list.length - 1; k++) {
    li_list[k].onmouseover = function () {
      this.firstElementChild.style = `display:block;background-color:${bkcolor[k]}`;
      this.style = `background-color:${bkcolor[k]}`;
    };
    li_list[k].onmouseout = function () {
      this.firstElementChild.style = `display:none`;
      this.style = `background-color:`;
    };
    li_list[k].onclick = function () {
      let floor_h = floor[k].offsetTop;
      let domh = document.documentElement.scrollTop;
      let time_f = setInterval(() => {
        if (domh > floor_h) {
          if (domh <= floor_h - 200) {
            clearInterval(time_f);
          }
          domh -= 50;
          document.documentElement.scrollTop = domh;
        }
        if (domh < floor_h) {
          if (domh + 200 >= floor_h) {
            clearInterval(time_f);
          }
          domh += 50;
          document.documentElement.scrollTop = domh;
        }
      }, 20);
      document.documentElement.scrollTop = floor[k].offsetTop;
    };
  }
};
