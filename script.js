// TODO ELEMAN EKLEME

// Eleman Seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;

// load items
loadItems();

eventListeners();

function eventListeners() {
  // submit event
  form.addEventListener("submit", addNewItem); //formdaki + butonun tıklayınca
  // delete an item
  taskList.addEventListener("click", deleteItem); //task list'teki x butonuna tıklayınca
  // delete all item
  btnDeleteAll.addEventListener("click", deleteAllItems); //delete all butonuna tıklayınca
}

function loadItems() {
  todos = getItemsFromLS();
  todos.forEach(function (item) {
    createItem(item);
  });
}

// get items from local storage
function getItemsFromLS() {
  //verileri logal storage'den alacağız
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); //JSON.parse = local storage'den gelen verileri array'e çevirir
  }
  return todos;
}

// set item to Local Storage
function setItemToLS(newTodo) {
  //yeni bir eleman eklemek istediğimizde
  todos = getItemsFromLS();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos)); //JSON.stringify = diziyi string'e çevirir
}

function createItem(newTodo) {
  // li oluşturma

  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(newTodo));

  // a oluşturma

  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  li.appendChild(a);

  taskList.appendChild(li);
}

function addNewItem(e) {
  if (input.value === "") {
    alert("add new item");
    //console.log("submit");
  }

  // create Item

  createItem(input.value);

  setItemToLS(input.value);

  input.value = "";

  e.preventDefault();
}

// TODO ELEMAN SİLME

function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      //tıklanılan yer x butonunun class'ı fas fa-times ise
      //console.log(e.target);
      e.target.parentElement.parentElement.remove(); //önce a'ya sonra li'ye gidip kaldıracak
      deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }
  }
  e.preventDefault();
}

function deleteTodoFromStorage(deletetodo){
    let todos = getItemsFromLS(); //logal storage'den veriyi çekeceğiz

    todos.forEach(function(todo,index){

        if(todo === deletetodo){ //kullanıcının tıkladğı elemanla silinmesi gereken eleman eşleşiyor mu bakar
            todos.splice(index,1); //bulunduğu andan itibaren 1 tanesini silecek
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos)); //local storage'a son halini gönderiyoruz
}

// Tüm Elemanları Silmek

function deleteAllItems(e) {
  if (confirm("Tüm elemanları silmek istediğinize emin misiniz?")) {

    while(taskList.firstChild){ //listenin ilk elemanı olduğu sürece yani liste boş olmadığı sürece
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
    };
  }
  //   function deleteAllItems(e) { -----> tek hamlede hepsini siler (daha kısa yolu)
  //     taskList.innerHTML = "";
  //   }

