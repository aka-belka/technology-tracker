import './App.css' 
import { useState } from 'react';
import TechnologyCard from './components/TechnologyCard.jsx';
import ProgressHeader from './components/ProgressHeader.jsx';
import QuickActions from './components/QuickActions.jsx'; 
import TechnologyFilters from './components/TechnologyFilters.jsx'; 

function App() {
  const [technologies, setTechnologies] = useState([ 
    { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed', category: 'Frontend' }, 
    { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress', category: 'Frontend' }, 
    { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', category: 'Frontend'},
    { id: 4, title: 'Database Design', description: 'Проектирование баз данных', status: 'not-started', category: 'Database'}
  ]); 
  const [activeFilter, setActiveFilter] = useState('all');
  const updateStatus = (id, newStatus) => {
    setTechnologies(prev => prev.map(technology => 
      technology.id === id ? { ...technology, status: newStatus } : technology
    ));
  };
  
  const updateAllStatuses = (updatedTechs) => {
    setTechnologies(updatedTechs);
  };
  
  const highlightRandomTech = (techId) => {
    setTechnologies(prev => prev.map(tech => 
      tech.id === techId ? { ...tech, status: 'in-progress' } : tech
    ));
  };

  const getFilteredTechnologies = () => {
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
  
  const filteredTechnologies = getFilteredTechnologies();

  return (
  <div className="App"> 
    <header className="App-header">
        <h1>Технологический Трекер</h1>
        <p>Отслеживание прогресса изучения технологий</p>
    </header>
    <main className="App-content">
        <div className="tech">
          <TechnologyFilters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter} 
          />
          <TechnologyCard 
              technologies={filteredTechnologies} 
              onUpdateStatus={updateStatus}/> 
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
