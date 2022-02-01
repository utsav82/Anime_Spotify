function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  
/*Initializing the variables for song play*/
let songIndex = 0;
const player = document.getElementsByClassName('player');
const play_btn = document.getElementById('play-p-btn');
const play_btn_path = document.getElementById('play-btn-path');
const seekBar = document.getElementsByClassName('progress-bar');
const seekSlider = document.getElementById('i-progress-bar');
const volumeSlider = document.getElementById('i-vol-rocker');
const mute_umute_btn = document.getElementById('mute-unmute');
const mute_unmut_btn_path = document.getElementById('mute-unmute-btn-path');
const duration = document.getElementById('duration');
const time_elapsed = document.getElementById('time-elapsed');
const vol_percent = document.getElementById('vol-percent');

const audioElement = new Audio('songs/5.mp3');

let playState = 'play';
let muteState = 'unmute';
// set volume max
volumeSlider.style.setProperty('--vol-level',100+"%");
volumeSlider.value = 100;
audioElement.volume = 100/500;

// calculating time
function calcTime(secs){
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
} 

// while playing the song
function onPlaying(){
  console.log("onPlaying was called")
  seekSlider.value = Math.floor(audioElement.currentTime);
  time_elapsed.textContent = calcTime(seekSlider.value);
  let val = (seekSlider.value/seekSlider.max)*100;
  seekSlider.style.setProperty('--seek-before-width',val+"%");
}

function showAudioProgress(){
  let val = (seekSlider.value/seekSlider.max)*100;
  seekSlider.style.setProperty('--seek-before-width',val+"%");
}

function showVolumeLevel(){
  let val = (volumeSlider.value/volumeSlider.max)*100;
  volumeSlider.style.setProperty('--vol-level',val+"%");
}

function showDuration(){
  duration.textContent = calcTime(audioElement.duration);
}

// changed max value to current audio duration
function setSliderMax(){
  seekSlider.max = Math.floor(audioElement.duration);
}

function showBufferedAmt(){
  console.log(audioElement.buffered.end(0));
  const bufferedAmt = Math.floor(audioElement.buffered.end(0));
  let val = (bufferedAmt/seekSlider.max)*100;
  seekSlider.style.setProperty('--buffered-width',val+'%');
}

// loading data and while playing...
audioElement.addEventListener('loadeddata',function (){
  audioElement.addEventListener('timeupdate', () =>{
    showDuration();
    setSliderMax();
    showBufferedAmt();
    onPlaying();
  });
});

// playing audio
play_btn.addEventListener('click', function (){
  if(playState == 'play'){
    audioElement.play();
    play_btn_path.setAttribute('d',"M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z");
    document.getElementById('play-p-btn').style.right = "-5px";
    onPlaying();
    playState = 'pause';
  }
  else{
    audioElement.pause();
    play_btn_path.setAttribute('d',"M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z");
    document.getElementById('play-p-btn').style.right = "0px";
    playState = 'play';
  }
  console.log(playState);
});

// mute-unmute button
mute_umute_btn.addEventListener('click',function (){
  if(muteState == 'unmute'){
    audioElement.muted = true;
    mute_unmut_btn_path.setAttribute('d',"M301.2 34.85c-11.5-5.188-25.02-3.122-34.44 5.253L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9c5.984 5.312 13.58 8.094 21.26 8.094c4.438 0 8.972-.9375 13.17-2.844c11.5-5.156 18.82-16.56 18.82-29.16V64C319.1 51.41 312.7 40 301.2 34.85zM513.9 255.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L480 222.1L432.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03l-47.03 47.03c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L480 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94L513.9 255.1z");
    muteState = 'mute';
  }
  else{
    audioElement.muted = false;
    mute_unmut_btn_path.setAttribute('d',"M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z");
    muteState = 'unmute';
  }
});

// seeking in seekSlider
audioElement.addEventListener('progress',showBufferedAmt);

seekSlider.addEventListener('input', function (e){
  showAudioProgress(e.target);
  time_elapsed.textContent = calcTime(seekSlider.value);
  if(!audioElement.paused){
    // onPlaying();
    /*
      something missing
    */
  }
});

seekSlider.addEventListener('change', function (){
  audioElement.currentTime = seekSlider.value;
  if(!audioElement.paused){
    onPlaying();
  }
});

// volume controls
volumeSlider.addEventListener('input', function (e){
  const value = e.target.value;
  console.log(value)
  showVolumeLevel(e.target);
  if(value>50){
    mute_unmut_btn_path.setAttribute('d',"M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z");
  }
  if(value<=50){
    mute_unmut_btn_path.setAttribute('d',"M412.6 181.9c-10.28-8.344-25.41-6.875-33.75 3.406c-8.406 10.25-6.906 25.37 3.375 33.78C393.5 228.4 400 241.8 400 256c0 14.19-6.5 27.62-17.81 36.87c-10.28 8.406-11.78 23.53-3.375 33.78c4.719 5.812 11.62 8.812 18.56 8.812c5.344 0 10.75-1.781 15.19-5.406C435.1 311.6 448 284.7 448 256S435.1 200.4 412.6 181.9zM301.2 34.84c-11.5-5.187-25.01-3.116-34.43 5.259L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9C272.7 477.2 280.3 480 288 480c4.438 0 8.959-.9313 13.16-2.837C312.7 472 320 460.6 320 448V64C320 51.41 312.7 39.1 301.2 34.84z");    
  }  
  if(value==0){  
        
    mute_unmut_btn_path.setAttribute('d',"M301.2 34.85c-11.5-5.188-25.02-3.122-34.44 5.253L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9c5.984 5.312 13.58 8.094 21.26 8.094c4.438 0 8.972-.9375 13.17-2.844c11.5-5.156 18.82-16.56 18.82-29.16V64C319.1 51.41 312.7 40 301.2 34.85zM513.9 255.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L480 222.1L432.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03l-47.03 47.03c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L480 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94L513.9 255.1z");
  }
  vol_percent.textContent = value;
  audioElement.volume = value/500;
})



// fuction for shuffle and loop
let tmp1 = "on";
document.getElementById("act_shuff").addEventListener('click', function (){
  console.log(tmp1);
  if(tmp1 == "on"){
    document.getElementById("act_shuff").style.color = "#d90fff";
    tmp1 = "off";
  }
  else{
    document.getElementById("act_shuff").style.color = "#bebebe";
    tmp1 = "on";
  }
});

let tmp2 = "on";
document.getElementById("act_loop").addEventListener('click', function (){
  console.log(tmp2);
  if(tmp2 == "on"){
    document.getElementById("act_loop").style.color = "#d90fff";
    tmp2 = "off";
  }
  else{
    document.getElementById("act_loop").style.color = "#bebebe";
    tmp2 = "on";
  }
});
