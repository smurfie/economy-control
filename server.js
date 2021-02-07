const express = require('express');

const app = express();

app.use(express.static('./dist/economy-control'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/economy-control/'});
});

app.listen(process.env.PORT || 8080);
