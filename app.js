const form = document.querySelector(".form");
const todo = document.querySelector("#todo-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const todoItem = event.target[0].value;
  console.log(todoItem);

  const opts = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ title: todoItem, completed: false }),
  };

  fetch(`http://localhost:3000/todos`, opts)
    .then((res) => res.json())
    .then(() => {
      const listItem = document.createElement("li");
      listItem.innerText = event.target[0].value;
      todo.append(listItem);
      updateTodoList();
    });
  form.reset();
});

function complete(id) {
  const opts = {
    method: "PATCH",
    body: JSON.stringify({ completed: true }),
    headers: { "Content-Type": "application/json" },
  };

  fetch(`http://localhost:3000/todos/${id}`, opts)
    .then((res) => res.json())
    .then(() => {
      updateTodoList();
    });
}

function updateTodoList() {
  todo.innerHTML = "";
  fetch("http://localhost:3000/todos")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((el) => {
        const listItem = `<div class='list-item-button' >
        <li class='list-items' id='list-item-${el.id}' class=false >${el.title}</li>
        <button class='todo-button' id='list-button-${el.id}' >Delete todo item</button>
        </div>`;

        todo.insertAdjacentHTML("afterbegin", listItem);

        const todoItem = document.getElementById(`list-item-${el.id}`);
        todoItem.addEventListener("click", () => {
          complete(el.id);
        });
        if (el.completed === true) {
          todoItem.setAttribute("class", "completed");
        }

        const itemButton = document.getElementById(`list-button-${el.id}`);
        itemButton.addEventListener("click", () => {
          fetch(`http://localhost:3000/todos/${el.id}`, {
            method: "DELETE",
          });
          updateTodoList();
        });
      });
    });
}

updateTodoList();
