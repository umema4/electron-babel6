'use strict';

import Sample from './utils/sample';
import Style from '../css/style.css';
console.log(Style);


const sample = new Sample();
const hoge = 'hogehoge';
const x = {
  num: 0,
};

sample.hoge(`${hoge}${x.num}`);
