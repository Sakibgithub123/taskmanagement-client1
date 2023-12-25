import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';
import { DragDropContext , Droppable, Draggable } from 'react-beautiful-dnd';
import TaskList from './TaskList';

const Task = () => {

    //     const [todos, setTodos] = useState([])
    //     const [inputValue, setInputValue] = useState('')

    //   function handleChange(e){
    //     setInputValue(e.target.value)
    //   }

    //   function handleSubmit(e){
    //     e.preventDefault()
    //     setTodos([...todos, inputValue])
    //     setInputValue('')
    //   }

    //   function handleDelete(index){
    //     const newTodos = [...todos]
    //     newTodos.splice(index, 1)
    //     setTodos(newTodos)
    //   }
    const [tasks, setTasks] = useState([
        { id: 'task-1', content: 'Task 1', list: 'todo' },
        { id: 'task-2', content: 'Task 2', list: 'todo' },
        { id: 'task-3', content: 'Task 3', list: 'ongoing' },
        { id: 'task-4', content: 'Task 4', list: 'completed' },
    ]);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        movedTask.list = result.destination.droppableId;
        updatedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(updatedTasks);
    };

    const addTask = (content, list) => {
        const newTask = {
            id: `task-${tasks.length + 1}`,
            content,
            list,
        };

        setTasks([...tasks, newTask]);
    };



    return (
        //     <div>
        //     <h1>Todo List</h1>
        //     <form>
        //       <input type='text' value={inputValue} onChange={handleChange}/>
        //       <button onClick={handleSubmit}>Add Todo</button>
        //     </form>
        //     <ul>
        //       {todos.map((todo, index) => (
        //         <li key={index}>{todo}
        //         <button onClick={() =>handleDelete(index)}>Delete</button>
        //         </li>
        //       ))}
        //     </ul>
        //   </div>
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold mb-4">Task Management Dashboard</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-tasks" direction="horizontal">
                    {(provided) => (
                        <div
                            className="flex space-x-8"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <TaskList
                                title="To-Do"
                                tasks={tasks.filter((task) => task.list === 'todo')}
                                addTask={(content) => addTask(content, 'todo')}
                            />
                            <TaskList
                                title="Ongoing"
                                tasks={tasks.filter((task) => task.list === 'ongoing')}
                                addTask={(content) => addTask(content, 'ongoing')}
                            />
                            <TaskList
                                title="Completed"
                                tasks={tasks.filter((task) => task.list === 'completed')}
                                addTask={(content) => addTask(content, 'completed')}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );

};

export default Task;