import React, {Component} from 'react';
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import About from "./components/About/About";
import Modal from './components/Modal/Modal';
import './App.css';
import variables from "./variables";
import Profile from "./components/Profile/Profile";

const particleOptions = {
    particles: {
        number: {
            value: 50
        },
        line_linked: {
            enable: true,
            distance: 190
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            "onhover": {enable: true, mode: "repulse"},
            "onclick": {enable: true, mode: "push"},
            "resize": true
        },
        modes: {
            repulse: {"distance": 200, "duration": 0.4},
            push: {particles_nb: 4},
        }
    },
};

const initialState = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: 'home',
    isProfileOpen: false,
    isSignedIn: true,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

class App extends Component {

    constructor() {
        super();
        this.state = initialState;
    }

    componentDidMount() {
        // testing only
        fetch(variables.API_URL)
            .then(response => response.json())
            .then(console.log)
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    }

    calculateFaceLocations = (data) => {
        return data.outputs[0].data.regions.map(face => {
            const clarifyFace = face.region_info.bounding_box;
            const image = document.getElementById('input-image');
            const width = Number(image.width);
            const height = Number(image.height);
            return {
                leftCol: clarifyFace.left_col * width,
                topRow: clarifyFace.top_row * height,
                rightCol: width - (clarifyFace.right_col * width),
                bottomRow: height - (clarifyFace.bottom_row * height),
            }
        });
    };

    displayFaceBoxes = (boxes) => {
        this.setState({boxes: boxes});
    };

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});

        fetch(variables.API_URL + '/detect-face', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                fetch(variables.API_URL + '/update-entry', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id,
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            this.setState(Object.assign(this.state.user, {entries: data.entries}));
                        }
                    })
                    .catch(console.log);
                return this.calculateFaceLocations(response)
            })
            .then(boxes => this.displayFaceBoxes(boxes))
            .catch(err => console.log(err));
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    };

    renderPage() {
        const {route, boxes, imageUrl, user} = this.state;
        switch (route) {
            case 'signin':
            case 'signout':
                return <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
            case 'register':
                return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
            case 'home':
                return (
                    <div className='pa3 tc'>
                        <Logo/>
                        <Rank name={user.name} entries={user.entries}/>
                        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                        <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
                    </div>
                );
            case 'about':
                return <About/>;
            default:
                return (
                    <div className={'tc ma4 white'}>
                        <h2>Error 404</h2>
                        <h4>Page not found</h4>
                    </div>
                );
        }
    }

    toggleModal = () => {
        this.setState(prevState => ({
            ...prevState,
            isProfileOpen: !prevState.isProfileOpen
        }));
    }

    render() {
        const {route, isSignedIn, isProfileOpen} = this.state;
        return (
            <div className="App">
                <Particles className='particles' params={particleOptions}/>
                <Navigation onRouteChange={this.onRouteChange} page={route}
                            isSignedIn={isSignedIn} toggleModal={this.toggleModal}/>
                {this.renderPage()}
                {isProfileOpen &&
                <Modal>
                    <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal}
                             user={this.state.user} loadUser={this.loadUser}/>
                </Modal>
                }
            </div>
        );
    }
}

export default App;
