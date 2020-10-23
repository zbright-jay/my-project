window.onload = function () {
  let search_btn = document.querySelector("header span");
  let search_input = document.querySelector("header input");
  //   为手机端添加touchstart事件,触摸点击，执行事件
  search_btn.addEventListener("touchstart", function () {
     // 获取本地存储状态
    let local = localStorage.getItem("search");
    let search_txt = search_input.value;
    if (search_txt != "") {
      if (local == null) {
        let arr = [];
        arr.push({
          search_content: search_txt,
        });
        localStorage.setItem("search", JSON.stringify(arr));
      } else {
        let arr = JSON.parse(local);
        arr.push({
          search_content: search_txt,
        });
        // 根据功能新的历史记录显示在最前面，则需要将数组倒置
        arr = arr.reverse();
        localStorage.setItem("search", JSON.stringify(arr));
      }
    } else {
      alert("请输入搜索项");
    }
    search_input.value = "";
    getcontent();
  });

  //   删除清空
  del.addEventListener("click", function () {
    if (localStorage.getItem('search') != null) {
      let status = confirm("确定要清空搜索历史？");
      if (status) {
        clear();
      } else {
        return false;
      }
    }else{
      alert('没有历史记录~')
    }
  });
  //   回退back
  back.addEventListener("click", function () {
    // history方法——go(-1)回到上一步
    history.go(-1);
  });

  function getcontent() {
    let history_p = document.querySelector(".history p:last-of-type");
    history_p.innerHTML = "";
    let arr = JSON.parse(localStorage.getItem("search"));
    if (arr != null) {
      for (let i = 0; i < arr.length; i++) {
        history_p.innerHTML += `
      <span>${arr[i].search_content}</span>
      `;
      }
    }
  }
  if (localStorage.getItem('search') != null) {
    // 调用显示历史的函数
    getcontent();
  }

  function clear() {
    localStorage.clear("search");
    getcontent();
  }
};
