import { useEffect, useState } from "react";
import {DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
const inicialState=JSON.parse(localStorage.getItem('todos')) || [
  {
    id: 1,
    text: "Aprender react",
    email: "<EMAIL>",
  },
  {
    id: 2,
    text: "Aprender js",
    email: "<EMAIL>",
  },
  {
    id: 3,
    text: "Aprender vue.js",
    email: "<EMAIL>",
  }
  
]
const App = (second) => { 
  const [todos,setTodos]=useState(inicialState);

  useEffect (()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
    console.log(todos);
  },[todos])
  const handleDra=result=>{
    if(!result.destination) return; 
    //  console.log(result)
    const startIndex=result.source.index;
    const endIndex=result.destination.index;
    const copyArray=[...todos];
    const [reorderedItem]=copyArray.splice(startIndex,1);
    //  console.log(reorderedItem);
    copyArray.splice(endIndex,0,reorderedItem);
    setTodos(copyArray);
  
  }
  return (
  <DragDropContext onDragEnd={handleDra}>
    <h1>todo</h1>
    <Droppable droppableId="todos">
      {
      (droppableProvider) =>(
        <ul ref={droppableProvider.innerRef}
        {...droppableProvider.droppableProps}
        
        >
          {todos.map((todo,index) => (
            <Draggable  
              index={index} 
              key={todo.id} 
              draggableId={`${todo.id}`} 
            >
              {
                (provided)=>
                  <li ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  >{todo.text}</li>
                
              }
              
            </Draggable>
          ))}
          {droppableProvider.placeholder}
        </ul>
        )
      }      
      
    </Droppable>
  </DragDropContext>
  )

}
export default App;