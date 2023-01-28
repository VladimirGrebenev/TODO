import React from "react"
import {Link, useParams} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.id}</Link>
            </td>
            <td>{project.title}</td>
            <td>{project.users.join(', ', '')}</td>
            <td>{project.repo_link}</td>
        </tr>
    )
}

const UserProjects = ({users, projects}) => {
    const params = useParams();
    const filtered_user = users.find((user) => user.id === params.id);
    const filtered_name = filtered_user?.user_name;
    const filtered_projects = projects.filter((project) => project.users.includes(filtered_name));
    return (
        <div className="section is-medium">
            <p className="title">
                Проекты пользователя {filtered_name}
            </p>
            <p className="subtitle">
                таблица доступных проектов
            </p>
            <table className="table is-narrow is-fullwidth">
                <thead className="has-background-info-light">
                <th>ID проекта</th>
                <th>Название</th>
                <th>Участники</th>
                <th>Репозиторий</th>
                </thead>
                {filtered_projects.map((project) => <ProjectItem project={project}/>)}
            </table>
        </div>
    )
}

export default UserProjects