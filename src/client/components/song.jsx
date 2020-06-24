import React from 'react';
import { RiMusicLine } from 'react-icons/ri';
import { RiVolumeUpLine } from 'react-icons/ri';
import { BsPlayFill } from 'react-icons/bs';
import { BsPause } from 'react-icons/bs';
import ShowOptions from './showOptions.jsx';
//Takes in a song object, and renders all components of that song

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      image: "https://tinyurl.com/ya65klnb"
    }
    this.toggleHover = this.toggleHover.bind(this);
  }
  //when mouse over, toggle the hover function to rerender state
  toggleHover() {
    this.setState({
      hover: !this.state.hover
    })
  }

  //calculte duration in minutes. Database stores in seconds
  duration() {
    var seconds = (this.props.song.duration) % 60
    if (seconds < 10) { seconds = '0' + seconds }
    var minutes = Math.floor(this.props.song.duration / 60)
    let duration = minutes + ":" + seconds;
    return duration
  }

  //conditional rendering based on state of props and this
  render () {
    //if this is the playing song
    if (this.props.song._id === this.props.playingSong) {
      //if this song is selected or hovered over
      if (this.state.hover || this.props.song._id === this.props.selectedSong) {
        //playing, selected, song is not paused
        //on click, pause the song
        //icon is pause
        //show options
        if (!this.props.songIsPaused) {
          return (
            <li className="song songSelected notPaused songPlaying">
              <span
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}>
                <a className="icon"
                onClick={((e) => this.props.pauseSong(e, this.props.song._id))}>
                  <BsPause /></a>
                  <img className="songImage" src={this.state.image} />
                <div className="songTitle">
                  {this.props.song.title}</div>
                <ShowOptions onClick={((e) => this.props.changeSlectedSong(e, this.props.song._id))}/>
                <div className="duration">{this.duration()}</div>
              </span>
            </li>
          )
        }
        //playing, selected, song is paused
        //on click, play song
        //icon is play button
        //show options
        if (this.props.songIsPaused) {
          return (
            <li className="song songSelected paused songPlaying">
              <span
                onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover}>
                <a className="icon"
                  onClick={((e) => this.props.playSong(e, this.props.song._id))}>
                  <BsPlayFill /></a>
                <img className="songImage" src={this.state.image} />
                <div className="songTitle">
                  {this.props.song.title}</div>
                <ShowOptions onClick={((e) => this.props.changeSlectedSong(e, this.props.song._id))}/>
                <div className="duration">{this.duration()}</div>
              </span>
            </li>
          )
        }
      }
      //if playing, not selected, not paused
      //on click, pause song
      //icon is the speaker/volume button
      if (!this.props.songIsPaused) {
        return (
          <li className="song notPaused songPlaying">
            <span
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}>
              <a className="icon"
                onClick={((e) => this.props.pauseSong(e, this.props.song._id))}>
                <RiVolumeUpLine /></a>
                <img className="songImage" src={this.state.image} />
              <div className="songTitle">
                {this.props.song.title}</div>
              <div className="duration">{this.duration()}</div>
            </span>
          </li>
        )
      } else {
        //if not selected, this song is playing, but song is paused
        //on click, play the song
        //icon is music note
        return (
          <li className="song paused songPlaying">
            <span
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}>
              <a className="icon"
                onClick={((e) => this.props.playSong(e, this.props.song._id))}>
                <RiMusicLine /></a>
                <img className="songImage" src={this.state.image} />
              <div className="songTitle">
                {this.props.song.title}</div>
              <div className="duration">{this.duration()}</div>
            </span>
          </li>
        )
      }
    } else if (this.props.song._id !== this.props.playingSong) {
      //if song is not playing

      //not playing, song is selected or hovered
      //on click play the song
      //icon is play button
      //include show options
      if (this.state.hover || this.props.song._id === this.props.selectedSong) {
        return (
          <li className="song songSelected">
            <span
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}>
              <a className="icon"
                onClick={((e) => this.props.playSong(e, this.props.song._id))}>
                <BsPlayFill /></a>
                <img className="songImage" src={this.state.image} />
              <div className="songTitle">
                {this.props.song.title}</div>
              <ShowOptions onClick={((e) => this.props.changeSlectedSong(e, this.props.song._id))}/>
              <div className="duration">{this.duration()}</div>
            </span>
          </li>
        )
      }
      //not playing, not selected, all else
      //on click, play song
      //icon is music note
      return (
        <li className="song">
          <span
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}>
            <a className="icon"
              onClick={((e) => this.props.playSong(e, this.props.song._id))}>
              <RiMusicLine /></a>
              <img className="songImage" src={this.state.image} />
            <div className="songTitle">
              {this.props.song.title}</div>
            <div className="duration">{this.duration()}</div>
          </span>
        </li>
      )
    }
  }
}


export default Song