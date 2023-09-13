   window.mobileAndTabletcheck = function() {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };
        var radio = null;
        var player = radio;
        var playButton = player;
        var volumeLevel = playButton;
        var select = volumeLevel;
        var muteButton = select;
        var timerID = muteButton;
        var appTitle = timerID;
        var currentList = appTitle;
        var previousList = currentList;
        var isPaused = true;
        var isMuted = false;
        var volume = 1;
        var delay = 7500;
        var playTxt = 'play';
        var pauseTxt = 'pause';
        var muteTxt = 'mute';
        var speakerTxt = [
            'speaker-0',
            'speaker-1',
            'speaker-2',
            'speaker-3',
        ];
        var imagePrefix = './icons/';
        var imageSuffix = '.svg';
        var favicon = document.querySelectorAll('link[rel="shortcut icon"]');
    favicon[0].href = imagePrefix + 'hit' + '.png';
        var eventEnabled = false;
        console.log('script. eventEnabled: ', eventEnabled);
        (function() {
            var imgsArr = [
                'mute',
                'pause',
                'play',
                'speaker-0',
                'speaker-1',
                'speaker-2',
                'speaker-3',
            ];
            imgsArr.forEach(function (i) {
                var item = document.createElement('img');
                item['src'] = imagePrefix + i + imageSuffix;item.loading = 'lazy';
            });
        })();
        const CancelToken = axios.CancelToken;
        let cancel;
        var getTrackData = (url, current, previous) => axios.get(url, {
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
            })
        })
            .then(function (response) {
                var data = response['data'].concat();
                var currentData = data.shift();
                renderData(current, currentData);
                renderData(previous, data);
                setCurrentData(currentData);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function() {
                document.body.classList.remove('loading');
                eventEnabled = true;
            });
        window.addEventListener('load', function(event) {
            if (mobileAndTabletcheck()) {
                document.body.classList.add('mobile');
            }
            console.log('window loaded');
            console.log('window loaded. eventEnabled: ', eventEnabled);
            // Document entities
            radio = document.getElementById('audio');               // Audio
            player = document.querySelector('.player');             // Player
            muteButton = player.querySelector('.mute-button');      // Mute button
            volumeLevel = player.querySelector('.volume-level');    // Volume level
            appTitle = document.querySelector('.player_title');     // Application title
            currentList = document.querySelector('.current');       // Current playing
            previousList = document.querySelector('.previous');     // Previously played
            // Player
            // Play/Pause button
            playButton = player.querySelector('.play-button');
            playButton.dataset['paused'] = Number(isPaused);
            var pauseValue = isPaused ? playTxt : pauseTxt;
            setText(playButton, pauseValue, imagePrefix, imageSuffix);
            playButton.addEventListener('click', function(e) {
                isPaused = playButtonHanler(this, playAudio, stopAudio);
            }, false);
            // Mute button
            setMuteButtonText(muteButton);
            muteButton.addEventListener('click', function(e) {
                isMuted = !isMuted;
                radio['muted'] = isMuted;
                setMuteButtonText(this);
                if (isMuted) {
                    volumeLevel['value'] = 0;
                } else {
                    volumeLevel['value'] = volume * 100;
                }
            });
            // Volume level
            volumeLevel.addEventListener('change', volumeLevelHandler);
            volumeLevel.addEventListener('input', volumeLevelHandler);

            // Radio event Listeners
            radio.addEventListener('progress', progressListener);
            radio.addEventListener('loadeddata', enableBodyListener);
            radio.addEventListener('seeked', function(event) {
                console.log('seeked');
            });
            radio.addEventListener('error', function(event) {
                console.log('error');
                console.error(event['message']);
                stopAudio();
            });
            select = document.getElementById('src_select');
            select.addEventListener('change', selectChange);
           srcSelect = document.getElementById('src_select');
           value = srcSelect['value'];
            document.body.classList.remove('loading');
            timerID = setTimeout(function request() {
                getTrackData(JSON.parse(select['value'])['request'], currentList, previousList);
                timerID = setTimeout(request, delay);
            },3000);
            eventEnabled = true;
            console.log('events enabled. eventEnabled: ', eventEnabled);
        });

        function playButtonHanler(button, playHandler, pauseHandler) {
            if (!eventEnabled) return;

            eventEnabled = false;
            button.dataset['paused'] = Number(!Number(button.dataset['paused']));
            var txt;
            var result = Number(button.dataset['paused']);
            if (result) {
                txt = playTxt;
                pauseHandler();
            } else {
                txt = pauseTxt;
                playHandler();
            }
            setText(button, txt, imagePrefix, imageSuffix);

            return Number(button.dataset['paused']);
        };
function axioscover() { 
       const defaultImageUrl = "https://raw.githubusercontent.com/darkduck9/radio-play/darkduck9-patch-1/icons/hit.png";
        axios.get(defaultImageUrl, { responseType: 'blob' })
            .then(response => {
                const reader = new FileReader();
                reader.onloadend = function () {
                    const dataURL = reader.result;
                    mediaMetadata.artwork = [{
                        src: dataURL,
                        sizes: '100x100',
                        type: 'image/png' 
                    }];
                    navigator.mediaSession.metadata = mediaMetadata;
                };
                reader.readAsDataURL(response.data);
            })
            .catch(error => {
                console.error("Failed to load default image:", error);
            });
            }
var currentData;          
function setCurrentData(data) {
    currentData = data;
    mediaMetadata.title = currentData.song;
    mediaMetadata.artist = currentData.singer;

    if (currentData.cover) {
        mediaMetadata.artwork = [{
            src: currentData.cover,
            sizes: '500x500',
            type: 'image/jpg'
        }];
    } else {
        axioscover()
    }

    navigator.mediaSession.metadata = mediaMetadata;
}

var mediaMetadata = new MediaMetadata({
    title: '',
    artist: '',
    artwork: []
});

function playAudio() {
    document.body.classList.add('loading');
    var srcSelect = document.getElementById('src_select');
    var value = JSON.parse(srcSelect['value']);
    appTitle.textContent = value['name'];
    document.title = value['name'];
    radio.src = value['src'];
    radio.addEventListener('stalled', stalledHandler);

    navigator.mediaSession.metadata = mediaMetadata;
   
    var observer = new MutationObserver(function (mutationsList) {
        if (radio.paused) {
            observer.disconnect();
        } else {
            mediaMetadata.title = currentData.song;
            mediaMetadata.artist = currentData.singer;
            mediaMetadata.artwork = [{
            src: currentData.cover,
            sizes: '500x500',
            type: 'image/jpg'
        }];
          navigator.mediaSession.metadata = mediaMetadata;
        }
    });

    var observerOptions = { childList: true, subtree: true };
    observer.observe(currentList, observerOptions);

    if (currentHls) {
        currentHls.destroy(); // Destroy the previous HLS instance if it exists
    }
    radio.play();
}


        function stopAudio() {
            if (radio) {
                radio.pause();
                radio.currentTime = 0;
            }
            clearTimeout(timerID);
            isPaused = true;
            eventEnabled = true;
            setText(playButton, playTxt, imagePrefix, imageSuffix);
            document.body.classList.remove('loading');
        };
        function progressListener() {
            eventEnabled = false;
            isPaused = this.paused;
            isMuted = this.muted;
            var txt = pauseTxt;
            if (isPaused) {
                txt = playTxt;
            }
            setText(playButton, txt, imagePrefix, imageSuffix);
            playButton.dataset['paused'] = Number(isPaused);
            document.body.classList.remove('loading');
            eventEnabled = true;
        };

        function enableBodyListener() {
            var txt = 'play';
            if(this.readyState >= 2) {
                txt = 'pause';
                document.body.classList.remove('loading');
                eventEnabled = true;
            } else {
                console.log('there was some error while loading audio');
                stopAudio();
            }
            setText(playButton, txt, imagePrefix, imageSuffix);
        };

        var eventEnabled = true;
var currentRequest = null; // 用于跟踪当前请求

function selectChange() {
    if (!eventEnabled) {
        return; // 如果事件被禁用，则不执行任何操作
    }

    eventEnabled = false;
    var self = this;
    var value = JSON.parse(self['value']);
    document.body.classList.remove('loading');

    if (currentRequest !== null) {
        // 如果有之前的请求正在进行，可以选择取消它
        clearTimeout(currentRequest);
    }

    if (radio['paused']) {
        document.body.classList.remove('loading');
    } else {
        stopAudio();
        playAudio();
    }

    currentRequest = setTimeout(function request() {
        getTrackData(value['request'], currentList, previousList);
        currentRequest = setTimeout(request, delay);
    }, 3000);

    eventEnabled = true;
}


        function stalledHandler() {
            console.log('stalled');
            document.body.classList.add('loading');
            stopAudio();
            playAudio();
        };

        function setMuteButtonText(node) {
            if (radio.muted) {
                node.style.backgroundImage = 'url(' + imagePrefix + muteTxt + imageSuffix + ')';
                return;
            }

            node.style.backgroundImage = 'url(' + imagePrefix + speakerTxt[getDiapason(radio['volume'])] + imageSuffix + ')';
        };

        function getDiapason(num) {
            if (num >= 1) return 3;

            if (num > 1/2) return 2;

            if (num > 0) return 1;

            return 0;
        };

        function volumeLevelHandler() {
            var value = this['value'];
            var valueForDec = Number(value/100);

            volume = valueForDec;
            radio['volume'] = valueForDec;

            setMuteButtonText(muteButton);
        };

        function renderData(node, data) {
            if (!Array.isArray(data)) {
                data = [data];
            }
            while (node.firstChild) node.removeChild(node.firstChild);
            Array.prototype.forEach.call(data, function (i) {
                node.appendChild(renderItem(i));
            });
        }

        function setText(destination, value, prefix, suffix) {
            destination.style.backgroundImage = 'url(' + prefix + value + suffix + ')';
        }

 function renderItem(data) {
var img = data['cover'] ? 'background-image:url(' + data['cover'] + '); background-size: 100%;' : 'background-image:url(./icons/def.png); background-size: 100%;';
    var result = document.createElement('li');
    var logo = document.createElement('span');
    var info = document.createElement('span');
    var singer = document.createElement('span');
    var separator = document.createElement('span');
    var song = document.createElement('span');

    result.className = 'playlist_item';
    logo.className = 'playlist_item__logo';
    info.className = 'playlist_item__info';
    singer.className = 'playlist_item__singer';
    separator.className = 'playlist_item__separator';
    song.className = 'playlist_item__song';

    logo.style = img;
    singer.textContent = data['singer'];
    separator.innerHTML = '&nbsp;&mdash;&nbsp;';
    song.textContent = data['song'];
   
    result.appendChild(logo);
    info.appendChild(singer);
    info.appendChild(separator);
    info.appendChild(song);
    result.appendChild(info);
if (data['cur_time']) {
    var curTime = document.createElement('span');
    curTime.className = 'playlist_item__cur_time';
    curTime.textContent = data['cur_time'];
    info.insertBefore(curTime, info.firstChild); 

    var onAirText = document.createElement('span');
    onAirText.textContent = 'ON AIR (EEST): ';
    info.insertBefore(onAirText, info.firstChild);
} else if (data['cur_end_time']) {
    var curEndTime = document.createElement('span');
    curEndTime.className = 'playlist_item__cur_end_time';
    curEndTime.textContent = data['cur_end_time'];
    info.insertBefore(curEndTime, info.firstChild);  

    var onAirText = document.createElement('span');
    onAirText.textContent = 'ON AIR (EEST) End:';
    info.insertBefore(onAirText, info.firstChild);  
}

    if (data['title']) {
        var title = document.createElement('span');
        title.className = 'playlist_item__title';
        title.textContent = data['title'];
        info.appendChild(title);
    }
    
function removeSymbols(text) {
  return text.replace(/[^\p{L}\d\s()]/gu, ' ');
}    
if (data['video']) {
        var video = document.createElement('a');
        video.className = 'playlist_item__video';
        video.href = 'https://www.youtube.com/watch?v=' + data['video'];
        video.innerHTML = '<img src="./icons/youtube.svg" alt="YouTube Logo">';
         info.appendChild(video);    }
          else if (data['song'] && data['singer']) { 
          var youtubeLink = document.createElement('a');
  youtubeLink.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(removeSymbols(data['song'] + ' ' + data['singer']));
  youtubeLink.target = '_blank';
  youtubeLink.innerHTML = '<img src="./icons/youtube.svg" alt="YouTube Logo">';
  youtubeLink.classList.add('playlist_item__video');
  info.appendChild(youtubeLink);
}

  if (data['song'] && data['singer']) {
  var neteaseLink = document.createElement('a');
  neteaseLink.className = 'playlist_item__netease';
  neteaseLink.href = 'https://music.163.com/#/search/m/?s=' + encodeURIComponent(removeSymbols(data['song'] + ' ' + data['singer']));
  neteaseLink.target = '_blank';
  neteaseLink.innerHTML = '<img src="./icons/netease.svg" alt="Netease Logo">';
  info.appendChild(neteaseLink);
   var spotifyLink = document.createElement('a');
  spotifyLink.className = 'playlist_item__spotify';
  spotifyLink.href = 'https://open.spotify.com/search/' + encodeURIComponent(removeSymbols(data['song'] + ' ' + data['singer']));
  spotifyLink.target = '_blank';
  spotifyLink.innerHTML = '<img src="./icons/spotify.svg" alt="spotify Logo">';
  info.appendChild(spotifyLink);
    }
    return result;
}
    var selectElement = document.getElementById("src_select");
    var playlistTitleContainer = document.getElementById("playlist_title_container");
    var previousPlaylistTitleContainer = document.getElementById("previous_playlist_title_container");
    var select = document.getElementById("src_select");
    var previousPlaylistWrapper = document.getElementById("previous_playlist_wrapper");   
     window.addEventListener("DOMContentLoaded", function() {
        playlistTitleContainer.style.display = "none";
        previousPlaylistTitleContainer.style.display = "none";
    });

    selectElement.addEventListener("change", function() {
        if (selectElement.value === "") {
            playlistTitleContainer.style.display = "none";
            previousPlaylistTitleContainer.style.display = "none";
        } else {
            playlistTitleContainer.style.display = "block";
            previousPlaylistTitleContainer.style.display = "block";
        }
    });

    select.addEventListener("change", function () {
        if (select.value === '') {
            playlist_title_container.style.display = "none";
            previousPlaylistWrapper.style.display = "none"; // Hide
        } else {playlist_title_container.style.display = "block";
            previousPlaylistWrapper.style.display = "block"; // Show
        }
    });

    const audio = document.getElementById('audio');
    const inputUrl = document.getElementById('inputUrl');
 
let currentHls = null; // Store the current HLS instance
var selectElement = document.getElementById("src_select");

var desiredOption = selectElement.querySelector("option[value='']");

function play(url) {
  document.body.classList.add('loading');

  const songInfoDiv = document.getElementById('songInfo'); // Get reference to the <div> element
  songInfoDiv.style.display = 'none'; // Hide the songInfo element by default
  desiredOption.selected = true;
  axioscover(); 
  if (currentHls) {
    currentHls.destroy(); // Destroy the previous HLS instance if it exists
  }
   if (currentRequest !== null) {
        clearTimeout(currentRequest);
    }
  if (Hls.isSupported()) {
    const hls = new Hls();
    currentHls = hls; // Store the current HLS instance

    hls.loadSource(url);
    hls.attachMedia(audio);
    
    hls.on(Hls.Events.FRAG_PARSING_METADATA, function(event, data) {
      if (data) {
         
        // Check if the data contains "url="
        if (data.frag.title.includes("url=")) {
          // Extract title and artist information from the data string
          const titleMatch = data.frag.title.match(/title="([^"]*)"/);
          const artistMatch = data.frag.title.match(/artist="([^"]*)"/);

          // Show the songInfo element
          songInfoDiv.style.display = 'block';

          // Update the song info if title and artist are available
          let songInfo = "";
          if (artistMatch && artistMatch[1].trim() !== "") {
            songInfo += artistMatch[1].trim();
          }
          if (titleMatch && titleMatch[1].trim() !== "") {
            if (songInfo !== "") {
              songInfo += " - ";
            }
            songInfo += titleMatch[1].trim();
          }
          songInfoDiv.textContent = songInfo;
          addLinksToSongInfo(songInfo);
          // Update MediaSession metadata when new data is available
          navigator.mediaSession.metadata = new MediaMetadata({
            title: titleMatch ? titleMatch[1].trim() : '',
            artist: artistMatch ? artistMatch[1].trim() : '',
             
          }); 
        } else {
          // If "url=" is not present, display the entire data
          songInfoDiv.style.display = 'block';
          songInfoDiv.textContent = data.frag.title;
          addLinksToSongInfo(data.frag.title);
          // Update MediaSession metadata when new data is available
          navigator.mediaSession.metadata = new MediaMetadata({
            title: data.frag.title,
            artist: '', 
             
          }); 
        }
      }
    });
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      audio.play();
    });
  } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
    audio.src = url;
    audio.addEventListener('loadedmetadata', function () {
      audio.play();
    });
  }
   
}

