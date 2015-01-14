import Ember from 'ember';

export default  Ember.Mixin.create({
  init: function(){
    this._super();
    Ember.run.next(function(){
      this.errExec();
    }.bind(this));
  },
  errExec: function(){
    var controller = this.get('controller')
      , errors = controller.get('content.errors')
      , errorsKeys = Ember.keys(errors);

    errorsKeys.forEach(function(property){
      Ember.addObserver(errors, property, this, function(){
        var errorsSerialized = errors && (typeof errors.serialize) === 'function' ? errors.serialize() : errors;
        var errLength = _.size(errorsSerialized);

        if(errorsKeys.length !== errLength){
          this.errExec();
          return false;
        }

        _.each(errorsSerialized, function(v, k){
          if(v.length > 0 && this.get('isValidating'))
            this.$('#'+k).addClass('required');
          else
            this.$('#'+k).removeClass('required');
        }.bind(this));
      }, this);
    }.bind(this));
  },
  willDestroy: function() {
    this._super();
    var controller = this.get('controller')
      , errors = controller.get('errors')
      , errorsSerialized = errors && (typeof errors.serialize) === 'function' ? errors.serialize() : errors
      , errorsKeys = _.keys(errorsSerialized);

    errorsKeys.forEach(function(property){
      Ember.removeObserver(errors, property, errors);
    }, this);
  }
});
