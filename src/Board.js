import React from 'react';
import './GameCSS.css'
import Card from './Card.js'


class Board extends React.Component{
	constructor(props){
		super(props);
	}
	render() {
		let cardBlocks = [];
		let BlockName;
		let attempts = 10;

		for (let i = 1; i <= attempts; i++) 
		{
			BlockName = 'CardBlock-' + i;
			cardBlocks.push(<Card name={BlockName} key={i} cardId={i-1} state={this.props.state} allocate={this.props.allocate} submit={this.props.submit}/>);
		}

		return (
			<div className="left">
				{cardBlocks}
			</div>
		);
	}
};

export default Board;