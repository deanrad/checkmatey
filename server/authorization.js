MovesCollection.allow({
  insert: function () { return true; },
  remove: function (userId) { return !!userId; }
});
