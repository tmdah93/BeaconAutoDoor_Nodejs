var mysql = require('mysql');
var conn = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'mfics',
     database: 'mfics3'
});

var url = require('url');

module.exports = function(app, fs) {
     /* Verify UUID */
     app.get('/verify', function(req, res) {
          var requrl = req.url;
          var qry = url.parse(requrl, true).query;
          console.log(qry.uuid);
          conn.query("select uuid from user where uuid = '" + qry.uuid + "'", function(err, rows, fields) {
               if (err) { // err처리를 해줘야함
                    console.log("Failed DB request");
               }
               else {
                    if (rows[0] == null) {
                         console.log("No such uuid");
                         res.send("false");
                    }
                    else {
                         console.log("Verified");
                         res.send("true");
                    }
               }
          });
          requrl = "";
          qry = "";
     });

     /* Add User */
     app.get('/addUser', function(req, res) {
          var requrl = req.url;
          var qry = url.parse(requrl, true).query;
          conn.query("select * from house_info where (house_num=" + qry.housenum + " AND passwd='" + qry.passwd + "')", function(err, rows, fields) {
               if (err) {
                    console.log("failed insert");
               }
               else {
                    if (rows[0] == null) {
                         console.log("No such house_num or invalid passwd");
                         res.send("invalid");
                    }
                    else {
                         conn.query("insert into user values ('" + qry.uuid + "', " + qry.housenum + "," + qry.whereis + ")", function(err, rows, fields) {
                              if (err) {
                                   console.log("tryagain");
                                   res.send(err);
                              }
                              else {
                                   res.send("true");
                              }
                         });
                    }
               }
          });

     });
     /* Modify User's Location info */
     app.get('/modifyWhereis', function(req, res){
          var qry = url.parse(req.url, true).query;
          conn.query("update user set whereis="+qry.whereis+" where uuid='"+qry.uuid+"'", function(err, rows, fields){
             if(err){
                  console.log(err);
                  res.send(err);
             }else{
                  res.send("true");
             }
          });
     });
     app.get('/', function(req, res) {
          res.send("Hello world");
          console.log("log hello");
     });
};
