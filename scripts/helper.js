export const createElement = (tagName, attr) => {
  const elem = document.createElement(tagName);

  Object.assign(elem, attr);

  // for (const key in attr) {
  //   if (Object.hasOwnProperty.call(object, key)) {
  //     elem.setAttribute(key, attr[key]);
  //   }
  // }

  return elem;
};

export const pluralizeYears = (age) => {
  let years = age % 100;

  if (years >= 11 && years <= 19) {
    return "лет";
  } else {
    let lastDigit = years % 10;

    if (lastDigit === 1) {
      return "год";
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return "года";
    } else {
      return "лет";
    }
  }
};

// 1 способ отображения аватар пользователя
// export const handleImageFileSelection = (input, image) => {
//   const handleFileInputChange = (event) => {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       const reader = new FileReader();
//       reader.addEventListener("load", () => {
//         image.src = reader.result;
//       });

//       reader.readAsDataURL(file);
//     }
//   };

//   input.addEventListener("change", handleFileInputChange);
// };

// 2 способ отображения аватар пользователя
export const handleImageFileSelection = (inputFile, image, inputHidden) => {
  const handleFileInputChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        image.src = reader.result;

        if (inputHidden) {
          inputHidden.value = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  };

  inputFile.addEventListener("change", handleFileInputChange);
};

export const createSelectDate = (
  selectDay,
  selectMonth,
  selectYear,
  birthdate
) => {
  for (let day = 0; day <= 31; day++) {
    const option = createElement("option", {
      value: day ? day : "",
      text: day ? day : "",
    });

    selectDay.append(option);
  }

  const months = [
    "",
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ];

  for (let index = 0; index < months.length; index++) {
    const option = createElement("option", {
      value: index,
      text: months[index],
    });

    selectMonth.append(option);
  }

  const currentYear = new Date().getFullYear();
  const optionYear = document.createElement("option");
  optionYear.value = "";
  optionYear.text = "";
  selectYear.append(optionYear);

  for (let year = currentYear; year >= currentYear - 100; year--) {
    const option = createElement("option", {
      value: year,
      text: year,
    });

    selectYear.append(option);
  }

  if (birthdate) {
    const [month, day, year] = birthdate.split("/");
    selectDay.value = day;
    selectMonth.value = month;
    selectYear.value = year;
  }

  [selectDay, selectMonth, selectYear].forEach((dataSelect) => {
    dataSelect.addEventListener("change", ({ currentTarget }) => {
      currentTarget.blur();
    });
  });
};

export const createOptionCurrency = (select, currency) => {
  const currencies = ["UAN", "RUB", "USD", "EUR"];

  for (let i = 0; i < currencies.length; i++) {
    const option = createElement("option", {
      value: currencies[i],
      text: currencies[i],
    });

    select.append(option);
  }

  select.value = currency ?? currencies[0];
};
