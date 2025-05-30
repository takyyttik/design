document.addEventListener('DOMContentLoaded', function() {

    var swiper = new Swiper(".swiper", {
        effect: "cards",
        cardsEffect: {
          perSlideOffset: 5,
          perSlideRotate: 3,
        },
        grabCursor: true,
        speed: 700,
        initialSlide: 2,
      });  
});

document.addEventListener('DOMContentLoaded', function() {

    //TOGGLE MENU NAV VIA ADDING/REMOVING A DATA ATTRIBUTE
    const menubutton = document.querySelector('.menu-button');
    const menunav = document.querySelector('.toggle-nav');
    menubutton.addEventListener('click', function() {
        if (menunav.getAttribute('data-navstate') === 'open') {
            menunav.setAttribute('data-navstate', 'closed');
        } else {
            menunav.setAttribute('data-navstate', 'open');
        }
    });
    //console.log('Nav is working')   
});

document.addEventListener('DOMContentLoaded', function() {

    // PLAYLIST
    const playlistItems = document.querySelectorAll(".playlist-item");
    const likeBtns = document.querySelectorAll(".like-btn");
    const audioPlayer = document.getElementById("audioPlayer");
    const volumeRange = document.getElementById("volume-range");
    const progressBar = document.getElementById("progress-bar");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playPauseIcon = document.getElementById("playPauseIcon");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const shuffleBtn = document.getElementById("shuffleBtn");
    
    let currentSongIndex = 2;
    let isSongLoaded = false;
    
    const songs = [
      "music/forever_keshi.mp3",
      "music/youwould_jhin.mp3",
      "music/alright_raph.mp3",
      "music/loveyoutwice_yunjin.mp3",
      "music/dejavu_starfall.mp3",
      "music/softspot_keshi.mp3",
      "music/nowiknow_jasonyu.mp3",      
      "music/lastgoodbye_sunkis.mp3",
    ];
    
    var swiper = new Swiper(".swiper", {
      effect: "cards",
      cardsEffect: {
        perSlideOffset: 9,
        perSlideRotate: 3,
      },
      grabCursor: true,
      speed: 700,
      initialSlide: 2,
    });
    
    swiper.on("slideChange", () => {
      const newIndex = swiper.realIndex;
      if (newIndex !== currentSongIndex) {
        currentSongIndex = newIndex;
        loadAndPlaySong(currentSongIndex);
        updatePlayPauseIcon(true);
      }
    });
    
    function updateSwiperToMatchSong(index) {
      if (swiper.activeIndex !== index) {
        swiper.slideTo(index);
      }
    }
    
    function updatePlaylistHighlight(index) {
      playlistItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add("active-playlist-item");
        } else {
          item.classList.remove("active-playlist-item");
        }
      });
    }
    
    function loadAndPlaySong(index) {
      audioPlayer.src = songs[index];
      playSong();
      updatePlaylistHighlight(index);
      updateSwiperToMatchSong(index);
      isSongLoaded = true;
    }
    
    function pauseSong() {
      audioPlayer.pause();
      updatePlayPauseIcon(false);
    }
    
    function playSong() {
      audioPlayer.play();
      updatePlayPauseIcon(true);
    }
    
    function togglePlayPause() {
      if (!isSongLoaded) {
        loadAndPlaySong(currentSongIndex);
        isSongLoaded = true;
      } else if (audioPlayer.paused) {
        playSong();
      } else {
        pauseSong();
      }
    }
    
    function updatePlayPauseIcon(isPlaying) {
      if (isPlaying) {
        playPauseIcon.classList.add("fa-pause");
        playPauseIcon.classList.remove("fa-play");
      } else {
        playPauseIcon.classList.add("fa-play");
        playPauseIcon.classList.remove("fa-pause");
      }
    }
    
    function nextSong() {
      currentSongIndex = (currentSongIndex + 1) % songs.length;
      loadAndPlaySong(currentSongIndex);
      swiper.slideTo(currentSongIndex);
    }
    
    function prevSong() {
      currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      loadAndPlaySong(currentSongIndex);
      swiper.slideTo(currentSongIndex);
    }
    
    playlistItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        currentSongIndex = index;
        loadAndPlaySong(index);
      });
    });
    
    playPauseBtn.addEventListener("click", togglePlayPause);
    nextBtn.addEventListener("click", nextSong);
    prevBtn.addEventListener("click", prevSong);
    
    audioPlayer.addEventListener("loadedmetadata", () => {
      progressBar.max = audioPlayer.duration;
      progressBar.value = audioPlayer.currentTime;
    });
    
    audioPlayer.addEventListener("timeupdate", () => {
      if (!audioPlayer.paused) {
        progressBar.value = audioPlayer.currentTime;
      }
    });
    
    progressBar.addEventListener("input", () => {
      audioPlayer.currentTime = progressBar.value;
    });
    
    progressBar.addEventListener("change", () => {
      playSong();
    });
    
    volumeRange.addEventListener("input", () => {
      var newVolume = volumeRange.value;
      audioPlayer.volume = newVolume / 100;
    });
    
    audioPlayer.addEventListener("ended", nextSong);
    
    shuffleBtn.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * songs.length);
    
      if (randomIndex !== currentSongIndex) {
        currentSongIndex = randomIndex;
        loadAndPlaySong(currentSongIndex);
      } else {
        const nextRandomIndex = (randomIndex + 1) % songs.length;
        currentSongIndex = nextRandomIndex;
        loadAndPlaySong(currentSongIndex);
      }
    });
    
    likeBtns.forEach((likeBtn) => {
      likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        likeBtn.classList.toggle("fa-regular");
        likeBtn.classList.toggle("fa-solid");
      });
    });
    

});