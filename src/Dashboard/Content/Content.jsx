import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// import TaskList from './TaskList';
import ContentList from './ContentList';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import useAxiousSecure from '../../hook/useAxiousSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';

const Content = () => {
  const axiousSecure = useAxiousSecure()
  const {user}=useContext(AuthContext)
  // const [tasks, setTasks] = useState([
  //   // { id: 'task-1', content: 'Task 1', list: 'todo' },
  //   // { id: 'task-2', content: 'Task 2', list: 'todo' },
  //   // { id: 'task-3', content: 'Task 3', list: 'ongoing' },
  //   // { id: 'task-4', content: 'Task 4', list: 'completed' },
  // ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.list = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  const addTask = (title, list) => {
    const newTask = {
      id: `task-${tasks.length + 1}`,
      title,
      list,
    };

    setTasks([...tasks, newTask]);
  };
  //add task
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const onSubmit = async (data) => {
    console.log(data)
    const newTask = {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      priority: data.priority,
      list: 'todo',
      email: user.email,
    }

    const bookParcel = await axiousSecure.post('/todo', newTask)
    if (bookParcel.data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Task added!",
        icon: "success"
      });
      refetch();

    }
  }

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const result = await axiousSecure.get(`/todo/${user.email}`)
      return result.data
    }
  })

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Task Management Dashboard</h1>
    <div className='text-center'>
    <button className="btn bg-[#2a92fa] text-[#ffffff] my-10" onClick={() => document.getElementById('my_modal_3').showModal()}>Create Task</button>
    </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input type="text" {...register("title", { required: true })} placeholder="name" className="input input-bordered" />
              {errors.title?.type === "required" && <span className="text-red-900">Title field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input type="text" {...register("description", { required: true })} placeholder="description" className="input input-bordered" />
              {errors.description?.type === "required" && <span className="text-red-900">Description field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <input type="text" {...register("deadline", { required: true })} placeholder="deadline" className="input input-bordered" />
              {errors.deadline?.type === "required" && <span className="text-red-900">Deadline field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <select defaultValue="default" {...register("priority", { required: true })} className="select select-bordered w-full max-w-xs">
                <option disabled defaultValue="default">Select here...</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
              {errors.role?.type === "required" && (
                <p className="text-red-400">Priority is required</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#2a92fa] text-[#ffffff]">Add</button>
            </div>
          </form>
        </div>
      </dialog>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-8">
          <Droppable droppableId="todo" direction="vertical">
            {(provided) => (
              <div
                className="flex-1 bg-gray-200 p-4 space-y-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ContentList
                  title="To-Do"
                  tasks={tasks.filter((task) => task.list === 'todo')}
                  addTask={(title) => addTask(title, 'todo')}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="ongoing" direction="vertical">
            {(provided) => (
              <div
                className="flex-1 bg-gray-200 p-4 space-y-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ContentList
                  title="Ongoing"
                  tasks={tasks.filter((task) => task.list === 'ongoing')}
                  addTask={(content) => addTask(content, 'ongoing')}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="completed" direction="vertical">
            {(provided) => (
              <div
                className="flex-1 bg-gray-200 p-4 space-y-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <ContentList
                  title="Completed"
                  tasks={tasks.filter((task) => task.list === 'completed')}
                  addTask={(content) => addTask(content, 'completed')}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Content;