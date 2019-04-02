var $ = (id)=>document.querySelector(id);
var audioContext = new AudioContext();
var workerFactory;
audioContext.createAudioWorker("vocalcanseler.js").then(function(factory) {
  workerFactory = factory;
});

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
    readFile(file)
    .then((data)=>decodeAudioData(audioContext, data))
    .then((buffer)=>{
      var source = audioContext.createBufferSource(); // creates a sound source
      var workerNode = workerFactory.createNode(2, 2);

      source.buffer = buffer;                    // tell the source which sound to play
      source.connect(workerNode);
      workerNode.connect(audioContext.destination);
      source.start(0);                           // play the source now
    });
  });
});
