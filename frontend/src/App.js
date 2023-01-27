import React from "react";
import UserList from "./components/User";
import ProjectsList from "./components/Projects";
import ToDoTasksList from "./components/ToDoTasks";
import MenuList from "./components/Menu";
import AddFooter from "./components/Footer";
import ProjectDetails from "./components/ProjectDetails";
import LoginForm from "./components/Auth";
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
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
            'menu_links': [],
            'token': ''
        }
    }

    set_token(token, email='') {
        const cookies = new Cookies()
        cookies.set('token', token, {maxAge: 3600})
        cookies.set('email', email, {maxAge: 3600})
        this.setState({'token': token, 'email': email}, () => this.load_data())
        // window.location.href="/"
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
        window.location.reload();
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const email = cookies.get('email')
        this.setState({'token': token, 'email': email}, () => this.load_data())
    }

    get_token(email, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: email, password: password})
            .then(response => {
                this.set_token(response.data['token'], email)
                alert('Вы авторизовались по почте: ' + email)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers();

        axios.get('http://127.0.0.1:8000/api/users_for_staff/', {headers})
            .then(response => {
                this.setState({users: response.data.results})
                // const filtered_user = users.find((user) => user.email === this.state.email);
                // const filtered_name = filtered_user?.user_name;
                // alert (filtered_name)

            }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/todo-tasks/', {headers})
            .then(response => {
                this.setState({todotasks: response.data.results})
            }).catch(error => console.log(error));

        this.load_menu();
    }

    get_login_link() {
        if (this.is_authenticated()) {
            return (
                <p>
                    <button className="button is-primary">{this.state.email}</button>
                    <button className="button is-light" onClick={() => this.logout()}>Log out</button>
                </p>
            )
        } else {
            return (
                <Link to="/login" className="button is-link">Log in</Link>
            );
        }
    }

    load_menu() {
        let is_auth_link = this.get_login_link()
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
            {'menu_links': menu_links, 'is_auth_link': is_auth_link}
        )

    }

    componentDidMount() {
        this.get_token_from_storage()

    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <MenuList menu_links={this.state.menu_links} is_auth={this.state.is_auth_link}/>
                    <Switch>
                        <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' component={() => <ToDoTasksList todotasks={this.state.todotasks}/>}/>
                        <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
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
