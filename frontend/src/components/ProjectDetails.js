import React from "react"
import {useParams} from "react-router-dom"

const ToDoItem = ({todotask}) => {
    console.log(todotask.project)
    return (
        <tr>
            <td>{todotask.id}</td>
            <td>{todotask.project}</td>
            <td>{todotask.description}</td>
            <td>{todotask.created}</td>
            <td>{todotask.updated}</td>
            <td>{todotask.author}</td>
            <td>{todotask.is_done}</td>
        </tr>
    )
}

// не могу подзагрузить информацию в компоненте ProjectDetails(список дел) по сслыке через ID проекта,
//     не понимаю как обратиться к связанной таблице Project. Массив приходит пустой так как не фильтрует
// корректно по id.
const ProjectDetails = ({todotasks}) => {
    let {id} = useParams()
    // console.log(id)
    let filtered_todotasks = todotasks.filter((todotask) => todotask.project.id == true)
    // console.log(filtered_todotasks)
    return (
        <div className="section is-medium">
            <p className="title">
                Список задач
            </p>
            <p className="subtitle">
                таблица доступных задач
            </p>
            <table className="table is-narrow is-fullwidth">
                <thead className="has-background-info-light">
                <th>ID задачи</th>
                <th>Проект</th>
                <th>Задача</th>
                <th>Создана</th>
                <th>Обновлена</th>
                <th>Автор</th>
                <th>Выполнено</th>
                </thead>
                {filtered_todotasks.map((todotask)=> <ToDoItem todotask={todotask}/>)}
            </table>
        </div>
    )
}

export default ProjectDetails