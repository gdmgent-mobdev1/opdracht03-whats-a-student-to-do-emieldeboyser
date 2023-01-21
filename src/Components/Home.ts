/* eslint-disable @typescript-eslint/no-unused-vars */
import Component from "../lib/Component";

class HomeComponent extends Component {
  constructor() {
    super({
      name: "home",
      model: {},
    });
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const homeContainer = document.createElement("div");
    homeContainer.innerHTML = `
    <header>
        <ul>
            <li><a href="">Home</a></li>
            <li id="logout">Log out</li>
        </ul>
    </header>

    <main>
      <h1 class="welcomeMsg" >Welkom USEREMAIL</h1>
      <div class="projectsContainer">
        <div class="ProjectsSummary">        
          <h3>Overzicht projecten</h3>
          <a href=""><i class="fa-solid fa-plus addProject"></i></a>
        </div>
        <div class="projectList"></div>
            
      </div>
      <div class="hidden newProject">
      <i class="fa-solid fa-xmark closeNewProject"></i>
      <h1>Nieuw project</h1>
        <div class="addProjectForm">
          <input type="text" class="form-input" name="projectName" id="newProjectName" placeholder="Projectnaam"></input>
          <textarea type="text" class="form-input" name="projectDescription" id="newProjectDescription" placeholder="Beschrijving"></textarea>
          <input type="date" class="form-date" name="projectDate" id="newProjectDate" placeholder="Deadline datum"></input>
          <button type="submit" id="addProjectButton" class="primary-button makeNewProject">Voeg toe</button>
        </div>  
        <h2>Join andere projecten</h2>
        <div class="otherProjects"></div>
        
      </div>
    </main>
    `;

    return homeContainer;
  }
}

export default HomeComponent;
