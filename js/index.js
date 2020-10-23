window.onload = function () {
  let mySwiper = new Swiper("#myswiper1", {
    direction: "horizontal", // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true,
    // 如果需要分页器
    pagination: {
      el: ".swiper-pagination",
    },
  });
  let mySwiper2 = new Swiper("#myswiper2", {
    direction: "horizontal", // 垂直切换选项
    loop: false, // 循环模式选项
    pagination: {
      el: ".swiper-pagination",
    },
  });
  let mySwiper3 = new Swiper("#myswiper3", {
    direction: "vertical", // 垂直切换选项
    loop: true,
    autoplay:true, // 循环模式选项
    pagination: {
      el: ".swiper-pagination",
    },
  });
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

  //   daily-shopping部分
  let arr_img = [
    "./images/daily-shopping-img01.png",
    "./images/daily-shopping-img02.png",
    "./images/daily-shopping-img03.png",
    "./images/daily-shopping-img04.png",
    "./images/daily-shopping-img05.png",
    "./images/daily-shopping-img06.png",
    "./images/daily-shopping-img07.png",
    "./images/daily-shopping-img08.png",
  ];
  let arr_txt1 = [
    "免息星球",
    "每日特价",
    "品牌闪购",
    "乐购直播",
    "排行榜",
    "拍拍好物",
    "新品首发",
    "发现好货",
  ];
  let arr_txt2 = [
    "白条免息购",
    "9块9疯抢",
    "汇大牌好价",
    "好货即可买",
    "热销推荐",
    "二手优品",
    "新品大赏",
    "发现品质生活",
  ];
  let daily = document.querySelectorAll(".daily_box img");
  let txt1 = document.querySelectorAll(".daily_box .first_p");
  let txt2 = document.querySelectorAll(".daily_box .last_p");
  for (let i = 0; i < arr_img.length; i++) {
    daily[i].src = arr_img[i];
    txt1[i].innerText = arr_txt1[i];
    txt2[i].innerText = arr_txt2[i];
    if (i % 2 == 0) {
      txt1[
        i
      ].style = `background-image: linear-gradient(to bottom,#ff1364,#ff68be)`;
    } else {
      txt1[
        i
      ].style = ` background-image: linear-gradient(to bottom,#2fd28f,#b2d576)`;
    }
  }

  // recommend推荐部分
  let recomm = document.querySelectorAll(".recommend_box img");
  let recomm_p = document.querySelectorAll(".recommend_box p:first-of-type");
  let recomm_p2 = document.querySelectorAll(
    ".recommend_box p:last-of-type span:first-of-type"
  );
  let arr_img2 = [
    "./images/recommend-list-img01.webp",
    "./images/recommend-list-img02.webp",
    "./images/recommend-list-img03.webp",
    "./images/recommend-list-img04.webp",
    "./images/recommend-list-img05.webp",
    "./images/recommend-list-img06.webp",
  ];
  let recomm_txt1 = [
    "野狼军表钢带手表男士机械表 瑞士原装机械机芯 防...",
    "野狼军表钢带手表男士机械表 瑞士原装机械机芯 防...",
    "野狼军表钢带手表男士机械表 瑞士原装机械机芯 防...",
    "野狼军表钢带手表男士机械表 瑞士原装机械机芯 防...",
    "野狼军表钢带手表男士机械表 瑞士原装机械机芯 防...",
    "野狼军表钢带手表男士机械表 瑞士原装机械机芯 防...",
  ];
  let recomm_txt2 = [
    "￥3880",
    "￥3880",
    "￥3880",
    "￥3880",
    "￥3880",
    "￥3880",
  ];
  for (let j = 0; j < recomm.length; j++) {
    recomm[j].src = arr_img2[j];
    recomm_p[j].innerText = recomm_txt1[j];
    recomm_p2[j].innerText = recomm_txt2[j];
    recomm_p2[j].style = `color:#e43130;font-size:1.2rem`;
  }

  search.addEventListener("touchstart", function () {
    window.location.href = "./search.html";
  });
};
