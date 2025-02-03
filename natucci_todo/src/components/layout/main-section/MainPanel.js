import { useState } from 'react';
import Tasks from '../tasks/Tasks';
import './mainPanel.css'

const MainPanel = () => {
    const [tasks, setTasks] = useState(0);

    const processarInput = () => {
        let tarefa = document.getElementById("main-section-quick-add-input-id").value;
        let horario = document.getElementById("main-section-quick-add-date").value;
        let data = "02/03/25";
        console.log(tarefa);

        const task = [
            tarefa,
            data,
            horario
        ];

        // if (tasks === 0) {
        setTasks(task);
        // }
    }

    return (
        <section className="main-section">
            <div className="main-section-quick-add">
                <input id="main-section-quick-add-input-id" className="main-section-quick-add-input" type="text" placeholder="Nome da sua tarefa" />
                <input id="main-section-quick-add-date" className="main-section-quick-add-input " type="text" placeholder="Ex: 11:00" />
                <button className="main-section-quick-add-button" onClick={processarInput}>+</button>
            </div>
            <Tasks />
        </section>
    )
}

export default MainPanel;
