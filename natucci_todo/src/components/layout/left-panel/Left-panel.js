import Assunto from "./assuntos/Assunto";
import "./LeftPanel.css";

const LeftPanel = () => {
    return (
        <section className="left-panel">
            <div className="left-panel-header">
                <p id="title">NATUCCI TUDO APP</p>

                <p>Hoje</p>
                <p>Nos próximos dias</p>
            </div>

            <div className="left-panel-projects">
                <p id="title">Projetos</p>
                <Assunto content="Trabalho" />
            </div>
        </section>
    )
}

export default LeftPanel;
