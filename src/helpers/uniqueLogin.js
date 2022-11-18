const uniqueLogin = () => {
  return "login-" + Math.floor(Math.random() * Date.now());
};

export default uniqueLogin;
