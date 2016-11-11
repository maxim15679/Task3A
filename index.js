import fetch from 'node-fetch';
import express from 'express';
import S from 'express-statuses';

const app = express();

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
    console.log(pc);
  })
.catch(err => {
  console.log('Чтото пошло не так:', err);
});

app.get('/', (req, res) => {
  res.json(pc);
});

app.get('/volumes', (req, res) => {
  const hdd = pc.hdd;
  var volumes = {};
  hdd.forEach((item) => {
    if (volumes[item.volume]) {
      volumes[item.volume] = volumes[item.volume] + parseInt(item.size, 10);
    } else {
      volumes[item.volume] = parseInt(item.size, 10);
    }
  });
  var names = Object.getOwnPropertyNames(volumes).forEach((val) => {
    volumes[val] = volumes[val] + 'B';
  });
  res.send(volumes);
});

app.get('/:level1?/:level2?/:level3?/:level4?', (req, res, next) => {
  //  res.send(req.params);
  var result = pc[req.params.level1];
  if (!result && result !== null && result !== 0 && result !== '') {
    console.log('404');
    res.status(404)        // HTTP status 404: NotFound
        .send('Not found');
  }
  if (req.params.level2) {
    if (!result[req.params.level2]) {
      console.log('404');
      res.status(404)        // HTTP status 404: NotFound
          .send('Not found');
    }
    result = result[req.params.level2];
  }
  if (req.params.level3) {
    if (!result[req.params.level3]) {
      console.log('404');
      res.status(404)        // HTTP status 404: NotFound
          .send('Not found');
    }
    result = result[req.params.level3];
  }
  if (req.params.level4) {
    if (!result[req.params.level4]) {
      console.log('404');
      res.status(404)        // HTTP status 404: NotFound
          .send('Not found');
    }
    result = result[req.params.level4];
  }
  res.send(JSON.stringify(result));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
