module.exports = function(app,pool){
  app.get('/padscores/content',function(req,res){
    var session = req.session;

    if(session.userkey){
      pool.getConnection(function(err,connection){
        //check what kind of member
        var query = "SELECT `department`, `org_class` FROM `accounts` WHERE username="+connection.escape(session.userkey);

        connection.query(query,function(err,department){
          if(department[0]["department"] == "Senior Projects and Activities" && department[0]["org_class"] == "Active"){
            res.redirect('/spadscores/content');
          }
          else if(department[0]["department"] == "Junior Projects and Activities" && department[0]["org_class"] == "Active"){
            res.redirect('/jpadscores/content');
          }
          else{
            res.render('forbidden');
          }
        });

        connection.release();
      });
    }
    else{
      res.redirect('/');
    }
  });
}
