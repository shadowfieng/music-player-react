const LibrarySong = ({
    song,
    songs,
    setSongs,
    id,
    setCurrentSong,
    audioRef,
    isPlaying,
}) => {
    const songSelectHandler = async () => {
        setCurrentSong(song);

        const newSongs = songs.map((song) => {
            if (song.id === id) {
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

        await setSongs(newSongs);

        if (isPlaying) audioRef.current.play();
    };

    return (
        <div
            onClick={songSelectHandler}
            className={`library-song ${song.active ? 'selected' : ''}`}
        >
            <img alt={song.name} src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
