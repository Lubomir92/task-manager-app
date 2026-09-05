import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../hooks/useTasks';
import TaskItem from './TaskItem';
import SearchBar from './SearchBar';

const TaskList: React.FC = () => {
  const { data: tasks, isLoading, error } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = priorityFilter === 'ALL' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchQuery, priorityFilter]);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Failed to load tasks. Please try again.</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 card p-8">
        <p className="text-4xl mb-4">🎯</p>
        <h3 className="text-xl font-semibold dark:text-white">No tasks yet</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Click the button above to create your first task!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <SearchBar onSearch={setSearchQuery} onFilter={setPriorityFilter} />
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold dark:text-white">
          Your Tasks ({filteredTasks.length})
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {tasks.filter(t => t.completed).length} completed
        </span>
      </div>
      
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;