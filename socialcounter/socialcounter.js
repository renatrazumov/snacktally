App = Em.Application.create();

App.ApplicationController = Em.Controller.extend({
  content: Em.Object.create({
    likes: 100, tweets: 300, pins: 0
  })
});

App.NumberCounterComponent = Em.Component.extend({
  classNames: 'number-counter',
  count: 0,
  
  getData: function(item){  
    // you can replace getting data from server
    setInterval(function() {
      this.set(item, this.get(item)+10);
    }.bind(this), this.get('duration')*20);
  },
  
  addCounter: function(item){
    // observe the content's item to increase number
    this.addObserver(item, function(){
      var counter = setInterval(function(){
        var oldCount = this.get('count'), 
            newCount = this.get(item);

        if (oldCount<newCount){
          this.incrementProperty('count', 1);
          return;
        }

        clearInterval(counter); 
      }.bind(this), this.get('duration'));
    });  
  },

  startCounter: function() {
    var item = 'content.'+this.get('item');
    
    this.set('count', this.get(item));
    this.getData(item);
    this.addCounter(item);
  }.on('didInsertElement')
});