This little module is used to load knockout templates from the server.

It has dependencies on the require plugin text, knockout.js and the [stringTemplateEngine](https://github.com/rniemeyer/SamplePresentation/blob/master/js/stringTemplateEngine.js) by Ryan Niemeyer.

Basically it is used to get a template and add it to knockout.

It is used something like the following:

```javascript
define("MenuModule", ["Core", "knockout", "loadKoTemplate!./menuTemplates/menuItem.html"], function (core, knockout, template) {
   
   core.register("MenuModule", function (sandbox) {
      var ko = sandbox.getObservable(),
      viewModel = {
         templateName: "menuItem-html",
         menuItemArray: ko.observableArray()
      };

      return {
         activate: function () {
            sandbox.bind(viewModel);
            viewModel.menuItemArray.push({
               name: "Item One"
            });
            viewModel.menuItemArray.push({
               name: "Item Two"
            });
            viewModel.menuItemArray.push({
               name: "Item Three"
            });
         },
         destroy: function () {
            sandbox.unbind();
         }
      };
   });
});
```

You can also override the default template name that is used:

```javascript
define("MenuModule", ["Core", "knockout", "loadKoTemplate!./menuTemplates/menuItem.html!myCustomName"], function (core, knockout, template) {
   
   core.register("MenuModule", function (sandbox) {
      var ko = sandbox.getObservable(),
      viewModel = {
         templateName: "myCustomName",
         menuItemArray: ko.observableArray()
      };

      return {
         activate: function () {
            sandbox.bind(viewModel);
            viewModel.menuItemArray.push({
               name: "Item One"
            });
            viewModel.menuItemArray.push({
               name: "Item Two"
            });
            viewModel.menuItemArray.push({
               name: "Item Three"
            });
         },
         destroy: function () {
            sandbox.unbind();
         }
      };
   });
});
```