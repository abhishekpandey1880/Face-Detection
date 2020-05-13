import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import robot from './robot.png';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
		  <Tilt className="Tilt br3 shadow-4" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
		   <div className="Tilt-inner pa2"> <img className='img' alt='robot' src={robot} /> </div>
		  </Tilt>
		</div>
		);
}

export default Logo;