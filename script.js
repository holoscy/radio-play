<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=0.6,maximum-scale=2">
    <link href="mystyle.css" rel="stylesheet" type="text/css">
   <title>HITFM Player</title>
  <link rel="shortcut icon" type="image/png" href="icons/hit.png"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/hls.js/1.4.0/hls.min.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.6/axios.min.js"></script>
</head>
<body class="loading">
<div class="app">
    <h1 class="player_title">HIT FM </h1>
    <div class="player" >
        <button class="control mute-button" style="margin-left:auto;margin-right:5px"></button>
        <input type="range" name="volume-level" class="control volume-level" min="0" max="100" step="1" value="100" style="margin-left:5px;margin-right:5px;max-width: 250px">
        <button class="control play-button" style="margin-left:5px;margin-right:auto"></button>
    </div>
 <div class="container">
  <div class="ite item-left">
  <div class="top"  style="display:flex;align-items:center;"> 
  <button class="arrow1" onclick="showPage(1)">
  <svg width="21px" height="28px" viewBox="0 0 50 80" xml:space="preserve">
    <polyline fill="none"  class="arr" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="
	45.63,75.8 0.375,38.087 45.63,0.375 "/>
  </svg>  
</button>   
 <div style="display: flex; align-items: center; margin-left: auto;margin-right: 1em;">
    <button onclick="startRecord()" style="margin-left: auto; margin-right: 0;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" class="custom-filter">
            <path d="m12,0C5.38,0,0,5.38,0,12s5.38,12,12,12,12-5.38,12-12S18.62,0,12,0Zm-2,7c0-1.11.9-2,2-2s2,.89,2,2v5c0,1.1-.9,2-2,2s-2-.9-2-2v-5Zm3,10.92v1.08c0,.55-.45,1-1,1s-1-.45-1-1v-1.08c-2.83-.48-5-2.95-5-5.92,0-.55.45-1,1-1s1,.45,1,1c0,2.21,1.79,4,4,4s4-1.79,4-4c0-.55.45-1,1-1s1,.45,1,1c0,2.97-2.17,5.44-5,5.92Z"/>
        </svg>
    </button>

    <div style="margin-left: 0;">
        <a href="https://www.shazam.com/">
            <img src="./icons/shazam.svg" style="width:20px" alt="shazam Logo">
        </a>
    </div>
</div>

<div class="input-boxLine" style="display:flex;align-items:center;margin-left:0;margin-right:0;">
	<input id="inputUrl" input type="text" required />
	<div class="line"></div>
	<span>WE PLAY ONLY THE HITS</span>
</div>
<button onclick="cplay()" style="margin-left:0;margin-right:auto">
    <a href="#" class="playBut">
        <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In  -->
        <svg version="1.1"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
             x="0px" y="0px" width="40px" height="40px" viewBox="0 0 213.7 213.7" enable-background="new 0 0 213.7 213.7"
             xml:space="preserve">
            <polygon class="triangle" id="XMLID_18_" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="73.5,62.5 148.5,105.8 73.5,149.1"/>
        </svg>
    </a>
</button>
<button class="arrow2" onclick="showPage(2)">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="21px" height="28px" viewBox="0 0 50 80" xml:space="preserve">
    <polyline fill="none" class="arr"  stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="
	0.375,0.375 45.63,38.087 0.375,75.8 "/>
  </svg>
</button>
</div>

<div id="page1" class="page visible">
   <div class="player">
    <button class="df-button" onclick="playHitFM1()" style="background-image: url(./icons/hit1.png)"></button>
    <button class="df-button" onclick="playHitFM2()" style="background-image: url(./icons/hit广州.png)"></button>
    <button class="df-button" onclick="playHitFM3()" style="background-image: url(./icons/hit北京.png)"></button>  
</div>
<div class="player">   
    <button class="df-button" onclick="playev()" style="background-image: url(./icons/ev.png)"></button>    
    <button class="df-button" onclick="playAT40()" style="background-image: url(./icons/at40.png)"></button>
    <button class="df-button" onclick="playhitn()" style="background-image: url(./icons/hitn.png)"></button>
</div>
<div class="player">   
    <button class="df-button" onclick="playic()" style="background-image: url(./icons/ic.png)"></button>
    <button class="df-button" onclick="playip()" style="background-image: url(./icons/ip.png)"></button>    
    <button class="df-button" onclick="playcf()" style="background-image: url(./icons/cf.png)"></button>
</div>

 </div>
<div id="page2" class="page">

   <div class="player">
    <button class="df-button" onclick="playZ100()" style="background-image: url(./icons/z100.png)"></button>
    <button class="df-button" onclick="playkiis()" style="background-image: url(./icons/kiis.png)"></button>
    <button class="df-button" onclick="playalic()" style="background-image: url(./icons/alic.png)"></button>       
