import React from 'react';
import './GameCSS.css'
import PointerButton from './PointerButton.js';

class CardBlock extends React.Component{

	constructor(props){
		super(props);
	}
	
	shouldComponentUpdate(nextProps) {
		return nextProps.state.currentCard <= nextProps.cardId;
	}

	render() {
		let pointers = [];
		let BlockId;
		let pointerClass;

		for(let i = 0;i<4;i++)
		{
			BlockId = this.props.name + '-' + i + 1;
			//update current row
			if (this.props.state.currentCard === this.props.cardId) 
			{
				pointerClass = this.props.state.currentPattern.get(i) ? 'pointer ' + this.props.state.currentPattern.get(i) : 'pointer';
			} 
			else
			 { //clear all of the next pegs - from the previous game
				pointerClass = 'pointer';
			}

			pointers.push(<PointerButton BlockId={BlockId} name={this.props.name} value={i + 1} key={BlockId} pointerClass={pointerClass} isCurrentCard={this.props.isCurrentCard} allocate={this.props.allocate}/>);
		}

		return (
			<div>
				{pointers}
			</div>
		);
	}
};

export default CardBlock;