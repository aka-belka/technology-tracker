import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed', category: 'Frontend', notes: '' },
  { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress', category: 'Frontend', notes: '' },
  { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', category: 'Frontend', notes: '' },
  { id: 4, title: 'Database Design', description: 'Проектирование баз данных', status: 'not-started', category: 'Database', notes: '' }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', initialTechnologies);

  const updateStatus = (id, newStatus) => {
    setTechnologies(prev => prev.map(tech => 
      tech.id === id ? { ...tech, status: newStatus } : tech
    ));
  };

  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev => prev.map(tech => 
      tech.id === techId ? { ...tech, notes: newNotes } : tech
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

  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    setTechnologies,
    updateStatus,
    updateNotes,
    updateAllStatuses,
    highlightRandomTech,
    progress: calculateProgress()
  };
}

export default useTechnologies;