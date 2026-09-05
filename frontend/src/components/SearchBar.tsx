import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (priority: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilter }) => {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('ALL');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={handleSearch}
        className="input-field flex-1"
      />
      <select value={priority} onChange={handleFilter} className="input-field md:w-48">
        <option value="ALL">All Priorities</option>
        <option value="HIGH">🔴 High</option>
        <option value="MEDIUM">🟡 Medium</option>
        <option value="LOW">🟢 Low</option>
      </select>
    </div>
  );
};

export default SearchBar;