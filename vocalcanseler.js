// Custom parameter - number of bits to crush down to - default 8
this.addParameter("fade", 1);

onnodecreate = function(e) {
  e.node.phaser = 0;
  e.node.lastDataValue = 0;
};

onaudioprocess = function(e) {
  e.outputs[0][0] = e.inputs[0][0] - e.inputs[0][1];
  e.outputs[0][1] = e.inputs[0][0] + e.inputs[0][1];
};
