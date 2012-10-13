/*globals define */
define(["text", "knockout", "stringTemplateEngine"], function (text, ko) {
   var inferTemplateName = function(name) {
      var templateName,
      index = name.indexOf("!"),
      parts;
      
      if (index !== -1) {
         //use the template name that is specified
         templateName = name.substring(index + 1, name.length);
      }
      else {
         //use the file name sans the path as the template name
         parts = name.split("/");
         templateName = parts[parts.length - 1].split(".").join("-");
      }

      return templateName;
   },
   loader = {
      load: function (name, req, load, config) {
         var onLoad = function (content) {
            var safeName = inferTemplateName(name);
            ko.templates[safeName] = content;
            load(content);
         },
         templateName = name,
         index;
         
         //use the global configuration if it is defined
         if (config !== undefined && config.loadKoTemplate !== undefined) {
            if (config.loadKoTemplate.templatePath !== undefined) {
               templateName = config.loadKoTemplate.templatePath + templateName;
            }
            if (config.loadKoTemplate.extension !== undefined) {
               
               //if we have a ! in the path we only want the text before it
               index = templateName.indexOf("!");
               if (index !== -1) {
                  templateName = templateName.substring(0, index);
               }
               templateName = templateName + config.loadKoTemplate.extension;
            }
         }

         text.load(templateName, req, onLoad, config);
      }
   };

   return loader;
});