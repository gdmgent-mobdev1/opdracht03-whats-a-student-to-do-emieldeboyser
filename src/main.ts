// Imort the css file
import "./css/app.css";

// Import the components
import { LoginComponent, RegisterComponent, HomeComponent } from "./Components";
import {
  createProject,
  makeUsername,
  getProjects,
  viewUserMadeProject,
  AfterLoadedCards,
} from "./lib/firebase-init";
// import fitrebase functions
import {
  register,
  signin,
  signInWithGoogle,
  logout,
  addUserToProject,
} from "./lib/firebase-init";

// DOM element app
const app = document.getElementById("app");

// Component maken
const login = new LoginComponent();
const registercom = new RegisterComponent();
const home = new HomeComponent();

// Change view of the page
const loggedInUser = localStorage.getItem("emailUser");
if (loggedInUser) {
  app?.appendChild(home.render());
  const welcomeMsg: any = document.querySelector(".welcomeMsg");
  welcomeMsg.innerHTML = `Welkom ${makeUsername()}`;
} else if (window.location.pathname === "/register") {
  app?.appendChild(registercom.render());
} else {
  app?.appendChild(login.render());
}

const loginButton = document.querySelector("#login-button");
const googleButton = document.querySelector("#login-google");
const registerButton = document.querySelector("#register-button");
const logoutButton = document.querySelector("#logout");
const newProjectButton = document.querySelector(".addProject");
const closeNewProjectButton = document.querySelector(".closeNewProject");
const newProjectScreen = document.querySelector(".newProject");
const makeNewProject = document.querySelector(".makeNewProject");

loginButton?.addEventListener("click", signin);
googleButton?.addEventListener("click", signInWithGoogle);
registerButton?.addEventListener("click", register);
logoutButton?.addEventListener("click", logout);
closeNewProjectButton?.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("close new project");
  newProjectScreen?.classList.add("hidden");
  window.location.reload();
});

makeNewProject?.addEventListener("click", createProject);

viewUserMadeProject().then((_res) => AfterLoadedCards());

getProjects();

// Add user to project
const secondPart = () => {
  const joinProjects = document.querySelectorAll(".joinProject");
  console.log(joinProjects);

  const buttonPressed = (e: any) => {
    e.preventDefault();
    console.log("button pressed");
    const id = e.target.id;
    console.log(id);
    localStorage.setItem("idCurrentPressedDoc", id);
    addUserToProject(id);
  };

  for (let joinProject of joinProjects) {
    console.log(joinProject);
    joinProject.addEventListener("click", buttonPressed);
  }
};

async function firstPart(e: any) {
  e.preventDefault();
  console.log("new project");
  newProjectScreen?.classList.remove("hidden");
  await secondPart();
}

newProjectButton?.addEventListener("click", firstPart);
// end user to project

// detailed subtask
