import './style.css'

const player = document.querySelector('.player');
const playButton = document.querySelector('.play');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress_container');
const progressBar = document.querySelector('.progress');
const titleSong = document.querySelector('.song');
const cover = document.querySelector('.cover-img');
const iconPlay = document.querySelector('.icon-play');

const songs = [ 'Ak Discovery', 'Jella Imensity','Rasi Zamin'];

let songIndex = 0;

function loadSong(song) {
   titleSong.innerHTML = song
   audio.src = `audio/${song}.mp3`
   //cover.src = `images/music${songIndex + 1}.jpg`
}

loadSong(songs[songIndex])

function playSong() {
    player.classList.add('play')
    cover.classList.add('active')
    iconPlay.src = './images/pause.svg'
    audio.play()
}

function pauseSong() {
    player.classList.remove('play')
    cover.classList.remove('active')
    iconPlay.src = './images/chevron-right.svg'
    audio.pause()
}

playButton.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

function nextSong() {
    songIndex++

    if (songIndex > songs.length -1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}
nextButton.addEventListener('click', nextSong)

function prevSong() {
    songIndex--
    
    if (songIndex < 0) {
        songIndex = songs.length -1
    }

    loadSong(songs[songIndex])
    playSong();
}
prevButton.addEventListener('click', prevSong)

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progressBar.style.width = `${progressPercent}%`

}

audio.addEventListener('timeupdate', updateProgress)


function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width) * duration
}

progressContainer.addEventListener('click', setProgress)


audio.addEventListener('ended', nextSong)