export function getUserToken() {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return token;
}
