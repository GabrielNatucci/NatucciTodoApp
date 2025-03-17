import { useState, useEffect } from 'react';
import "./LeftPanel.css";

const LeftPanel = ({
    activeTimeFilter,
    setActiveTimeFilter,
    activeProject,
    setActiveProject,
    stats,
    tasks
}) => {
    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem('projects');
        return savedProjects ? JSON.parse(savedProjects) : [
            { id: 'all', name: 'Todas' },
            { id: 'trabalho', name: 'Trabalho' },
            { id: 'pessoal', name: 'Pessoal' },
            { id: 'estudos', name: 'Estudos' }
        ];
    });

    // Atualiza a contagem de tarefas por projeto
    const projectCounts = tasks?.reduce((counts, task) => {
        const projectId = task.project || 'all';
        counts[projectId] = (counts[projectId] || 0) + 1;
        return counts;
    }, {});

    // Salva os projetos no localStorage quando houver mudanças
    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    const addNewProject = () => {
        const projectName = prompt('Digite o nome do novo projeto:');
        if (projectName?.trim()) {
            const newProject = {
                id: projectName.toLowerCase().replace(/\s+/g, '-'),
                name: projectName.trim()
            };
            setProjects([...projects, newProject]);
        }
    };

    return (
        <section className="left-panel">
            <div className="left-panel-header">
                <h1>NATUCCI TODO APP</h1>

                <nav className="time-filters">
                    <button
                        className={activeTimeFilter === 'hoje' ? 'active' : ''}
                        onClick={() => setActiveTimeFilter('hoje')}
                    >
                        <span className="icon">📅</span>
                        Hoje
                    </button>
                    <button
                        className={activeTimeFilter === 'semana' ? 'active' : ''}
                        onClick={() => setActiveTimeFilter('semana')}
                    >
                        <span className="icon">📊</span>
                        Esta Semana
                    </button>
                    <button
                        className={activeTimeFilter === 'todas' ? 'active' : ''}
                        onClick={() => setActiveTimeFilter('todas')}
                    >
                        <span className="icon">📋</span>
                        Todas
                    </button>
                </nav>
            </div>

            <div className="left-panel-projects">
                <h2>
                    <span className="icon">📁</span>
                    Projetos
                </h2>
                <div className="projects-list">
                    {projects.map(project => (
                        <button
                            key={project.id}
                            className={`project-item ${activeProject === project.id ? 'active' : ''}`}
                            onClick={() => setActiveProject(project.id)}
                        >
                            <span className="project-name">{project.name}</span>
                            {projectCounts[project.id] > 0 && (
                                <span className="project-count">{projectCounts[project.id]}</span>
                            )}
                        </button>
                    ))}
                    <button className="add-project" onClick={addNewProject}>
                        <span className="icon">+</span>
                        Adicionar Projeto
                    </button>
                </div>
            </div>

            <div className="left-panel-stats">
                <h2>
                    <span className="icon">📈</span>
                    Estatísticas
                </h2>
                <div className="stats-list">
                    <div className="stat-item">
                        <span className="stat-label">Tarefas Concluídas</span>
                        <span className="stat-value">{stats.completed}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Tarefas Pendentes</span>
                        <span className="stat-value">{stats.pending}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeftPanel;
