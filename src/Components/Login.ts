import Component from "../lib/Component";

class LoginComponent extends Component {
  constructor() {
    super({
      name: "Login",
      model: {},
    });
  }

  render() {
    const bodyLogin = document.createElement("div");
    bodyLogin.className = "authContainer";

    const loginContainer = document.createElement("div");
    loginContainer.className = "logincontainer";
    bodyLogin.appendChild(loginContainer);
    loginContainer.innerHTML = `
    <h1>Welkom</h1>
    <h2>Login</h2>
    <form class="login-form">
      <input type="email" class="form-input" name="email" id="logIn_Email" placeholder="E-mail">
      <input type="password" class="form-input" name="password" id="logIn_Password" placeholder="Password">
      <button type="submit" id="login-button" class="primary-button">Login</button>
      <p class="line">_________________</p>
      <button id="login-google" class="secondary-button"><i class="fa-brands fa-google"></i></button>
      <a href="/register" class="otherLinkToOtherPage"><p>Not registered yet? Click here to register</p></a>
    </form>
    `;

    return bodyLogin;
  }
}

export default LoginComponent;
