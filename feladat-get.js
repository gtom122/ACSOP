
var http = require('http');
var fs = require('fs');
var mysql = require('mysql2');

http.createServer(function (req, res) {
  var url = req.url;

  if (url === '/oldal1') {
    fs.readFile('oldal1.html', 'utf8', function (err, data) {
      res.end(data);
    });
  }

  if (url === '/oldal2') {
    if (req.method === 'POST') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

      req.on('data', function (data) {
        // POST törzs feldarabolása, + -> szóköz
        data = data.toString().replaceAll("+"," ").split('&');
        var d0 = data[0].split("=");
        var d1 = data[1].split("=");
        var d2 = data[2].split("=");

        var nev = d0[1];
        var cim = d1[1];
        var kor = parseInt(d2[1]);

        // Kiírás
        res.write("Név: " + nev + "<br>");
        res.write("Cím: " + cim + "<br>");
        res.write("Eletkor: " + kor + "<br>");
        res.write((kor < 18 ? "kiskorú" : "nagykorú") + "<br>");

        // Mentés adatbázisba 
        var con = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'feladat1'
        });

        con.connect(function (err) {
          if (err) throw err;
          con.query('INSERT INTO ment(nev, cim, kor) VALUES(?,?,?)',
            [nev, cim, kor],
            function (err, result) {
              if (err) throw err;
              res.end('/oldal1Vissza az űrlapra</a>');
            });
        });
      });
    }
  }

}).listen(4000, function () {
  console.log("server start at port 4000");
});
``
