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

      fetch('http://192.168.43.79:8080/image', {
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
			<Link to="/home">Home</Link>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <button onClick={this.capture}>Capture photo</button>
      </div>
		);
	}
}