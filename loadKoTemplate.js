define("loadKoTemplate", ["text", "knockout"], function (text, ko) {
   return {
      load: function (name, req, load, config) {
         var onLoad = function (content) {
            ko.templates[name] = content;
            load(content);
         },
         fullPath = config.loadKoTemplate.templatePath + name + config.loadKoTemplate.extension;
         
         text.load(fullPath, req, onLoad, config);
      }
   };
});