import Ember from 'ember';
import ValidationErrorsMixin from 'ember-cli-validations-errors/mixins/validation-errors';

module('ValidationErrorsMixin');

// Replace this with your real tests.
test('it works', function() {
  var ValidationErrorsObject = Ember.Object.extend(ValidationErrorsMixin);
  var subject = ValidationErrorsObject.create();
  ok(subject);
});
