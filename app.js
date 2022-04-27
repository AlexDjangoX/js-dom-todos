const form = document.querySelector(".form");
const todo = document.querySelector("#todo-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event.target[0].value);
  const todoItem = event.target[0].value;

  const opts = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ title: todoItem, completed: false }),
  };

  fetch("https://localhost:3000/todos", opts)
    .then((res) => res.json())
    .then(() => {
      const listItem = document.createElement("li");
      listItem.innerText = todoItem;
      todo.append(listItem);
    });

  form.reset();
  updateTodoList();
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
        let listItem = document.createElement("li");
        listItem.innerText = el.title;
        listItem.addEventListener("click", () => {
          complete(el.id);
        });
        if (el.completed === true) {
          listItem.setAttribute("class", "completed");
        }
        todo.append(listItem);
      });
    });
}

updateTodoList();
