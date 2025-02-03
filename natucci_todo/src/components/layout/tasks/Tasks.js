import { Table } from "react-bootstrap";
import Task from "./task/Task";
import './Tasks.css'

const Tasks = () => {
    return (
        <div className="tasks">
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tarefa</th>
                        <th>Dia</th>
                        <th>Horário</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>
        </div>
    )
}

export default Tasks;