function cplay() {
        const url = inputUrl.value;
         play(url);
}


function addLinksToSongInfo(title) {
  const songInfoDiv = document.getElementById('songInfo');

  const youtubeLink = document.createElement('a');
  youtubeLink.classList.add('playlist_item__video');
  youtubeLink.target = '_blank';
  youtubeLink.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(title);
  youtubeLink.innerHTML = '<img src="./icons/youtube.svg" alt="YouTube Logo">';
  songInfoDiv.appendChild(youtubeLink);

  const neteaseLink = document.createElement('a');
  neteaseLink.className = 'playlist_item__netease';
  neteaseLink.target = '_blank';
  neteaseLink.href = 'https://music.163.com/#/search/m/?s=' + encodeURIComponent(title);
  neteaseLink.innerHTML = '<img src="./icons/netease.svg" alt="NetEase Logo">';
  songInfoDiv.appendChild(neteaseLink);

  const spotifyLink = document.createElement('a');
  spotifyLink.className = 'playlist_item__spotify';
  spotifyLink.target = '_blank';
  spotifyLink.href = 'https://open.spotify.com/search/' + encodeURIComponent(title);
  spotifyLink.innerHTML = '<img src="./icons/spotify.svg" alt="Spotify Logo">';
  songInfoDiv.appendChild(spotifyLink);
}
function playHitFM1() {
  setPlaybackInfo("https://liveop.cctv.cn/hls/cctvn/playlist.m3u8", "HITFM 央视");
}

