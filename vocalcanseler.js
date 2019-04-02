// Custom parameter - number of bits to crush down to - default 8
this.addParameter("fade", 1);

onnodecreate = function(e) {
  e.node.phaser = 0;
  e.node.lastDataValue = 0;
};

onaudioprocess = function(e) {
  for (var i = 0; i < e.inputs[0][0].length; i++) {
    var mono = (e.inputs[0][0][i]+e.inputs[0][1][i])*0.5;
    var vocal = (e.inputs[0][0][i]-e.inputs[0][1][i])/0.2;
    e.outputs[0][0][i] = vocal;
    e.outputs[0][1][i] = mono-vocal;
  }
};
