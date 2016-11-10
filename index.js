import express from 'express';

const app = express();

app.get('/', (req, res) => {
  let a = parseInt(req.query.a, 10);
  if (isNaN(req.query.a)) {
    a = 0;
  }
  let b = parseInt(req.query.b, 10);
  if (isNaN(req.query.b)) {
    b = 0;
  }
  const result = a + b;
  res.send(result.toString());
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
