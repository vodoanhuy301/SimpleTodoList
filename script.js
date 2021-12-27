var tab = JSON.parse(localStorage.getItem("todolist") || "[]");
var list = $(".todolist__list-items");
var tabLists = $(".todolist__tab-list");
var listItems = $(".todolist__list-items");

// var tab = [{ name: "new", content: ["item 1", "item 2", "item 3"] }];
var currentTab = localStorage.getItem("tab");

// store.push(tab);
// localStorage.setItem("tab", "new");
// localStorage.clear();
// console.log(JSON.parse(localStorage.getItem("todolist") || "[]"));
// tab.forEach(item =>{
// item.content = (item.content).filter(x => x !=="item 3")
// })
// tab.push({name: "new2", content: ["abc", "đã test"]})
// for ( var currentTab of tab){
//   if (currentTab.name=="new2"){
//     currentTab.content.push("đã thêm gòi");
//   }
// }
// localStorage.setItem("todolist", JSON.stringify(tab));

function tabIndex() {
  return tab.findIndex((element) => element.name == currentTab);
}
// console.log(tabIndex());
function loadTab() {
  tab.forEach((tab) => {
    let xTab = document.createElement("div");
    xTab.classList.add("todolist__tab");
    let xTabTitle = document.createElement("div");
    xTabTitle.classList.add("tab-title");
    xTabTitle.innerHTML = tab.name;
    let xTabBtn = document.createElement("div");
    xTabBtn.classList.add("tab-btn");
    xTabBtn.innerHTML = "X";
    xTab.append(xTabTitle, xTabBtn);
    tabLists.append(xTab);
  });
}
loadTab();
function loadItem() {
  if (tab[tabIndex()]) {
    tab[tabIndex()].content.forEach((item) => {
      let xItem = document.createElement("li");
      xItem.classList.add("todolist__item");
      let xTitle = document.createElement("h3");
      xTitle.classList.add("todolist__item-title");
      xTitle.innerHTML = item;
      let xBtn = document.createElement("div");
      xBtn.classList.add("todolist__item-btn");
      xBtn.innerHTML = "X";
      xItem.append(xTitle, xBtn);
      listItems.append(xItem);
    });
  }
}
loadItem();
function deleteItem(content) {
  tab.forEach((item) => {
    if (item.name == currentTab) {
      item.content = item.content.filter((x) => x !== content && x !== null);
    }
  });
  save();
  location.reload();
}
function newItem(item) {
  tab[tabIndex()].content.push(item);
  save();
  location.reload();
}

function addTab(newTab) {
  tab.push({ name: newTab, content: [] });
  setCurrentTab(tab[tab.length - 1].name);
  save();
  location.reload();
}
function save() {
  localStorage.setItem("todolist", JSON.stringify(tab));
}
function removeTab(rmTab) {
  tab = tab.splice(rmTab, 1);
  setCurrentTab(tab[tab.length - 1].name);
  save();
  location.reload();
}
function setCurrentTab(currTab) {
  localStorage.setItem("tab", currTab);
}
// setCurrentTab("new");
//Delete
$(".todolist__item-btn").click(function () {
  this.parentNode.remove();
  deleteItem(this.parentNode.children[0].innerHTML);
  // console.log(this.parentNode.children[0].innerHTML);
});

///Overlay
$("#btn-add").click(function () {
  $(".overlay__add-item").toggleClass("overlay__add-item--show");
});
$("#cancel-item").click(function () {
  $(".overlay__add-item").toggleClass("overlay__add-item--show");
});
$("#add-item").click(function () {
  newItem($("#item-title")[0].value);
  $(".overlay__add-item").toggleClass("overlay__add-item--show");
  // console.log($("#item-title")[0].value);
});
$(".tab-title").click(function () {
  localStorage.setItem("tab", this.innerHTML);
  // console.log(this.firstChild.innerHTML);
  location.reload();
});
$("#btn-addTab").click(function () {
  $(".overlay__add-tab").toggleClass("overlay__add-item--show");
});
$("#add-tab").click(function () {
  addTab($("#tab-title")[0].value);
  // newItem($("#item-title")[0].value);
  $(".overlay__add-tab").toggleClass("overlay__add-item--show");
  // console.log($("#item-title")[0].value);
});
$(".tab-btn").click(function () {
  this.parentNode.remove();
  // console.log(this.parentNode);
  removeTab(this.parentNode.children[0].innerHTML);
});
