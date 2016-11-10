import express from 'express';

const app = express();

app.get('/', (req, res) => {
  var fullname = req.query.fullname.toLowerCase();

  fullname = fullname.trim();
  console.log(fullname);
  //Check if normal
  if(!fullname)
    return res.send('Invalid fullname');
  const re = new RegExp('[0-9_/$&+,:;=?@#|<>.^*()%!-]');
  const match = fullname.search(re);
  while (searchspaces(fullname) != -1) {
    fullname = fullname.replace(/\s\s/g, ' ');
  }
  console.log(fullname);
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
    var sub = response.substr(0,1);
    response = sub.toUpperCase() + response.substr(1);
    var father;
    var name;
    if (arr.length - 2 >= 0) {
      father = arr[arr.length - 2];
      father = father.toUpperCase();
  }else{
    father = '';
  }

  if (arr.length - 3 >= 0) {
    name = arr[arr.length - 3];
    name = name.toUpperCase();
}else{
  name = '';
}
if (name)
  response = response + ' ' + name[0].toUpperCase() + '.';
if (father)
  response = response + ' ' + father[0].toUpperCase() + '.';
res.send(response);
}

});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

function searchspaces(str){
  const re = new RegExp('(  )');
  console.log(str.search(re));
  return str.search(re);
}
