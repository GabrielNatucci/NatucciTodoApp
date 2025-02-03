const Task = ({id, content, day, time}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{content}</td>
            <td>{day}</td>
            <td>{time}</td>
        </tr>
    )
}

export default Task;
