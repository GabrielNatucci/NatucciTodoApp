import { Table } from "react-bootstrap";
import Task from "./task/Task";

const Tasks = () => {
    return (
        <div className="tasks">
            <Table respnosive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tarefa</th>
                        <th>Dia</th>
                        <th>Horário</th>
                    </tr>
                </thead>
                <tbody>
                    <Task id="1" content="alimentar o gato" day="02/03/25" time={"19:45:25"} />
                    <Task id="1" content="estudar react" day="02/03/25" time={"19:45:25"} />
                    <Task id="1" content="penasr em uma melhor solução para aquele problema do trabalho" day="02/03/25" time={"19:45:25"} />
                    <Task id="1" content="teste" day="02/03/25" time={"19:45:25"} />
                    <Task id="1" content="teste" day="02/03/25" time={"19:45:25"} />
                    <Task id="1" content="teste" day="02/03/25" time={"19:45:25"} />
                </tbody>
            </Table>
        </div>
    )
}

export default Tasks;
