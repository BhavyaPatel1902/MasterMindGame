import React from 'react';
import './GameCSS.css'

class PointerButton extends React.Component
{
	render() {
		return (
			<span className={this.props.pointerClass}>
				<input type='radio' name={this.props.name} value={this.props.value} id={this.props.BlockId} onClick={this.props.isCurrentCard ? this.props.allocate : null}/>
				<label htmlFor={this.props.BlockId}></label>
			</span>
		);
	}
};

export default PointerButton;