const form = document.querySelector("form");
const list = document.querySelector("#list");

const TemplateData = [
  {
    id: 1,
    Task: "Demo 1",
  },
  {
    id: 2,
    Task: "Demo 2",
  },
];

class Controller {
  constructor() {
    this.data = JSON.parse(localStorage.getItem("data"));
    if (this.data === null) {
      localStorage.setItem("data", JSON.stringify(TemplateData));
    }
  }

  Set() {
    localStorage.setItem("data", JSON.stringify(this.data));
  }

  Insert(task) {
    this.data = [...this.data, { id: this.data.length + 1, Task: task }];
    this.Set();
  }

  Delete(index) {
    this.data.splice(index, 1);
    this.Set();
  }

  Update(index, newTask) {
    this.data[index].Task = newTask;
    this.Set();
  }

  UpdateList() {
    // Reset / Clear All Elementt List
    list.innerHTML = "";
    for (let i = 0; i < this.data.length; i++) {
      // Create Node Element
      const Item = document.createElement("div");
      const Input = document.createElement("input");
      const ButtonDelete = document.createElement("button");
      const ButtonUpdate = document.createElement("button");
      // Definisi
      Item.className = "item";
      Input.type = "text";
      Input.value = this.data[i].Task;
      ButtonDelete.textContent = "Delete";
      ButtonUpdate.textContent = "Update";
      // Append Child
      Item.appendChild(Input);
      Item.appendChild(ButtonUpdate);
      Item.appendChild(ButtonDelete);
      list.appendChild(Item);
      // Event
      ButtonDelete.addEventListener("click", () => {
        this.Delete(i);
        this.UpdateList();
      });
      ButtonUpdate.addEventListener("click", () => {
        this.Update(i, Input.value);
        this.UpdateList();
      });
    }
  }
}

const Data = new Controller();
Data.UpdateList();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  Data.Insert(e.target["task"].value);
  e.target["task"].value = "";
  Data.UpdateList();
});
