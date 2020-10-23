$(function () {
  function router() {
    var hash = location.hash.substr(1);
    switch (hash) {
      // 一级路由
      case "invest":
        $("#content").load("../Pages/invest.html");
        break;
      case "borrow":
        $("#content").load("../Pages/borrow.html");
        break;
      case "borrow_info":
        $("#content").load("../Pages/borrow_info.html");
        break;
      // 二级路由
      case "personal_center":
        loadChildPage("personal_center/account");
        break;
      case "personal_center/invest_project":
        loadChildPage("personal_center/invest_project");
        break;
      case "personal_center/account":
        loadChildPage("personal_center/account");
        break;
      case "personal_center/loan_project":
        loadChildPage("personal_center/loan_project");
        break;
      case "personal_center/verified":
        loadChildPage("personal_center/verified");
        break;
      case "personal_center/borrow_apply":
        loadChildPage("personal_center/borrow_apply");
        break;
      case "personal_center/recharge_details":
        loadChildPage("personal_center/recharge_details");
        break;
      case "personal_center/personal_view":
        loadChildPage("personal_center/personal_view");
        break;
      case "personal_center/bill":
        loadChildPage("personal_center/bill");
        break;
      case "personal_center/bank_card":
        loadChildPage("personal_center/bank_card");
        break;
      default:
        $("#content").load("../Pages/main.html");
        break;
    }
    // 切换激活效果
    changeNavActive(hash);
  }
  router();

  /* 加载二级页面 */
  function loadChildPage(hash) {
    // 判断个人中心有还是没有
    var isPersonalExit = $("#personal_content").length == 1 ? true : false;

    // 如果只是点击左侧导航 直接加载页面即可
    if (isPersonalExit) {
      $("#personal_content").load(`../Pages/${hash}.html`); // 加载 个人中心/账户信息
      changeNavChildActive(`${hash}`);
    } else {
      // 如果刷新 必须先加载个人中心 再加载子页面
      $("#content").load("../Pages/personal_center.html", function () {
        $("#personal_content").load(`../Pages/${hash}.html`); // 加载 个人中心/账户信息
        changeNavChildActive(`${hash}`);
      });
    }
  }

  // 切换一级激活效果
  function changeNavActive(hash) {
    hash = hash.split("/")[0];
    if (hash == 'borrow_info') {
      hash = 'invest';
    }
    if (hash == '') {
      hash = 'main';
    }
    $("#navList li a").removeClass("active");
    $(`#navList li a[href="#${hash}"]`).addClass("active");
  }

  /* 切换激活效果 - 二级激活 */
  function changeNavChildActive(hash) {
    $("#leftMenu  a").removeClass("active");
    $(`#leftMenu a[href="#${hash}"]`).addClass("active");
  }

  window.onhashchange = router;
});
