import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: '', users: props.users[0]?.id, repo_link: '' }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.title, this.state.users, this.state.repo_link)
        event.preventDefault()
    }

    render() {
        return (
            <div className="section">
                <div className="columns">
                    <div className="column"></div>
                    <div className="column is-one-third">
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <div className="field">
                                <label className="label">Название проекта</label>
                                <div className="control">
                                    <input name="title" className="input" type="text" placeholder="название проекта"
                                           value={this.state.title}
                                           onChange={(event) => this.handleChange(event)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Ссылка на репозиторий</label>
                                <div className="control">
                                    <input name="repo_link" className="input" type="text" placeholder="ссылка на проект"
                                           value={this.state.repo_link}
                                           onChange={(event) => this.handleChange(event)}/>
                                </div>
                            </div>
                            <div className="field">
                                <input className="button is-success" type="submit" value="Создать"/>
                            </div>
                        </form>
                    </div>
                    <div className="column"></div>
                </div>
            </div>
        );
    }
}

export default ProjectForm