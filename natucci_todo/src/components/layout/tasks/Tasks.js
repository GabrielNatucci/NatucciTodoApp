import { Table } from "react-bootstrap";
import Task from "./task/Task";
import './Tasks.css'

const Tasks = ({ tasks }) => {
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
                    // {
                    //     {tasks}.map((task, index) => (
                    //         <Task key={index} id={index + 1} content={task[0]} day={task[1]} time={task[2]} />
                    //     ))
                    // }

export default Tasks;
