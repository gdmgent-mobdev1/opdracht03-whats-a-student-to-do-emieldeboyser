// Import the functions you need from the SDKs you need
import { v4 as uuidv4 } from "uuid";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  Timestamp,
  doc,
  where,
  query,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getAdditionalUserInfo,
} from "firebase/auth";
import { Card } from "../Components";
import ProjectCard from "../Components/ProjectKard";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyB2TOM9AjDnfGlmv8nWSZjGT6sudtYZQq4",
  authDomain: "opdracht03-d7574.firebaseapp.com",
  projectId: "opdracht03-d7574",
  storageBucket: "opdracht03-d7574.appspot.com",
  messagingSenderId: "457316223368",
  appId: "1:457316223368:web:879617bf5105b25b99523d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore();

export const database = getFirestore(app);

function makeUsername() {
  const userEmail = localStorage.getItem("emailUser");
  const usernameMsg = userEmail?.replace(/@.*$/, "");
  // @ts-ignore
  localStorage.setItem("username", usernameMsg);
  return usernameMsg;
}

function register(e: any) {
  e.preventDefault();
  const collectionRef = collection(db, "users");

  const email = (<HTMLInputElement>document.getElementById("register_Email"))
    .value;
  console.log(email);

  const password: string = (<HTMLInputElement>(
    document.getElementById("register_PassWord")
  )).value;
  console.log(password);

  // check of email al bestaat

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      localStorage.setItem("emailUser", email);
      window.location.replace("/");
    })
    .catch((error) => {
      console.log(error);
    });

  addDoc(collectionRef, {
    userEmail: email,
    userName: email.replace(/@.*$/, ""),
  });
}

function signin(e: any) {
  e.preventDefault();
  const email = <HTMLInputElement>document.getElementById("logIn_Email");
  const emailValue = email.value;

  const password = (<HTMLInputElement>document.getElementById("logIn_Password"))
    .value;

  signInWithEmailAndPassword(auth, emailValue, password)
    .then(() => {
      // Signed in
      localStorage.setItem("emailUser", password);
      window.location.replace("/dashboard");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(`An error has occurred, the error is ${errorMessage}!`);
    });
}

