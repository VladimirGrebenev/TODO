import React from "react"
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.id}</Link>
            </td>
            <td>{project.title}</td>
            <td>{project.users}</td>
            <td>{project.repo_link}</td>
        </tr>
    )
}

const ProjectsList = ({projects}) => {
    return (
        <div className="section is-medium">
            <p className="title">
                Проекты
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
                {projects.map((project) => <ProjectItem project={project}/>)}
            </table>
        </div>
    )
}

export default ProjectsList