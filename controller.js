const path = require("path");
const fs=require('fs');
const config = require("../../conf/config");
exports.getPlugin =(req,res)=>{
  //var MCK_CONTEXTPATH =req.protocol+"://"+req.headers.host;
  const MCK_CONTEXTPATH = config.getProperties().urls.hostUrl;
  const MCK_STATICPATH = MCK_CONTEXTPATH+"/plugin";

  console.log("setting context and static path",MCK_CONTEXTPATH);
  fs.readFile(path.join(__dirname,"/plugin.js"), 'utf8', function (err,data) {
  if (err) {
    res.send("err while getting plugin...");
    return console.log(err);
  }
  var plugin= data.replace(":MCK_CONTEXTPATH",MCK_CONTEXTPATH).replace(":MCK_STATICPATH",MCK_STATICPATH).replace(":PRODUCT_ID","kommunicate");
  res.setHeader('content-type', 'application/javascript');
  res.send(plugin);
  console.log("plugin code sent successfully");
  });

}