function playHitFM2() {
  setPlaybackInfo("https://satellitepull.cnr.cn/live/wxhitfm/playlist.m3u8", "HITFM 广州");
}

function playHitFM3() {
  setPlaybackInfo("https://satellitepull.cnr.cn/live/wxgjlxyy/playlist.m3u8", "HITFM 北京");
}

function playev() {
  setPlaybackInfo("https://stream.revma.ihrhls.com/zc5953/hls.m3u8", "Evolution");
}

function playAT40() {
  setPlaybackInfo("https://stream.revma.ihrhls.com/zc4802/hls.m3u8", "AT40");
}
function playZ100() {
  setPlaybackInfo("https://stream.revma.ihrhls.com/zc1469/hls.m3u8", "Z100");
}
function playic() {
  setPlaybackInfo("https://stream.revma.ihrhls.com/zc4418/hls.m3u8", "iHeartCountry");
}
function playip() {
  setPlaybackInfo("https://playerservices.streamtheworld.com/api/livestream-redirect/ACIR31_S01AAC.m3u8", "iHeartRadio Pop");
}
function playcf() {
  setPlaybackInfo("https://stream.revma.ihrhls.com/zc6951/hls.m3u8", "iHeartRadio Café");
}
function playhitn() {
  setPlaybackInfo("https://stream.revma.ihrhls.com/zc4422/hls.m3u8", "Hit Nation");
}
function playimf() {
  setPlaybackInfo("https://stream.revma.ihrhls.com/zc5158/hls.m3u8", "iHeartRadio Music Festival");
}
function playrn() {
  setPlaybackInfo("https://stream.revma.ihrhls.com/zc4443/hls.m3u8", "Rock Nation");
}
  
