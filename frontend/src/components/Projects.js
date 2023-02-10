import React from "react"
import {Link} from "react-router-dom";

const ProjectItem = ({project, delete_project}) => {
    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.title}</Link>
            </td>
            <td>{project.repo_link}</td>
            <td><button class='button is-danger' type='button'
                        onClick={()=>delete_project(project.id)}>Удалить</button></td>
        </tr>
    )
}

const ProjectsList = ({projects, delete_project}) => {
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
                <th>Название</th>
                <th>Репозиторий</th>
                <th></th>
                </thead>
                {projects.map((project) => <ProjectItem project={project} delete_project={delete_project}/>)}
            </table>
            <Link class='button is-light' to='/projects/create'>Создать проект</Link>
        </div>
    )
}

export default ProjectsList