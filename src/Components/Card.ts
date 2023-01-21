export default class Card {
  id: string;

  projectName: string;

  deadline: string;

  description: string;

  card: HTMLDivElement | undefined;

  title: HTMLHeadingElement | undefined;

  deadlineElement: HTMLParagraphElement | undefined;

  descriptionElement: HTMLParagraphElement | undefined;

  amountUsers?: string;

  constructor(
    projectName: string,
    deadline: string,
    description: string,
    id: string
  ) {
    this.id = id;
    this.projectName = projectName;
    this.deadline = deadline;
    this.description = description;
    this.render();
  }

  render() {
    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.card.id = this.id;

    this.title = document.createElement("h3");
    this.title.classList.add("cardTitle");
    this.title.innerText = this.projectName;

    this.deadlineElement = document.createElement("p");
    this.deadlineElement.classList.add("cardDeadline");
    this.deadlineElement.innerText = this.deadline;

    this.descriptionElement = document.createElement("p");
    this.descriptionElement.classList.add("cardDescription");
    this.descriptionElement.innerText = this.description;

    // this.amountUsers = document.createElement("p");
    // this.amountUsers.classList.add("cardAmountUsers");
    // this.amountUsers.innerText = this.amountUsers;

    this.card.appendChild(this.title);
    this.card.appendChild(this.deadlineElement);
    this.card.appendChild(this.descriptionElement);

    return this.card;
  }
}
