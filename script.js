function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  

// function for play - pause
let state = "play";
const play_btn = document.getElementById("play_btn_path");
play_btn.addEventListener('click', function (){
  if(state == "play")
{
  play_btn.setAttribute('d',"M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z");
  document.getElementById('play_p_btn').style.right = "-5px";
  state = "pause";
}
else{
  play_btn.setAttribute('d',"M176 480C148.6 480 128 457.6 128 432v-352c0-25.38 20.4-47.98 48.01-47.98c8.686 0 17.35 2.352 25.02 7.031l288 176C503.3 223.8 512 239.3 512 256s-8.703 32.23-22.97 40.95l-288 176C193.4 477.6 184.7 480 176 480z");
  document.getElementById('play_p_btn').style.right = "0px";
  state = "play";
}
console.log(state);
});

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
