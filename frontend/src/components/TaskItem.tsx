import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types/task';
import { useUpdateTask, useDeleteTask } from '../hooks/useTasks';
import { Edit2, Trash2, Check, Clock, AlertCircle } from 'lucide-react';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const priorityColors = {
    LOW: 'bg-green-500/20 text-green-400 border-green-500/20',
    MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
    HIGH: 'bg-red-500/20 text-red-400 border-red-500/20',
  };

  const priorityIcons = {
    LOW: '🟢',
    MEDIUM: '🟡',
    HIGH: '🔴',
  };

  const handleToggleComplete = () => {
    updateTask.mutate({ id: task.id, completed: !task.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      deleteTask.mutate(task.id);
    }
  };

  const handleUpdateTitle = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      updateTask.mutate({ id: task.id, title: editedTitle });
    }
    setIsEditing(false);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`glass rounded-xl p-4 border border-white/5 transition-all duration-300 ${
        task.completed ? 'opacity-60' : 'hover:border-purple-500/20'
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggleComplete}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-1 ${
            task.completed
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-transparent'
              : 'border-gray-600 hover:border-purple-500'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="input-modern flex-1"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleUpdateTitle()}
              />
              <button onClick={handleUpdateTitle} className="btn-primary-modern">
                Save
              </button>
            </div>
          ) : (
            <div>
              <h3 className={`text-lg font-semibold text-white ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
                {isOverdue && (
                  <span className="ml-2 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Overdue
                  </span>
                )}
              </h3>
              {task.description && (
                <p className="text-gray-400 text-sm mt-1">{task.description}</p>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`badge-modern ${priorityColors[task.priority]}`}>
              {priorityIcons[task.priority]} {task.priority}
            </span>
            {task.dueDate && (
              <span className={`badge-modern bg-white/5 text-gray-400 border border-white/5 flex items-center gap-1 ${
                isOverdue ? 'text-red-400 border-red-500/20' : ''
              }`}>
                <Clock className="w-3 h-3" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;