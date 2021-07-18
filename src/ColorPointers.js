import React from 'react';
import './GameCSS.css'
import PointerButton from './PointerButton.js'

class ColorPointers extends React.Component{
	constructor(props){
		super(props);
	}
	render() {
		const pointers = [];

		let BlockId;
		let pointerClass;

		for (let [Index, Color] of this.props.colors) 
		{
			BlockId = 'pointer-' + Index;
			pointerClass = 'pointer ' + Color;
			if (Color === this.props.selectedPointer)
			{
				pointerClass = pointerClass + ' selected';
			}
			pointers.push(<PointerButton BlockId={BlockId} name='pointer' value={Color} key={BlockId} pointerClass={pointerClass} isCurrentCard={true} allocate={this.props.allocate}/>);
		}

		return (
			<div className='colorpointers left'>
				{pointers}
			</div>
		);
	}
};

export default ColorPointers;