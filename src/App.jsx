import './App.css' 
import { useState, useEffect } from 'react';
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import QuickActions from './components/QuickActions.jsx'; 
import TechnologyFilters from './components/TechnologyFilters.jsx'; 
import useTechnologies from './components/useTechnologies';
import ProgressBar from './components/ProgressBar';

function App() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    updateAllStatuses,
    highlightRandomTech,
    progress
  } = useTechnologies();
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredByStatus = () => {
  switch(activeFilter) {
    case 'not-started':
      return technologies.filter(tech => tech.status === 'not-started');
    case 'in-progress':
      return technologies.filter(tech => tech.status === 'in-progress');
    case 'completed':
      return technologies.filter(tech => tech.status === 'completed');
    case 'all':
    default:
      return technologies;
  }
  };

  const getSearchedTechnologies = (techList) => {
    if (!searchQuery.trim()) return techList;
    
    const query = searchQuery.toLowerCase();
    return techList.filter(tech => 
      tech.title.toLowerCase().includes(query) || 
      tech.description.toLowerCase().includes(query)
    );
  };
  
  const statusFiltered = getFilteredByStatus();
  const filteredTechnologies = getSearchedTechnologies(statusFiltered);
  return (
  <div className="App"> 
    <header className="App-header">
        <h1>Технологический Трекер</h1>
        <p>Отслеживание прогресса изучения технологий</p>

        <ProgressBar 
          progress={progress}
          label="Общий прогресс" 
          color = '#db9b66'
        />
    </header>
    <main className="App-content">
        <div className="tech">

          <TechnologyFilters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter} 
          />

          <div className="search-box"> 
            <input 
              type="text" 
              placeholder="Поиск технологий..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            /> 
            <span>Найдено: {filteredTechnologies.length}</span>
          </div>

          <TechnologyCard 
              technologies={filteredTechnologies} 
              onUpdateStatus={updateStatus}
              onUpdateNotes={updateNotes}
          /> 
        </div>
         <QuickActions 
          technologies={technologies}
          onUpdateAllStatus={updateAllStatuses}
          onRandomSelect={highlightRandomTech}
        />
        <ProgressHeader technologies={technologies}/>
    </main>
  </div> 
  );
}

export default App
