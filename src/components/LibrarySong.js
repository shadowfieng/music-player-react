const LibrarySong = ({
    song,
    songs,
    setSongs,
    id,
    setCurrentSong,
    audioRef,
    isPlaying,
}) => {
    const songSelectHandler = () => {
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

        setSongs(newSongs);

        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audioRef.current.play();
                });
            }
        }
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
