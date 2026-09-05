import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types/task';
import { useUpdateTask, useDeleteTask } from '../hooks/useTasks';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const priorityColors = {
    LOW: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    HIGH: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const handleToggleComplete = () => {
    updateTask.mutate({
      id: task.id,
      completed: !task.completed,
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask.mutate(task.id);
    }
  };

  const handleUpdateTitle = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      updateTask.mutate({
        id: task.id,
        title: editedTitle,
      });
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`card p-4 transition-all duration-200 ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mt-1 w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
        />

        <div className="flex-1">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="input-field flex-1"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleUpdateTitle()}
              />
              <button
                onClick={handleUpdateTitle}
                className="btn-primary"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h3 className={`text-lg font-semibold dark:text-white ${
                task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                  {task.description}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 text-gray-500 hover:text-primary-500 transition-colors"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;