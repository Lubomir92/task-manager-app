import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useCreateTask } from '../hooks/useTasks';
import { CreateTaskInput } from '../types/task';

const TaskForm: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateTaskInput>();
  const createTask = useCreateTask();

  const onSubmit = (data: CreateTaskInput) => {
    createTask.mutate(data);
    reset();
    setIsExpanded(false);
  };

  return (
    <motion.div
      className="card p-6"
      layout
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left flex items-center justify-between"
      >
        <span className="text-xl font-semibold dark:text-white">
          {isExpanded ? '📝 Add New Task' : '➕ Click to add new task'}
        </span>
        <span className="text-2xl text-primary-500">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {isExpanded && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 space-y-4"
        >
          <div>
            <input
              {...register('title', { required: 'Title is required' })}
              placeholder="Task title..."
              className="input-field"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register('description')}
              placeholder="Description (optional)"
              className="input-field resize-none"
              rows={3}
            />
          </div>

          <div>
            <select
              {...register('priority')}
              className="input-field"
            >
              <option value="LOW">🟢 Low Priority</option>
              <option value="MEDIUM">🟡 Medium Priority</option>
              <option value="HIGH">🔴 High Priority</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={createTask.isPending}
            >
              {createTask.isPending ? 'Creating...' : '✨ Create Task'}
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
};

export default TaskForm;