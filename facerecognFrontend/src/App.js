import React from 'react'
import './App.css';
import {Navigation} from './components/Navigations/Navigation'
import {SignIn} from './components/SignIn/SignIn'
import {Register} from './components/Register/Register'
import {Logo} from './components/Logos/Logo'
import {Images} from './components/Images/Images'
import {FaceRecognition} from './components/FaceRecognitions/FaceRecognition'
import {ImageLinkForm} from './components/ImageLinkForms/ImageLinkForm'
import {Rank} from './components/Ranks/Rank'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'


const app = new Clarifai.App({
 apiKey: '0bd38cd7fb164ca0bb9a54d8df1673a8'
});

const particleParams={
  particles: {
                number:{
                  value:100,
                  density:{
                    enable:true,
                    value_area:500
                  }} ,
                
                  interactive:{
                   
                  onhover:{
                    enable:true,
                    
                  }
                }
                }
}

 class App extends React.Component {
  
  constructor(){

    super();
    
    this.state = {
      input:'',
      imageUrl:'',
      box: {},
      route: 'home',
      isSignedIn:false,
      user: {
        id: '',
        name:'',
        email:'',
        password:'',
        entries: 0,
        joined: ''
      }
    }
  }

loadUser = (data)=>{
    this.setState({user: {
        id: data.id,
        name:data.name,
        email:data.email,
        password:data.password,
        entries: data.entries,
        joined: data.joined
    }})
  }
/*
  componentDidMount(){
    fetch('http://localhost:4000/')
      .then(response => response.json())
      .then(console.log)
  }
  */
  calculateFaceLocation=(data)=>{
    console.log("calculateFaceLocation", data)
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box                                                                                                                                                                                                                    
      const image = document.getElementById('inputimage')
      const width = Number(image.width)
      const height = Number(image.height)
      console.log(width, height)     
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }                                                                                                                                                 
  }

  displayFaceBox = (box) =>{
    console.log(box)
    this.setState({box: box})
  }
  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onPictureSubmit=()=>{
    
    this.setState({imageUrl: this.state.input})
    console.log("onPictureSubmit")
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
              .then(response => {
                if(response){
                  fetch("http://localhost:4000/image", {
                    method:'put',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                      id: this.state.user.id
                    })
                  })
                  .then(response=>response.json())
                  .then(count=>{
                    this.setState(Object.assign(this.state.user, { entries:  count}))
                  })

                }
                  this.displayFaceBox(this.calculateFaceLocation(response))
                }
              )
              .catch(error => console.log(error));
  }
  onRouteChange = (route) => {
    console.log('onRouteChange')
    console.log(route)
    if(route === 'signout'){
      this.setState({isSignedIn:false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})  
    }
    this.setState({route: route})
    
  }

  render(){
    const {isSignedIn, route, box, imageUrl} = this.state;
    return (
      <div className="App">  
        
      

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {console.log("hey route",route)}
      { route === 'home'
        ?<div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} 
                           onPictureSubmit={this.onPictureSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
            <Images/>
          </div>
          :(
             this.state.route === 'Signin'
             ? <SignIn onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        
            ) 
         
      }
        
              
      </div>
  );
  }
  
}
 export default App;
/*  <Particles className='particles' 
                  params={ particleParams }/>*/