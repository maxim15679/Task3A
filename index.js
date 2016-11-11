import fetch from 'node-fetch';
import express from 'express';

const app = express();
// Get PC model
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
// Done
// Routes
app.get('/', (req, res) => {
  res.json(pc);
});

app.get('/volumes', (req, res) => {
  const hdd = pc.hdd;
  var volumes = {};
  // Calculate volumes
  hdd.forEach((item) => {
    if (volumes[item.volume]) {
      volumes[item.volume] = volumes[item.volume] + parseInt(item.size, 10);
    } else {
      volumes[item.volume] = parseInt(item.size, 10);
    }
  });
  // Add 'B' to end
  var names = Object.getOwnPropertyNames(volumes).forEach((val) => {
    volumes[val] = volumes[val] + 'B';
  });
  res.send(volumes);
});
// API: 4levels
app.get('/:level1?/:level2?/:level3?/:level4?', (req, res, next) => {
  //  res.send(req.params); 1st level
  var result = pc[req.params.level1];
  if (!result && result !== null && result !== 0 && result !== '') {
    console.log('404');
    res.status(404)        // HTTP status 404: NotFound
        .send('Not found');
  }
  // 2nd level
  if (req.params.level2) {
    if (!result[req.params.level2]) {
      console.log('404');
      res.status(404)        // HTTP status 404: NotFound
          .send('Not found');
    }
    result = result[req.params.level2];
  }
  // 3rd level
  if (req.params.level3) {
    if (!result[req.params.level3]) {
      console.log('404');
      res.status(404)        // HTTP status 404: NotFound
          .send('Not found');
    }
    result = result[req.params.level3];
  }
  // 4th level
  if (req.params.level4) {
    if (!result[req.params.level4]) {
      console.log('404');
      res.status(404)        // HTTP status 404: NotFound
          .send('Not found');
    }
    result = result[req.params.level4];
  }
  // Send data
  res.send(JSON.stringify(result));
});
// Listen port 3000
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
