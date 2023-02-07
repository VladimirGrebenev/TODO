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
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="description">description</label>
                    <input type="text" className="form-control" name="description"
                           value={this.state.description} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <select name="project" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option
                            value={item.id}>{item.title}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ToDoForm