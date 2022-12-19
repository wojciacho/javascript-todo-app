const container = document.querySelector("#container"),
  input = document.querySelector("#input"),
  list = document.querySelector("#list"),
  alert = document.querySelector(".alert"),
  saveLS = JSON.parse(localStorage.getItem("items"));

const LS = () => {
  const itemList = document.querySelectorAll("li");
  const items = [];
  itemList.forEach((item) => {
    items.push({
      text: item.innerText,
      status: item.classList.contains("finished"),
    });
  });
  localStorage.setItem("items", JSON.stringify(items));
};

const displayAlert = (text) => {
  alert.textContent = text;
  alert.classList.add(`danger`);
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`danger`);
  }, 1500);
};

const addToDo = (item) => {
  let value = input.value;

  if (item) {
    value = item.text;
  }

  if (!value) {
    return displayAlert("please enter value");
  }

  if (value) {
    const element = document.createElement("li");
    if (item && item.status) {
      element.classList.add("finished");
    }
    element.innerText = value;

    element.addEventListener("click", () => {
      element.classList.toggle("finished");
      LS();
    });
    element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      element.remove();
      LS();
    });
    list.appendChild(element);
    input.value = "";
    LS();
  }
};

container.addEventListener("submit", (e) => {
  e.preventDefault();
  addToDo();
});

if (saveLS) {
  saveLS.forEach((item) => {
    addToDo(item);
  });
}
