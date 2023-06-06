import { createElement } from "./helper.js";

export const createHero = () => {
  const section = createElement("section", {
    className: "hero",
  });

  const container = createElement("div", {
    className: "container hero__container",
  });

  section.append(container);

  const title = createElement("h1", {
    className: "hero__title",
    innerHTML: "<span>Wish</span><span>List</span>",
  });

  const description = createElement("p", {
    className: "hero__description",
    innerHTML:
      "Никогда не поздно поставить новую цель или обрести новую мечту...",
  });

  const listSteps = createElement("ol", {
    className: "hero__steps steps",
  });

  const steps = [
    "Создайте список желаний",
    "Поделитесь ссылкой с&nbsp;друзьями",
    "Получите желанный подарок",
  ];

  steps.forEach((text) => {
    const step = createElement("li", {
      className: "steps__item",
      innerHTML: text,
    });

    listSteps.append(step);
  });

  // const stepsOne = createElement("li", {
  //   className: "steps__item",
  //   innerHTML: "Создайте список желаний",
  // });

  // listSteps.append(stepsOne);

  container.append(title, description, listSteps);

  return section;
};