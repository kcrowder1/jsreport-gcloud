const JsReport = require('jsreport');
const path = require('path');

let jsreport;
const init = (async () => {
  console.log('creating jsreport');
  jsreport = JsReport({
    configFile: path.join(__dirname, 'prod.config.json'),
  });

  return jsreport.init();
})();

exports.jsreport = async (req, res) => {
  try {
    await init;

    const r = await jsreport.render({
      template: {
        content: req.body.html,
        engine: 'handlebars',
        recipe: 'chrome-pdf',
      },
    });

    res.status(200).send(r.content.toString('base64'));
  } catch (e) {
    res.status(400).send(e.toString() + e.stack);
  }
};
