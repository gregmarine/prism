'use strict';

describe('Controller: CuesCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var CuesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CuesCtrl = $controller('CuesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CuesCtrl.awesomeThings.length).toBe(3);
  });
});
