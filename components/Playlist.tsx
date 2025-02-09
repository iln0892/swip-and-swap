import type React from "react"

interface Song {
  title: string
  artist: string
  src: string
}

const songs: Song[] = [
  {
    title: "CS70 House",
    artist: "Genius Of Time",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1690026381&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "S-Recovery",
    artist: "Jump Source",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/428705529&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Water",
    artist: "Andy Hart",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1184176123&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Papertrip",
    artist: "WALLACE",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1741505907&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Articulate",
    artist: "The Burrell Connection",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/126859787&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Untitled 01",
    artist: "Taro Asama",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/358846808&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Lovers (Original Mix)",
    artist: "Cesar D' Julius",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/998265241&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
  {
    title: "Mary Jane",
    artist: "Borrowed Identity",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/248872867&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
  },
]

interface PlaylistProps {
  onSongSelect: (src: string) => void
}

export const Playlist: React.FC<PlaylistProps> = ({ onSongSelect }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 font-mono">Playlist des Events</h2>
      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li
            key={index}
            className="font-mono text-sm cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => onSongSelect(song.src)}
          >
            <span className="font-bold">{song.artist}</span> - {song.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

