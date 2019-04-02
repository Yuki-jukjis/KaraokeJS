var $ = (id)=>document.querySelector(id);
var audioContext;

function readFile(file) {
  return new Promise((resolve, reject)=>{
    var fileReader = new FileReader();
    fileReader.onload = (e)=>resolve(e.target.result);
    fileReader.onerror = (e)=>reject(e);
    fileReader.readAsArrayBuffer(file);
  });
}
function decodeAudioData(audioContext, audioData) {
  return new Promise((resolve, reject)=>{
    audioContext.decodeAudioData(audioData, resolve, reject);
  });
}

window.addEventListener('load', ()=>{
  $("#play").addEventListener('click', (e)=>{
    var file = $("#file").files[0]; // FileList object
    if (!file.type.match('audio.*'))
      return;
    audioContext = new AudioContext();
    readFile(file)
    .then((audioData)=>decodeAudioData(audioContext, audioData))
    .then((buffer)=>{
      var source = audioContext.createBufferSource(); // creates a sound source
      source.buffer = buffer;                    // tell the source which sound to play
      source.connect(audioContext.destination);       // connect the source to the context's destination (the speakers)
      source.start(0);                           // play the source now
    });
  });
});
