/* jshint strict: true */
'use strict';

// init sourcemaps
import { install } from 'source-map-support';
install();

//basic server dependencies
import express    from 'express';
import bodyParser from 'body-parser';
import morgan     from 'morgan';
import helmet     from 'helmet';
import _          from 'underscore';



//express config
export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }) );

//logging with morgan
app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}));

//security
app.use(helmet());
app.disable('x-powered-by');


app.post('/light', function (req, res){
  
});


app.get('/light', function (req, res) {

})


//404 middleware if nothing else matches
app.use(function (req, res) {
  return res.status(404).json({ "error": { type: 404 } });
});



const runPort = process.env.RUN_PORT || 8100;
  //start the server whether there's an error or not
app.listen(runPort);
console.log(`Listening on port ${runPort}`);