function setPlaybackInfo(url, title) {
  document.body.classList.add('loading');
  inputUrl.value = url;
  appTitle.textContent = title;
  document.title = title;
  play(url);
}

function showPage(pageNumber) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('visible'));

    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('visible');
    }

    hideButtons();

    if (pageNumber === 2) {
        const arrow1Button = document.querySelector('.arrow1');
        arrow1Button.style.display = 'block';
    } else if (pageNumber === 1) {
        const arrow2Button = document.querySelector('.arrow2');
        arrow2Button.style.display = 'block';
    }
}

function hideButtons() {
    const arrowButtons = document.querySelectorAll('.arrow1, .arrow2');
    arrowButtons.forEach(button => button.style.display = 'none');
}
document.addEventListener("DOMContentLoaded", function() {  
   const arrowButtons = document.querySelectorAll('.arrow1, .arrow2');

    arrowButtons.forEach(button => {
        button.style.display = 'none';

        button.parentElement.addEventListener('mouseenter', function() {
            button.style.display = 'block';
        });

        button.parentElement.addEventListener('mouseleave', function() {
            button.style.display = 'none';
        });
    });

    showPage(1);
    hideButtons();
  
  if (localStorage.getItem("backgroundImage")) {
    var backgroundImage = localStorage.getItem("backgroundImage");
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }

  if (localStorage.getItem("themeMode") === "dark") {
    document.body.classList.add("dark");
  }

  // 选择在线背景按钮点击事件
  var selectOnlineBgBtn = document.getElementById("select-online-bg-btn");
  selectOnlineBgBtn.addEventListener("click", function() {
    var bgUrl = prompt("请输入在线背景图URL：");
    if (bgUrl) {
      document.body.style.backgroundImage = `url(${bgUrl})`;
      localStorage.setItem("backgroundImage", bgUrl);
    }

  });

  // 选择本地图片按钮点击事件
  var selectLocalBgBtn = document.getElementById("select-local-bg-btn");
  selectLocalBgBtn.addEventListener("click", function() {
    var selectBgInput = document.createElement("input");
    selectBgInput.type = "file";
    selectBgInput.accept = "image/*";
    selectBgInput.addEventListener("change", function(event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function() {
          var bgUrl = reader.result;
          document.body.style.backgroundImage = `url(${bgUrl})`;
          localStorage.setItem("backgroundImage", bgUrl);
        };
        reader.readAsDataURL(file);
      }
    });
    selectBgInput.click();
  });

  var clearBgBtn = document.getElementById("clear-bg-btn");
  clearBgBtn.addEventListener("click", function() {
    document.body.style.backgroundImage = "";
    localStorage.removeItem("backgroundImage");
  });
var bgPositionSelect = document.getElementById("bg-position-select");
      if (localStorage.getItem("bgPosition")) {
        var storedPosition = localStorage.getItem("bgPosition");
        bgPositionSelect.value = storedPosition;
        document.body.style.backgroundPosition = storedPosition;
      }


      bgPositionSelect.addEventListener("change", function() {
        var selectedPosition = bgPositionSelect.value;
        document.body.style.backgroundPosition = selectedPosition;
        localStorage.setItem("bgPosition", selectedPosition);
      });
var blurSlider = document.getElementById("blur-slider");

// 检查本地存储是否有背景模糊程度数据
if (localStorage.getItem("blurLevel")) {
  var storedBlurLevel = localStorage.getItem("blurLevel");
  blurSlider.value = storedBlurLevel;
  updateBackgroundBlur(storedBlurLevel);
}

blurSlider.addEventListener("input", function() {
  var blurLevel = blurSlider.value;
  updateBackgroundBlur(blurLevel);
  localStorage.setItem("blurLevel", blurLevel);
});

function updateBackgroundBlur(blurLevel) {
  var bgUrl = localStorage.getItem("backgroundImage");
  if (bgUrl) {
    document.body.style.backgroundImage = `url(${bgUrl})`;
    document.body.style.backdropFilter = `blur(${blurLevel}px)`;
  }
}


localStorage.removeItem("selectedOptionIndex");

  var toggleMenuBtn = document.getElementById("toggle-menu-btn");
  var submenuPopup = document.getElementById("submenu-popup");

  toggleMenuBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    submenuPopup.classList.toggle("show");
  });
  document.addEventListener("click", function() {
    submenuPopup.classList.remove("show");
  });
  submenuPopup.addEventListener("click", function(e) {
    e.stopPropagation();
  });
  
  // 切换主题模式
  var darkModeButton = document.getElementById("darkModeButton");    
  darkModeButton.addEventListener("click", function() {
    toggleDarkMode();
      }
      
  );
  function checkThemeMode() {
    if (localStorage.getItem("themeMode") === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

var isDarkMode = false;

function checkThemeMode() {
  var themeMode = localStorage.getItem("themeMode");
  if (themeMode === "dark") {
    document.body.classList.add("dark");
    isDarkMode = true;
    var storedColor = localStorage.getItem("triangleColor");
    document.body.style.setProperty("--triangle-color", storedColor);
    var controlElements = document.querySelectorAll(".control");
    for (var i = 0; i < controlElements.length; i++) {
      var controlElement = controlElements[i];
      controlElement.style.filter = "invert(90%)";
    }
  }
}

function toggleDarkMode() {
  var darkModeButton = document.getElementById("darkModeButton");

  if (isDarkMode) {
    document.body.classList.remove("dark");
    localStorage.setItem("themeMode", "default");
    darkModeButton.style.background = "url(./icons/light.svg)";
    document.body.style.setProperty("--triangle-color", "black");
    localStorage.setItem("triangleColor", "black");
    var controlElements = document.querySelectorAll(".control");
    for (var i = 0; i < controlElements.length; i++) {
      var controlElement = controlElements[i];
      controlElement.style.filter = "none";
    }
    isDarkMode = false;
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("themeMode", "dark");
    darkModeButton.style.background = "url(./icons/dark.svg)";
    document.body.style.setProperty("--triangle-color", "white");
    localStorage.setItem("triangleColor", "#E5E5E5");
    var controlElements = document.querySelectorAll(".control");
    for (var i = 0; i < controlElements.length; i++) {
      var controlElement = controlElements[i];
      controlElement.style.filter = "invert(90%)";
    }
    isDarkMode = true;
  }
  
  darkModeButton.style.backgroundSize = "100%"; 
}
  checkThemeMode();
});

           function goToWebpage() {
  const url = "https://space.bilibili.com/1090328045/search/video?keyword=ost"

 window.location.href = url;
}
          function goToWebpage1() {
  const url = "https://music.163.com/#/playlist?id=6705531149";
    window.location.href = url;
}
          function goToWebpage2() {
  const url = "https://www.acfun.cn/u/633603";
    window.location.href = url;
}
          function goToWebpage3() {
  const url = "https://music.163.com/#/playlist?id=6659816005";
    window.location.href = url;
}
	     function updateProgramLink() {
  const selectedDate = document.getElementById("datePicker").value;

  // construct the new URL with the selected date
  const url = `https://www.radio.cn/pc-portal/sanji/passProgram.html?channel_name=662&program_name=undefined&date_checked=${selectedDate}`;

    window.location.href = url;
}
      function gotoURL() {
 
    const url = "https://music.ghxi.com/";
    window.open(url, "_blank");
}
const divElementTop = document.querySelector('.container');
const divElementLeft = document.querySelector('.item-left');
const divElementRight = document.querySelector('.item-right');
const divElementWeb = document.querySelector('.app');
const colorInput1 = document.getElementById('bg-color');
const opacityInput1 = document.getElementById('opacity');
const radiusInput1 = document.getElementById('corner-radius');
const colorInput2 = document.getElementById('bg-color1');
const opacityInput2 = document.getElementById('opacity1');
const radiusInput2 = document.getElementById('corner-radius1');
const colorInput3 = document.getElementById('bg-color2');
const opacityInput3 = document.getElementById('opacity2');
const radiusInput3 = document.getElementById('corner-radius2');
const colorInput4 = document.getElementById('bg-color3');
const opacityInput4 = document.getElementById('opacity3');
// 恢复存储的设置
if (localStorage.getItem('bg-color')) {
  colorInput1.value = localStorage.getItem('bg-color');
  divElementLeft.style.backgroundColor = `rgba(${hexToRgb(colorInput1.value)}, ${opacityInput1.value})`;
}

