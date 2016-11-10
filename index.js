import express from 'express';

const app = express();

app.get('/', (req, res) => {
  var fullname = req.query.fullname;
  fullname = fullname.trim();
  //Check if normal
  if(!fullname)
    return res.send('Invalid fullname');
  const re = new RegExp('[0-9_/$&+,:;=?@#|\'<>.^*()%!-]');
  const match = fullname.search(re);
  //console.log(match);
  if(match != -1){
    return res.send('Invalid fullname');
    console.log('IF');
  }
  const arr = fullname.split(' ');
  if (arr.length > 3 ) {
    res.send('Invalid fullname');
    console.log('IF');
  } else {
    var response = arr[arr.length - 1];
    var father;
    var name;
    if (arr.length - 2 >= 0) {
      father = arr[arr.length - 2];
  }else{
    father = '';
  }

  if (arr.length - 3 >= 0) {
    name = arr[arr.length - 3];
}else{
  name = '';
}
if (name)
  response = response + ' ' + name[0] + '.';
if (father)
  response = response + ' ' + father[0] + '.';
res.send(response);
}

});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
