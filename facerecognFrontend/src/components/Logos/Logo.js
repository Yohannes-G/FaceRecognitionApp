import React from 'react';
import Tilt from 'react-parallax-tilt';
import faces from './1.jpeg'
import './Logo.css'
export const Logo = () => {
	return (
	
		<div className='ma5 pt0 mt0 '>
		<Tilt className='Tilt br2 shadow-2'>
    		<div tilt-inner="true">
      		  <img src={faces} alt='faces'/>
    	  	</div>
  	 	 </Tilt>	
		</div>
		
		 )
}