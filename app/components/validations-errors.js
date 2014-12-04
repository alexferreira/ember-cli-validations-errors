import Ember from 'ember';


function hasErrors(validationErrors){
  return validationErrors.any(function(item){
    return item.errors.length > 0;
  });
}

export default Ember.Component.extend({
  classNames: ['error-messages'],
  validationsErrorsChanged: function(){
    if(hasErrors(this.get('validationErrors'))) {
      this.$().fadeIn('fast');
    } else {
      this.$().fadeOut('fast');
    }
  }.observes('validationErrors.length')
});
