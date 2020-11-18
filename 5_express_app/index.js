import express from 'express';
const app = express();
const port = 3000;
import stringxer from 'stringxer';

// First example
// const pug = require('pug');
// const compiledFunction = pug.compileFile('template.pug');
// console.log(compiledFunction({
//   message: 'sample message'
// }));

// Second example just set it up
app.set('view engine', 'pug');

const handleRequest = (req, res) => {
  // return res.send('testing')
  return res.render('index', { message: stringxer('hello')})
}

app.get('/', handleRequest);

app.listen(port, () => console.log(`app listening on port ${port}`))