import { useState, useEffect } from 'react';
import './App.css';
import LeftPanel from './components/layout/left-panel/Left-panel';
import MainPanel from './components/layout/main-section/MainPanel';

function App() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [activeProject, setActiveProject] = useState('all');
    const [activeTimeFilter, setActiveTimeFilter] = useState('hoje');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        setTasks([...tasks, {
            ...newTask,
            id: Date.now(),
            project: activeProject === 'all' ? 'pessoal' : activeProject // Se estiver em 'todas', adiciona em 'pessoal'
        }]);
    };

    const toggleTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    // Primeiro filtra por projeto
    const projectFilteredTasks = tasks.filter(task => {
        if (activeProject !== 'all' && task.project !== activeProject) {
            return false;
        }
        return true;
    });

    // Depois passa as tarefas filtradas por projeto para o MainPanel,
    // que aplicará o filtro temporal
    const stats = {
        completed: tasks.filter(task => task.completed).length,
        pending: tasks.filter(task => !task.completed).length
    };

    return (
        <main id="main">
            <LeftPanel
                activeTimeFilter={activeTimeFilter}
                setActiveTimeFilter={setActiveTimeFilter}
                activeProject={activeProject}
                setActiveProject={setActiveProject}
                stats={stats}
                tasks={tasks}
            />
            <MainPanel
                tasks={projectFilteredTasks}
                onAddTask={addTask}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                activeTimeFilter={activeTimeFilter}
            />
        </main>
    );
}

export default App;
