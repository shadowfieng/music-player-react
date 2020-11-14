const Song = ({ currentSong, songInfo }) => {
    const songAnimation = {
        transform: `rotate(${songInfo.current * 10}deg)`,
    };
    return (
        <div className="song-container">
            <img
                alt={currentSong.name}
                style={songAnimation}
                src={currentSong.cover}
            />
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    );
};

export default Song;
