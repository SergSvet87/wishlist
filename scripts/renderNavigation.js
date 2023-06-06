import { API_URL, JWT_TOKEN_KEY, ROUTE_NEW_WISH } from "./const.js";

import { auth, router } from "./index.js";
import { createElement } from "./helper.js";
import { createBurgerMenu } from "./createBurgerMenu.js";
import { renderModal } from "./renderModal.js";

const nav = document.querySelector(".nav");
createBurgerMenu(nav, "nav_active", ".nav__btn");

export const renderNavigation = (edit, formProfile) => {
  nav.textContent = "";

  if (edit) {
    const buttonSave = createElement("button", {
      className: "nav__btn btn",
      textContent: "Сохранить изменения",
    });

    buttonSave.addEventListener("click", (e) => {
      e.preventDefault();

      formProfile.dispatchEvent(new Event("submit", { bubbles: true }));
    });

    const buttonBack = createElement("button", {
      className: "nav__btn btn",
      textContent: "Назад",
    });

    buttonBack.addEventListener("click", () => {
      history.back();
    });

    nav.append(buttonSave, buttonBack);

    return;
  }

  if (auth.login) {
    const buttonEditProfile = createElement("button", {
      className: "nav__btn btn",
      textContent: "Редактировать профиль",
    });

    const buttonAddWish = createElement("button", {
      className: "nav__btn btn",
      textContent: "Добавить желание",
    });

    const buttonLogout = createElement("button", {
      className: "nav__btn btn",
      textContent: "Выйти",
    });

    buttonEditProfile.addEventListener("click", () => {
      router.setRoute(`/editprofile/${auth.login}`);
    });

    buttonAddWish.addEventListener("click", () => {
      router.setRoute(`/editwish/${ROUTE_NEW_WISH}`);
    });

    buttonLogout.addEventListener("click", () => {
      localStorage.removeItem(JWT_TOKEN_KEY);
      auth.login = "";
      router.setRoute(`/`);
    });

    nav.append(buttonEditProfile, buttonAddWish, buttonLogout);

    return;
  }

  const buttonSighUp = createElement("button", {
    className: "nav__btn btn",
    textContent: "Зарегистрироваться",
  });

  buttonSighUp.addEventListener("click", () => {
    renderModal({
      title: "Регистрация",
      description: "Введите ваши данные для регистрации на сервисе WishList",
      btnSubmit: "Зарегистрироваться",
      submitHandler: async (e) => {
        const formData = new FormData(e.target);
        const credentials = {
          login: formData.get("login"),
          password: formData.get("password"),
        };

        try {
          const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem(JWT_TOKEN_KEY, data.token);
            auth.login = data.login;
            router.setRoute(`/user/${data.login}`);

            return true;
          } else {
            const { message = "Неизвестная ошибка!" } = await response.json();
            console.log(message);
            throw new Error(message);
          }
        } catch (error) {
          alert(error.message);
        }
      },
    });
  });

  const buttonLogin = createElement("button", {
    className: "nav__btn btn",
    textContent: "Войти",
  });

  buttonLogin.addEventListener("click", () => {
    renderModal({
      title: "Авторизация",
      description: "Введите ваши данные для входа в личный кабинет",
      btnSubmit: "Авторизоваться",
      submitHandler: async (e) => {
        const formData = new FormData(e.target);
        const credentials = {
          login: formData.get("login"),
          login: formData.get("password"),
        };

        try {
          const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem(JWT_TOKEN_KEY, data.token);
            auth.login = data.login;
            router.setRoute(`/user/${data.login}`);

            return true;
          } else {
            const { message = "Неизвестная ошибка!" } = await response.json();
            console.log(message);
            throw new Error(message);
          }
        } catch (error) {
          alert(error.message);
        }
      },
    });
  });

  nav.append(buttonSighUp, buttonLogin);
};
