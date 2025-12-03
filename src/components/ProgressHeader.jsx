import './ProgressHeader.css' 
import ProgressBar from './ProgressBar';
function ProgressHeader({technologies }) { 
    const total = technologies.length;
    const completed = technologies.filter(technology => technology.status === 'completed').length;
    const in_progr = technologies.filter(technology => technology.status === 'in-progress').length;
    const not_start = technologies.filter(technology => technology.status === 'not-started').length;
    const progress=Math.round(completed/total*100);

    const pop_category= () => {
        if (technologies.length === 0) return 'Нет данных';
        const categoryCount = {};
        
        technologies.forEach(tech => {
            const category = tech.category || 'Без категории';
            categoryCount[category] = (categoryCount[category] || 0) + 1;
        });
        
        let mostPopular = '';
        let maxCount = 0;
        
        for (const [category, count] of Object.entries(categoryCount)) {
            if (count > maxCount) {
                maxCount = count;
                mostPopular = category;
            }
        }
        return { 
            name: mostPopular, 
            count: maxCount
        };
    };
    
    const popular_category = pop_category();
    return ( 
        <div className="stats-card"> 
            <h2 className="stats-title">Статистика</h2> 
            <div className="stats-grid">
                <div className="stat-box">
                    <div className="stat-label">Общее количество технологий</div>
                    <div className="stat-value">{total}</div>
                </div>

                <div className="stat-box">
                    <div className="stat-label">Изучено</div>
                    <div className="stat-value">{completed}</div>
                </div>

                <div className="stat-box">
                    <div className="stat-label">В процессе</div>
                    <div className="stat-value">{in_progr}</div>
                </div>

                <div className="stat-box">
                    <div className="stat-label">Не начато</div>
                    <div className="stat-value">{not_start}</div>
                </div>
                <div className="stat-box">
                    <div className="stat-label">Самая популярная категория</div>
                    <div className="stat-value">{popular_category.name}</div>
                </div>
            </div>
            <ProgressBar 
                progress={progress}
                label="Общий прогресс" 
                color = '#db9b66'
                />

        </div> 
    ); 
} 
export default ProgressHeader;