import React, { useState, useEffect } from 'react';
import {Howl, Howler} from 'howler';
import { Card, Button } from 'react-bootstrap'

export default function Player({ accessToken, trackUri, title, artist, albumImg, releaseDate }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    console.log("music changed");
    Howler.stop();
  }, [trackUri]);

  const soundPlay = (src) => {
    const sound = new Howl({
      src,
      html5: true,
      onplay: () => {
        console.log("play");
        setIsPlaying(true);
      },
      onload: () => {
        console.log("load");
      },
      onmute: () => {
        console.log('muted?')
      },
      onend: () => {
        console.log("end");
        setIsPlaying(false);
      },
      onstop: () => {
        console.log("onstop");
        setIsPlaying(false);
      },
    });
    if(isPlaying) {
      Howler.stop();
    } else {
      sound.play();
    }
  }

  const muteMymusic = () => {
    Howler.mute(!isMuted);
    setIsMuted(prevState => !prevState)
  }

  if (!accessToken) return null;
  return (
    <Card>
      <Card.Header>
        <img
          className="p-1"
          alt={albumImg}
          src={albumImg}
          style={{ height: "64px", width: "64px" }}
        />
        {artist || " Artist"}
      </Card.Header>
      <Card.Body>
        <Card.Title>{title || "Title"}</Card.Title>
        <Card.Text>
          {trackUri
            ? `Release date: ${releaseDate}`
            : "Sorry preview song not provided"}
        </Card.Text>
        <Button
          variant="success"
          disabled={!trackUri}
          onClick={() => soundPlay(trackUri)}
        >
          {isPlaying ? "Stop" : "Play"}
        </Button>
        <Button className="ml-2" onClick={() => muteMymusic()}>
          {isMuted ? "Unmute" : "Mute"}
        </Button>
      </Card.Body>
    </Card>
  );
}


// import React, { useEffect, useState } from 'react';
// import SpotifyPlayer from 'react-spotify-web-playback';

// export default function Player({ accessToken, trackUri }) {
//   const [play, setPlay] = useState(false);

//   useEffect(() => setPlay(true), [trackUri]);

//   if (!accessToken) return null;
//   return (
//     <SpotifyPlayer
//       token={accessToken}
//       showSaveIcon
//       callback={state => {
//         if (!state.isPlaying) setPlay(false)
//       }}
//       play={play}
//       uris={trackUri ? [trackUri] : []}
//     />
//   );
// }