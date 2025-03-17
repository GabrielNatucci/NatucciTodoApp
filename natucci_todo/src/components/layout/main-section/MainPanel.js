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
    const [showDescription, setShowDescription] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const selectedDate = formData.get('dueDate');

        // Adiciona 1 dia à data selecionada
        const [year, month, day] = selectedDate.split('-').map(Number);
        const adjustedDate = new Date(year, month - 1, day + 1);
        const finalDate = adjustedDate.toISOString().split('T')[0];

        console.log('Data selecionada:', selectedDate);
        console.log('Data ajustada:', finalDate);

        const newTask = {
            text: formData.get('taskText'),
            description: formData.get('taskDescription'),
            dueDate: finalDate,
            dueTime: formData.get('dueTime'),
            completed: false,
            createdAt: new Date().toISOString()
        };

        if (newTask.text.trim()) {
            onAddTask(newTask);
            e.target.reset();
            setShowDescription(false);
        }
    };

    const isToday = (dateStr) => {
        if (!dateStr) return false;
        const today = new Date();
        // Ajustando a data da tarefa para considerar o fuso horário local
        const [year, month, day] = dateStr.split('-').map(Number);
        const taskDate = new Date(year, month - 1, day);
        console.log('Data da Tarefa:', taskDate.toLocaleDateString());
        console.log('Hoje:', today.toLocaleDateString());

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

    return (
        <section className="main-section">
            <form onSubmit={handleSubmit} className="main-section-quick-add">
                <div className="task-inputs">
                    <input
                        id="task-text-input"
                        name="taskText"
                        className="main-section-quick-add-input"
                        type="text"
                        placeholder="Nome da sua tarefa"
                        required
                        aria-label="Nome da tarefa"
                    />
                    <button
                        type="button"
                        className="toggle-description-button"
                        onClick={() => setShowDescription(!showDescription)}
                        aria-label={showDescription ? "Ocultar descrição" : "Adicionar descrição"}
                    >
                        {showDescription ? "−" : "+"}
                    </button>
                </div>

                {showDescription && (
                    <textarea
                        id="task-description-input"
                        name="taskDescription"
                        className="main-section-quick-add-input description-input"
                        placeholder="Descrição da tarefa (opcional)"
                        rows="3"
                        aria-label="Descrição da tarefa"
                    />
                )}

                <div className="datetime-inputs">
                    <input
                        id="task-date-input"
                        name="dueDate"
                        className="main-section-quick-add-input"
                        type="date"
                        defaultValue={(() => {
                            const now = new Date();
                            now.setHours(0, 0, 0, 0);
                            const year = now.getFullYear();
                            const month = String(now.getMonth() + 1).padStart(2, '0');
                            const day = String(now.getDate()).padStart(2, '0');
                            return `${year}-${month}-${day}`;
                        })()}
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
