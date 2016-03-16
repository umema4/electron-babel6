'use strict';
import $ from 'jquery';

class Sample {
  constructor() {
    $('#open-button-js').click(() => {
      $('#myModal2').modal('show');
    });
  }

  hoge(str) {
    console.log(str);
  }
}
module.exports = Sample;
