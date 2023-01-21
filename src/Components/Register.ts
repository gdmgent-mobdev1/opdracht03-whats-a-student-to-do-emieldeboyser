/* eslint-disable @typescript-eslint/no-unused-vars */
import Component from "../lib/Component";

class RegisterComponent extends Component {
  constructor() {
    super({
      name: "register",
      model: {},
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const bodyLogin = document.createElement("div");
    bodyLogin.className = "authContainer";

    const registerContainer = document.createElement("div");
    registerContainer.className = "registercontainer";
    bodyLogin.appendChild(registerContainer);
    registerContainer.innerHTML = `
    <h1>Welkom</h1>
    <h2>Register</h2>
    <form id="register-form" class="register-form"> 
        <input type="text" class="form-input" name="username" id="register_Email" placeholder="E-mail"></input>
        <input type="password" class="form-input" name="password" id="register_PassWord" placeholder="Password"></input>
      <button type="submit" id="register-button" class="primary-button">Register</button>
      <a href="/" class="otherLinkToOtherPage"><p>Already have an account? Click here to log in</p></a>
    </form>
    `;

    return registerContainer;
  }
}

export default RegisterComponent;
