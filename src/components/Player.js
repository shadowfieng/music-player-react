import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    setSongInfo,
    songInfo,
    songs,
    setSongs,
}) => {
    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });

        setSongs(newSongs);
    };
    /* EventHandlers */
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, current: e.target.value });
    };

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );

        if (direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if (isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) audioRef.current.play();
    };

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };

    const trackBackground = {
        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
    };

    /* Functions */
    const getTime = (time) => {
        return (
            Math.floor(time / 60) +
            ':' +
            ('0' + Math.floor(time % 60)).slice(-2)
        );
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.current)}</p>
                <div style={trackBackground} className="track">
                    <input
                        type="range"
                        min={1}
                        max={songInfo.duration || 0}
                        value={songInfo.current}
                        onChange={dragHandler}
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>

                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    onClick={() => skipTrackHandler('skip-back')}
                    size="2x"
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                    onClick={playSongHandler}
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    onClick={() => skipTrackHandler('skip-forward')}
                    size="2x"
                    icon={faAngleRight}
                />
            </div>
        </div>
    );
};

export default Player;
