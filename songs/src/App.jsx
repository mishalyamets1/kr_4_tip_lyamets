import React, { useState } from 'react'
import './App.css'

const initialSongs = [
  { id: 1, title: 'Я РУССКИЙ', artist: 'SHAMAN', url: 'https://music.yandex.ru/album/23012335?ref_id=53E98EE0-B4C1-40DA-A65C-DD5C6BCA5180&utm_medium=copy_link', favorite: false },
  { id: 2, title: 'Never Gonna Give You Up', artist: 'Rick Astley', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', favorite: false },
]

function App() {
  const [songs, setSongs] = useState(initialSongs)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [url, setUrl] = useState('')
  const toggleFavorite = (id) => {
    setSongs(prev =>
      prev.map(song =>
        song.id === id ? { ...song, favorite: !song.favorite } : song
      )
    )
  }
  const addSong = (e) => {
    e.preventDefault()

    if (!title.trim() || !artist.trim() || !url.trim()) return

    const newSong = {
      id: Date.now(),
      title,
      artist,
      url,
      favorite: false,
    }

    setSongs(prev => [...prev, newSong])

    setTitle('')
    setArtist('')
    setUrl('')
  }

  const filteredSongs = showOnlyFavorites
    ? songs.filter(song => song.favorite)
    : songs

  return (
    <div className="app">
      <h1>Список любимых песен</h1>
      <form className="add-form" onSubmit={addSong}>
        <input
        className='input-field'
          type="text"
          placeholder="Название песни"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
        className='input-field'
          type="text"
          placeholder="Исполнитель"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
        className='input-field'
          type="text"
          placeholder="Ссылка на музыку"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className='add-btn' type="submit">Добавить</button>
      </form>

      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={showOnlyFavorites}
            onChange={(e) => setShowOnlyFavorites(e.target.checked)}
          />
          Показывать только избранные
        </label>
      </div>

      {filteredSongs.length === 0 ? (
        <p className="empty">
          {showOnlyFavorites ? 'Нет избранных песен.' : 'Список пуст.'}
        </p>
      ) : (
        <ul className="song-list">
          {filteredSongs.map((song) => (
            <li key={song.id} className="song-item">
              <div className="song-info">
                <span className="song-title">{song.title}</span>
                <span className="song-artist">{song.artist}</span>
                <a href={song.url} target="_blank" className="song-link">Открыть</a>
              </div>

              <button
                className={`favorite-btn ${song.favorite ? 'favorite-btn--active' : ''}`}
                onClick={() => toggleFavorite(song.id)}
              >
                {song.favorite ? 'В избранном' : 'В избранное'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
