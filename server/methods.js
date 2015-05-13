Meteor.methods({
  reset: function () {
    if(!this.userId) return;
    MovesCollection.remove({from: {$ne: null}});
  }
});
