'use strict';
import $ from 'jquery';

class Sample {
  constructor() {
    $('#open-button').click(() => {
      $('#myModal').modal('show');
    });
  }

  hoge(str) {
    console.log(str);
  }
}
module.exports = Sample;
