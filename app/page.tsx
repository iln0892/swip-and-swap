"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Playlist } from "@/components/Playlist"

export default function Page() {
  const [time, setTime] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState("")
  const soundcloudRef = useRef<HTMLIFrameElement>(null)
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)

  useEffect(() => {
    const savedSong = localStorage.getItem("currentSong")
    if (savedSong) {
      setCurrentSong(savedSong)
    } else {
      setCurrentSong(
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1690026381&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
      )
    }
  }, [])

  useEffect(() => {
    if (currentSong) {
      localStorage.setItem("currentSong", currentSong)
    }
  }, [currentSong])

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Berlin",
      }

      const formatter = new Intl.DateTimeFormat("de-DE", options)
      setTime(formatter.format(new Date()))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleSoundCloudEvent = (event: MessageEvent) => {
      if (event.origin !== "https://w.soundcloud.com") return
      try {
        const data = JSON.parse(event.data)
        if (data.soundcloud && data.soundcloud.eventName === "play") {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause()
            setIsPlaying(false)
          }
        }
      } catch (error) {
        console.error("Error parsing SoundCloud message:", error)
      }
    }

    window.addEventListener("message", handleSoundCloudEvent)
    return () => {
      window.removeEventListener("message", handleSoundCloudEvent)
    }
  }, [])

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
        if (soundcloudRef.current) {
          soundcloudRef.current.contentWindow?.postMessage('{"method":"pause"}', "*")
        }
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSongSelect = (src: string) => {
    if (isPlaying && videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
    setCurrentSong(src)
    setIsPlaylistOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#E5E5E3]">
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-[#E5E5E3] z-50">
        <Link href="/" className="font-bold text-xl">
          SWAP & SIP
        </Link>
        <div className="font-mono">{time}</div>
      </header>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 md:pr-96">
          {/* Hero Poster */}
          <div className="pt-32 px-6 mb-12">
            <div
              className="max-w-[500px] mx-auto cursor-pointer"
              onClick={() =>
                setSelectedImage(
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plakatswapsip-ODuqez0i9qpL9pptmoLtApw3Cco7zh.png",
                )
              }
            >
              <div className="relative aspect-[1/1.414]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plakatswapsip-ODuqez0i9qpL9pptmoLtApw3Cco7zh.png"
                  alt="Swap & Sip Poster"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <section className="pb-24 px-6">
            <p className="text-xl leading-relaxed max-w-5xl mb-4">GIZEM ILGÜN (2025)</p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight max-w-4xl mb-8">Swap & Sip – Tausch Bazaar</h1>
            <div className="text-xl leading-relaxed max-w-5xl space-y-4">
              <p>
                Swap & Sip hinterfragt den klassischen Weg gespendeter Kleidung. Ausgangspunkt war die Recherche zu
                Altkleidercontainern und der Annahme, dass die Kleidung in lokalen Secondhand-Läden landet.
              </p>
              <p>
                Vor Ort stellte sich jedoch heraus, dass sie oft aussortiert, an unbekannte Orte transportiert und
                weiterverkauft wird. Diese Intransparenz führte zur Idee eines alternativen Systems, in dem Kleidung
                bewusst weitergegeben wird.
              </p>
              <p>
                Daraus entstand Swap & Sip – ein experimentelles Format, das an der Universität realisiert wurde. Hier
                ging es nicht nur um das Tauschen von Kleidung, sondern um eine neue Form des Austauschs: Musik,
                kuratiert von einem DJ, und Getränke begleiteten das Event, um den Prozess des Gebens und Nehmens als
                offene, soziale Interaktion zu gestalten. Der Fokus lag nicht auf Verzicht oder bloßer Nachhaltigkeit,
                sondern auf der aktiven Auseinandersetzung mit Besitz, Wert und Zirkulation – jenseits festgefahrener
                Konsumlogiken.
              </p>
            </div>
          </section>

          {/* Images */}
          <section className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.title} className="cursor-pointer" onClick={() => setSelectedImage(project.image)}>
                  <div className="relative aspect-square mb-4">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{project.title}</h3>
                    <div className="text-sm text-gray-600">[ {project.client} ]</div>
                    <div className="font-mono text-sm">{project.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Video Section */}
          <section className="px-6 py-24">
            <div className="max-w-[405px] mx-auto">
              <div className="relative aspect-[9/16] group cursor-pointer" onClick={handleVideoClick}>
                <Image
                  src="https://pioperations.com/bilder-gizem/titelbildvideo.png"
                  alt="Video cover"
                  fill
                  className={`absolute top-0 left-0 transition-opacity duration-500 object-cover ${
                    isPlaying ? "opacity-0" : "opacity-100"
                  }`}
                />
                <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" playsInline>
                  <source
                    src="https://pioperations.com/bilder-gizem/copy_61C2F59F-19E0-4845-8A3D-1A31554DA1A6.MOV"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500">
                  <div className="text-white text-xl font-bold">[ {isPlaying ? "PAUSE" : "PLAY"} ]</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Playlist - Desktop */}
        <div className="hidden md:block w-96 fixed right-0 top-0 h-screen p-6 pt-20 bg-[#E5E5E3] overflow-y-auto">
          <Playlist onSongSelect={handleSongSelect} />
          {currentSong && (
            <iframe
              ref={soundcloudRef}
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={currentSong}
              className="mt-4"
            ></iframe>
          )}
        </div>

        {/* Playlist - Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#E5E5E3] shadow-lg">
          <div className="p-4 flex justify-between items-center">
            <button onClick={() => setIsPlaylistOpen(!isPlaylistOpen)} className="text-sm font-bold">
              [ {isPlaylistOpen ? "PLAYLIST SCHLIESSEN" : "PLAYLIST ÖFFNEN"} ]
            </button>
            {currentSong && (
              <iframe
                ref={soundcloudRef}
                width="200"
                height="20"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`${currentSong}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
              ></iframe>
            )}
          </div>
          {isPlaylistOpen && (
            <div className="p-4 max-h-64 overflow-y-auto">
              <Playlist onSongSelect={handleSongSelect} />
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-0">
          {selectedImage && (
            <div className="relative w-full h-[85vh] flex items-center justify-center group">
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Full size image"
                className="object-contain h-full w-auto cursor-pointer"
                width={1000}
                height={1414}
                onClick={() => setSelectedImage(null)}
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() => setSelectedImage(null)}
              >
                <span className="text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
                  [{selectedImage.includes("zPkut") ? "Plakat schließen" : "Bild schließen"}]
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

const projects = [
  {
    title: "SWAP & SIP EVENT",
    client: "FASHION",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/DSC00317.JPG",
    slug: "event-one",
  },
  {
    title: "SUSTAINABLE FASHION",
    client: "LIFESTYLE",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/DSC00339.JPG",
    slug: "event-two",
  },
  {
    title: "COMMUNITY",
    client: "PEOPLE",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/DSC00313.JPG",
    slug: "event-three",
  },
  {
    title: "EXCHANGE",
    client: "FASHION",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/DSC00342.JPG",
    slug: "event-four",
  },
  {
    title: "CONNECTIONS",
    client: "PEOPLE",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/DSC00348.JPG",
    slug: "event-five",
  },
  {
    title: "SUSTAINABILITY",
    client: "FASHION",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/DSC00346.JPG",
    slug: "event-six",
  },
  {
    title: "COMMUNITY SPIRIT",
    client: "LIFESTYLE",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/DSC00330.JPG",
    slug: "event-seven",
  },
  {
    title: "EXCHANGE CULTURE",
    client: "FASHION",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/DSC00338.JPG",
    slug: "event-eight",
  },
  {
    title: "CLOTHING EXCHANGE",
    client: "SUSTAINABILITY",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/swipswap_1.JPG",
    slug: "swap-one",
  },
  {
    title: "EVENT ATMOSPHERE",
    client: "COMMUNITY",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/swipswap_2.JPG",
    slug: "swap-two",
  },
  {
    title: "SOCIAL INTERACTION",
    client: "PEOPLE",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/swipswap_3.JPG",
    slug: "swap-three",
  },
  {
    title: "FASHION DETAILS",
    client: "FASHION",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/swipswap_4.JPG",
    slug: "swap-four",
  },
  {
    title: "EVENT SPACE",
    client: "VENUE",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/swipswap_5.JPG",
    slug: "swap-five",
  },
  {
    title: "COMMUNITY ENGAGEMENT",
    client: "SOCIAL",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/swipswap_6.JPG",
    slug: "swap-six",
  },
  {
    title: "FASHION DISPLAY",
    client: "EXHIBITION",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/swipswap_7.JPG",
    slug: "swap-seven",
  },
  {
    title: "EVENT PARTICIPANTS",
    client: "COMMUNITY",
    date: "02—02—2025",
    image: "https://pioperations.com/bilder-gizem/swipswap_8.JPG",
    slug: "swap-eight",
  },
]

