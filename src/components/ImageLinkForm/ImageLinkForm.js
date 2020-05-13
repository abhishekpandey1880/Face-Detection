import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange,onButtonSubmit }) => {
	return (
		<div>
		 <p className='f3'>
		   {'This Web will detect faces in your pictures. Give it a try'}
		 </p>
		 <div className='center'>
		   <div className='pa4 br3 shadow-2 center form'>
			   <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
			   <button 
			     className='br3 w-30 grow f4 link pv2 dib white bg-light-purple'
			     onClick={onButtonSubmit}
			     >Detect</button>
			 </div>
		 </div>
		</div>
	);
}

export default ImageLinkForm;