import './TechnologyCard.css' 
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({technologies, onUpdateStatus, onUpdateNotes  }) { 
    const handleStatusChange = (id, direction) => {
        const tech = technologies.find(t => t.id === id);
        if (!tech) return;
        
        const statusOrder = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statusOrder.indexOf(tech.status);
        
        let newIndex;
        if (direction === 'next') {
            newIndex = currentIndex + 1;
            if (newIndex >= statusOrder.length) newIndex = 0; 
        } else {
            newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = statusOrder.length - 1; 
        }
        
        onUpdateStatus(id, statusOrder[newIndex]);
    };
    return ( 
        <div className="technologies-list">  
            <ul> 
                {technologies.map(technology => ( 
                    <li 
                        key={technology.id}
                        className={technology.status}
                    > 
                        <div className="technology-info">
                            <h3>{technology.title}</h3> 
                            <p>{technology.description}</p>
                            <div className="technology-tag">{technology.category}</div>
                            <TechnologyNotes 
                                notes={technology.notes || ''}  
                                onNotesChange={onUpdateNotes}   
                                techId={technology.id}        
                            />
                        </div> 

                        <div className="technology-buttons"> 
                            <button 
                                onClick={() => handleStatusChange(technology.id, 'prev')}
                                className="status-btn"
                            >
                                <img 
                                    src="/src/assets/left.png" 
                                    alt="Предыдущий статус"
                                    className="btn-icon"
                                />
                            </button> 
                            <div className="technology-status">
                                {technology.status === 'completed' && '✅'}
                                {technology.status === 'in-progress' && '⏳'}
                                {technology.status === 'not-started' && '❌'}
                            </div>
                            <button 
                                onClick={() => handleStatusChange(technology.id, 'next')}
                                className="status-btn"
                            >
                                 <img 
                                    src="/src/assets/right.png" 
                                    alt="Следующий статус"
                                    className="btn-icon"
                                />
                            </button> 
                        </div> 
                    </li> 
                ))} 
            </ul> 
        </div> 
    ); 
} 
export default TechnologyCard;