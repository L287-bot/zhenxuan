/**
 * 正则表达式校验
 *
 */
// 校验邮箱 test() 方法会检查 value 是否符合正则表达式的规则。如果符合规则，返回 true，否则返回 false。
export function validate_email(value: any) {
  const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regEmail.test(value);
}

// 校验密码
export function validate_password(value: any) {
  const regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return regPassword.test(value);
}

// 校验验证码
export function validate_code(value: any) {
  const regCode = /^[a-z0-9]{6}$/;
  return regCode.test(value);
}

//
// // 密码校验
// export function checkPassword(rule: any, value: any, callback: any) {
//   if (!value || value === "") {
//     callback(new Error("请输入用密码"));
//   } else if (!validate_password(value)) {
//     callback(new Error("请输入>=6并且<=20位的密码，包含数字、字母"));
//   } else {
//     callback();
//   }
// }

//
// // 用户名校验
// export function checkUser(rule, value, callback, source, options) {
//   if (!value || value === "") {
//     callback(new Error("请输入用户名"));
//   } else if (!validate_email(value)) {
//     callback(new Error("邮箱格式不正确"));
//   } else {
//     callback();
//   }
// }