function signInWithGoogle(e: any) {
  e.preventDefault();
  // const collectionRef = collection(database, 'users');
  signInWithPopup(auth, googleProvider)
    .then(async (result: any) => {
      // The signed-in user info.
      const { email } = result.user;
      console.log(email);

      // check if user is in database already

      // @ts-ignore
      const { isNewUser } = getAdditionalUserInfo(result);
      console.log(isNewUser);

      if (isNewUser) {
        await addDoc(collection(database, "users"), {
          userEmail: email,
          userName: email.replace(/@.*$/, ""),
        });
      }

      localStorage.setItem("emailUser", email);
      window.location.replace("/dashboard");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

// logout function
function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      window.location.replace("/");
      localStorage.clear();
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// make project
function createProject() {
  // firestore references
  const projectsRef = collection(db, "projecten");
  const projectRef = doc(projectsRef);
  // get values for document
  const newName =
    document.querySelector<HTMLInputElement>("#newProjectName")!.value;
  const newDescription = document.querySelector<HTMLInputElement>(
    "#newProjectDescription"
  )?.value;
  const newDate =
    document.querySelector<HTMLInputElement>("#newProjectDate")!.value;

  // add doc to firestore
  const project = () => {
    const username = makeUsername();
    addDoc(collection(db, "projecten"), {
      name: newName,
      deadline: Timestamp.fromDate(new Date(newDate)),
      description: newDescription,
      id: projectRef.id,
      subtasks: {},
      users: {
        leader: {
          username: username,
          email: localStorage.getItem("emailUser"),
        },
      },
    });
  };
  project();
  alert("Project is aangemaakt");
}

// get projects
async function viewUserMadeProject() {
  // firestore references
  const docRef = query(
    collection(db, "projecten"),
    where("users.leader.email", "==", localStorage.getItem("emailUser"))
  );

  const projectsContainer = document.querySelector(".projectList");
  const divCard = document.createElement("div");
  divCard?.setAttribute("class", "allProjectss");
  projectsContainer?.appendChild(divCard!);
  // get docs from firestore
  const querySnapshot = await getDocs(docRef);

  querySnapshot.forEach((doc) => {
    const projectName = doc.data().name;
    const deadline = doc.data().deadline;
    const deadlineDate = deadline.toDate();

    const deadlineConverted = deadlineDate.toLocaleString("nl-BE", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    const description = doc.data().description;

    const card = new Card(projectName, deadlineConverted, description, doc.id);
    const makeCard = card.render();
    if (projectsContainer) {
      divCard?.appendChild(makeCard);
    }
  });

  // invited
  const docRef2 = query(
    collection(db, "projecten"),
    where("invited.member.email", "==", localStorage.getItem("emailUser"))
  );

  const projectsContainer2 = document.querySelector(".projectList");
  const invitedDiv = document.createElement("div");
  invitedDiv?.setAttribute("class", "invitedProjects");
  projectsContainer2?.appendChild(divCard!);
  const h2 = document.createElement("h2");
  h2.classList.add("invited");
  h2.textContent = "Uitgenodigd: ";
  invitedDiv?.appendChild(h2);
  // get docs from firestore
  const querySnapshot2 = await getDocs(docRef2);

  querySnapshot2.forEach((doc) => {
    const projectName2 = doc.data().name;
    const deadline2 = doc.data().deadline;
    const deadlineDate2 = deadline2.toDate();
    const deadlineConverted2 = deadlineDate2.toLocaleString("nl-BE", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    const description2 = doc.data().description;

    const invitedCard = new Card(
      projectName2,
      deadlineConverted2,
      description2,
      doc.id
    );

    const makeCard2 = invitedCard.render();

    invitedDiv?.appendChild(makeCard2);
    projectsContainer2?.appendChild(invitedDiv!);
  });

  //
}

// view project
async function getProjects() {
  // firestore references
  const docRef = query(
    collection(db, "projecten"),
    where("users.leader.email", "!=", localStorage.getItem("emailUser"))
  );
  const querySnapshot = await getDocs(docRef);
  const otherProjects = document.querySelector(".otherProjects");

  querySnapshot.forEach((doc) => {
    const projectName = doc.data().name;
    const otherProjects = document.querySelector(".otherProjects");
    const p = document.createElement("p");
    p.textContent = projectName;

    p.setAttribute("id", doc.data().id);
    p.setAttribute("class", "joinProject");
    otherProjects?.appendChild(p);
  });
  if (otherProjects?.innerHTML === "") {
    otherProjects.innerHTML = `<p>Er zijn geen projecten</p>`;
  }
}

async function addUserToProject(id: any) {
  const docRef = query(collection(db, "projecten"), where("id", "==", id));
  const querySnapshot = await getDocs(docRef);

  querySnapshot.forEach((name) => {
    const docName = name.id;
    const nameRef = doc(db, "projecten", docName);
    updateDoc(nameRef, {
      invited: {
        member: {
          username: makeUsername(),
          email: localStorage.getItem("emailUser"),
        },
      },
    });
  });
  alert("Je bent toegevoegd aan het project");
}

async function viewProjectDetailed(id: any) {
  // hide all projects
  const getAllProjects = document.querySelector("main");
  const app = document.querySelector("#app");
  getAllProjects?.classList.add("hidden");
  // get all data from database with id of project
  const docRef = doc(db, "projecten", id);
  const docSnap = await getDoc(docRef);
  const projectName = docSnap.data()?.name;

  // make detailed page
  const detailedPage = new ProjectCard(projectName, id);
  const makeDetailedPage = detailedPage.render();
  app?.appendChild(makeDetailedPage);
  await showSubtasks(id);
  await addSubtaskPtn();
}

async function AfterLoadedCards() {
  const cards = document.querySelectorAll(".card");

  const buttonPressed = (e: any) => {
    e.preventDefault();
    const id = e.target.id;
    viewProjectDetailed(id);
    localStorage.setItem("idCurrentPressedDoc", id);
  };

  for (let card of cards) {
    card.addEventListener("click", buttonPressed);
  }
}

function addSubtaskPtn() {
  const getAllSubtaskBtns = document.querySelector(".addSubtask");
  getAllSubtaskBtns?.addEventListener("click", getInputValue);
}

function getInputValue(e: any) {
  e.preventDefault();
  const id = localStorage.getItem("idCurrentPressedDoc");
  addSubtask(id);
}

async function addSubtask(id: any) {
  // id = localStorage.getItem("idCurrentPressedDoc");

  const getSubtaskName = document.querySelector(".cardInput");

  // @ts-ignore
  const title = getSubtaskName?.value;
  const randomId = `_${uuidv4()}`;
  console.log(randomId);

  const docRef = doc(db, "projecten", id);
  updateDoc(docRef, {
    subtasks: {
      // id: randomId,
      name: title,
      done: false,
      description: "",
      deadline: "",
    },
  });

  alert("Subtask toegevoegd");

  window.location.reload();
}

async function showSubtasks(id: any) {
  // get all data from database with id of project
  const docRef = doc(db, "projecten", id);
  const docSnap = await getDoc(docRef);
  // show data in console
  // get subtasks

  if (docSnap.data()?.subtasks !== undefined) {
    const subtasks = docSnap.data()?.subtasks;
    const id = docSnap.data()?.id;
    // show subtasks in console

    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtaskContainer");

    const subtaskDiv = document.createElement("div");
    subtaskDiv.classList.add("subtaskDiv");
    subtaskDiv.setAttribute("id", id);
    subtaskContainer?.appendChild(subtaskDiv);

    const app = document.querySelector("#app");
    app?.appendChild(subtaskContainer);

    const subtaskName = subtasks.name;
    const subtaskDone = subtasks.done;

    const subTaskTitle = document.createElement("h2");
    subTaskTitle.textContent = subtaskName;

    const subtaskProgress = document.createElement("input");
    subtaskProgress.setAttribute("type", "checkbox");
    subtaskProgress.setAttribute("class", "subtaskProgress");
    subtaskProgress.checked = subtaskDone;

    subtaskDiv?.appendChild(subTaskTitle);
    subtaskDiv?.appendChild(subtaskProgress);
  } else console.log("no subtasks");

  await detailedTodo();
}

export {
  register,
  signin,
  signInWithGoogle,
  logout,
  createProject,
  makeUsername,
  getProjects,
  viewUserMadeProject,
  addUserToProject,
  viewProjectDetailed,
  AfterLoadedCards,
  addSubtask,
};
function detailedTodo() {
  throw new Error("Function not implemented.");
}
