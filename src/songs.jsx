import { useEffect, useState, useRef } from "react";
import SongCard from "./components/songCard";

function Songs() {
  const [apiSongs, setApiSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  // Fetch API songs
  useEffect(() => {
    fetch(
      "https://itunes.apple.com/search?term=arijit&media=music&limit=20"
    )
      .then((res) => res.json())
      .then((data) => setApiSongs(data.results || []));
  }, []);

  // Play selected song
  const handlePlay = (song) => {
    if (currentSong?.preview === song.preview) {
      togglePlay();
      return;
    }

    setCurrentSong(song);
    setIsPlaying(true);

    setTimeout(() => {
      audioRef.current.play();
    }, 100);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-6 pb-32">
      <h2 className="text-2xl font-bold text-white mb-6">
        API Songs
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {apiSongs.map((song) => (
          <SongCard
            key={song.trackId}
            image={song.artworkUrl100}
            title={song.trackName}
            artist={song.artistName}
            preview={song.previewUrl}
            isPlaying={
              currentSong?.preview === song.preview && isPlaying
            }
            onPlay={() =>
              handlePlay({
                image: song.artworkUrl100,
                title: song.trackName,
                artist: song.artistName,
                preview: song.previewUrl,
              })
            }
          />
        ))}
      </div>

      {/* GLOBAL AUDIO PLAYER */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-black p-4 flex items-center justify-between border-t border-gray-700">
          
          <div className="flex items-center gap-4">
            <img
              src={currentSong.image}
              className="w-14 h-14 rounded"
            />
            <div>
              <p className="text-white font-semibold">
                {currentSong.title}
              </p>
              <p className="text-gray-400 text-sm">
                {currentSong.artist}
              </p>
            </div>
          </div>

          <button
            onClick={togglePlay}
            className="bg-green-500 px-6 py-2 rounded-full text-black font-bold"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <audio
            ref={audioRef}
            src={currentSong.preview}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Songs;
