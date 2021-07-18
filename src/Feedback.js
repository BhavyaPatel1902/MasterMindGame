import React from 'react';
import './GameCSS.css'

class Feedback extends React.Component{
    constructor(props){
		super(props);
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.state.currentCard - 1 <= nextProps.cardId;
	}

	render() {
		const feedbacks = [];

		let BlockId;
		let feedbackClass = '';
		let FullyMatched = this.props.state.FullyMatched;
		let PartiallyMatched = this.props.state.PartiallyMatched;

		for(let i=1;i<=4;i++)
		{
			feedbackClass = 'feedback';
			BlockId = this.props.name + '-' + i + 1;
			
			if (this.props.state.currentCard - 1 === this.props.cardId) 
			{
				if (FullyMatched > 0)
				{
					feedbackClass = feedbackClass + ' fullymatched';
					FullyMatched--;
				} 
				else if (PartiallyMatched > 0) 
				{
					feedbackClass = feedbackClass + ' partiallymatched';
					PartiallyMatched--;
				} 
				else 
				{
					feedbackClass = feedbackClass + ' notmatched';
				}
			}

			feedbacks.push(<span className={feedbackClass}></span>);
		};

		return (
			<div className="feedbacks-card">
				{feedbacks}
			</div>
		);
	}
};


export default Feedback;
