import './QuickActions.css' 
function QuickActions({ technologies, onUpdateAllStatus, onRandomSelect }) {
    const handleMarkAllCompleted = () => {
        if (technologies.length === 0) return;
        
        const updatedTechs = technologies.map(tech => ({
            ...tech,
            status: 'completed'
        }));
        
        onUpdateAllStatus(updatedTechs);
    };
    const handleResetAll = () => {
        if (technologies.length === 0) return;
        
        const updatedTechs = technologies.map(tech => ({
            ...tech,
            status: 'not-started'
        }));
        
        onUpdateAllStatus(updatedTechs);
    };
    
    const handleRandomSelect = () => {
        if (technologies.length === 0) return;
        
        const notCompleted = technologies.filter(tech => tech.status !== 'completed');
        
        if (notCompleted.length === 0) {
            alert('Все технологии уже изучены!');
            return;
        }
        const randomIndex = Math.floor(Math.random() * notCompleted.length);
        const randomTech = notCompleted[randomIndex];
        
        onRandomSelect(randomTech.id);
    };
    
    return (
        <div className="quick-actions">
            <h2 className="quick-actions-title"> Быстрые действия</h2>
            
            <div className="actions-grid">
                <button 
                    onClick={handleMarkAllCompleted}
                    className="action-btn mark-all-btn"
                >
                    <span className="action-text">Отметить все как выполненные</span>
                </button>

                <button 
                    onClick={handleResetAll}
                    className="action-btn reset-btn"
                >
                    <span className="action-text">Сбросить все статусы</span>
                </button>
                
                <button 
                    onClick={handleRandomSelect}
                    className="action-btn random-btn"
                >
                    <span className="action-text">Случайный выбор следующей технологии</span>
                </button>
            </div>
            
        </div>
    );
}

export default QuickActions;