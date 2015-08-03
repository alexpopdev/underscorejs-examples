 System.transpiler = 'babel';
 System.import('es6/example').then(function(example) {
   $("#output").html(example.getExampleOutput());
 });