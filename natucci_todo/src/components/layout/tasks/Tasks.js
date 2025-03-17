import './Tasks.css';

const Tasks = ({ tasks, onToggle, onDelete }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR');
    };

    if (tasks.length === 0) {
        return (
            <div className="no-tasks">
                <p>Nenhuma tarefa encontrada</p>
                <span>Adicione uma nova tarefa usando o formulário acima</span>
            </div>
        );
    }

    return (
        <div className="tasks">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                    <div className="task-content">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggle(task.id)}
                            className="task-checkbox"
                            id={`task-${task.id}`}
                        />
                        <div className="task-details">
                            <span className="task-text">{task.text}</span>
                            <div className="task-datetime">
                                {task.dueDate && (
                                    <span className="task-date">
                                        {formatDate(task.dueDate)}
                                    </span>
                                )}
                                {task.dueTime && (
                                    <span className="task-time">
                                        {task.dueTime}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="delete-task"
                        aria-label="Deletar tarefa"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Tasks;
