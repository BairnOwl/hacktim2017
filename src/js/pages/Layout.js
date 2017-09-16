import React from 'react';

import Webcam from 'react-webcam';

export default class Layout extends React.Component {

	render() {
		return (
			<div>
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