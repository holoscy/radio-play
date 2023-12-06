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
				radio = document.getElementById('video');               // Audio/Video
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
				timerID = setTimeout(function request() {if (select.value !== ''){
					getTrackData(JSON.parse(select['value'])['request'], currentList, previousList);}
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

	var currentData;  
	const tavr = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH-LIEQnJciIUI-0nzHzsfJlRiYA3X95exVMjZE3SJsytCBoHZ082B813yVhGEXfXqCiI&usqp=CAU'        
	function setCurrentData(data) {
		currentData = data;
	  
		if (currentData.cover) {
			mediaMetadata.title = currentData.song;
			mediaMetadata.artist = currentData.singer;
			mediaMetadata.artwork = [{
				src: currentData.cover,
				sizes: '500x500',
				type: 'image/jpg'
			}];
		} else {
		   mediaMetadata.title = currentData.song;
			mediaMetadata.artist = currentData.singer;
			mediaMetadata.artwork = [{
				src: tavr,
				sizes: '200x200',
				type: 'image/png'
			}];
		}

		navigator.mediaSession.metadata = mediaMetadata;
	}

	var mediaMetadata = new MediaMetadata({
		title: '',
		artist: '',
		artwork: []
	});

	function playAudio() {
		  audio.pause();
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
		 if (currentData.cover) {
					mediaMetadata.artwork = [{
						src: currentData.cover,
						sizes: '500x500',
						type: 'image/jpg'
					}];
				} else {         
						mediaMetadata.artwork = [{
							src: tavr,
							sizes: '200x200',
							type: 'image/png'
						}];                
				}
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
			video.style.userSelect = 'none';
			video.innerHTML = '<img src="./icons/youtube.svg" alt="YouTube Logo">';
			 info.appendChild(video);    }
			  else if (data['song'] && data['singer']) { 
			  var youtubeLink = document.createElement('a');
	  youtubeLink.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(removeSymbols(data['song'] + ' ' + data['singer']));
	  youtubeLink.target = '_blank';
	  youtubeLink.style.userSelect = 'none';
	  youtubeLink.innerHTML = '<img src="./icons/youtube.svg" alt="YouTube Logo">';
	  youtubeLink.classList.add('playlist_item__video');
	  info.appendChild(youtubeLink);
	}

	  if (data['song'] && data['singer']) {
	  var neteaseLink = document.createElement('a');
	  neteaseLink.className = 'playlist_item__netease';
	  neteaseLink.href = 'https://music.163.com/#/search/m/?s=' + encodeURIComponent(removeSymbols(data['song'] + ' ' + data['singer']));
	  neteaseLink.target = '_blank';
	  neteaseLink.style.userSelect = 'none';
	  neteaseLink.innerHTML = '<img src="./icons/netease.svg" alt="Netease Logo">';
	  info.appendChild(neteaseLink);
	   var spotifyLink = document.createElement('a');
	  spotifyLink.className = 'playlist_item__spotify';
	  spotifyLink.href = 'https://open.spotify.com/search/' + encodeURIComponent(removeSymbols(data['song'] + ' ' + data['singer']));
	  spotifyLink.target = '_blank';
	  spotifyLink.style.userSelect = 'none';
	  spotifyLink.innerHTML = '<img src="./icons/spotify.svg" alt="spotify Logo">';
	  info.appendChild(spotifyLink);
		}
		return result;
	}

		const audio = document.getElementById('audio');
		const inputUrl = document.getElementById('inputUrl');
		const hitfm = 'https://p1.music.126.net/e9akTfr5SUJX9nIVdIYFHw==/109951164828622694.jpg'
		const iheart = 'https://p1.music.126.net/J32qbemrQtkBMHiVq21Djw==/18723583511609689.jpg'
		const bbc = 'https://p1.music.126.net/pMdzEAArKfkAcrtM3r8aog==/18691697674155874.jpg'
	let currentHls = null; // Store the current HLS instance
	var selectElement = document.getElementById("src_select");

	var desiredOption = selectElement.querySelector("option[value='']");

	function play(url,title,cover) {
	  document.body.classList.add('loading');
	  if (url,cover){navigator.mediaSession.metadata = new MediaMetadata({
				title:title,
				artist: 'HITFM Player',
				artwork: [{
					src: cover,
					sizes: '200x200',
					type: 'image/png'
				}]
			  })};
	  const songInfoDiv = document.getElementById('songInfo');
	  songInfoDiv.style.display = 'none';
	  desiredOption.selected = true;
	  audio.pause();
	  if (currentHls) {
		currentHls.destroy();
	  }
	  if (currentRequest !== null) {
		clearTimeout(currentRequest);
	  }
	  if (Hls.isSupported()) {
		const hls = new Hls();
		currentHls = hls;

		hls.loadSource(url);
		 hls.attachMedia(video);
	   
		hls.on(Hls.Events.FRAG_PARSING_METADATA, function (event, data) {
		  if (data) {
			if (data.frag.title.includes("url=")) {
			  // Extract title and artist information from the data string
			  const titleMatch = data.frag.title.match(/title="([^"]*)"/);
			  const artistMatch = data.frag.title.match(/artist="([^"]*)"/);

			  songInfoDiv.style.display = 'block';

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

			  navigator.mediaSession.metadata = new MediaMetadata({
				title: titleMatch ? titleMatch[1].trim() : '',
				artist: artistMatch ? artistMatch[1].trim() : '',
				artwork: [{
					src: cover,
					sizes: '200x200',
					type: 'image/png'
				}]
			  });
			} else {
			  // If "url=" is not present, display the entire data
			  songInfoDiv.style.display = 'block';
			  songInfoDiv.textContent = data.frag.title;
			  addLinksToSongInfo(data.frag.title);

			  navigator.mediaSession.metadata = new MediaMetadata({
				title: data.frag.title,
				artist: '',
				artwork: [{
					src: cover,
					sizes: '200x200',
					type: 'image/png'
				}]
			  });
			}
		  }
		});

		 hls.on(Hls.Events.MANIFEST_PARSED, function () {
		  video.play()
		});

		 hls.on(Hls.Events.ERROR, function (event, data) {
		  if (data.fatal) {
			switch (data.type) {
			  case Hls.ErrorTypes.NETWORK_ERROR:
				console.error('Network error, trying to recover');
				  
			  case Hls.ErrorTypes.MEDIA_ERROR:
				console.error('Media error, trying to recover');
			   const notification = document.createElement('div');
		notification.className = 'notification';
		notification.textContent = `尝试使用浏览器播放`;
		 document.body.appendChild(notification);
		 setTimeout(() => {
			document.body.removeChild(notification);
		}, 2000);
				hls.stopLoad(); 
				document.body.classList.remove('loading');
				if (isRecording = true){}else{
				  window.open(url, '_blank')};
				break;
			}
		  }
		});
	  } else {
		alert('只有m3u8能触发播放，其他格式需要在自定义电台创建按钮播放');
	  }
	}
	 
	function cplay() {
			const url = inputUrl.value;
			 play(url);
	}

	 const videoModal = document.getElementById('videoModal');
	 const musicModal = document.getElementById('musicModal');
	  const videoContainer = document.getElementById('videoContainer');
	  const video = document.getElementById('video');
	  const showButton = document.getElementById('showButton');
	  const closeButton = document.getElementById('closeButton'); 
	  const top20 = document.getElementById('top20');
	  const at40 = document.getElementById('at40');
	  const closeButton2 = document.getElementById('closeButton2');

	  showButton.addEventListener('click', function () {
		videoModal.style.display = 'flex';
	  });

	  closeButton.addEventListener('click', function () {
		 videoModal.style.display = 'none';
	  }); 
	  top20.addEventListener('click', function () {
		musicModal.style.display = 'flex';
	  });
	  at40.addEventListener('click', function () {
		musicModal.style.display = 'flex';
	  });

	  closeButton2.addEventListener('click', function () {
		 musicModal.style.display = 'none';
	  });

	function addLinksToSongInfo(title) {
	  const songInfoDiv = document.getElementById('songInfo');

	  const youtubeLink = document.createElement('a');
	  youtubeLink.classList.add('playlist_item__video');
	  youtubeLink.target = '_blank';
	  youtubeLink.href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(title);
	  youtubeLink.style.userSelect = 'none';
	  youtubeLink.innerHTML = '<img src="./icons/youtube.svg" alt="YouTube Logo">';
	  songInfoDiv.appendChild(youtubeLink);

	  const neteaseLink = document.createElement('a');
	  neteaseLink.className = 'playlist_item__netease';
	  neteaseLink.target = '_blank';
	  neteaseLink.href = 'https://music.163.com/#/search/m/?s=' + encodeURIComponent(title);
	  neteaseLink.style.userSelect = 'none';
	  neteaseLink.innerHTML = '<img src="./icons/netease.svg" alt="NetEase Logo">';
	  songInfoDiv.appendChild(neteaseLink);

	  const spotifyLink = document.createElement('a');
	  spotifyLink.className = 'playlist_item__spotify';
	  spotifyLink.target = '_blank';
	  spotifyLink.href = 'https://open.spotify.com/search/' + encodeURIComponent(title);
	  spotifyLink.style.userSelect = 'none';
	  spotifyLink.innerHTML = '<img src="./icons/spotify.svg" alt="Spotify Logo">';
	  songInfoDiv.appendChild(spotifyLink);
	}
	function playHitFM1() {
	  setPlaybackInfo("https://liveop.cctv.cn/hls/cctvn/playlist.m3u8", "HITFM 央视",hitfm);
	}

	function playHitFM2() {
	  setPlaybackInfo("https://satellitepull.cnr.cn/live/wxhitfm/playlist.m3u8", "HITFM 广州",hitfm);
	}

	function playHitFM3() {
	  setPlaybackInfo("https://satellitepull.cnr.cn/live/wxgjlxyy/playlist.m3u8", "HITFM 北京",hitfm);
	}

	function playev() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc5953/hls.m3u8", "Evolution",iheart);
	}

	function playAT40() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc4802/hls.m3u8", "AT40",iheart);
	}
	function playZ100() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc1469/hls.m3u8", "Z100",iheart);
	}
	function playic() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc4418/hls.m3u8", "iHeartCountry",iheart);
	}
	function playip() {
	  setPlaybackInfo("https://playerservices.streamtheworld.com/api/livestream-redirect/ACIR31_S01AAC.m3u8", "iHeartRadio Pop",iheart);
	}
	function playcf() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc6951/hls.m3u8", "iHeartRadio Café",iheart);
	}
	function playhitn() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc4422/hls.m3u8", "Hit Nation",iheart);
	}
	function playimf() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc5158/hls.m3u8", "iHeartRadio Music Festival",iheart);
	}
	function playrn() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc4443/hls.m3u8", "Rock Nation",iheart);
	}
	function playkiis() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc185/hls.m3u8", "102.7 KIIS-FM",iheart);
	}
	 function playmxn() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc4776/hls.m3u8", "Mix Nation",iheart);
	}
	function playalic() {
	  setPlaybackInfo("https://stream.revma.ihrhls.com/zc1269/hls.m3u8", "Alice 95.5",iheart);
	}
	function playbbc1() {
	  setPlaybackInfo("https://as-hls-ww-live.akamaized.net/pool_904/live/ww/bbc_radio_one/bbc_radio_one.isml/bbc_radio_one-audio%3d320000.norewind.m3u8", "BBC Radio 1",bbc);
	}
	function playbbc1x() {
	  setPlaybackInfo("https://as-hls-ww-live.akamaized.net/pool_904/live/ww/bbc_1xtra/bbc_1xtra.isml/bbc_1xtra-audio%3d320000.norewind.m3u8", "BBC Radio 1Xtra",bbc);
	}
	function playbbc6() {
	  setPlaybackInfo("https://as-hls-ww-live.akamaized.net/pool_904/live/ww/bbc_6music/bbc_6music.isml/bbc_6music-audio%3d320000.norewind.m3u8", "BBC Radio 6 Music",bbc);
	}

	function setPlaybackInfo(url, title,cover) {
	  document.body.classList.add('loading');
	  inputUrl.value = url;
	  appTitle.textContent = title;
	  document.title = title;
	  play(url,title,cover);
	}

	function download(data, filename) {
		console.log('downloading...');
		var blob = new Blob([arrayConcat(data)], {
			type: 'application/octet-stream'
		});
		saveAs(blob, filename);
	}

	function arrayConcat(inputArray) {
		var totalLength = inputArray.reduce(function (prev, cur) {
			return prev + cur.length
		}, 0);
		var result = new Uint8Array(totalLength);
		var offset = 0;
		inputArray.forEach(function (element) {
			result.set(element, offset);
			offset += element.length;
		});
		return result;
	}

	function saveAs(blob, filename) {
		var url = URL.createObjectURL(blob);
		var a = document.createElement("a");
		document.body.appendChild(a);
		a.style = "display: none";
		a.href = url;
		a.download = filename;
		a.click();
		window.URL.revokeObjectURL(url);
	}

	var currentRecord = null; // 存储当前录制的数据对象
	var startTime = null; // 记录录制开始的时间
	var recordedTimeElement = document.getElementById('recordedTime');
	 var isRecording = false; // 录制状态标志

	function updateRecordedTime() {
		if (startTime && currentRecord) {
			var currentTime = new Date().getTime();
			var elapsedTime = (currentTime - startTime) / 1000;  
			var elapsedSeconds = parseInt(elapsedTime);  
			recordedTimeElement.textContent = '已录制时长: ' + elapsedSeconds + '秒';  
		}
	}

	function showRecordedTime() {
		recordedTimeElement.style.display = 'block';  
	}

	function hideRecordedTime() {
		recordedTimeElement.style.display = 'none';  
	}

	function stopRecord() {
		if (currentRecord) {
			 var FileName = appTitle.textContent + ".mp3";
			download(currentRecord.data['audio'], FileName);
			currentRecord.hls.destroy();
			currentRecord = null;
			startTime = null;
			hideRecordedTime();
			isRecording = false;
		}
		cplay();
	}


	function startRecord() {
		if (isRecording) {
			 stopRecord();
		} else {
			 if (currentRecord) {
				 currentRecord.hls.destroy();
				currentRecord = null;
			}

			var dataStream = {
				'audio': []
			};
			var hls = new Hls();
			hls.loadSource(inputUrl.value);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED, function () {
				video.play();
				hls.on(Hls.Events.BUFFER_APPENDING, function (event, data) {
					console.log("appending");
					dataStream[data.type].push(data.data);
				});
			});

			currentRecord = {
				hls: hls,
				data: dataStream
			};
			startTime = new Date().getTime();  
			showRecordedTime();  

			 setInterval(updateRecordedTime, 1000);

			audio.onended = function (e) {
				stopRecord();
			}

			isRecording = true;  
		}
	}
	 function showPage() {
			var rpage1 = document.getElementById('rpage1');
			var rpage2 = document.getElementById('rpage2');

			if (rpage1.classList.contains('fadeIn')) {
				 rpage1.classList.remove('fadeIn');
				rpage1.classList.add('fadeOut');

				rpage2.classList.remove('fadeOut');
				rpage2.classList.add('fadeIn');
				
				setTimeout(function () {
					rpage1.style.display = 'none';
					rpage2.style.display = 'block';
				}, 300);  
			} else {
				 rpage2.classList.remove('fadeIn');
				rpage2.classList.add('fadeOut');

				rpage1.classList.remove('fadeOut');
				rpage1.classList.add('fadeIn');

				setTimeout(function () {
					rpage2.style.display = 'none';
					rpage1.style.display = 'block';
				}, 300); 
			}
		}
	const contentContainer = document.getElementById("content-container");
	const toggleButton = document.getElementById("toggleButton");

	 const isContentHidden = localStorage.getItem("isContentHidden") === "true";

	 contentContainer.style.display = isContentHidden ? "none" : "block";

	 toggleButton.addEventListener("click", () => {
		if (contentContainer.style.display === "none" || contentContainer.style.display === "") {
			contentContainer.style.display = "block";  
			localStorage.setItem("isContentHidden", "false");  
		} else {
			contentContainer.style.display = "none";  
			localStorage.setItem("isContentHidden", "true");  
		}
	});
	const tavrContainer = document.getElementById("tavr-container");
	const toggButton = document.getElementById("toggButton");

	 const isConHidden = localStorage.getItem("isConHidden") === "true";

	 tavrContainer.style.display = isConHidden ? "none" : "block";

	 toggButton.addEventListener("click", () => {
		if (tavrContainer.style.display === "none" || tavrContainer.style.display === "") {
			tavrContainer.style.display = "block";  
			localStorage.setItem("isConHidden", "false");  
		} else {
			tavrContainer.style.display = "none";  
			localStorage.setItem("isConHidden", "true");  
		}
	});

	const savedContainer = document.getElementById("savedC");

	 savedContainer.addEventListener("mouseenter", () => {
	  savedContainer.style.overflowY = "overlay";  
	});

	savedContainer.addEventListener("mouseleave", () => {
	  savedContainer.style.overflowY = "hidden";  
	});
	 
	document.addEventListener("DOMContentLoaded", function() {  
		const openMenuButton = document.getElementById("openMenuButton");
		const menu = document.getElementById("menu");
		const menuContent = document.getElementById("menuContent");
		const menuContent2 = document.getElementById("menuContent2");
		const addRowButton = document.getElementById("addRowButton");
		const exportM3uFile = document.getElementById("exportM3uFile");
		const reM3uFile = document.getElementById("reM3uFile");
		const saveButton = document.getElementById("saveButton");
		const savedContent = document.getElementById("savedContent");
		const closeMenuButton = document.getElementById("closeMenuButton");  
		
			var selectElement = document.getElementById("src_select");
		var playlistTitleContainer = document.getElementById("playlist_title_container");
		var previousPlaylistTitleContainer = document.getElementById("previous_playlist_title_container");
		var select = document.getElementById("src_select");
		var previousPlaylistWrapper = document.getElementById("previous_playlist_wrapper");   
			playlistTitleContainer.style.display = "none";
			previousPlaylistTitleContainer.style.display = "none";
			selectElement.addEventListener("change", function() {
			 
			if (selectElement.value === '') {
				if (playlistTitleContainer) {
					playlistTitleContainer.style.display = "none";
				}
				if (previousPlaylistTitleContainer) {
					previousPlaylistTitleContainer.style.display = "none"; // Hide
				}
			} else {
				if (playlistTitleContainer) {
					playlistTitleContainer.style.display = "block";
				}
				if (previousPlaylistTitleContainer) {
					previousPlaylistTitleContainer.style.display = "block"; // Show
				}
			}
		});

		select.addEventListener("change", function () {
			if (select.value === '') {
				if (playlist_title_container) {
					playlist_title_container.style.display = "none";
				}
				if (previousPlaylistWrapper) {
					previousPlaylistWrapper.style.display = "none"; // Hide
				}
			} else {
				if (playlist_title_container) {
					playlist_title_container.style.display = "block";
				}
				if (previousPlaylistWrapper) {
					previousPlaylistWrapper.style.display = "block"; // Show
				}
			}
		});
	let db;
	const dbName = 'Mradio';
	const dbVersion = 1;

	const request = indexedDB.open(dbName, dbVersion);

	request.onerror = function (event) {
		console.error('IndexedDB error:', event.target.errorCode);
	};

	request.onupgradeneeded = function (event) {
		db = event.target.result;  // Set db in the upgrade needed event
		db.createObjectStore('m3uContent', { keyPath: 'id' });
	};

	request.onsuccess = function (event) {
		db = event.target.result;  // Set db in the success event
		console.log('IndexedDB opened successfully');
		// Load from IndexedDB on page load
		displayStoredContent();
	};

	 const parseButton = document.querySelector('#menu button[onclick="parseM3UFromTextarea()"]');
	 parseButton.addEventListener('click', parseM3UFromTextarea);

	async function parseM3UFromTextarea() {
		const m3uContent = document.getElementById('m3uTextarea').value;
		const urlPattern = /^(http(s)?:\/\/)/;
		if (urlPattern.test(m3uContent.trim())) {
			try {
				// Fetch the M3U file content
				const response = await fetch(m3uContent);
				if (response.ok) {
					const m3uData = await response.text();
					const parsedData = parseM3U(m3uData);
					updateMenuContent(parsedData);
				} else {
					console.error('Failed to fetch the M3U file.');
				}
			} catch (error) {
				console.error('An error occurred while fetching the M3U file:', error);
			}
		} else {
			const parsedData = parseM3U(m3uContent);
			updateMenuContent(parsedData);
		}
	}

	function storeGroupContent(groupName, groupData) {
		const transaction = db.transaction(['m3uContent'], 'readwrite');
		const objectStore = transaction.objectStore('m3uContent');

		// Convert the data to a JSON string before storing
		const dataToStore = JSON.stringify(groupData);

		const addRequest = objectStore.put({ id: groupName, data: dataToStore });

		addRequest.onsuccess = function (event) {
			console.log(`Group '${groupName}' data added to IndexedDB successfully.`);
			const notification = document.createElement('div');
		notification.className = 'notification';
		notification.textContent = `  '${groupName}' 已成功存储`;
		 document.body.appendChild(notification);
		 setTimeout(() => {
			document.body.removeChild(notification);
		}, 2000);
		};

		addRequest.onerror = function (event) {
			console.error(`Error adding group '${groupName}' data to IndexedDB:`, event.target.errorCode);
		};
	}

	function clearGroupContent(groupName,groupData) {
		const transaction = db.transaction(['m3uContent'], 'readwrite');
		const objectStore = transaction.objectStore('m3uContent');

		const deleteRequest = objectStore.delete(groupName,groupData);

		deleteRequest.onsuccess = function (event) {
			console.log(`Data for group '${groupName}' cleared successfully.`);
			const notification = document.createElement('div');
		notification.className = 'notification';
		notification.textContent = `  '${groupName}' 已成功删除`;
		 document.body.appendChild(notification);
		 setTimeout(() => {
			document.body.removeChild(notification);
		}, 2000);
			displayStoredContent();
		};

		deleteRequest.onerror = function (event) {
			console.error(`Error clearing data for group '${groupName}':`, event.target.errorCode);
		};
	}

	function displayStoredContent() {
		const transaction = db.transaction(['m3uContent'], 'readonly');
		const objectStore = transaction.objectStore('m3uContent');
		const menuContent2 = document.getElementById('menuContent2');
		menuContent2.innerHTML = '';
		objectStore.openCursor().onsuccess = function (cursorEvent) {
			const cursor = cursorEvent.target.result;

			if (cursor) {
				const groupName = cursor.value.id; 

				 const getRequest = objectStore.get(groupName);

				getRequest.onsuccess = function (event) {
					const storedData = event.target.result;
					if (typeof storedData.data === 'string') {
						try {
							const groupData = JSON.parse(storedData.data);
							// Create containers for each group
	const groupContainer = document.createElement('div');
	groupContainer.className = 'groupContainer';
	groupContainer.style.display = 'none';

	const groupButton = document.createElement('a');
	groupButton.className = 'groupButton';
	groupButton.textContent = groupName;

	groupButton.addEventListener('click', function() {
		if (groupContainer.style.display === 'none' || groupContainer.style.display === '') {
			groupContainer.style.display = 'block';
		} else {
			groupContainer.style.display = 'none';
		}
	});
	menuContent2.appendChild(groupButton);

			 groupData.forEach(({ tvgLogo, name, link }) => {
				const imgContainer = document.createElement('div');
				imgContainer.className = 'img-container';

				const image = document.createElement('img');
				image.src = tvgLogo;
				image.classList.add('rimg');
				image.loading = 'lazy';

				const nameElement = document.createElement('p');
				nameElement.textContent = name;
				nameElement.classList.add('t');

				imgContainer.appendChild(image);
				imgContainer.appendChild(nameElement);
				 let cover = image.src;
								imgContainer.onclick = () => playLinkContent(name, link,cover);
	 
								imgContainer.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		showContextMenu(e.clientX, e.clientY, name, link, () => saveContent(link, name, imgContainer), () => deleteImgContainer(imgContainer, groupName));
	});

				let touchStartX, touchStartY;
	let isScrolling = false;

	imgContainer.addEventListener('touchstart', (e) => {
	  e.preventDefault();
	  touchStartX = e.touches[0].clientX;
	  touchStartY = e.touches[0].clientY;
	  isScrolling = false;

	  longPressTimer = setTimeout(() => {
		if (!isScrolling) {
		  showContextMenu(touchStartX, touchStartY, name, link, () => saveContent(link, name, imgContainer), () => deleteImgContainer(imgContainer, groupName));
		}
	  }, 500);
	}, { passive: true });

	imgContainer.addEventListener('touchmove', (e) => {
	  const touchMoveX = e.touches[0].clientX;
	  const touchMoveY = e.touches[0].clientY;
	  const deltaX = Math.abs(touchMoveX - touchStartX);
	  const deltaY = Math.abs(touchMoveY - touchStartY);

	   if (deltaX > 2 || deltaY > 2) {
		isScrolling = true;
		clearTimeout(longPressTimer);
	  }
	});

	imgContainer.addEventListener('touchend', () => {
	  clearTimeout(longPressTimer);

	  if (!isScrolling) {
		playLinkContent(name, link,cover);
	  }
	});
				  groupContainer.appendChild(imgContainer);
							});

							menuContent2.appendChild(groupContainer);
							const clearButton = document.createElement('button');
							clearButton.classList.add('clear-button');
							clearButton.textContent = '删除本组';
							clearButton.onclick = () => clearGroupContent(groupName,groupData);
							groupContainer.appendChild(clearButton);
							cursor.continue();
						} catch (error) {
							console.error('Error parsing JSON:', error);
							cursor.continue();
						}
					} else {
						
						cursor.continue();
					}
				};

				getRequest.onerror = function (event) {
					console.error(`Error getting group '${groupName}' data from IndexedDB:`, event.target.errorCode);
					cursor.continue();
				};
			} else {
				
			}
		};
	}
	function deleteImgContainer(imgContainer, groupName) {
		const itemName = imgContainer.querySelector('p').textContent;
		imgContainer.remove();

		const transaction = db.transaction(['m3uContent'], 'readwrite');
		const objectStore = transaction.objectStore('m3uContent');
		const getRequest = objectStore.get(groupName);
		getRequest.onsuccess = function (event) {
			const storedData = event.target.result;

			if (storedData && typeof storedData.data === 'string') {
				try {
					const groupData = JSON.parse(storedData.data);
					const indexToDelete = groupData.findIndex(item => item.name === itemName);
					if (indexToDelete !== -1) {
						groupData.splice(indexToDelete, 1);
						const dataToStore = JSON.stringify(groupData);
						const updateRequest = objectStore.put({ id: groupName, data: dataToStore });
						updateRequest.onsuccess = function () {
							console.log(`Item '${itemName}' deleted from group '${groupName}'`);
							const notification = document.createElement('div');
		notification.className = 'notification';
		notification.textContent = `'${itemName}'已删除`;
		 document.body.appendChild(notification);
		 setTimeout(() => {
			document.body.removeChild(notification);
		}, 1000);
						};
						updateRequest.onerror = function (event) {
							console.error(`Error updating group '${groupName}':`, event.target.errorCode);
						};
					}
				} catch (error) {
					console.error('Error parsing JSON:', error);
				}
			}
		};
		getRequest.onerror = function (event) {
			console.error(`Error getting group '${groupName}' data from IndexedDB:`, event.target.errorCode);
		};
	}

	reM3uFile.addEventListener("click", function () {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		 fileInput.addEventListener('change', function (event) {
			const file = event.target.files[0];
			
			if (file) {
				const reader = new FileReader();
				
				reader.onload = function (e) {
					const m3uData = e.target.result;
					const parsedData = parseM3U(m3uData);
					updateMenuContent(parsedData);
				};
				
				reader.readAsText(file);
			}
		});
		fileInput.click();
	});
	exportM3uFile.addEventListener("click", function (){
		const transaction = db.transaction(['m3uContent'], 'readonly');
		const objectStore = transaction.objectStore('m3uContent');
		const allData = {};

		transaction.oncomplete = function () {
			const m3uContent = generateM3uFileContent(allData);
			downloadM3uFile(m3uContent);
		};

		objectStore.openCursor().onsuccess = function (cursorEvent) {
			const cursor = cursorEvent.target.result;
			if (cursor) {
				const groupName = cursor.value.id;
				const getRequest = objectStore.get(groupName);
				console.log(groupName);
				getRequest.onsuccess = function (event) {
					const storedData = event.target.result;
					if (typeof storedData.data === 'string') {
						try {
							const groupData = JSON.parse(storedData.data);
							allData[groupName] = groupData;
						} catch (error) {
							console.error('Error parsing JSON:', error);
						}
					}
					cursor.continue();
				};
				getRequest.onerror = function (event) {
					console.error(`Error getting group '${groupName}' data from IndexedDB:`, event.target.errorCode);
					cursor.continue();
				};
			}
		};
	});

	function generateM3uFileContent(dataObject) {
		let m3uContent = "#EXTM3U\n";
		for (const groupName in dataObject) {
			if (dataObject.hasOwnProperty(groupName)) {
				const groupData = dataObject[groupName];

				groupData.forEach(({ tvgLogo, name, link }) => {
					m3uContent += `#EXTINF:-1 group-title="${groupName}" tvg-logo="${tvgLogo}", ${name}\n${link}\n`;
				});
			}
		}
		return m3uContent;
	}

	function downloadM3uFile(content) {
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'exported.m3u';
		a.click();
		URL.revokeObjectURL(url);
	}

	function updateMenuContent(data) {
		const menuContent2 = document.getElementById('menuContent2');

		Object.keys(data).forEach(groupName => {
			const groupContainer = document.createElement('div');
	groupContainer.className = 'groupContainer';
	groupContainer.style.display = 'none';

	const groupButton = document.createElement('a');
	groupButton.className = 'groupButton';
	groupButton.textContent = groupName;

	groupButton.addEventListener('click', function() {
		if (groupContainer.style.display === 'none' || groupContainer.style.display === '') {
			groupContainer.style.display = 'block';
		} else {
			groupContainer.style.display = 'none';
		}
	});
	menuContent2.appendChild(groupButton);
			data[groupName].forEach(({ tvgLogo, name, link }) => {
				const imgContainer = document.createElement('div');
				imgContainer.className = 'img-container';

				const image = document.createElement('img');
				image.src = tvgLogo;
				image.classList.add('rimg');
				image.loading = 'lazy';

				const nameElement = document.createElement('p');
				nameElement.textContent = name;
				nameElement.classList.add('t');

				imgContainer.appendChild(image);
				imgContainer.appendChild(nameElement);
				let cover = image.src;
				imgContainer.addEventListener('click', () => playLinkContent(name, link,cover));
	 
				imgContainer.addEventListener('contextmenu', (e) => {
		e.preventDefault();
		showContextMenu(e.clientX, e.clientY, name, link, () => saveContent(link, name, imgContainer), () => deleteImgContainer(imgContainer, groupName));
	});


					  let touchStartX, touchStartY;
	let isScrolling = false;

	imgContainer.addEventListener('touchstart', (e) => {
	  e.preventDefault();
	  touchStartX = e.touches[0].clientX;
	  touchStartY = e.touches[0].clientY;
	  isScrolling = false;

	  longPressTimer = setTimeout(() => {
		if (!isScrolling) {
		  showContextMenu(touchStartX, touchStartY, name, link, () => saveContent(link, name, imgContainer), () => deleteImgContainer(imgContainer, groupName));
		}
	  }, 500);
	}, { passive: true });

	imgContainer.addEventListener('touchmove', (e) => {
	  const touchMoveX = e.touches[0].clientX;
	  const touchMoveY = e.touches[0].clientY;
	  const deltaX = Math.abs(touchMoveX - touchStartX);
	  const deltaY = Math.abs(touchMoveY - touchStartY);

	   if (deltaX > 2 || deltaY > 2) {
		isScrolling = true;
		clearTimeout(longPressTimer);
	  }
	});

	imgContainer.addEventListener('touchend', () => {
	  clearTimeout(longPressTimer);

	  if (!isScrolling) {
		playLinkContent(name, link,cover);
	  }
	});
		  groupContainer.appendChild(imgContainer);
			});
			menuContent2.appendChild(groupContainer);
		const groupData = data[groupName];
		const storeButton = document.createElement('button');
		storeButton.classList.add('clear-button');
		storeButton.textContent = '存储本组'; 
		storeButton.onclick = () => storeGroupContent(groupName,groupData);
		groupContainer.appendChild(storeButton);    
		});
	}
	 let activeContextMenu = null;

	function showContextMenu(x, y, name, link, onSaveCallback, onDeleteCallback) {
		if (activeContextMenu) {
			document.body.removeChild(activeContextMenu);
			activeContextMenu = null;
		}

		const contextMenu = document.createElement('div');
		contextMenu.className = 'context-menu';
		contextMenu.style.position = 'absolute';
		contextMenu.style.left = x + 'px';

		 const menuHeight = 50;
	const windowHeight = window.innerHeight;
	const scrollTop = window.scrollY || document.documentElement.scrollTop;

	const topPosition = Math.min(y - menuHeight + scrollTop, windowHeight - menuHeight + scrollTop);
	contextMenu.style.top = topPosition + 'px';


		contextMenu.style.zIndex = '1000';
		contextMenu.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		contextMenu.style.borderRadius = '8px';
		contextMenu.style.padding = '10px';
		contextMenu.style.color = '#ffffff';

		const playOption = document.createElement('div');
		playOption.textContent = '新标签播放';
		playOption.style.color = '#ffffff';
		playOption.style.marginBottom = '2px';
		playOption.style.borderBottom = '2px solid #fff';playOption.style.cursor = 'pointer';
		playOption.addEventListener('click', () => playnewLink(name, link));

		const saveOption = document.createElement('div');
		saveOption.textContent = '添加至主页';
		saveOption.style.color = '#ffffff';
		saveOption.style.cursor = 'pointer';
		saveOption.addEventListener('click', () => {
		onSaveCallback(link, name);
		const notification = document.createElement('div');
		notification.className = 'notification';
		notification.textContent = `'${name}' 已添加`;
		document.body.appendChild(notification);
		setTimeout(() => {
			document.body.removeChild(notification);
		}, 1000);
	});

	   
		const delOption = document.createElement('div');
		delOption.textContent = '删除';
		delOption.style.color = '#ffffff';
		delOption.style.marginBottom = '2px';
		delOption.style.borderBottom = '2px solid #fff';delOption.style.cursor = 'pointer';
		delOption.addEventListener('click', () => onDeleteCallback(name));
		contextMenu.appendChild(playOption);
		contextMenu.appendChild(delOption);
		contextMenu.appendChild(saveOption);

		document.body.appendChild(contextMenu);

		activeContextMenu = contextMenu;

		document.addEventListener('click', () => {
			if (activeContextMenu) {
				document.body.removeChild(activeContextMenu);
				activeContextMenu = null;
			}
		});
	}
	function playnewLink(name, link){
				const title = name;
				appTitle.textContent = title;
				document.title = title;
				window.open(link, "_blank");}
	 function saveContent(link, title, imgContainer) {
		const savedContent = document.getElementById('savedContent');
		const clonedContainer = imgContainer.cloneNode(true);

		// Attach the click event listener to the cloned container
		const image = clonedContainer.querySelector('img');
		const nameElement = clonedContainer.querySelector('p');
		nameElement.classList.remove('t');
		image.loading = 'lazy';
		let cover = image;
		image.onclick = () => playmore(link, title,cover);

		savedContent.appendChild(clonedContainer);

		// Save data to localStorage
		saveToLocalStorage(link, title, imgContainer.innerHTML);
	}

	function saveToLocalStorage(link, title, content) {
		 const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
		 const imgSrc = (new DOMParser().parseFromString(content, 'text/html').querySelector('img')).src;
		 const nextId = savedData.length > 0 ? savedData[savedData.length - 1].id + 1 : 1;

		 savedData.push({ id: nextId, link, name: title, imageBase64: imgSrc });
		 localStorage.setItem('savedData', JSON.stringify(savedData));
		 console.log('Data saved to localStorage:', { id: nextId, link, title, imgSrc });

		 updateSavedContent(savedData);
	}

	function loadSavedContent() {
		const savedContent = document.getElementById('savedContent');
		 const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
		 console.log('Data loaded from localStorage:', savedData);

		 savedData.forEach(item => {
			const clonedContainer = document.createElement('div');

			 const img = document.createElement('img');
			img.src = item.imageBase64;

			 const nameElement = document.createElement('p');
			nameElement.textContent = item.name;

			 clonedContainer.appendChild(img);
			clonedContainer.appendChild(nameElement);
					let cover = img.src;
			img.loading = 'lazy';
			img.onclick = () => playmore(item.link, item.name,cover);

			savedContent.appendChild(clonedContainer);
		});
	}

	document.addEventListener('DOMContentLoaded', loadSavedContent);
	 
	 function parseM3U(m3uData) {
		const lines = m3uData.split('#EXTINF');

		let groups = {};
		let currentGroup = '';

		lines.forEach(line => {
			if (line.trim() !== '') {
				const groupNameMatch = /group-title="([^"]+)"/.exec(line);
				const groupName = groupNameMatch ? groupNameMatch[1] : 'Other';

				if (!groups[groupName]) {
					groups[groupName] = [];
				}

				const tvgLogoMatch = /tvg-logo="([^"]+)"/.exec(line);
				const tvgLogo = tvgLogoMatch ? tvgLogoMatch[1] : '';
				const commaIndex = line.lastIndexOf(',');
				const nameAndLinkPart = line.substring(commaIndex + 1).trim();
				const spaceIndex = nameAndLinkPart.indexOf(' ');
				
				let name, link;
				const urlRegex = /(http[s]?:\/\/\S+|rtmp:\/\/\S+)/;
				const urlMatch = urlRegex.exec(nameAndLinkPart);

				if (urlMatch) {
					 name = nameAndLinkPart.substring(0, urlMatch.index).trim();
					link = urlMatch[0];
				} else {
					 name = nameAndLinkPart;
					link = '';  
				}

				groups[groupName].push({ tvgLogo, name, link });
				currentGroup = groupName;
			}
		});
		return groups;
	}

	function playLinkContent(name,link,cover) {
			   audio.pause();
		 const title = name;
		 playmore(link, title,cover);
	  }
		openMenuButton.addEventListener("click", function () {
			menu.classList.remove("hidden");
		});

	addRowButton.addEventListener("click", function () {
		const row = createRow("", "", "");
		const imgContainer = row.querySelector(".img-container");
		const imageInput = row.querySelector(".image-input");
		imgContainer.style.background = "url('./icons/pic.svg') center center / cover no-repeat";
		row.insertBefore(imgContainer, row.firstChild);
		row.insertBefore(imageInput, row.firstChild);
		menuContent.appendChild(row);

		imageInput.addEventListener("change", function () {
			const file = imageInput.files[0];
			const reader = new FileReader();
			reader.onload = function (e) {
				imgContainer.style.background = "none";
				const selectedImage = document.createElement("img");
				selectedImage.src = e.target.result;
				selectedImage.classList.add("rimg");
				imgContainer.innerHTML = "";
				imgContainer.appendChild(selectedImage);
			};
			reader.readAsDataURL(file);
		});
	});

		saveButton.addEventListener("click", function () {
		const rows = menuContent.getElementsByClassName("menu-row");

		 const savedData = JSON.parse(localStorage.getItem("savedData")) || [];

		 savedData.length = 0;

		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			const linkInput = row.querySelector(".link-input");
			const nameInput = row.querySelector(".name-input");
			const imageInput = row.querySelector(".image-input");

			const imageFile = imageInput.files[0];
			const linkValue = linkInput.value;
			const nameValue = nameInput.value;

			if (linkValue && nameValue) {
				if (imageFile) {
					const reader = new FileReader();
					reader.onload = function (event) {
						const imageBase64 = event.target.result;
						const id = getNewId();

						row.dataset.link = linkValue;
						row.dataset.title = nameValue;

						savedData.push({
							id,
							imageBase64: imageBase64,
							link: linkValue,
							name: nameValue,
						});

						saveDataToLocalStorage(savedData);
						updateSavedContent(savedData);
						resetMenu();
					};

					reader.readAsDataURL(imageFile);
				} else {
					const imgContainer = row.querySelector(".img-container");
					const img = imgContainer.querySelector("img");
					const imageBase64 = img ? img.src : "";
					const id = getNewId();

					row.dataset.link = linkValue;
					row.dataset.title = nameValue;

					savedData.push({
						id,
						imageBase64: imageBase64,
						link: linkValue,
						name: nameValue,
					});
				}
			}
		}
		saveDataToLocalStorage(savedData);
		updateSavedContent(savedData);
		const notification = document.createElement('div');
		notification.className = 'notification';
		notification.textContent = `已保存`;
		 document.body.appendChild(notification);
		 setTimeout(() => {
			document.body.removeChild(notification);
		}, 2000);
	});

	function getNewId() {
		const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
		return savedData.length > 0 ? savedData[savedData.length - 1].id + 1 : 1;
	}

	   function createRow(imageBase64, linkValue, nameValue, isSaved = false) {
			const row = document.createElement("div");
			row.classList.add("menu-row");

			  const imgContainer = document.createElement("div");
		imgContainer.classList.add("img-container");
		imgContainer.addEventListener("click", function () {
			imageInput.click();
		});

		const imageInput = document.createElement("input");
		imageInput.type = "file";
		imageInput.classList.add("image-input");
		imageInput.style.display = "none"; 
		imageInput.addEventListener("change", function () {
	 
			const file = imageInput.files[0];
			const reader = new FileReader();
			reader.onload = function (e) {
				const image = document.createElement("img");
				image.src = e.target.result;
				image.classList.add("rimg");
				imgContainer.innerHTML = "";
				imgContainer.appendChild(image);
			};
			reader.readAsDataURL(file);
		});
	const infoinput = document.createElement("div");
	infoinput.classList.add("infoinput");

	const linkInput = document.createElement("input");
	linkInput.type = "text";
	linkInput.classList.add("link-input");
	linkInput.value = linkValue; 
	linkInput.placeholder = "链接"; 

	const nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.classList.add("name-input");
	nameInput.value = nameValue; 
	nameInput.placeholder = "名称";

			const deleteButton = document.createElement("button");
			deleteButton.textContent = "删除";
			deleteButton.classList.add("infoinput");

			deleteButton.addEventListener("click", function () {
				const id = parseInt(row.dataset.id);
				const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
				const newData = savedData.filter(function (data) {
					return data.id !== id;
				});
				localStorage.setItem("savedData", JSON.stringify(newData));
				 menuContent.removeChild(row);
				 updateSavedContent(newData);
			});

			 let rowData = {
				link: linkValue,
				title: nameValue,
			};

			row.appendChild(imgContainer);  
			row.appendChild(imageInput);
			row.appendChild(infoinput);
			 infoinput.appendChild(linkInput);
			 infoinput.appendChild(nameInput);
			row.appendChild(deleteButton);

			 if (imageBase64 && isSaved) {
				const image = document.createElement("img");
				image.src = imageBase64;
				image.classList.add("rimg");
				imgContainer.appendChild(image);
			}
	 
			return row;
		}

		 function saveDataToLocalStorage(data) {
			localStorage.setItem("savedData", JSON.stringify(data));
		}
		function playmore(link, title,cover){ 
			const url = link;
			const fileExtension = url.split('.').pop().toLowerCase();
			desiredOption.selected = true;
			if (currentHls) {
				currentHls.destroy();
			}
			 if (currentRequest !== null) {
		clearTimeout(currentRequest);
	  }
			if (fileExtension !== 'm3u8') {
				stopAudio();
				const audio = document.getElementById('video');
				document.body.classList.add('loading');
				appTitle.textContent = title;
				document.title = title;
				audio.src = url;

				try {
					const playPromise = audio.play();
					if (playPromise !== undefined) {
						playPromise.then(_ => {
							document.body.classList.remove('loading');
							navigator.mediaSession.metadata = new MediaMetadata({
								title: title,
								artist: 'HITFM Player',
								artwork : [{
				src:cover,
				sizes: '300x300',
				type: 'image/jpg'
			}]
							});
						}).catch(error => {//302跳转非直链m3u8无法使用hls.js播放
						 const notification = document.createElement('div');
		notification.className = 'notification';
		notification.textContent = `尝试使用浏览器播放`;
		 document.body.appendChild(notification);
		 setTimeout(() => {
			document.body.removeChild(notification);
		}, 1000);
					 window.open(url, "_blank");
						});
					}
				} catch (error) {
					 window.open(url, "_blank");
				}
			} else {
		   setPlaybackInfo(url, title,cover);
			 }
	   }
		function attachClickEvent(imgContainer, link, title,cover) {
		imgContainer.addEventListener("click", function () {
		 playmore(link, title,cover);
		});
	}

		 function updateSavedContent(data) {
			savedContent.innerHTML = "";

			data.sort((a, b) => a.id - b.id); // 根据序号排序

			data.forEach(function (item) {
				const imgContainer = document.createElement("div");
				imgContainer.classList.add("img-container");

				const image = document.createElement("img");
				image.src = item.imageBase64;
				image.classList.add("rimg");

				const name = document.createElement("p");
				name.textContent = item.name;

				imgContainer.appendChild(image);
				imgContainer.appendChild(name);

				savedContent.appendChild(imgContainer);
				let cover = image.src;
				// 使用闭包为每个图片容器添加点击事件
				attachClickEvent(imgContainer, item.link, item.name,cover);
			});
		}
	function restoreDataFromLocalStorage() {
		const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
		updateSavedContent(savedData);

		// 在菜单中恢复已保存的数据
		savedData.forEach(function (data, index) {
			const { imageBase64, link, name } = data;
			const row = createRow(imageBase64, link, name, true);
			row.dataset.id = index + 1; 
			menuContent.appendChild(row);
		});

		const toggleButton = document.createElement('div');
		toggleButton.className = 'groupButton';
		toggleButton.textContent = '主页电台';
		toggleButton.addEventListener('click', function () {
			if (menuContent.style.display === 'none' || menuContent.style.display === '') {
				menuContent.style.display = 'block';
				localStorage.setItem('menuContentIsExpanded', 'true');
			} else {
				menuContent.style.display = 'none';
				localStorage.setItem('menuContentIsExpanded', 'false');
			}
		});
		const isMenuExpanded = localStorage.getItem('menuContentIsExpanded');
		if (isMenuExpanded === 'true') {
			menuContent.style.display = 'block';
		} else {
			menuContent.style.display = 'none';
		}
		menuContent.insertAdjacentElement('beforebegin', toggleButton);
		menuContent.className = 'groupContainer';
	}


		 restoreDataFromLocalStorage();

		 closeMenuButton.addEventListener("click", function () {
			menu.classList.add("hidden");
		});
	 
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
		var storedColor2 = localStorage.getItem("--background-color");
		document.body.style.setProperty("--triangle-color", storedColor);
		document.body.style.setProperty("--background-color", storedColor2);
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
		document.body.style.setProperty("--triangle-color", "black");
	   document.body.style.setProperty("--background-color", "#fff");
	   localStorage.setItem("--background-color", "#fff");
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
		document.body.style.setProperty("--triangle-color", "white");
		document.body.style.setProperty("--background-color", "#424242");
		localStorage.setItem("--background-color", "#424242");
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
	//dom end

			   function goToWebpage() {
	  const url = "https://space.bilibili.com/1090328045/search/video?keyword=ost"

	 window.location.href = url;
	}
			 function goToWebpage2() {
	  const url = "https://www.acfun.cn/u/633603";
		window.location.href = url;
	}
	 
			 function updateProgramLink() {
	  const selectedDate = document.getElementById("datePicker").value;
	   const url = `https://www.radio.cn/pc-portal/sanji/passProgram.html?channel_name=662&program_name=undefined&date_checked=${selectedDate}`;
		window.location.href = url;
	}
		  function gotoURL() {
		const url = "https://music.ghxi.com/";
		window.open(url, "_blank");
	}
	  const mainColorInput = document.getElementById('main-color');
	  const savedColor = localStorage.getItem('mainColor');
	  if (savedColor) {
		document.documentElement.style.setProperty('--main-color', savedColor);
		mainColorInput.value = savedColor;
	  }
	  mainColorInput.addEventListener('input', function() {
		const selectedColor = mainColorInput.value;
		document.documentElement.style.setProperty('--main-color', selectedColor);
		localStorage.setItem('mainColor', selectedColor);
	  });
	  const textToEdit = document.getElementById('textToEdit');
	const editButton = document.getElementById('editButton');

	if (localStorage.getItem('editedText')) {
	  textToEdit.textContent = localStorage.getItem('editedText');
	}

	editButton.addEventListener('click', () => {
	  const newText = prompt('Enter new text:', textToEdit.textContent);
	  if (newText !== null) {
		textToEdit.textContent = newText;
		localStorage.setItem('editedText', newText);
	  }
	});
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
		  var savedColor = localStorage.getItem("mainColor");

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
			blurLevel: blurLevel,
			savedColor: savedColor,
		   };
		   var savedData = JSON.parse(localStorage.getItem("savedData")) || [];
		  backupData.savedData = savedData;
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
			const notification = document.createElement('div');
		notification.className = 'notification';
		notification.textContent = ` 已成功读取备份文件！`;
		 document.body.appendChild(notification);
		 setTimeout(() => {
			document.body.removeChild(notification);
		}, 2000);
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
		  localStorage.setItem("mainColor", backupData.savedColor);
		   var savedData = backupData.savedData || [];
		  localStorage.setItem("savedData", JSON.stringify(savedData));
		  const notification = document.createElement('div');
		notification.className = 'notification';
		notification.textContent = `已成功恢复备份数据！`;
		 document.body.appendChild(notification);
		 setTimeout(() => {
			document.body.removeChild(notification);
		}, 1000);   
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
		  const programSchedule = {//UTC+08:00 
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
		  
	document.getElementById('top20').addEventListener('click', function () {
	  if (!hasFetched) {
		clearAudio();
		  fetchmusic('https://api.i-meto.com/meting/api?server=netease&type=playlist&id=6705531149');
	  }
	  removeDynamicButton();
	  createDynamicButton('https://music.163.com/#/playlist?id=6705531149');
	  setTimeout(function () {
		const playlistElement = document.querySelector('.yAudio-playlist');
		if (playlistElement) {
		  var newParagraph = document.createElement('p');
		  newParagraph.innerText = 'Hit FM Top 20 Countdown';
		  newParagraph.style.fontSize = '18px';
		  playlistElement.innerHTML = '';
		  playlistElement.appendChild(newParagraph);
		}
	  }, 4000);
	});

	document.getElementById('at40').addEventListener('click', function () {
	  if (!hasFetched2) {
		clearAudio();
		 fetchmusic('https://api.i-meto.com/meting/api?server=netease&type=playlist&id=6659816005')
	  }
	  removeDynamicButton();
	  createDynamicButton('https://music.163.com/#/playlist?id=6659816005');
	  setTimeout(function () {
		const playlistElement = document.querySelector('.yAudio-playlist');
		if (playlistElement) {
		  var newParagraph = document.createElement('p');
		  newParagraph.innerText = 'American Top 40';
		  newParagraph.style.fontSize = '18px';
		  playlistElement.innerHTML = '';
		  playlistElement.appendChild(newParagraph);
		}
	  }, 4000);
	});

	let hasFetched = false;
	let hasFetched2 = false;

	function fetchmusic(url) {
	  fetch(url).then(async (response) => {
		const audio = await response.json();
		new YAudio({
		  element: document.querySelector('#yAudio'),
		  audio: audio,
		});
		if (url.includes('6705531149')) {
		  hasFetched = true;
		} else if (url.includes('6659816005')) {
		  hasFetched2 = true;
		}
	  });
	}

	function clearAudio() {
	  const yAudioElement = document.querySelector('#yAudio');
	  while (yAudioElement.firstChild) {
		yAudioElement.removeChild(yAudioElement.firstChild);
	  }
	  hasFetched = false;
	  hasFetched2 = false;
	}
	function createDynamicButton(playlistUrl) {
	   const dynamicButton = document.createElement('button');
	  dynamicButton.setAttribute('id', 'nelist');
	  dynamicButton.textContent = '前往歌单页面';
	  dynamicButton.style.width = 'auto';
	  dynamicButton.addEventListener('click', function() {
		window.location.href = playlistUrl;
	  });

	  const musicModal = document.getElementById('musiccontain');
	  musicModal.appendChild(dynamicButton);
	}

	function removeDynamicButton() {
	  const existingButton = document.getElementById('nelist');
	  if (existingButton) {
		existingButton.parentNode.removeChild(existingButton);
	  }
	}
	const openButton = document.getElementById('openButton');
	  const overlay = document.getElementById('overlay');
	  const popup = document.getElementById('popup');
	  const timeInput = document.getElementById('timeInput');
	  const setCloseTime = document.getElementById('setCloseTime');
	  const cancelClose = document.getElementById('cancelClose');
	  const closePopup = document.getElementById('closePopup');
	  const countdown = document.getElementById('countdown');
	  let countdownInterval;

	  openButton.addEventListener('click', () => {
		overlay.style.display = 'block';
		popup.style.display = 'block';
	  });

	  setCloseTime.addEventListener('click', () => {
		const minutes = parseInt(timeInput.value);
		if (!isNaN(minutes)) {
		  const milliseconds = minutes * 60 * 1000; 
		  countdownInterval = setInterval(updateCountdown, 1000);
		  countdownStart = Date.now();
		  setTimeout(() => {
			clearInterval(countdownInterval);
			overlay.style.display = 'none';
			popup.style.display = 'none';
	 window.location.href="about:blank";
  }, milliseconds);
		}
	  });

	  cancelClose.addEventListener('click', () => {
		clearInterval(countdownInterval);
		overlay.style.display = 'none';
		popup.style.display = 'none';
	  });

	  closePopup.addEventListener('click', () => {
		overlay.style.display = 'none';
		popup.style.display = 'none';
	  });

	  function updateCountdown() {
		const remainingTime = parseInt(timeInput.value * 60 - (Date.now() - countdownStart) / 1000);
		countdown.innerHTML = `剩余时间: ${remainingTime} 秒`;
	  }
	  let countdownStart;
