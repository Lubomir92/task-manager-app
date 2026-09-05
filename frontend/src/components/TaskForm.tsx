import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreateTask } from '../hooks/useTasks';
import { CreateTaskInput } from '../types/task';
import { Plus, X, Calendar, Flag } from 'lucide-react';

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
      className="glass rounded-2xl p-6 border border-white/5"
      layout
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold text-white">
            {isExpanded ? 'Create New Task' : 'Add a new task...'}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400"
        >
          <Plus className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-4 overflow-hidden"
          >
            <div>
              <input
                {...register('title', { required: 'Title is required' })}
                placeholder="What do you need to do?"
                className="input-modern text-lg"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-2">{errors.title.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register('description')}
                placeholder="Add some details... (optional)"
                className="input-modern resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select {...register('priority')} className="input-modern pl-10">
                  <option value="LOW">🟢 Low Priority</option>
                  <option value="MEDIUM">🟡 Medium Priority</option>
                  <option value="HIGH">🔴 High Priority</option>
                </select>
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  {...register('dueDate')}
                  className="input-modern pl-10"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="btn-primary-modern flex-1"
                disabled={createTask.isPending}
              >
                {createTask.isPending ? 'Creating...' : '✨ Create Task'}
              </button>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="btn-secondary-modern"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskForm;