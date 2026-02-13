import { createContext, useRef, useState, useEffect } from "react";
import { songsData } from "../assets/assets";

export const playerContext = createContext();

const PlayerContextProvider = ({ children }) => {

    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);

    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    // 🔥 AUTO PLAY WHEN TRACK CHANGES
    useEffect(() => {
        if (audioRef.current && track) {
            audioRef.current.src = track.file;
            audioRef.current.play();
            setPlayStatus(true);
        }
    }, [track]);

    // 🎵 Update Time & Seek Bar
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => {
            if (audio.duration) {
                seekBar.current.style.width =
                    Math.floor((audio.currentTime / audio.duration) * 100) + "%";

                setTime({
                    currentTime: {
                        second: Math.floor(audio.currentTime % 60),
                        minute: Math.floor(audio.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audio.duration % 60),
                        minute: Math.floor(audio.duration / 60)
                    }
                });
            }
        };

        audio.addEventListener("timeupdate", updateTime);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
        };

    }, []);

    // ▶ Play
    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    // ⏸ Pause
    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    // ⏮ Previous
    const previous = () => {
        if (track.id > 0) {
            setTrack(songsData[track.id - 1]);
        }
    };

    // ⏭ Next
    const next = () => {
        if (track.id < songsData.length - 1) {
            setTrack(songsData[track.id + 1]);
        }
    };

    // ▶ Play by ID (Static Songs)
    const playWithId = (id) => {
        setTrack(songsData[id]);
    };

    // 🎯 Seek
    const seekSong = (e) => {
        const width = seekBg.current.offsetWidth;
        const clickX = e.nativeEvent.offsetX;
        audioRef.current.currentTime =
            (clickX / width) * audioRef.current.duration;
    };

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        time
    };

    return (
        <playerContext.Provider value={contextValue}>
            {children}
        </playerContext.Provider>
    );
};

export default PlayerContextProvider;
