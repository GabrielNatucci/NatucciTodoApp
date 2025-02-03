import Task from '../tasks/task/Task';
import Tasks from '../tasks/Tasks';
import './mainPanel.css'

const MainPanel = () => {
    return (
        <section className="main-section">
            <div className="main-section-quick-add">
                <input className="main-section-quick-add-input" type="text" placeholder="Nome da sua tarefa"/>
                <input id = "main-section-quick-add-date" className="main-section-quick-add-input " type="text" placeholder="Ex: 11:00"/>
                <button className="main-section-quick-add-button">+</button>
            </div>

            <Tasks/>
        </section>
    )
}

export default MainPanel;