if (localStorage.getItem('corner-radius')) {
  radiusInput1.value = localStorage.getItem('corner-radius');
  divElementLeft.style.borderRadius = `${radiusInput1.value}px`;
}

if (localStorage.getItem('opacity')) {
  opacityInput1.value = localStorage.getItem('opacity');
  divElementLeft.style.backgroundColor = `rgba(${hexToRgb(colorInput1.value)}, ${opacityInput1.value})`;
}

if (localStorage.getItem('bg-color1')) {
  colorInput2.value = localStorage.getItem('bg-color1');
  divElementRight.style.backgroundColor = `rgba(${hexToRgb(colorInput2.value)}, ${opacityInput2.value})`;
}

if (localStorage.getItem('corner-radius1')) {
  radiusInput2.value = localStorage.getItem('corner-radius1');
  divElementRight.style.borderRadius = `${radiusInput2.value}px`;
}

if (localStorage.getItem('opacity1')) {
  opacityInput2.value = localStorage.getItem('opacity1');
  divElementRight.style.backgroundColor = `rgba(${hexToRgb(colorInput2.value)}, ${opacityInput2.value})`;
}
if (localStorage.getItem('bg-color2')) {
  colorInput3.value = localStorage.getItem('bg-color2');
  divElementTop.style.backgroundColor = `rgba(${hexToRgb(colorInput3.value)}, ${opacityInput3.value})`;
}

