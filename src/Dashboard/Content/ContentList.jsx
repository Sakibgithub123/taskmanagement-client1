// ContentList.js
import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import useAxiousSecure from '../../hook/useAxiousSecure';
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query';



const ContentList = ({ title, tasks, addTask }) => {
  const axiousSecure = useAxiousSecure()
  const [newTaskContent, setNewTaskContent] = useState('');

  // const handleAddTask = () => {
  //   if (newTaskContent.trim() !== '') {
  //     addTask(newTaskContent);
  //     setNewTaskContent('');
  //   }
  // };

  // delete task
  const handleDelete=(_id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
      if (result.isConfirmed) {
          const cancelParcel = await axiousSecure.patch(`/todo/${_id}`)
          if (cancelParcel.data.modifiedCount > 0) {
              Swal.fire({
                  title: "Success!",
                  text: "Your ptask deleted.",
                  icon: "success"
              });
              
             

          }
      }
  });
}



  return (
    <div className="flex-1 bg-gray-200 p-4 my-10">
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
                    <div className="p-5 space-y-2 border bg-[#fff]">
                      {/* <p>{task._id}</p> */}
                      <p className='text-xl font-semibold text-[#000000]'>{task.title}</p>
                      <p className='text-base font-medium text-[#000000]'>{task.description}</p>
                      <div className='flex flex-row gap-10'>
                        <p className='text-base  font-normal text-[#000000]'>Deadline: <span className='badge badge-outline '>{task.deadline}</span></p>
                        <p className='text-base  font-normal text-[#000000]'>Priority: <span className='badge badge-outline'>{task.priority}</span></p>
                      </div>
                      {/* <Link to={`/updateFood/${task._id}`}><button className="btn btn-outline btn-xs text-success">Edit</button></Link> */}
                      <div className='flex justify-end'>
                      <button onClick={() => handleDelete(task._id)} className="btn btn-outline btn-xs  text-[#2a92fa]">Delete</button>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </div>
  );
};

export default ContentList;
