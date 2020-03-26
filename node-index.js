const http = require('http');
const urllib = require('url');
const get_ip = require('ipware')().get_ip;

const port = 10011;
var data = ['夏明', '龙王'];

http.createServer(function(req, res){
  const params = urllib.parse(req.url, true);
  // console.log(params);
  // console.log(req.headers);
  console.log(req.connection.remoteAddress);
  console.log(get_ip(req));
  // console.log(req.headers.host);
  if (params.query && params.query.callback) {
    console.log(params.query);
    //console.log(params.query.callback);
    const str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
    res.end(str);
  } else {
    res.end(JSON.stringify(data));//普通的json
  }
}).listen(port, '0.0.0.0', function(){
  console.log('server is listening on port ' + port);
});