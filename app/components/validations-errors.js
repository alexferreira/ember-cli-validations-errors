import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['error-messages'],
  didInsertElement: function () {
    this._super();
    Ember.run.next(function(){
      var errors = this.get('validationErrors')
        , errorsKeys = Ember.keys(errors);

      errorsKeys.forEach(function(property){
        Ember.addObserver(errors, property, this, function(){
          this.validationsErrorsChanged(property);
        }, this);
      }.bind(this));
    }.bind(this));
  },
  validationsErrorsChanged: function(key){
    if(this.setList(key)) {
      this.$().fadeIn('fast');
    } else {
      this.$().fadeOut('fast');
    }
  },
  setList: function (key){
    var validationErrors = this.get('validationErrors');
    var errList = this.get('errList');
    if (!Ember.isArray(errList)){
      errList = [];
      this.set('errList', errList);
    }
    var error = errList.findBy('key', key);
    if (error){
      error.set('errors', validationErrors.get(key));
    }
    else{
      errList.addObject(Ember.Object.create({key:key, errors: validationErrors.get(key)}));
    }
    return errList.any(function (error){
      return error.get('errors').length > 0;
    });
  }
});
