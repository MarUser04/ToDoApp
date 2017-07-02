
var data= (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo:[],
    completed:[]
};



var removeImg= "<img src='remove_icon.svg' alt='remove' />";
var completeImg= "<img src='done_icon.svg' alt='complete'/>";

renderTodoList();
//accion para agregar nota si hay algo en el input
document.getElementById('add').addEventListener('click', function(){
    var value= document.getElementById('item').value;

    if(value){
          
        addItem(value);
    }
});

//para añadir al presionar enter

document.getElementById('item').addEventListener('keydown', function(e){
    var value= this.value;

    if(e.code === 'Enter' && value){
        addItem(value);
    }
})

//añadir valor

function addItem(value){
      addItemToDOM(value);
      document.getElementById('item').value="";
      data.todo.push(value);
      dataObjectUpdated();
}

function renderTodoList(){
    if(!data.todo.length && !data.completed.length) return;

    for(var i=0; i<data.todo.length; i++){
        var value= data.todo[i];
        addItemToDOM(value);
    }

    for(var j=0; j< data.completed.length; j++){
        var value= data.completed[j];
        addItemToDOM(value, true);
    }
}


function dataObjectUpdated(){
    //console.log(JSON.stringify(data));
    localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem(){
    var item= this.parentNode.parentNode;
    var parent= item.parentNode;

    var id= parent.id;

    var value= item.innerText;
    
    if(id==='todo'){
        data.todo.splice(data.todo.indexOf(value),1);
     }
    else{
        data.completed.splice(data.completed.indexOf(value),1);
    }

    dataObjectUpdated();
    parent.removeChild(item);
    
}

function completeItem(){
    var item= this.parentNode.parentNode;
    var parent= item.parentNode;

    var parentID= parent.id;

    var value= item.innerText;
    
    if(parentID==='todo'){
        data.todo.splice(data.todo.indexOf(value),1);
        data.completed.push(value);
    }
    else{
        data.completed.splice(data.completed.indexOf(value),1);
         data.todo.push(value);
    }

    var target= (parentID ==='todo') ? document.getElementById('completed'):document.getElementById('todo');
dataObjectUpdated();
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

}

function addItemToDOM(text, completed){

    var list=(completed) ? document.getElementById('completed') : document.getElementById('todo');

    var item= document.createElement('li');
    item.innerText= text;

    var buttons= document.createElement('div');
    buttons.classList.add('buttons');

    var remove= document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML=removeImg;

    remove.addEventListener('click', removeItem);

    var complete= document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML= completeImg;

    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);

    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}