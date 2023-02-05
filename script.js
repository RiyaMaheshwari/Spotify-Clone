console.log("Welcome to Spotify");
// initialize the variables
let songIndex = 0;
let audioElement = new Audio('Song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Kho Gaye", filePath:"Song/1.mp3", coverPath: "coverPage/Kho GayeCover.jfif"},
    {songName: "Kaun Tujhe", filePath:"Song/2.mp3", coverPath: "coverPage/Kaun Tujhe Cover.jfif"},
    {songName: "Baarishein", filePath:"Song/3.mp3", coverPath: "coverPage/BaarisheinCover.jfif"},
    {songName: "Apna Bna Le", filePath:"Song/4.mp3", coverPath: "coverPage/Apna Bna LE.jfif"},
    {songName: "Jab Tak", filePath:"Song/5.mp3", coverPath: "coverPage/jbTakSongCover.jfif"},
    {songName: "Little Bit More", filePath:"Song/6.mp3", coverPath: "coverPage/Little Bit More Cover.jfif"},
    {songName: "Perfect", filePath:"Song/7.mp3", coverPath: "coverPage/PerfectCover.jfif"},
    {songName: "Tune Jo Na Kha", filePath:"Song/8.mp3", coverPath: "coverPage/Tune jo na kha.jfif"},
    {songName: "Vaaste", filePath:"Song/9.mp3", coverPath: "coverPage/VaasteCover.jfif"},
    {songName: "Jaan Nisaar", filePath:"Song/10.mp3", coverPath: "coverPage/JaanNisaarCover.jfif"},
]

songItems.forEach((element, i) => {
    //console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// handle play pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
// //Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //console.log('timeupdate');

    //update seeker
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        //console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        //audioElement.src = `Song/Baarishein.mp3`;
        audioElement.src = `Song/${songIndex+1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>9){
        songIndex=0;
    }else{
        songIndex += 1;
    }
    audioElement.src = `Song/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `Song/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})