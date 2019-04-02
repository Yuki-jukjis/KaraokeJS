var $ = (id)=>document.querySelector(id);
var context;

window.addEventListener('load', ()=>{
  $("#file").addEventListener('change', (e)=>{
    var file = e.target.files[0]; // FileList object
    if (!file.type.match('audio.*'))
      return;
    var reader = new FileReader();
    reader.onload = (e) => {
      context = new AudioContext();
      context.decodeAudioData(e.target.result, function(buffer) {
        var source = context.createBufferSource(); // creates a sound source
        source.buffer = buffer;                    // tell the source which sound to play
        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);                           // play the source now
      });
    };
    reader.readAsArrayBuffer(file);
  });
});
