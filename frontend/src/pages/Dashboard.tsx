import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { data: tasks, isLoading } = useTasks();

  if (isLoading) {
    return <div className="text-center py-12 text-white">Loading dashboard...</div>;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No tasks yet. Create your first task!</p>
      </div>
    );
  }

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter(t => t.priority === 'HIGH' && !t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">📊 Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-2xl p-6 text-center border border-white/5">
          <p className="text-3xl font-bold text-purple-400">{total}</p>
          <p className="text-gray-400 text-sm mt-1">Total Tasks</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center border border-white/5">
          <p className="text-3xl font-bold text-green-400">{completed}</p>
          <p className="text-gray-400 text-sm mt-1">Completed</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center border border-white/5">
          <p className="text-3xl font-bold text-yellow-400">{pending}</p>
          <p className="text-gray-400 text-sm mt-1">Pending</p>
        </div>
        <div className="glass rounded-2xl p-6 text-center border border-white/5">
          <p className="text-3xl font-bold text-red-400">{highPriority}</p>
          <p className="text-gray-400 text-sm mt-1">High Priority</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 border border-white/5">
        <h3 className="text-lg font-semibold text-white mb-4">📈 Task Status</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Completed</span>
              <span>{completed} / {total}</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;