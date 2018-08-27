var sys = require('sys');
    http = require('http');
    url = require('url');

function notFound(res) {
    res.writeHead(404, 'text/plain');
    res.end('404: file not found');
}

http.createServer((b_req, b_res) => {
    var b_url = url.parse(b_req.url, true);
    if (!b_url.query || !b_url.query.url) {
        return notFound(b_res);
    }

    // read and parse the url parameter (/? url=p_url)
    var p_url = url.parse(b_url.query.url);

    // Initialize Http Client
    var p_client = http.createClient(p_url.port || 80, p_url.hostname);

    // Send Request 
    var p_req = p_client.request('GET', p_url.pathname || "/",{
        host: p_url.hostname
    })
    p_req.end();

    // Listen for the response
    p_req.addListener('response', function(p_res){
        // Pass through headers
        b_res.writeHead(p_res.statusCode, p_res.headers);
        // Pass through data
        p_res.addListener('data', function(chunk){
            b_res.write(chunk);
        })
        // End Request
        p_res.addListener('end', function() {
            b_res.end();
        })
    })
}).listen(3000, '127.0.0.1');

// sys.puts('hello word')