</div>
   <div class="player">
    <button class="df-button" onclick="playrn()" style="background-image: url(./icons/rn.png)"></button> 
    <button class="df-button" onclick="playmxn()" style="background-image: url(./icons/mxn.png)"></button>
    <button class="df-button" onclick="playimf()" style="background-image: url(./icons/imf.png)"></button>
</div>
 <div class="player">
    <button class="df-button" onclick="playbbc1()" style="background-image: url(./icons/bbc1.png)"></button> 
    <button class="df-button" onclick="playbbc1x()" style="background-image: url(./icons/bbc1x.png)"></button>
    <button class="df-button" onclick="playbbc6()" style="background-image: url(./icons/bbc6.png)"></button>
</div>
 </div>
     <div id="recordedTime">已录制时长: 0秒</div>
     <div id="programName">  ON AIR NOW: Loading...</div>
     <div id="songInfo"></div>
<div class="menu-container">
  <button id="toggle-menu-btn" style="padding:0;width:20px;height:20px"><?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg "width="20px" height="20px" viewBox="0 0 512 512">
  <defs><style>.cls-1 { opacity: .97;}.cls-1, .cls-2 { fill-rule: evenodd;isolation: isolate;}.cls-2 {opacity: .98;}</style></defs>
 <path class="cls-2" d="m53,0h406c28.67,6.67,46.33,24.33,53,53v406c-6.67,28.67-24.33,46.33-53,53H53c-28.67-6.67-46.33-24.33-53-53V53C6.67,24.33,24.33,6.67,53,0Zm8,43c131.38-.49,262.71,0,394,1.5,7.45,3.05,11.95,8.55,13.5,16.5.67,50.67.67,101.33,0,152-22.83-22.83-45.67-45.67-68.5-68.5-10.67-8.67-21.33-8.67-32,0-49.83,49.83-99.67,99.67-149.5,149.5-18.17-18.17-36.33-36.33-54.5-54.5-9.12-6.88-18.45-7.21-28-1-30.83,30.83-61.67,61.67-92.5,92.5-.67-90-.67-180,0-270,2.01-9.85,7.85-15.85,17.5-18Zm322,149c28.92,27.41,57.42,55.41,85.5,84,.67,58.33.67,116.67,0,175-1.83,9.83-7.67,15.67-17.5,17.5-130,.67-260,.67-390,0-9.83-1.83-15.67-7.67-17.5-17.5-.67-19.33-.67-38.67,0-58,35.33-35.33,70.67-70.67,106-106,41.83,41.83,83.67,83.67,125.5,125.5,13.07,6.63,23.9,4.13,32.5-7.5,3.54-7.52,3.21-14.85-1-22-18.47-19.47-37.3-38.64-56.5-57.5,44.54-44.37,88.87-88.87,133-133.5Z"/>
  <path class="cls-1" d="m121,85c26.57-1.57,43.07,10.43,49.5,36,2.05,26.59-9.78,43.09-35.5,49.5-26.59,2.05-43.09-9.78-49.5-35.5-1.85-26.61,9.98-43.28,35.5-50Z"/>
</svg></button>
  <button id="darkModeButton" onclick="toggleDarkMode()" style="width:20px;height:20px;background:url(./icons/light.svg);background-size: 100%;" ></button>

 <div class="submenu" id="submenu-popup">
    <div class="page page1">
        <label for="bg-color">左背景色</label><input type="color" id="bg-color" value="#ffffff"><br>
        <label for="corner-radius">左圆角</label><input type="range" id="corner-radius" min="0" max="50" value="0"><br>
        <label for="opacity">左透明度</label><input type="range" id="opacity" min="0" max="1" step="0.01" value="1"><br>
        <label for="bg-color1">右背景色</label><input type="color" id="bg-color1" value="#ffffff"><br>
        <label for="corner-radius1">右圆角</label><input type="range" id="corner-radius1" min="0" max="50" value="0"><br>
        <label for="opacity1">右透明度</label><input type="range" id="opacity1" min="0" max="1" step="0.01" value="1"><br>
        
  
        <label for="bg-color2">背景色</label><input type="color" id="bg-color2" value="#ffffff"><br>
        <label for="corner-radius2">圆角</label><input type="range" id="corner-radius2" min="0" max="50" value="0"><br>
        <label for="opacity2">透明度</label><input type="range" id="opacity2" min="0" max="1" step="0.01" value="1"><br>
        <label for="bg-color3">网页背景色</label><input type="color" id="bg-color3" value="#ffffff"><br>
        <label for="opacity3">网页透明度</label><input type="range" id="opacity3" min="0" max="1" step="0.01" value="1">
        <button id="toggleButton">切换隐藏外部链接按钮</button>
        <button id="toggButton">切换隐藏TAVR</button>
        <button id="next-page-btn">下一页</button>
        <button id="about-btn">关于</button>
     </div>  
        <div class="page page2">
        <label for="bg-position-select">背景图位置</label>
        <select id="bg-position-select">
            <option value="top">顶部</option>
            <option value="center">居中</option>
            <option value="bottom">底部</option>
        </select><br>
        
        <label for="blur-slider">背景模糊</label> 
        <input type="range" id="blur-slider" min="0" step="0.01" max="20" value="0">

        <button id="select-online-bg-btn">选择在线图片</button>
        <button id="select-local-bg-btn">选择本地图片</button>
        <button id="clear-bg-btn">清除背景图</button>
        
         <hr> <!-- Add a horizontal line -->
        <button onclick="backupLocalStorage()">备份数据</button>
        <input id="fileInput" type="file" accept=".json" style="display: none;">
        <button onclick="selectBackupFile()">选择备份文件</button>
        <button onclick="restoreLocalStorage()" disabled id="restoreButton">恢复数据</button>
        <button id="prev-page-btn">上一页</button>
    </div>
     <div class="page about">
