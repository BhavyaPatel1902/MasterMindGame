import React from 'react';
import './GameCSS.css'
import Board from './Board.js'
import ColorPointers from './ColorPointers.js'


const colors = new Map([[0, 'orange'], [1, 'pink'], [2, 'green'], [3, 'blue'], [4, 'magneta'], [5, 'violet']]);

class Game extends React.Component{

    constructor(props)
    {
        super(props);
		this.state = {
			Pattern: this.CreatePattern(),
			selectedPointer: colors.get(0),
			currentCard: 0,
			currentPattern: new Map(),
			Correct: false,
			Finished: false,
			FullyMatched: 0,
			PartiallyMatched: 0,
			rules: false
		};
		this.MakeVisibleRules = this.MakeVisibleRules.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.CreatePattern = this.CreatePattern.bind(this);
        this.allocate = this.allocate.bind(this);
        this.submit = this.submit.bind(this);
    }

	playAgain() {
		this.setState({ Correct: false });
		this.setState({ Finished: false });
		this.setState({ code: this.CreatePattern() });
		this.setState({ selectedPointer: colors.get(0) });
		this.setState({ currentCard: 0 });
		this.setState({ currentPattern: new Map() });
		this.setState({ FullyMatched: 0 });
		this.setState({ PartiallyMatched: 0 });
	}

	MakeVisibleRules() {
		this.setState({rules : !this.state.rules});
	}

	CreatePattern() 
	{
        const pattern = new Map();

		for(let i=0;i<4;i++)
		{
			pattern.set(i,colors.get((Math.floor(Math.random()*(5)))));
		};

		return pattern;
	}

	allocate(event)  // Main Function That Will Assign the State
	{
		if (event.target.name.startsWith('pointer')) 
		{
			this.setState({ selectedPointer: event.target.value });
		} 
		else 
		{
			if (this.state.selectedPointer)
			{ 
				this.setState({ currentPattern: this.state.currentPattern.set(event.target.value - 1, this.state.selectedPointer) });
			}
		}
	}

	submit()   // To Create A Feedback logic
	{
		let Pattern = new Map(this.state.Pattern);
		let pointers = this.state.currentPattern;

		let foundIndex;

		let FullyMatched = 0;
		let PartiallyMatched = 0;

		for (let [Index, Color] of pointers)
		{
			if (Color === Pattern.get(Index))
			{
				FullyMatched++;
				pointers.delete(Index);
				Pattern.delete(Index);
			}
		}

		for (let [Index, Color] of pointers) 
		{
			foundIndex = -1;

			for (let [Index1, Color1] of Pattern) 
		    {
			   if (Color === Color1) 
			   {
				  foundIndex = Index1;
				  break;
			   }
		    }

			if (foundIndex !== -1) 
			{
				PartiallyMatched++;
				Pattern.delete(foundIndex);
			}
		}

		if (FullyMatched === 4) 
		{
			this.setState({ Finished: true });
			this.setState({ Correct: true });
		} 
		else if (this.state.currentCard + 1 === 10) 
		{
			this.setState({ Finished: true });
		}

		this.setState({FullyMatched: FullyMatched});
		this.setState({PartiallyMatched: PartiallyMatched});
		this.setState({currentCard: this.state.currentCard + 1});
		this.setState({currentPattern: new Map()});
	}
	render() {
		return (
			<div>
				<h1>MASTER MIND</h1>

				<div className="rules">
				      <h3 className="rules-main" onClick={this.MakeVisibleRules}>{!this.state.rules ? 'Show rules' : 'Hide rules'}</h3>
				      <p className={!this.state.rules ? 'hidden' : 'info'}>Try to guess the pattern, in both order and color, within ten turns. After submitting a row, a small black peg is placed for each code peg from the guess which is correct in both color and position. A white peg indicates the existence of a correct color code peg placed in the wrong position. More info on <a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)"><font color="green"><u>Wikipedia</u></font></a>.</p>
			    </div>

				<div className="board">
					  <Board state={this.state} allocate={this.allocate} submit={this.submit}/>
					  <ColorPointers selectedPointer={this.state.selectedPointer} colors={colors} allocate={this.allocate}/>
				</div>

                <div className={!this.state.Finished ? 'hidden' : 'finished'}>
				    <div className={this.props.Correct ? "finished-alert-correct" : "finished-alert-wrong"}>
					  <h2 className="finished-header">{this.state.Correct ? 'Congratulations!' : 'GAME OVER!'}</h2>
					  <button className="finished-btn" onClick={this.playAgain}>PLAY AGAIN</button>
				    </div>
			    </div>
			</div>
		);
	}
};

export default Game
