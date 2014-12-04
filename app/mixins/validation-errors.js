import Ember from 'ember';

export var ValidationErrorsController = Ember.Mixin.create({
  validationErrors: Ember.A(),
  init: function(){
    this._super();
    Ember.run.next(function(){
      var errors = this.get('content.errors')
        , errorsKeys = Ember.keys(errors);

      errorsKeys.forEach(function(property){
        Ember.addObserver(errors, property, this, function(){
          var errorsSerialized = errors !== null && (typeof errors.serialize) === 'function' ? errors.serialize() : errors;
          var errLength = _.size(errorsSerialized);

          if(errorsKeys.length !== errLength){
            this.errExec();
            return false;
          }

          var arr = _.map(errorsSerialized, function(v, k){
            return Ember.Object.create({key: k, errors: v});
          });

          this.set('validationErrors', arr);
        }, this);
      }.bind(this));
    }.bind(this));
  }
});

export var ValidationErrorsView = Ember.Mixin.create({
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
        var errorsSerialized = errors !== null && (typeof errors.serialize) === 'function' ? errors.serialize() : errors;
        var errLength = _.size(errorsSerialized);

        if(errorsKeys.length !== errLength){
          this.errExec();
          return false;
        }

        _.each(errorsSerialized, function(v, k){
          if(v.length > 0 && this.get('isValidating'))
            this.$('[id="'+k+'"]').addClass('required');
          else
            this.$('[id="'+k+'"]').removeClass('required');
        }.bind(this));
      }, this);
    }.bind(this));
  },
  willDestroy: function() {
    this._super();
    var controller = this.get('controller')
      , errors = controller.get('errors')
      , errorsSerialized = this.get('errors').serialize()
      , errorsKeys = _.keys(errorsSerialized);

    errorsKeys.forEach(function(property){
      Ember.removeObserver(errors, property, errors);
    }, this);
  }
});