if (localStorage.getItem('corner-radius2')) {
  radiusInput3.value = localStorage.getItem('corner-radius2');
  divElementTop.style.borderRadius = `${radiusInput3.value}px`;
}

if (localStorage.getItem('opacity2')) {
  opacityInput3.value = localStorage.getItem('opacity2');
  divElementTop.style.backgroundColor = `rgba(${hexToRgb(colorInput3.value)}, ${opacityInput3.value})`;
}
if (localStorage.getItem('bg-color3')) {
  colorInput4.value = localStorage.getItem('bg-color3');
  divElementWeb.style.backgroundColor = `rgba(${hexToRgb(colorInput4.value)}, ${opacityInput4.value})`;
}

if (localStorage.getItem('opacity3')) {
  opacityInput4.value = localStorage.getItem('opacity3');
  divElementWeb.style.backgroundColor = `rgba(${hexToRgb(colorInput4.value)}, ${opacityInput4.value})`;
}
// 保存设置到本地存储
colorInput1.addEventListener('input', function() {
  const opacity = opacityInput1.value;
  divElementLeft.style.backgroundColor = `rgba(${hexToRgb(colorInput1.value)}, ${opacity})`;
  localStorage.setItem('bg-color', colorInput1.value);
});

radiusInput1.addEventListener('input', function() {
  divElementLeft.style.borderRadius = `${radiusInput1.value}px`;
  localStorage.setItem('corner-radius', radiusInput1.value);
});

