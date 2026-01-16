var http = require('http');    
var fs = require('fs'); 

http.createServer(function (req, res) {        

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});  
    var url = req.url; 

    // OLDAL1 – ŰRLAP
    if (url === '/oldal1') {  
        fs.readFile('oldal1.html', 'utf8', function (err, data) {  
            res.end(data); 
        });                 
    }  

    // OLDAL2 – POST feldolgozás
    if (url === '/oldal2') {  

        if (req.method === 'POST') { 
            req.on('data', function (data) { 

                data = data.toString().replaceAll("+", " ").split("&");

                data0 = data[0].split("=");
                data1 = data[1].split("=");
                data2 = data[2].split("=");

                var nev = data0[1];
                var cim = data1[1];
                var eletkor = parseInt(data2[1]);

                res.write("Név: " + nev + "<br>");
                res.write("Cím: " + cim + "<br>");
                res.write("Életkor: " + eletkor + "<br>");

                if (eletkor < 18) {
                    res.write("kiskorú");
                } else {
                    res.write("nagykorú");
                }

                res.end();
            });
        }
    }

}).listen(4000, function () {  
    console.log("server started at port 4000");  
});
