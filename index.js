const addForm=document.querySelector(".add");
const tasks=document.querySelector(".tasks");
const clear=document.querySelector(".clear");
const messageSpan=document.querySelector(".message span");
const searchForm=document.querySelector(".search");

function updatedMessage(){
    const messageLength=tasks.children.length;
    messageSpan.textContent=`You have ${messageLength} pending tasks.`
}
updatedMessage();

addForm.addEventListener("submit", event=>{
    event.preventDefault();
    const value=addForm.task.value.trim();
    if(value.length){
        console.log(value);
        tasks.innerHTML += `<li>
                                <span>${value}</span>
                                <i class="bi bi-trash-fill delete"></i>
                            </li>`
        addForm.reset();
        updatedMessage();
    }
});

tasks.addEventListener("click", event=>{
    
    const deleteItem= event.target.classList.contains("delete");
    if(deleteItem){
        event.target.parentElement.remove();
        updatedMessage();
    }
})

clear.addEventListener("click", event=>{
    const clearAll = tasks.querySelectorAll("li");
    clearAll.forEach(item=>item.remove());
    updatedMessage();
})

function filterItem(term){
    Array.from(tasks.children)
        .filter(item =>{
            return !item.textContent.toLowerCase().includes(term);
        })
        .forEach(task => task.classList.add("hide"));
     
     Array.from(tasks.children)
        .filter(item =>{
            return item.textContent.toLowerCase().includes(term);
        })
        .forEach(task => task.classList.remove("hide"));
}

searchForm.addEventListener("keyup",event=>{
    const term = searchForm.task.value.trim().toLowerCase();
    filterItem(term);
})

searchForm.addEventListener("click", event=>{
    if(event.target.classList.contains("reset")){
        searchForm.reset();
        const term = searchForm.task.value.trim().toLowerCase();
        filterItem(term);
    }
    
})