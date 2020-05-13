import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import FaceDetection from './components/FaceDetection/FaceDetection';
import Particles from 'react-particles-js';
import './App.css'

const app = new Clarifai.App({
 apiKey: 'fff3e0231c0e4e11a479b75bde5e9d18'
});

const particleOptions = {
	particles: {
		number: {
			value: 16,
			density: {
				enable: true,
				value_area: 200
			}
		}
	}
}
class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false
		}
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayfaceBox = (box) => {
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: (event.target.value)});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models
		.predict(
	    Clarifai.FACE_DETECT_MODEL,
			this.state.input)
		.then(response => this.displayfaceBox(this.calculateFaceLocation(response)))
	  .catch(err => console.log(err));
	}

	onRouteChange = (route) => {
		if(route === 'signout'){
			this.setState({isSignedIn: false})
		}
		else if(route === 'home'){
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}

	render(){
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className="App">
			  <Particles className='particles' 
			  params={particleOptions}
			  />
			  <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
			  { route === 'home' 
		      ? <div>
						  <Logo />
						  <Rank />
						  <ImageLinkForm onInputChange={this.onInputChange} 
						  onButtonSubmit={this.onButtonSubmit} 
						  />
						  <FaceDetection box= {box} imageUrl={imageUrl} />
						</div>
						: (
							route === 'register'
							? <Register onRouteChange={this.onRouteChange}/>
							: <Signin onRouteChange={this.onRouteChange}/>
			       )			
				}
			</div>
		);
	}
}

export default App;