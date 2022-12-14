const form = document.querySelector("form");
const main = document.querySelector(".main");
const modalBg = document.getElementById("contact_modal");
const modalBtn = document.getElementById("displayModal");
const closeModalBtn = document.getElementById("closeModal");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"]'
);

let first, last, email, textarea;

const addGlobalEventListener = (type, selector, callback, options) => {
  document.addEventListener(
    type,
    (event) => {
      if (event.target.matches(selector)) callback(event);
    },
    options
  );
};

addGlobalEventListener("click", "#displayModal", (event) => {
  displayModal(event);
});

function displayModal() {
  modalBg.style.display = "block";
}

// Gestion des messages d'erreurs
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

// Vérification des inputs
const firstChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("first", "Le prénom doit faire entre 3 et 20 caractères");
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "first",
      "Le prénom ne doit pas contenir de caractères spéciaux"
    );
    pseudo = null;
  } else {
    errorDisplay("first", "", true);
    first = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    email = null;
  } else {
    email = true;
  }
};

const lastChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("last", "Le nom doit faire entre 3 et 20 caractères");
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay("last", "Le nom ne doit pas contenir de caractères spéciaux");
    pseudo = null;
  } else {
    errorDisplay("last", "", true);
    last = value;
  }
};

const textareaChecker = (value) => {
  if (value.length === 0) {
    errorDisplay("textarea", "Le message ne peut pas être vide");
    textarea = null;
  } else {
    errorDisplay("textarea", "", true);
    textarea = value;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        firstChecker(e.target.value);
        break;
      case "last":
        lastChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "textarea":
        textareaChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});

function closeModal() {
  modalBg.style.display = "none";
}

// Keyboard
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Fonction pour vérifier l'envoi du formulaire
form.addEventListener("submit", (e) => {
  if (first && last && email && textarea) {
    e.preventDefault();
    const formData = new FormData(form);

    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }
    console.log(data);

    inputs.forEach((input) => (input.value = ""));
    modalBg.style.display = "none";
  } else {
    alert("Veuillez remplir correctement les champs");
    e.preventDefault();
  }
});