opacityInput1.addEventListener('input', function() {
  const opacity = opacityInput1.value;
  divElementLeft.style.backgroundColor = `rgba(${hexToRgb(colorInput1.value)}, ${opacity})`;
  localStorage.setItem('opacity', opacity);
});

colorInput2.addEventListener('input', function() {
  const opacity1 = opacityInput2.value;
  divElementRight.style.backgroundColor = `rgba(${hexToRgb(colorInput2.value)}, ${opacity1})`;
  localStorage.setItem('bg-color1', colorInput2.value);
});

radiusInput2.addEventListener('input', function() {
  divElementRight.style.borderRadius = `${radiusInput2.value}px`;
  localStorage.setItem('corner-radius1', radiusInput2.value);
});

opacityInput2.addEventListener('input', function() {
  const opacity1 = opacityInput2.value;
  divElementRight.style.backgroundColor = `rgba(${hexToRgb(colorInput2.value)}, ${opacity1})`;
  localStorage.setItem('opacity1', opacity1);
});
colorInput3.addEventListener('input', function() {
  const opacity2 = opacityInput3.value;
  divElementTop.style.backgroundColor = `rgba(${hexToRgb(colorInput3.value)}, ${opacity2})`;
  localStorage.setItem('bg-color2', colorInput3.value);
});

radiusInput3.addEventListener('input', function() {
  divElementTop.style.borderRadius = `${radiusInput3.value}px`;
  localStorage.setItem('corner-radius2', radiusInput3.value);
});

opacityInput3.addEventListener('input', function() {
  const opacity2 = opacityInput3.value;
  divElementTop.style.backgroundColor = `rgba(${hexToRgb(colorInput3.value)}, ${opacity2})`;
  localStorage.setItem('opacity2', opacity2);
});
colorInput4.addEventListener('input', function() {
  const opacity3 = opacityInput4.value;
  divElementWeb.style.backgroundColor = `rgba(${hexToRgb(colorInput4.value)}, ${opacity3})`;
  localStorage.setItem('bg-color3', colorInput4.value);
});

opacityInput4.addEventListener('input', function() {
  const opacity3 = opacityInput4.value;
  divElementWeb.style.backgroundColor = `rgba(${hexToRgb(colorInput4.value)}, ${opacity3})`;
  localStorage.setItem('opacity3', opacity3);
});
// 辅助函数：将十六进制颜色值转换为RGB颜色值
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
function backupLocalStorage() {
      var backgroundImage = localStorage.getItem("backgroundImage");
      var bgPosition = localStorage.getItem("bgPosition");
      var themeMode = localStorage.getItem("themeMode");
      var bgColor = localStorage.getItem("bg-color");
      var cornerRadius = localStorage.getItem("corner-radius");
      var opacity = localStorage.getItem("opacity");
      var bgColor1 = localStorage.getItem("bg-color1");
      var cornerRadius1 = localStorage.getItem("corner-radius1");
      var opacity1 = localStorage.getItem("opacity1");
      var bgColor2 = localStorage.getItem("bg-color2");
      var cornerRadius2 = localStorage.getItem("corner-radius2");
      var opacity2 = localStorage.getItem("opacity2");
      var bgColor3 = localStorage.getItem("bg-color3");
      var opacity3 = localStorage.getItem("opacity3");
      var blurLevel = localStorage.getItem("blurLevel");
      var backupData = {
        backgroundImage: backgroundImage,
        bgPosition: bgPosition,
        themeMode: themeMode,
        bgColor: bgColor,
        cornerRadius: cornerRadius,
        opacity: opacity,
        bgColor1: bgColor1,
        cornerRadius1: cornerRadius1,
        opacity1: opacity1,
        bgColor2: bgColor2,
        cornerRadius2: cornerRadius2,
        opacity2: opacity2,
        bgColor3: bgColor3,
        opacity3: opacity3,
        blurLevel: blurLevel
      };

      var backupString = JSON.stringify(backupData);

      var downloadLink = document.createElement("a");
      downloadLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(backupString));
      downloadLink.setAttribute("download", "localStorage_backup.json");

      downloadLink.click();
    }
 var fileInput = document.getElementById("fileInput");
    var restoreButton = document.getElementById("restoreButton");
    var backupData;

    function selectBackupFile() {
      fileInput.click();
    }

    fileInput.addEventListener("change", function(event) {
      var file = event.target.files[0];
      var reader = new FileReader();

      reader.onload = function(e) {
        backupData = JSON.parse(e.target.result);
        restoreButton.disabled = false;
        alert("已成功读取备份文件！");
      };

      reader.readAsText(file);
    });

    function restoreLocalStorage() {
      // 恢复localStorage数据
      localStorage.setItem("backgroundImage", backupData.backgroundImage);
      localStorage.setItem("bgPosition", backupData.bgPosition);
      localStorage.setItem("themeMode", backupData.themeMode);
      localStorage.setItem("bg-color", backupData.bgColor);
      localStorage.setItem("corner-radius", backupData.cornerRadius);
      localStorage.setItem("opacity", backupData.opacity);
      localStorage.setItem("bg-color1", backupData.bgColor1);
      localStorage.setItem("corner-radius1", backupData.cornerRadius1);
      localStorage.setItem("opacity1", backupData.opacity1);
      localStorage.setItem("bg-color2", backupData.bgColor2);
      localStorage.setItem("corner-radius2", backupData.cornerRadius2);
      localStorage.setItem("opacity2", backupData.opacity2);
      localStorage.setItem("bg-color3", backupData.bgColor3);
      localStorage.setItem("opacity3", backupData.opacity3);
      localStorage.setItem("blurLevel", backupData.blurLevel);
      alert("已成功恢复备份数据！");// 刷新页面
      location.reload();
    }
    document.getElementById("next-page-btn").addEventListener("click", function() {
    document.querySelector(".page1").style.display = "none";
    document.querySelector(".page2").style.display = "block";
    document.querySelector(".about").style.display = "none";
});

