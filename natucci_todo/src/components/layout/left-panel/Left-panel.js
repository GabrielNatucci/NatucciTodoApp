import { Nav, Navbar } from "react-bootstrap";
import "./LeftPanel.css";

const LeftPanel = () => {
    return (
        <section className="left-panel">
            <div className="left-panel-header">
                <p id="title">NATUCCI TUDO APP</p>

                <Navbar>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link>
                                <p>Hoje</p>
                            </Nav.Link>

                            <Nav.Link>
                                <p>Nos próximos dias</p>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </div>

            <div className="left-panel-projects">
                <p id="title">Projetos</p>

                <Navbar>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link>
                                <p>Trabalho</p>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </div>
        </section>
    )
}

export default LeftPanel;
