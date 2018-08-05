import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import About from "./components/About/About";
import './App.css';

const app = new Clarifai.App({
    apiKey: '6b658da484a248d8959b55c89c181034'
});

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

class App extends Component {

    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
        }
    }

    calculateFaceLocation = (data) => {
        const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('input-image');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifyFace.left_col * width,
            topRow: clarifyFace.top_row * height,
            rightCol: width - (clarifyFace.right_col * width),
            bottomRow: height - (clarifyFace.bottom_row * height),
        }
    };

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({box: box});
    };

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});

        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => this.calculateFaceLocation(response))
            .then(box => this.displayFaceBox(box))
            .catch(err => console.log(err));
    };

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false});
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    };

    renderPage() {
        const {route, box, imageUrl} = this.state;
        switch (route) {
            case 'signin':
            case 'signout':
                return <SignIn onRouteChange={this.onRouteChange}/>;
            case 'register':
                return <Register onRouteChange={this.onRouteChange}/>;
            case 'home':
                return (
                    <div className='pa3 tc'>
                        <Logo/>
                        <Rank/>
                        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </div>
                );
            case 'about':
                return <About/>;
        }
    }

    render() {
        const {route, isSignedIn} = this.state;
        return (
            <div className="App">
                <Particles className='particles' params={particleOptions}/>
                <Navigation onRouteChange={this.onRouteChange} page={route} isSignedIn={isSignedIn}/>
                {this.renderPage()}
            </div>
        );
    }
}

export default App;
