import React from "react";
import UserList from "./components/User";
import ProjectsList from "./components/Projects";
import ToDoTasksList from "./components/ToDoTasks";
import MenuList from "./components/Menu";
import AddFooter from "./components/Footer";
import ProjectDetails from "./components/ProjectDetails";
import LoginForm from "./components/Auth";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import axios from 'axios';
import UserProjects from "./components/UserProjects";

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todotasks': [],
            'menu_links': []
        }
    }

    get_token(email, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: email, password: password})
            .then(response => {
                console.log(response.data)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    load_data() {
        axios.get('http://127.0.0.1:8000/api/users_for_staff/')
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo-tasks/')
            .then(response => {
                this.setState({todotasks: response.data.results})
            }).catch(error => console.log(error))
    }

    load_menu() {
        const menu_links = [
            {
                'link_name': 'Проекты',
                'menu_link': '/projects'
            },
            {
                'link_name': 'Задачи',
                'menu_link': '/todos'
            },
            {
                'link_name': 'Пользователи',
                'menu_link': '/users'
            },
        ]
        this.setState(
            {
                'menu_links': menu_links
            }
        )
    }

    componentDidMount() {
        this.load_data()
        this.load_menu()
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <MenuList menu_links={this.state.menu_links}/>
                    <Switch>
                        <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' component={() => <ToDoTasksList todotasks={this.state.todotasks}/>}/>
                        <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(email, password) => this.get_token(email, password)}/>}/>
                        <Route exact path='/project/:id'
                               component={() => <ProjectDetails todotasks={this.state.todotasks}
                                                                projects={this.state.projects}/>}/>
                        <Route exact path='/user/:id'
                               component={() => <UserProjects users={this.state.users}
                                                              projects={this.state.projects}/>}/>
                        <Redirect from='/' to='/projects'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
                <AddFooter/>
            </div>
        )
    }
}

export default App;
