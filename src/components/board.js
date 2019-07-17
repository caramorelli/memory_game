import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import { boardSetup, deckBuilder } from './deck_utils'
import './stylesheets/boardDesign.css'

class Board extends Component {
  state = {
    cardBack: null,
    cardCount: null,
    fullDeck: null,
    currentDeck: null,

    selectedPair: [],
    foundCards: []
  }

  componentDidMount() {
    const { theme, level } = this.props.location.state
    let boardData = boardSetup(theme, level)
    this.setState({ cardBack: `/${theme}_card.png`, cardCount: boardData.cardQuantity, fullDeck: boardData.fullDeck, currentDeck: boardData.currentDeck })
  }

  handleClick = (event) => {
    const { selectedPair } = this.state
    console.log('CLICK', event.target)
    if (selectedPair.length === 0) {
      event.target.src = event.target.alt
      selectedPair.push(event.target)
    } else if (selectedPair.length === 1) {
      event.target.src = event.target.alt
      selectedPair.push(event.target)

      this.checkMatch()
    }
  }

  checkMatch = () => {
    if (this.state.selectedPair.length === 2) {
      window.setTimeout(this.handlePair, 2000)
    }
  }

  handlePair = () => {
    const firstCard = this.state.selectedPair[0]
    const secondCard = this.state.selectedPair[1]

    if ( firstCard.name === secondCard.name ) {
      this.state.foundCards.push(firstCard.name)

    } else {
      firstCard.src = this.state.cardBack
      secondCard.src = this.state.cardBack
    }
      this.setState({ selectedPair: [] })
  }

  handleReset = () => {
    this.setState({ currentDeck: null, selectedPair: [], selectedIdx: [], foundCards: [], isWinner: false })
  }

  handlePlayAgain = (event) => {
    this.handleReset()

    const { cardCount, fullDeck } = this.state
    this.setState({ currentDeck: deckBuilder(cardCount, fullDeck) })
  }

  menuReturn = (event) => {
    return (
      <Redirect to="/menu"/>
    )
  }



  render() {
      console.log(this.state)
    const { cardBack, cardCount, currentDeck, foundCards } = this.state

    return (
      <div className='board-component'>
        <div className='board-nav'>
            <Link className='menu-link' to='/menu'><img className='arrow' src='https://storage.needpix.com/thumbs/arrow-23255_1280.png' alt='back-arrow' /><h4>menu</h4></Link>
        </div>

        <div className='board-container'>
          {
            currentDeck ? (
              currentDeck.map( (card, idx) => (
                <div className='card-container' key={idx}>
                  {
                    foundCards.includes(card.name) ? (
                      <img className='card' src={require(`${card.image}`)} name={card.name}  alt={idx} />
                    ) : (
                      <input type='image' className='card' id={`${card.name}-${idx}`} src={cardBack} name={card.name} alt={require(`${card.image}`)} onClick={this.handleClick} />
                    )
                  }

                </div>
              ) )
            ) : (
              <div>
              </div>
            )
          }
        </div>

        { foundCards.length === cardCount ? (
            <div className='winner-container'>
              <div className='winner-box'>
                  <h1>winner</h1>
                  <h3>play again?</h3>
                <div className='btn-container'>
                  <input type='button' className='winner-btn'  onClick={this.handlePlayAgain} value='yes' />
                  <input type='button' className='winner-btn'  onClick={this.menuReturn} value='no' />
                </div>
              </div>
            </div>
          ) : (
          <div>
          </div>
        )}


      </div>
    )
  }
}

export default withRouter(Board)
