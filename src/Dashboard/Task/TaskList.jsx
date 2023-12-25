import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Task1 from './Task1';
// import Task from './Task';

const TaskList = ({ title, tasks, addTask }) => {
    const [newTaskContent, setNewTaskContent] = useState('');

  const handleAddTask = () => {
    if (newTaskContent.trim() !== '') {
      addTask(newTaskContent);
      setNewTaskContent('');
    }
  };

    return (
        <div className="flex-1 bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <Droppable droppableId={title.toLowerCase()} direction="vertical">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task1 content={task.content} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Add a new task"
          className="p-2 border"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
        />
        <button
          className="p-2 bg-blue-500 text-white ml-2"
          onClick={handleAddTask}
        >
          Add
        </button>
      </div>
    </div>
    );
};

export default TaskList;