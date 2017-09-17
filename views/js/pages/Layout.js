import React from 'react';

import Webcam from 'react-webcam';

import {Link} from 'react-router-dom';

export default class Layout extends React.Component {

	constructor() {
		super();

	}

	capture = () => {
    	const imageSrc = this.webcam.getScreenshot();

      console.log(imageSrc);

      fetch('http://10.182.8.75:8080/image', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'mode': 'no-cors'
        },
        body: JSON.stringify({
          image: imageSrc
        })
      });
  	};

	setRef = (webcam) => {
    	this.webcam = webcam;
  	}

	render() {
		return (
			<div>
			<h1>Webcam</h1>
        <Webcam
          audio={false}
          height={300}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <div class="buttons">
          <button class="camera-button" onClick={this.capture}>Check in</button>
          <button  class="camera-button" onClick={this.capture}>Check out</button>
        </div>
        <Link to="/home">Home</Link>
        </div>
		);
	}
}