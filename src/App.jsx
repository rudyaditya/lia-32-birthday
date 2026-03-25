import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [coffeeClicked, setCoffeeClicked] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Trigger confetti animation on load with delay for dramatic effect
    setTimeout(() => {
      setShowConfetti(true)
    }, 300)
    
    // Try to autoplay the audio
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => {
          console.log('Autoplay prevented:', err)
        })
        setIsPlaying(true)
      }
    }

    // Try multiple strategies to autoplay
    setTimeout(playAudio, 500)
    
    // Also try on first user interaction
    const handleInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(err => console.log('Play failed:', err))
        setIsPlaying(true)
      }
      document.removeEventListener('click', handleInteraction)
    }
    
    document.addEventListener('click', handleInteraction)
    
    return () => {
      document.removeEventListener('click', handleInteraction)
    }
  }, [])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleCoffeeClick = () => {
    setCoffeeClicked(true)
  }

  // Generate confetti popper particles falling from top
  const confettiPieces = Array.from({ length: 150 }).map((_, i) => {
    const leftPos = Math.random() * 100
    const velocity = 2 + Math.random() * 3
    const vx = (Math.random() - 0.5) * 2
    const vy = velocity
    
    return {
      id: i,
      left: leftPos,
      top: -10,
      vx: vx,
      vy: vy,
      delay: Math.random() * 0.3,
      duration: 3 + Math.random() * 1.5,
      rotation: Math.random() * 360,
      type: ['circle', 'square', 'star'][Math.floor(Math.random() * 3)]
    }
  })

  return (
    <div className="app-container">
      {/* Background decorative elements */}
      <div className="coffee-bean coffee-bean-1"></div>
      <div className="coffee-bean coffee-bean-2"></div>
      <div className="coffee-bean coffee-bean-3"></div>
      <div className="coffee-cup coffee-cup-1"></div>
      <div className="coffee-cup coffee-cup-2"></div>

      {/* Enhanced Confetti Popper */}
      {showConfetti && (
        <div className="confetti-popper-container">
          {confettiPieces.map(piece => (
            <div
              key={piece.id}
              className={`confetti-popper confetti-${piece.type}`}
              style={{
                '--start-x': `${piece.left}%`,
                '--start-y': `${piece.top}%`,
                '--vx': piece.vx,
                '--vy': piece.vy,
                '--delay': `${piece.delay}s`,
                '--duration': `${piece.duration}s`,
                '--rotation': `${piece.rotation}deg`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Audio Player */}
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}birthday-song.mp3`}
        loop
        playsInline
      ></audio>

      <button
        className={`music-button ${isPlaying ? 'playing' : ''}`}
        onClick={toggleAudio}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="music-icon">♪</span>
      </button>

      {/* Main Content */}
      <main className="main-content">
        {/* Header with decorations */}
        <div className="header-section">
          <div className="birthday-banner">
            <div className="corner-emoji corner-emoji-top-right">🥳</div>
            <div className="corner-emoji corner-emoji-bottom-left">🥳</div>
            <h1 className="main-title">Happy Birthday</h1>
            <h2 className="name-title">Angela Prissilia</h2>
            <div className="decorative-line"></div>
          </div>
        </div>

        {/* Coffee and Birthday Theme Section */}
        <section className="coffee-birthday-section">
          <div className="coffee-decoration">
            <div className="click-me-caption">Click me! ☕</div>
            <div className={`cute-coffee-cup ${coffeeClicked ? 'clicked' : ''}`} onClick={handleCoffeeClick}>
              <div className="coffee-cup-handle"></div>
              <div className="coffee-cup-body">
                <div className="coffee-liquid">
                  {/* Ice cubes */}
                  <div className="ice-cube ice-cube-1"></div>
                  <div className="ice-cube ice-cube-2"></div>
                  <div className="ice-cube ice-cube-3"></div>
                  <div className="ice-cube ice-cube-4"></div>
                  <div className="ice-cube ice-cube-5"></div>
                  <div className="ice-cube ice-cube-6"></div>
                </div>
                <div className="coffee-foam"></div>
                <div className="coffee-steam"></div>
                <div className="coffee-sparkle"></div>
              </div>
            </div>
          </div>

          <div className="wishes-container">
            <div className="wish-card main-wish">
              <div className="wish-icon">💕</div>
              <h3>Happy 32nd Birthday to the One Who Hold My Heart</h3>
              <p>
                On this special day, I'm celebrating more than just your birthday—I'm celebrating the amazing person you are. Your warmth, kindness, and love bring so much joy into my life. Like the perfect cup of coffee, you make every moment feel better. Thank you for being yourself.
              </p>
              <p>
                I hope the very best for your career and your health, and that this year brings you closer to all your dreams. God bless you always, Lia!
              </p>
              <p className="ice-cube-message">
                And hey… at least this year you have your own little ice cube (me) in your life to keep things cool 😄💙
              </p>
            </div>
          </div>
        </section>



        {/* Decorative Footer */}
        <div className="footer-decoration">
          <div className="birthday-cake">
            <div className="cake-top"></div>
            <div className="cake-middle"></div>
            <div className="cake-bottom"></div>
            <div className="candles-container">
              <div className="candle"></div>
              <div className="candle"></div>
              <div className="candle"></div>
            </div>
          </div>
          <p className="footer-text">With all my love ❤️</p>
        </div>
      </main>
    </div>
  )
}

export default App
