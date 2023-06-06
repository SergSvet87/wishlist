import { JWT_TOKEN_KEY } from "./const.js";
import { createHero } from "./createHero.js";
import { getLogin } from "./serviceAPI.js";
import { renderNavigation } from "./renderNavigation.js";
import { createWishlist } from "./createWishlist.js";
import { createEditProfile } from "./createEditProfile.js";
import { createEditWish } from "./createEditWish.js";

export const router = Router();

const token = localStorage.getItem(JWT_TOKEN_KEY);

export const auth = token ? await getLogin(token) : {};
if (!auth.login) {
  localStorage.removeItem(JWT_TOKEN_KEY);
}

const app = document.querySelector(".app");
let isMainPage = true;

const handleHomePage = () => {
  app.textContent = "";
  isMainPage = false;

  renderNavigation();

  const section = createHero();
  app.append(section);
};

const handleEditWishRoute = async (id) => {
  app.textContent = "";
  isMainPage = false;

  const { sectionEditWish, formWish } = await createEditWish(id);

  renderNavigation("wish", formWish);
  app.append(sectionEditWish);
};

const handleEditProfileRoute = async (login) => {
  app.textContent = "";
  isMainPage = false;

  const { sectionEditProfile, formProfile } = await createEditProfile(login);

  renderNavigation("profile", formProfile);
  app.append(sectionEditProfile);
};

const handleUserRoute = async (login) => {
  app.textContent = "";
  isMainPage = false;
  renderNavigation();
  app.append(await createWishlist(login));
};

const init = () => {
  router.on("/", handleHomePage);
  router.on("/editwish/:id", handleEditWishRoute);
  router.on("/editprofile/:login", handleEditProfileRoute);
  router.on("/user/:login", handleUserRoute);

  router.init();

  if (isMainPage) {
    if (auth.login) {
      router.setRoute(`/user/${auth.login}`);
    } else {
      router.setRoute("/");
    }
  }
};

init();
