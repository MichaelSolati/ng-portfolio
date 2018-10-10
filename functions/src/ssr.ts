/* tslint:disable */
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
/* tslint:enable */
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as fs from 'fs';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./app/main');

const engine = ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
});

const document: string = fs.readFileSync(__dirname + '/app/index.html', 'utf8').toString();

const app = express();
app.get('**', (req, res) => {
  const url: string = req.path;
  engine(url, {
    req,
    res,
    url,
    document,
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }, (err?: Error, html: string = 'oops') => {
    res.set('Cache-Control', 'public, max-age=3600, s-maxage=43200');
    res.send((err) ? err.message : html);
  });
});

export const ssr = functions.https.onRequest(app);
