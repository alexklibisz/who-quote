var Handlebars = require('handlebars');

Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

Handlebars.registerHelper("title", function (str) {
    if (typeof str === 'undefined') return '';
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
});

Handlebars.registerHelper( "date", function( date ) {
    return date.toLocaleString();    
});