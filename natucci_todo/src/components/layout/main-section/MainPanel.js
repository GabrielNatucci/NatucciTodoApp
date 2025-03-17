import { useState } from 'react';
import Tasks from '../tasks/Tasks';
import './mainPanel.css';

const MainPanel = ({
    tasks,
    onAddTask,
    onToggleTask,
    onDeleteTask,
    activeTimeFilter
}) => {
    const [filter, setFilter] = useState('all');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = {
            text: formData.get('taskText'),
            dueDate: formData.get('dueDate'),
            dueTime: formData.get('dueTime'),
            completed: false,
            createdAt: new Date().toISOString()
        };

        if (newTask.text.trim()) {
            onAddTask(newTask);
            e.target.reset();
        }
    };

    const isToday = (dateStr) => {
        if (!dateStr) return false;
        const today = new Date();
        const taskDate = new Date(dateStr);
        return (
            taskDate.getDate() === today.getDate() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getFullYear() === today.getFullYear()
        );
    };

    const isThisWeek = (dateStr) => {
        if (!dateStr) return false;
        const today = new Date();
        const taskDate = new Date(dateStr);
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay()); // Domingo
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6); // Sábado
        weekEnd.setHours(23, 59, 59, 999);

        return taskDate >= weekStart && taskDate <= weekEnd;
    };

    const filteredTasks = tasks.filter(task => {
        // Primeiro aplica o filtro de status (ativo/completo)
        if (filter === 'active' && task.completed) return false;
        if (filter === 'completed' && !task.completed) return false;

        // Depois aplica o filtro temporal baseado no dueDate
        if (activeTimeFilter === 'hoje') {
            return isToday(task.dueDate);
        } else if (activeTimeFilter === 'semana') {
            return isThisWeek(task.dueDate);
        }

        return true; // Para o filtro 'todas'
    }).sort((a, b) => {
        // Ordena por data de vencimento, tarefas sem data ficam por último
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    // Obtém a data atual no formato YYYY-MM-DD para o valor mínimo do input de data
    const today = new Date().toISOString().split('T')[0];

    return (
        <section className="main-section">
            <form onSubmit={handleSubmit} className="main-section-quick-add">
                <input
                    id="task-text-input"
                    name="taskText"
                    className="main-section-quick-add-input"
                    type="text"
                    placeholder="Nome da sua tarefa"
                    required
                    aria-label="Nome da tarefa"
                />
                <div className="datetime-inputs">
                    <input
                        id="task-date-input"
                        name="dueDate"
                        className="main-section-quick-add-input"
                        type="date"
                        min={today}
                        aria-label="Data de conclusão"
                    />
                    <input
                        id="task-time-input"
                        name="dueTime"
                        className="main-section-quick-add-input"
                        type="time"
                        aria-label="Horário de conclusão"
                    />
                </div>
                <button
                    id="add-task-button"
                    type="submit"
                    className="main-section-quick-add-button"
                    aria-label="Adicionar tarefa"
                >
                    +
                </button>
            </form>

            <div className="task-filters">
                <button
                    id="filter-all"
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    Todas
                </button>
                <button
                    id="filter-active"
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    Ativas
                </button>
                <button
                    id="filter-completed"
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => setFilter('completed')}
                >
                    Concluídas
                </button>
            </div>

            <Tasks
                tasks={filteredTasks}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
            />
        </section>
    );
};

export default MainPanel;
