// 封装validate验证规则
let exg = /^([a-zA-Z0-9_-]|[\u4E00-\uFA29]){3,12}$/;
let reg = /^[a-zA-Z0-9_-]{3,12}$/;
export function validateusername(rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (!exg.test(value)) {
    callback(new Error("请输入3-12位，中文、字母、数字、或下划线"));
  } else {
    callback();
  }
}
export function validatepassword(rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入3-12位，数字、下划线或大小写字母"));
  } else {
    callback();
  }
}

export function validnewpass(o) {
  return function(rule, value, callback) {
    // 非空验证
    if (value === "") {
      callback(new Error("请输入新密码"));
    } else if (!reg.test(value)) {
      callback(new Error("密码包含3-12位字母、数字和下划线！"));
    } else if (value === o.PassForm.oldPass) {
      callback(new Error("新密码不能和旧密码相同"));
    } else {
      if (o.PassForm.checkPass !== "") {
        o.$refs.PassForm.validateField("checkPass");
      }
      callback();
    }
  };
}

// 自定义确认新密码是否一致的函数
export function validcheckpass(o) {
  return function(rule, value, callback) {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== o.PassForm.newPass) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  };
}
export function validchecknull(rule, value, callback) {
  if (value === "") {
    callback(new Error("输入不能为空"));
  } else {
    callback();
  }
}