document.getElementById("prev-page-btn").addEventListener("click", function() {
    document.querySelector(".page2").style.display = "none";
    document.querySelector(".page1").style.display = "block";
    document.querySelector(".about").style.display = "none";
});

document.getElementById("about-btn").addEventListener("click", function() {
    document.querySelector(".page1").style.display = "none";
    document.querySelector(".page2").style.display = "none";
    document.querySelector(".about").style.display = "block";
});

document.querySelector(".about").addEventListener("click", function() {
    document.querySelector(".about").style.display = "none";
    if (document.querySelector(".page1").style.display === "none") {
        document.querySelector(".page2").style.display = "block";
    } else {
        document.querySelector(".page1").style.display = "block";
    }
});
 function getCurrentProgram() {
      const programSchedule = {
        MondayToFriday: [
          { start: "00:00:00", end: "06:00:00", name: "Music Flow 音乐流" },
          { start: "06:00:00", end: "07:00:00", name: "Morning Call 音乐叫早" },
          { start: "07:00:00", end: "10:00:00", name: "Morning Hits 阳光音乐早餐" },
          { start: "10:00:00", end: "13:00:00", name: "At Work Network 工作随身听" },
          { start: "13:00:00", end: "16:00:00", name: "Lazy Afternoon 慵懒下午茶" },
          { start: "16:00:00", end: "19:00:00", name: "Big Drive Home 开车现场秀" },
          { start: "19:00:00", end: "22:00:00", name: "New Music Express 新音乐速递" },
          { start: "22:00:00", end: "23:59:59", name: "Hit FM Dance 电音" }
        ],
        Saturday: [
          { start: "00:00:00", end: "08:00:00", name: "Music Flow 音乐流" },
          { start: "08:00:00", end: "12:00:00", name: "Weekend Morning Show 周末早间音乐" },
          { start: "12:00:00", end: "14:00:00", name: "Hit the Road 在路上" },
          { start: "14:00:00", end: "16:00:00", name: "Soul Make 心灵制造" },
          { start: "16:00:00", end: "18:00:00", name: "Rock DJ 摇滚DJ" },
          { start: "18:00:00", end: "20:00:00", name: "Top 20 Countdown 顶尖20排行榜" },
          { start: "20:00:00", end: "22:00:00", name: "CTDM Chart 中国电子音乐巅峰榜" },
          { start: "22:00:00", end: "23:59:59", name: "Hit FM Dance 电音" }
        ],
        Sunday: [
          { start: "00:00:00", end: "08:00:00", name: "Music Flow 音乐流" },
          { start: "08:00:00", end: "12:00:00", name: "Weekend Morning Show 周末早间音乐" },
          { start: "12:00:00", end: "14:00:00", name: "Rock DJ 摇滚DJ" },
          { start: "14:00:00", end: "16:00:00", name: "CTDM Chart 中国电子音乐巅峰榜" },
          { start: "16:00:00", end: "18:00:00", name: "Hit FM OST 电影原声坊" },
          { start: "18:00:00", end: "20:00:00", name: "Top 20 Countdown 顶尖20排行榜" },
          { start: "20:00:00", end: "22:00:00", name: "Hit FM Dance Carta & Co. 电音-卡塔" },
          { start: "22:00:00", end: "23:59:59", name: "Hit FM Dance 电音" }
        ]
      };

      const currentTime = new Date();
      const currentDay = currentTime.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
      const currentTimeString = currentTime.toTimeString().slice(0, 8);

      let currentSchedule;
      if (currentDay === 0) { // Sunday
        currentSchedule = programSchedule.Sunday;
      } else if (currentDay === 6) { // Saturday
        currentSchedule = programSchedule.Saturday;
      } else { // Monday to Friday
        currentSchedule = programSchedule.MondayToFriday;
      }

      for (const program of currentSchedule) {
        if (currentTimeString >= program.start && currentTimeString <= program.end) {
          return program.name;
        }
      }

      return "节目未知";
    }

    function updateProgramName() {
      const programNameElement = document.getElementById("programName");
      const currentProgram = getCurrentProgram();
      programNameElement.innerHTML = `ON AIR NOW <br> ${currentProgram}`;
    }
    updateProgramName();
    setInterval(updateProgramName, 60000);
