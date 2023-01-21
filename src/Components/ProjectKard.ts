export default class ProjectCard {
  id: string;

  projectName: string;

  ProjectCard: HTMLDivElement | undefined;

  title: HTMLHeadingElement | undefined;

  input: HTMLInputElement | undefined;

  addSubtask: HTMLButtonElement | undefined;

  div: HTMLDivElement | undefined;

  p: HTMLParagraphElement | undefined;
  constructor(projectName: string, id: string) {
    this.id = id;
    this.projectName = projectName;
    this.render();
  }

  inputdivje: HTMLDivElement | undefined;

  render() {
    this.ProjectCard = document.createElement("div");
    this.ProjectCard.classList.add("detailedCard");
    this.ProjectCard.id = this.id;

    this.title = document.createElement("h3");
    this.title.classList.add("cardTitle");
    this.title.innerText = this.projectName;

    this.div = document.createElement("div");
    this.div.classList.add("subtaskContainer");

    this.inputdivje = document.createElement("div");
    this.inputdivje.classList.add("inputDivje");

    this.input = document.createElement("input");
    this.input.classList.add("cardInput");
    this.input.type = "text";
    this.input.placeholder = "Maak subtask aan";

    this.addSubtask = document.createElement("button");
    this.addSubtask.classList.add("addSubtask");
    this.addSubtask.setAttribute("id", `addSubtask_${this.id}`);
    this.addSubtask.innerHTML = `<i class="fa-solid fa-plus"></i>`;

    this.p = document.createElement("p");
    this.p.classList.add("subTaskInfo");
    this.p.innerText = "Druk op subtask voor meer informatie";
    this.p.setAttribute("id", this.id);

    this.inputdivje.appendChild(this.input);
    this.inputdivje.appendChild(this.addSubtask);

    this.ProjectCard.appendChild(this.title);
    this.ProjectCard.appendChild(this.inputdivje);
    this.ProjectCard.appendChild(this.p);

    return this.ProjectCard;
  }
}
