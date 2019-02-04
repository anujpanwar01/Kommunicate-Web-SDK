const path = require("path");
const fs = require('fs');
const config = require("../../conf/config");

exports.getPlugin = (req, res) => {
  //var MCK_CONTEXTPATH =req.protocol+"://"+req.headers.host;
  const MCK_CONTEXTPATH = config.getProperties().urls.hostUrl;
  const MCK_STATICPATH = MCK_CONTEXTPATH + "/plugin";
  const PLUGIN_SETTING = config.getProperties().pluginProperties;
  const MCK_ENVIRONMENT = config.getEnvId();
  const MCK_THIRD_PARTY_INTEGRATION = config.getProperties().thirdPartyIntegration;
  const MCK_PLUGIN_VERSION = req.query.version || "v1";
  PLUGIN_SETTING.kommunicateApiUrl = PLUGIN_SETTING.kommunicateApiUrl || MCK_CONTEXTPATH;
  PLUGIN_SETTING.applozicBaseUrl = PLUGIN_SETTING.applozicBaseUrl || config.getProperties().urls.baseUrl;

  console.log("setting context and static path", MCK_CONTEXTPATH);
  fs.readFile(path.join(__dirname, "/plugin.js"), 'utf8', function (err, data) {
    if (err) {
      res.send("err while getting plugin...");
      return console.log(err);
    }
    var plugin = data.replace(":MCK_CONTEXTPATH", MCK_CONTEXTPATH)
      .replace(":MCK_THIRD_PARTY_INTEGRATION", JSON.stringify(MCK_THIRD_PARTY_INTEGRATION))
      .replace(":MCK_STATICPATH", MCK_STATICPATH).replace(":PRODUCT_ID", "kommunicate")
      .replace(":MCK_PLUGIN_VERSION", MCK_PLUGIN_VERSION).replace(":PLUGIN_SETTINGS", JSON.stringify(PLUGIN_SETTING))
      .replace(":MCK_STATICPATH", MCK_STATICPATH).replace(":PRODUCT_ID", "kommunicate");

    res.setHeader('content-type', 'application/javascript');
    res.send(plugin);
    console.log("plugin code sent successfully");
  });
}

exports.iframePlugin = (req, res) => {

  const MCK_CONTEXTPATH = config.getProperties().urls.hostUrl;
  fs.readFile(path.join(__dirname, "/kommunicateIframe.js"), 'utf8', function (err, data) {
    if (err) {
      res.send("err while getting plugin...");
      return console.log(err);
    }
    var plugin = data.replace(":MCK_CONTEXTPATH", MCK_CONTEXTPATH);
    res.setHeader('content-type', 'application/javascript');
    res.send(plugin);
  });
}
