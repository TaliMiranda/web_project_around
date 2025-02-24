// Lista inicial de cartões
const initialCards = [
  {
      name: "Vale de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
      name: "Montanhas Carecas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
      name: "Parque Nacional da Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Função para renderizar os cartões
function renderCard(card) {
  const template = document.querySelector("#template").content.querySelector(".elements__card");
  const currentCard = template.cloneNode(true);

  currentCard.querySelector(".elements__card-name").textContent = card.name;
  currentCard.querySelector(".elements__card-image").setAttribute("src", card.link);
  currentCard.querySelector(".elements__card-image").setAttribute("alt", card.name);

  // Evento para deletar cartão
  currentCard.querySelector(".elements__delete-icon").addEventListener("click", (evt) => {
      evt.target.closest(".elements__card").remove();
  });

  // Evento para curtir cartão
  currentCard.querySelector(".elements__like-icon").addEventListener("click", (evt) => {
      evt.target.classList.toggle("liked");
  });

  return currentCard;
}

// Renderiza os cartões iniciais
const elements = document.querySelector(".elements");
initialCards.forEach((card) => {
  elements.append(renderCard(card));
});

// Seleciona os elementos do pop-up de edição de perfil
const popup = document.querySelector(".popup");
const form = popup.querySelector(".popup__form");
const inputName = form.querySelector("#input-name");
const inputRole = form.querySelector("#input-role");
const saveButton = form.querySelector("#save-button");
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__about");

// Função para abrir o pop-up e preencher os inputs
const openPopup = () => {
  inputName.value = profileName.innerText;
  inputRole.value = profileRole.innerText;
  popup.classList.add("popup_opened");
  checkInputs();
};

// Fecha o pop-up
const closePopup = () => {
  popup.classList.remove("popup_opened");
};

// Verifica se os campos estão preenchidos para habilitar o botão "Salvar"
const checkInputs = () => {
  saveButton.disabled = inputName.value.trim() === "" || inputRole.value.trim() === "";
};

// Atualiza as informações do perfil
const handleSaveProfileInformation = (event) => {
  event.preventDefault();
  profileName.innerText = inputName.value;
  profileRole.innerText = inputRole.value;
  closePopup();
};

// Eventos de entrada nos inputs para validar o formulário
inputName.addEventListener("input", checkInputs);
inputRole.addEventListener("input", checkInputs);
form.addEventListener("submit", handleSaveProfileInformation);

// Evento para abrir o pop-up ao clicar no botão de edição
document.querySelector(".profile__edit-button").addEventListener("click", openPopup);

// Evento para fechar o pop-up ao clicar no botão de fechar
document.querySelector(".popup__close-button").addEventListener("click", closePopup);

// Adiciona evento para fechar pop-ups ao clicar fora
popup.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
      closePopup();
  }
});

// Função para abrir o pop-up de adicionar cartão
const popupAddCards = document.querySelector(".popup-add-card");
const addCardButton = document.querySelector(".profile__add-card-icon");
const addCardForm = popupAddCards.querySelector(".popup__add-card-form");
const inputTitle = popupAddCards.querySelector("#input-location-name");
const inputImage = popupAddCards.querySelector("#input-image");
const createButton = popupAddCards.querySelector(".popup-add-card__create-button");

const openAddCardPopup = () => {
  popupAddCards.classList.add("popup-add-card_opened");
  checkCardInputs();
};

const closeAddCardPopup = () => {
  popupAddCards.classList.remove("popup-add-card_opened");
};

// Evento para abrir o pop-up de adicionar cartão
addCardButton.addEventListener("click", openAddCardPopup);

// Evento para fechar o pop-up de adicionar cartão
popupAddCards.querySelector(".popup-add-card__close-button").addEventListener("click", closeAddCardPopup);

// Verifica se os campos estão preenchidos para habilitar o botão "Criar"
const checkCardInputs = () => {
  createButton.disabled = inputTitle.value.trim() === "" || inputImage.value.trim() === "";
};

// Adiciona evento de entrada para validar o formulário de adicionar cartão
inputTitle.addEventListener("input", checkCardInputs);
inputImage.addEventListener("input", checkCardInputs);

// Evento para adicionar um novo cartão
addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCard = renderCard({
      name: inputTitle.value,
      link: inputImage.value,
  });

  document.querySelector(".elements").prepend(newCard);
  inputTitle.value = "";
  inputImage.value = "";
  checkCardInputs();
  closeAddCardPopup();
});

// Função para exibir imagem no pop-up
const popupViewImage = document.querySelector(".popup-view-image");
const popupImage = popupViewImage.querySelector(".popup-view-image__render-image");
const popupTitle = popupViewImage.querySelector(".popup-view-image__image-title");
const closePopupViewImageButton = popupViewImage.querySelector(".popup-view-image__close-button");

const handleViewImageOnPopup = () => {
  document.querySelectorAll(".elements__card-image").forEach((image) => {
      image.addEventListener("click", (e) => {
          popupViewImage.classList.add("popup-view-image_opened");
          popupImage.setAttribute("src", e.target.getAttribute("src"));
          popupImage.setAttribute("alt", e.target.getAttribute("alt"));
          popupTitle.textContent = e.target.closest(".elements__card").querySelector(".elements__card-name").textContent;
      });
  });
};

// Atualiza os eventos de exibição de imagem ao adicionar novos cartões
handleViewImageOnPopup();

// Fecha o pop-up de visualização de imagem ao clicar no botão de fechar
closePopupViewImageButton.addEventListener("click", () => {
  popupViewImage.classList.remove("popup-view-image_opened");
});

// Fecha pop-ups ao clicar fora
popupViewImage.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup-view-image")) {
      popupViewImage.classList.remove("popup-view-image_opened");
  }
});
