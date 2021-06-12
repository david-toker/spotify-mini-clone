import React from 'react'
// import {Howler} from 'howler';

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    // Howler.stop();
    chooseTrack(track)
  }

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img
        alt={track.albumUrl}
        src={track.albumUrl}
        style={{ height: "64px", width: "64px" }}
      />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
      </div>
    </div>
  );
}
