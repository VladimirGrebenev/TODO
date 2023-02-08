import React from 'react'

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {description: '', project: props.projects[0]?.id}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.description, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            // <form onSubmit={(event) => this.handleSubmit(event)}>
            //     <div className="form-group">
            //         <label for="description">description</label>
            //         <input type="text" className="form-control" name="description"
            //                value={this.state.description} onChange={(event) => this.handleChange(event)}/>
            //     </div>
            //     <div className="form-group">
            //         <label htmlFor="project">project</label>
            //         <select name="project" className='form-control'
            //                 onChange={(event) => this.handleChange(event)}>
            //             {this.props.projects.map((item) => <option
            //                 value={item.id}>{item.title}</option>)}
            //         </select>
            //     </div>
            //     <input type="submit" className="btn btn-primary" value="Save"/>
            // </form>

            <div className="section">
                <div className="columns">
                    <div className="column"></div>
                    <div className="column is-one-third">
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <div className="field">
                                <label className="label">Задача</label>
                                <div className="control">
                                    <input className="input" name="description" type="text" placeholder="описание задачи"
                                           value={this.state.description}
                                           onChange={(event) => this.handleChange(event)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Относится к проекту</label>
                                <div className="control">
                                    <div className="select">
                                        <select name="project" onChange={(event) => this.handleChange(event)}>
                                            {this.props.projects.map((item) =>
                                                <option value={item.id}>{item.title}</option>)}
                                        </select>
                                    </div>
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

export default ToDoForm