<a href="https://greasyfork.org/zh-CN/scripts/470185" >云听网页节目HD下载</a><br>
     <p class="t">网易云音乐网页建议搭配脚本使用,<br>网易云仅提供PC端快捷搜索  <br>所有自定义数据使用<br>localStorage本地存储,有上限<br></p><hr><p class="t">电台链接由于浏览器安全限制，不能<br>在https下播放http的m3u8链接，<br>解决方法1.把http改为https<br>(部分链接只支持http) 或者<br>2. 对当前网站设置允许不安全内容</p><hr>
<a href="https://greasyfork.org/zh-CN/scripts/406054" >1.显示完整歌单</a><br>
<a href="https://greasyfork.org/zh-CN/scripts/438148" >2.lx-music 辅助脚本
</a><br>
<a href="https://greasyfork.org/zh-CN/scripts/453804" >3.MyFreeMP3扩展
</a><br>
<a href="https://greasyfork.org/zh-CN/scripts/33046" >4.直接下载</a><br>
 <a href="https://greasyfork.org/zh-CN/scripts/406821" >5.主题:扁平风格</a><br>
        <button id="about-btn">关于</button>
    </div>
</div>

</div>
<div id="content-container">

    <div class="date" style="display:flex;justify-content:center;align-items:center;margin-bottom:10px;">
     <span for="datepicker" >Date</span>
<input type="date" name="datepicker" id="datePicker"> 
     
     </div>
       <div class="player">
        <button class="link-button" onclick="goToWebpage()" style="background-image: url(./icons/lst.png)"> </button>
        <button class="link-button" onclick="updateProgramLink()" style="background-image: url(./icons/ls.png)"> </button>   
        <button class="link-button" onclick="gotoURL()" style="background-image: url(./icons/dl.png)"> </button>
       </div> 
       <div class="player">
       <button class="link-button" onclick="goToWebpage1()" style="background-image: url(./icons/top20.png)"> </button>
       <button class="link-button" onclick="goToWebpage2()" style="background-image: url(./icons/mv.png)"> </button>
       <button class="link-button" onclick="goToWebpage3()" style="background-image: url(./icons/at4.png)"> </button>
       </div> 
         </div>
</div>
       <div class="ite item-center">

</div> 	
 	<div class="ite item-right">
<div class="add-button">
    <button id="openMenuButton"><?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
  <defs> <style> .cls-1 { fill: none;}</style></defs><path class="cls-1" d="m0,0h800v800H0V0Z"/><path d="m554.77,98.49c4.72,12.97-1.97,27.32-14.94,32.04l-190.87,69.45h276.05c94.64.01,171.73,75.13,174.9,169l.1,6.02v150c0,96.65-78.35,175-175,175H175C78.35,700,0,621.65,0,525v-150c0-96.65,78.35-175,175-175h27.75s319.97-116.45,319.97-116.45c12.97-4.72,27.32,1.97,32.04,14.94Zm70.23,151.51H175c-69.04,0-125,55.96-125,125v150c0,69.04,55.96,125,125,125h450c69.04,0,125-55.96,125-125v-150c0-69.04-55.96-125-125-125Zm-375,75c69.04,0,125,55.96,125,125s-55.96,125-125,125-125-55.96-125-125,55.96-125,125-125Zm375,162.5c13.81,0,25,11.19,25,25s-11.19,25-25,25h-150c-13.81,0-25-11.19-25-25s11.19-25,25-25h150Zm-375-112.5c-41.42,0-75,33.58-75,75s33.58,75,75,75,75-33.58,75-75-33.58-75-75-75Zm375-12.5c13.81,0,25,11.19,25,25s-11.19,25-25,25h-150c-13.81,0-25-11.19-25-25s11.19-25,25-25h150Z"/>
