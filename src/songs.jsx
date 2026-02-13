import { useEffect, useState, useContext } from "react";
import SongCard from "./components/songCard";
import { playerContext } from "./context/playercontext";

function Songs() {
  const [apiSongs, setApiSongs] = useState([]);
  const { setTrack, play, track } = useContext(playerContext);

  useEffect(() => {
    fetch(
      "https://itunes.apple.com/search?term=arijit&media=music&limit=20"
    )
      .then((res) => res.json())
      .then((data) => setApiSongs(data.results || []));
  }, []);

  const handlePlay = (song) => {
    setTrack({
      name: song.title,
      desc: song.artist,
      image: song.image,
      file: song.preview,
    });
  };

  return (
    <div className="p-6">
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
            onPlay={() =>
              handlePlay({
                title: song.trackName,
                artist: song.artistName,
                image: song.artworkUrl100,
                preview: song.previewUrl,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Songs;
