import React from 'react';
import './GameCSS.css';
import classNames from 'classnames';
import CardBlock from './CardBlock.js'
import Feedback from './Feedback.js'

class Card extends React.Component{
    constructor(props){
		super(props);
	}
    render(){
       const isCurrentCard = this.props.state.currentCard === this.props.cardId;
       const cardClassName = classNames({
               'cardblock': true,
               'clearfix': true,
               'current': isCurrentCard
           });

       return (
           <div className={cardClassName}>
               <div className='left'>
                   <CardBlock name={'CardBlock-' + this.props.cardId} key={this.props.cardId} cardId={this.props.cardId} state={this.props.state} isCurrentCard={isCurrentCard} allocate={this.props.allocate}/>
               </div>
               <div className='left'>
                  <button className={!(this.props.state.currentPattern.size >= 4 && this.props.state.currentCard === this.props.cardId) ? 'hidden' : 'submitCard'} onClick={this.props.submit}></button>
               </div>
               <div className='right'>
                   <Feedback name={'feedbacksCard-' + this.props.cardId} key={this.props.cardId} cardId={this.props.cardId} state={this.props.state}/>
               </div>
           </div>
       );
   }
};

export default Card;