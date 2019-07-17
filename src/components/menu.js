import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

// import $ from 'jquery'

import './stylesheets/menuDesign.css'

class Menu extends Component {

  state = { theme: '', level: '' }

  handleClick = event => {
      this.setState({ [event.target.name]: event.target.alt })
  }

  render() {
    const { theme, level } = this.state


    return (
      <div className='menu-container'>
        <div className='menu-form'>
          <div className='card-opts theme'>
            <input type="image" className='got' active={theme === 'got' ? 'trueGot' : 'false' } src='got_card.png' alt='got' name='theme' onClick={this.handleClick} />
            <input type="image" className='disney' active={theme === 'disney' ? 'trueDisney' : 'false' } src='disney_card.png' alt='disney' name='theme' onClick={this.handleClick} />
            <input type="image" className='hp' active={theme === 'hp' ? 'trueHp' : 'false' } src='hp_card.png' alt='hp' name='theme' onClick={this.handleClick} />
            <input type="image" className='lordRings' active={theme === 'lordRings' ? 'trueLordRings' : 'false' } src='lord_rings_card.png' alt='lordRings' name='theme' onClick={this.handleClick} />
        </div>

        <div className='selected-container'>
        </div>

        <div className='card-opts level'>
            <input type="image" active={level === 'easy' ? 'trueEasy' : 'false' } className='easy' src='easy.png' alt='easy' name='level' onClick={this.handleClick} />

            <input type="image" active={level === 'medium' ? 'trueMedium' : 'false' } className='medium' src='medium.png' alt='medium' name='level' onClick={this.handleClick} />

            <input type="image" className='hard' src='hard.png' alt='hard' name='level' active={level === 'hard' ? 'trueHard' : 'false' } onClick={this.handleClick} />

            <input type="image" className='expert' src='expert.png' alt='expert' name='level' active={level === 'expert' ? 'trueExpert' : 'false' } onClick={this.handleClick} />
          </div>

        </div>

        <Link to={{ pathname: `/board/${theme}/${level}`, state: { theme: theme, level: level } }} className='play-btn' style={{display: (theme.length > 0 && level.length > 0) ? 'block' : 'none'}} >play</Link>


      </div>
    )
  }
}
export default withRouter(Menu);
