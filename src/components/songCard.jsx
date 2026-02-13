function SongCard({ image, title, artist, onPlay, isPlaying }) {
  return (
    <div
      onClick={onPlay}
      className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="rounded-md w-full h-40 object-cover"
      />

      <h3 className="mt-3 font-semibold truncate text-white">
        {title}
      </h3>

      <p className="text-sm text-gray-400 truncate">
        {artist}
      </p>

      <button className="mt-2 text-green-500 font-semibold">
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}

export default SongCard;
