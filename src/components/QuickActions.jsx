import './QuickActions.css' 
import { useState } from 'react';
import Modal from './Modal';

function QuickActions({ technologies, onUpdateAllStatus, onRandomSelect }) {
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportData, setExportData] = useState('');
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
    
    const handleExport = () => {
        if (technologies.length === 0) {
            alert('Нет данных для экспорта!');
            return;
        }
        
        const data = {
            exportedAt: new Date().toISOString(),
            totalTechnologies: technologies.length,
            completed: technologies.filter(t => t.status === 'completed').length,
            technologies: technologies
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        
        setExportData(dataStr);
        
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tech-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setShowExportModal(true);
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

                <button 
                    onClick={handleExport}
                    className="action-btn export-btn"
                >
                    <span className="action-text">Экспорт данных</span>
                </button>
            </div>
             <Modal 
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Экспорт данных завершен"
            >
                <div className="export-success">
                <p>Данные успешно экспортированы!</p>
                </div>
            </Modal>
        </div>
    );
}

export default QuickActions;