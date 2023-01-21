export default class DetailedTodo {
  id: string;

  projectName: string;

  deadline: string;

  description: string;

  done: boolean;

  comments: string[];

  detailedTodo: HTMLDivElement | undefined;
  title: HTMLHeadingElement | undefined;

  DetailedTodo: HTMLDivElement | undefined;

  discription: HTMLParagraphElement | undefined;

  input: HTMLInputElement | undefined;

  timer: HTMLParagraphElement | undefined;

  checkbox: HTMLInputElement | undefined;

  buttonTimer: HTMLButtonElement | undefined;

  submitButton: HTMLButtonElement | undefined;

  div: HTMLDivElement | undefined;

  constructor(
    projectName: string,
    deadline: string,
    description: string,
    id: string,
    done: boolean,
    comments: string[]
  ) {
    this.id = id;
    this.projectName = projectName;
    this.deadline = deadline;
    this.description = description;
    this.done = done;
    this.comments = comments;
    this.render();
  }

  render() {
    this.detailedTodo = document.createElement("div");
    this.detailedTodo.classList.add("detailedTodo");
    this.detailedTodo.id = this.id;

    this.div = document.createElement("div");
    this.div.classList.add("formList");

    this.title = document.createElement("h3");
    this.title.classList.add("detailedTodoTitle");
    this.title.innerText = this.projectName;

    this.discription = document.createElement("p");
    this.discription.classList.add("detailedTodoDiscription");
    this.discription.innerText = this.description;

    this.input = document.createElement("input");
    this.input.classList.add("deadlineInput");
    this.input.type = "date";
    this.input.value = this.deadline;
    this.input.placeholder = "Deadline:";

    this.buttonTimer = document.createElement("button");
    this.buttonTimer.classList.add("timer");
    this.buttonTimer.innerText = "Start Timer";

    this.checkbox = document.createElement("input");
    this.checkbox.classList.add("checkbox");
    this.checkbox.type = "checkbox";
    this.checkbox.checked = this.done;

    this.submitButton = document.createElement("button");
    this.submitButton.classList.add("submitButton");
    this.submitButton.innerText = "Opslaan";

    this.div.appendChild(this.discription);
    this.div.appendChild(this.input);
    this.div.appendChild(this.buttonTimer);
    this.div.appendChild(this.checkbox);
    this.div.appendChild(this.submitButton);

    this.detailedTodo.appendChild(this.title);
    this.detailedTodo.appendChild(this.div);

    return this.detailedTodo;
  }
}
