var ChessLayout = BlazeToReact("layout")

FlowRouter.route("/", {
  action: function () {
    ReactLayout.render(ChessLayout)
  }
})
