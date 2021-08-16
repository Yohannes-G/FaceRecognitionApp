import React from 'react';
import './ImageLinkForm.css'

export const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
	
		<div>
		<p className=' txt f3  dark '>
	 		{'This magic brain will detect faces and pictures'}
		</p>
		<div className='center'>
			<div className='form center pa4 br3 shadow-1'>
				<input className='f4 pa2 w-70 center bg-white' type="text" onChange={onInputChange}/>
				<button className='w-30 grow f4 link ph3 pv2 dib black bg-dark-blue' onClick={onButtonSubmit}>Detect</button>
			</div>
		</div>
		
		</div>
		
		 )
} 