  //dom 元素
  const audio = document.getElementById('audio')
  const playBtn = document.querySelector('.icon-bofang')
  const zanTingBtn = document.querySelector('.icon-zanting1')
  const previousBtn = document.querySelector('.previous')
  const nextBtn = document.querySelector('.next')
  const playerProgress = document.querySelector('.player-progress')
  const timeStr = document.querySelector('.time')
  const playDurationBar = document.querySelector('.play-duration')
  const soundDuration = document.querySelector('.sound-duration')
  const soundProgress = document.querySelector('.sound-progress')
  const round = document.querySelector('.round')
  const playerProgressBar = document.querySelector('.player-progress-bar')
  const soundProgressBar = document.querySelector('.sound-progress-bar')
  const musicImg = document.querySelector('.music-img')
  const musician = document.querySelector('.musician')
  const musicName = document.querySelector('.name')

  //变量
  let duration, nowPlayIndex = 0
  const musicList = [{
      musicSrc: '../audio/music-1.mp3',
      musicPic: '../images/assets/music/music-1.jpg',
      musician: 'Daniel Powter',
      musicName: 'Free Loop'
  },
  {
      musicSrc: '../audio/music-2.mp3',
      musicPic: '../images/assets/music/music-2.jpg',
      musician: 'The Chainsmokers/Halsey/R3HAB',
      musicName: 'Closer',
  },
  {
      musicSrc: '../audio/music-3.mp3',
      musicPic: '../images/assets/music/music-3.jpg',
      musician: 'ILLENIUM,Nevve',
      musicName: 'Fractures',
  },
  {
    musicSrc: '../audio/music-4.mp3',
    musicPic: '../images/assets/music/music-4.jpg',
    musician: '蔡健雅',
    musicName: 'Letting Go',
  }]

  // 处理时间显示进度条
  function timeAndProgress() {
      playerProgress.style.width = audio.currentTime / audio.duration * 100 + '%'
      let time = audio.duration - audio.currentTime
      let minue = parseInt(time / 60)
      let second = parseInt(time % 60)
      let str = `${minue < 10 ? '0' + minue : minue}:${second < 10 ? '0' + second : second}`
      timeStr.innerHTML = str
  }

  // 设置播放的音乐和图片
  function setMusic(index) {
      musicImg.src = musicList[index].musicPic
      audio.src = musicList[index].musicSrc
      musician.innerHTML = musicList[index].musician
      musicName.innerHTML = musicList[index].musicName
      playMusic()
  }

  // 播放音乐
  function playMusic() {
      audio.play()
      playBtn.style.display = 'none'
      zanTingBtn.style.display = 'block'
  }

  // 暂停音乐
  function pauseMusic() {
      audio.pause()
      playBtn.style.display = 'block'
      zanTingBtn.style.display = 'none'
  }

  // 上一首
  function previousMusic() {
      if(nowPlayIndex == 0) {
          nowPlayIndex = musicList.length - 1
      } else {
          nowPlayIndex--
      }
      setMusic(nowPlayIndex)
  }

  // 下一首
  function nextMusic() {
      if(nowPlayIndex == musicList.length - 1) {
          nowPlayIndex = 0
      } else {
          nowPlayIndex++
      }
      setMusic(nowPlayIndex)
  }

  // 加载完MP3需要设置时间显示与进度条监听
  audio.addEventListener("canplay", function() {
      duration = audio.duration
      setInterval(function() {
          timeAndProgress()
      }, 1000)
  })

  // 播放完毕监听事件（下一首）
  audio.addEventListener("ended", function() {
      nextMusic()
  })

  // 点击进度条更改播放进度
  playerProgressBar.addEventListener("click", function(e) {
      audio.currentTime = e.offsetX / this.offsetWidth * duration
      timeAndProgress()
  })

  // 点击声音条更改声音大小
  soundDuration.addEventListener('click', function (e) {
      audio.volume = e.offsetX / this.offsetWidth
      soundProgress.style.width = e.offsetX / this.offsetWidth * 100 + '%'
  })

  // 声音拖动
  round.addEventListener('mousedown', function() {
      let soundBarLength = soundProgressBar.offsetWidth

      // 鼠标移动
      document.onmousemove = function(ev) {
          let myEvent = ev || event
          let disX = myEvent.clientX - soundProgressBar.getBoundingClientRect().left
          if(disX > soundBarLength) {
              disX = soundBarLength
          } else if(disX == 0){
              disX = 0
          }
          soundProgress.style.width = disX / soundBarLength * 100 + '%'
          audio.volume = disX /soundBarLength
      }

      // 鼠标抬起
      document.onmouseup = function() {
          document.onmousemove = null
          document.onmouseup = null
      }
  })

  // 播放
  playBtn.addEventListener('click', function() {
      playMusic()
  })

  // 暂停
  zanTingBtn.addEventListener('click', function() {
      pauseMusic()
  })

  // 上一首歌
  previousBtn.addEventListener('click', function() {
      previousMusic()
  })

  // 下一首歌
  nextBtn.addEventListener('click', function() {
      nextMusic()
  })