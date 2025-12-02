import './TechnologyFilters.css' 
function TechnologyFilters({ activeFilter, onFilterChange }) {

    const filters = [
        { id: 'all', label: 'Все' },
        { id: 'not-started', label: 'Не начатые' },
        { id: 'in-progress', label: 'В процессе' },
        { id: 'completed', label: 'Выполненные'}
    ];
    
    return (
        <div className="technology-filters">
            <h2 className="filters-title">Список технологий</h2>
            
            <div className="filters-container">
                {filters.map(filter => (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                        title={`Показать ${filter.label.toLowerCase()} технологии`}
                    >
                        <span className="filter-label">{filter.label}</span>
                        
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TechnologyFilters;