</svg></button>
</div>
<div id="menu" class="hidden">
    <p class="t">自定义电台</p>
    <div id="menuContainer">  
        <div id="menuContent">
            <!-- 这里是菜单内容 -->
        </div>
    </div>
    <button id="addRowButton">添加</button>
    <button id="saveButton">保存</button>
    <button id="closeMenuButton">关闭</button>
</div>
 <div id="savedC">
 <div id="savedContent">
    <!-- 这里是保存的图片和电台名称 -->
</div> </div> 
<div id="tavr-container">
    <article>
        <h2 class="title">TAVR MEDIA</h2>
    </article>
    <select class="station_select  my-select" name="src_select" id="src_select" >
        <option value='' selected disabled hidden>📻 Station</option>
        <option value='{"src":"https://online.hitfm.ua/HitFM_HD","request":"https://o.tavrmedia.ua/hit","name":"Hit FM"}'>Hit FM</option>
        <option value='{"src":"https://online.hitfm.ua/HitFM_Best_HD","request":"https://o.tavrmedia.ua/hitb","name":"Hit FM Best"}'>Hit FM Best</option>       
        <option value='{"src":"https://online.hitfm.ua/HitFM_Top_HD","request":"https://o.tavrmedia.ua/hitt","name":"Hit FM Top"}'>Hit FM Top</option>
        <option value='{"src":"https://online.kissfm.ua/KissFM_HD","request":"https://o.tavrmedia.ua/kiss","name":"KISS FM"}'>KISS FM</option>
        <option value='{"src":"https://online.kissfm.ua/KissFM_Deep","request":"https://o.tavrmedia.ua/kissdeep","name":"KISS FM Deep"}'>KISS FM Deep</option>
        <option value='{"src":"https://online.kissfm.ua/KissFM_Digital_HD","request":"https://o.tavrmedia.ua/kissdigital","name":"KISS FM Digital"}'>KISS FM Digital</option> 
        <option value='{"src":"https://online.radioroks.ua/RadioROKS_HD","request":"https://o.tavrmedia.ua/roks","name":"Radio ROKS"}'>Radio ROKS</option>
        <option value='{"src":"https://online.radioroks.ua/RadioROKS_ClassicRock_HD","request":"https://o.tavrmedia.ua/rokscla","name":"Radio ROKS Classic Rock"}'>Radio ROKS Classic Rock</option>
        <option value='{"src":"https://online.radioroks.ua/RadioROKS_HardnHeavy_HD","request":"https://o.tavrmedia.ua/rokshar","name":"Radio ROKS Hard n Heavy"}'>Radio ROKS Hard'n'Heavy</option>
        <option value='{"src":"https://online.melodiafm.ua/MelodiaFM_HD","request":"https://o.tavrmedia.ua/melodia","name":"Melodia FM"}'>Melodia FM</option>
        <option value='{"src":"https://online.melodiafm.ua/MelodiaFM_Int_HD","request":"https://o.tavrmedia.ua/melodiaint","name":"Melodia FM Int"}'>Melodia FM Int</option>
        <option value='{"src":"https://online.melodiafm.ua/MelodiaFM_Disco_HD","request":"https://o.tavrmedia.ua/melodiad","name":"Melodia FM Disco"}'>Melodia FM Disco</option>
        <option value='{"src":"https://online.melodiafm.ua/MelodiaFM_Romantic_HD","request":"https://o.tavrmedia.ua/melodiar","name":"Melodia FM Romantic"}'>Melodia FM Romantic</option>
        <option value='{"src":"https://online.radioplayer.ua/FlashRadio_HD","request":"https://o.tavrmedia.ua/radio3flash","name":"Flash Radio"}'>Flash Radio</option>       
    </select>     
    <audio id="audio" controls="true" preload="none" src=""  ></audio>
   <article class="playlist_wrapper" id="playlist_wrapper">
    <div id="playlist_title_container">
        <h3 class="playlist_title">TAVR is playing now</h3>
    </div>
    <ul class="playlist current"></ul>
</article>

<article class="playlist_wrapper" id="playlist_wrapper">
    <div id="previous_playlist_title_container">
        <h3 class="playlist_title">Was playing previously</h3>
    </div>
    <ul class="playlist previous"></ul>
</article> </div>
        </div>
       </div>
</div>
</body>
<script src="script.js"></script>
</html>
