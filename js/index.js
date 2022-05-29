const inputElement = document.getElementById("text");
const containner = document.querySelector(".section-list");
const button = document.getElementById("button");
let contador = 0;



const validateInput = () => inputElement.value.trim().length > 0; 


const handleAddTask = () => {
  const inputsValidado = validateInput();
     if (!inputsValidado) {
       return alert("Campo nao pode estar vazio!");
  }
  ++contador;

  const containerList = document.createElement("div");
  containerList.classList.add("list");
  containerList.setAttribute("id", contador);




  const item = document.createElement("p");
  //item.classList.add("name")
  item.addEventListener("click", () => handleClickCompleted(item));
  item.innerText =  inputElement.value;
  
  

  
  const itemDelete = document.createElement("i");
  itemDelete.addEventListener("click", () => handleClickDelete(containerList, item));
  itemDelete.classList.add("delete");
  itemDelete.classList.add("fa-solid");
  itemDelete.classList.add("fa-trash-can");


  containerList.appendChild(item);
  containerList.appendChild(itemDelete);
  containner.appendChild(containerList);
  inputElement.value = "";
 

  updateLocalStorege();
}




function handleClickCompleted(item) {
  const tasks = containner.childNodes;
  for (const task of tasks) {
    const moldes = task.firstChild.isSameNode(item);
    if (moldes) {
      task.firstChild.classList.toggle("name");
      
    };
    
  };
  updateLocalStorege();
  
};



function handleClickDelete(containerList,item) {
  const tasks = containner.childNodes;
  for (const task of tasks) {
    const moldes = task.firstChild.isSameNode(item);
    if (moldes) {
      containerList.remove();
      
    };
    
  };
  updateLocalStorege();
  
};



function updateLocalStorege() {
  const tasks = containner.childNodes;
  const localStoreList = [...tasks].map(task => {
    const text = task.firstChild;
    const isCompleted = text.classList.contains("name");
    return { description: text.innerText, isCompleted: isCompleted };
  });
  localStorage.setItem('tasks', JSON.stringify(localStoreList));
};



function getLocalStoreItens() {
  const itensFromLocalStorege = JSON.parse(localStorage.getItem('tasks'));
  //console.log([itensFromLocalStorege]);
  if (!itensFromLocalStorege) return;
  for (const task of itensFromLocalStorege) {
    const containerList = document.createElement("div");
  containerList.classList.add("list");
  containerList.setAttribute("id", contador);


    
    
  const item = document.createElement("p");
    item.addEventListener("click", () => handleClickCompleted(item));
    item.innerText = task.description;
    if (task.isCompleted) {
      item.classList.add("name");
      
    };
  
  


  const itemDelete = document.createElement("i");
    itemDelete.addEventListener("click", () => handleClickDelete(containerList, item));
  itemDelete.classList.add("delete");
  itemDelete.classList.add("fa-solid");
  itemDelete.classList.add("fa-trash-can");


    containerList.appendChild(item);
  containerList.appendChild(itemDelete);
  containner.appendChild(containerList);
  inputElement.value = "";
    
  };
  
};
getLocalStoreItens();



button.addEventListener("click", () => handleAddTask());
