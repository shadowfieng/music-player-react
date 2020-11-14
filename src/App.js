import { useState, useRef } from 'react';

import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';

import './styles/app.scss';
import data from './data';

function App() {
    /* Ref */
    const audioRef = useRef(null);

    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        current: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [libraryStatus, setLibraryStatus] = useState(false);

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;

        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);

        const animationPercentage = Math.round(
            (roundedCurrent / roundedDuration) * 100
        );

        setSongInfo({
            ...songInfo,
            current,
            duration,
            animationPercentage,
        });
    };

    const onTrackEndHandler = async () => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );

        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

        if (isPlaying) audioRef.current.play();
    };

    return (
        <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
            <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            />
            <Song
                currentSong={currentSong}
                isPlaying={isPlaying}
                songInfo={songInfo}
            />
            <Player
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                songs={songs}
                audioRef={audioRef}
                setSongInfo={setSongInfo}
                songInfo={songInfo}
                setSongs={setSongs}
            />
            <Library
                libraryStatus={libraryStatus}
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
            />
            <audio
                ref={audioRef}
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                src={currentSong.audio}
                onEnded={onTrackEndHandler}
            ></audio>
        </div>
    );
}

export default App;
