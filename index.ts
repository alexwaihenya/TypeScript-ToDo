
window.addEventListener("load", () => {
  const formInput = document.querySelector<HTMLFormElement>("#form-inputs");
  const titleTask = document.querySelector<HTMLInputElement>("#title");
  const taskDescription = document.querySelector<HTMLInputElement>("#description");
  const taskDueDate = document.querySelector<HTMLInputElement>("#dueDate");
  const taskBox = document.querySelector(".taskBox");

  interface TaskDetails {
    taskTitle: string;
    taskDescription: string;
    taskDueDate: string;
  }

  class UnCompletedTasks implements TaskDetails {
    constructor(
      public taskTitle: string,
      public taskDescription: string,
      public taskDueDate: string
    ) {}
  }
  class CompletedTasks implements TaskDetails {
    constructor(
      public taskTitle: string,
      public taskDescription: string,
      public taskDueDate: string,
      public taskIsComplete : boolean
    ) {}

    // checkTaskComplete(){
    //   if(this.taskIsComplete === true){
    //     //  checkDone();
    //   }
    //   else{
    //     DisplayUncompleted()
    //   }
    // }
  }

  let UnCompletedTask: UnCompletedTasks[] = [];
  let CompletedTask: CompletedTasks[] = [];

  formInput.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskInputs =
      titleTask.value && taskDescription.value && taskDueDate.value;

    if (!taskInputs) {
      console.log("All fields are required...");
    } else {
      UnCompletedTask.push(
        new UnCompletedTasks(
          titleTask.value,
          taskDescription.value,
          taskDueDate.value
        )
      );
      DisplayUncompleted();
      // console.log(UnCompletedTask);
      titleTask.value = "";
      taskDescription.value = "";
      taskDueDate.value = "";
    }
  });
 function deleteitem (index:number){
  UnCompletedTask.splice(index,1);
  DisplayUncompleted()

 }
 function UpdateTask(index: number){
  if(index !== undefined){
    titleTask.value = UnCompletedTask[index].taskTitle;
    taskDescription.value = UnCompletedTask[index].taskDescription;
    taskDueDate.value = UnCompletedTask[index].taskDueDate;

    const submit= document.querySelector(".submit")
    UnCompletedTask.splice(index,1)
    submit.addEventListener('click',()=>{
      if(index !== undefined){
      titleTask.value = UnCompletedTask[index].taskTitle;
      taskDescription.value = UnCompletedTask[index].taskDescription;
      taskDueDate.value = UnCompletedTask[index].taskDueDate;
      }
      else{
        let newTask = 
          new UnCompletedTasks(
            titleTask.value,
            taskDescription.value,
            taskDueDate.value
          );
          UnCompletedTask.push(newTask);
          titleTask.value = "",
          taskDescription.value = "",
          taskDueDate.value = ""


      }


      
    })

  }

 }
 

 
  function DisplayUncompleted() {
    const taskAdd = document.querySelector(".uncompleteditems")

    while (taskAdd.hasChildNodes()){
      taskAdd.removeChild(taskAdd.firstChild);
    }

    UnCompletedTask.forEach(({taskTitle, 
      taskDescription, 
      taskDueDate},index:number)=>{

        const titledisplay = document.createElement("li");
        titledisplay.textContent = taskTitle
    
        const descdisplay = document.createElement("li");
        descdisplay.textContent = taskDescription;
    
        const datedisplay = document.createElement("li");
        datedisplay.textContent = taskDueDate;



        const checkTaskDone = document.createElement("input");
        checkTaskDone.type = "checkbox";
        checkTaskDone.checked = false;


    
        checkTaskDone.addEventListener("click",()=>{
    
        let completedList = document.querySelector(".completedList")
        completedList.appendChild(taskslist);
        
    
        })

    
        const btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Delete";
        btnDelete.style.padding="8px";    
    
        btnDelete.addEventListener('click',()=>{
         deleteitem(index);  
        // taskslist.style.visibility="hidden"
        });
        // btnDelete.style.display="block";
        // btnDelete.style.display = "none";
    
        const btnUpdate = document.createElement("button");
        btnUpdate.innerHTML = "Update";
        btnUpdate.style.padding="8px";

        btnUpdate.addEventListener('click',()=>{
          UpdateTask(index)
        })
    
       
    
        
        
    
        const newdiv= document.createElement("div");
        newdiv.appendChild(checkTaskDone);
    
        const taskslist = document.createElement("div")
    
        taskslist.appendChild(titledisplay);
        taskslist.appendChild(descdisplay);
        taskslist.appendChild(datedisplay);
        taskslist.appendChild(newdiv);
        taskslist.appendChild(btnDelete)
        taskslist.appendChild(btnUpdate)
    
       
    
        const uncompleteditems=document.querySelector(".uncompleteditems")
        uncompleteditems.appendChild(taskslist)
      })


   

  
  }

  
});
