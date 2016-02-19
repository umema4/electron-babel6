'use strict';

import Sample from './utils/sample';

const sample = new Sample();
const hoge = 'hogehoge';
const x = {
  num: 0,
};

sample.hoge(`${hoge}${x.num}`);
