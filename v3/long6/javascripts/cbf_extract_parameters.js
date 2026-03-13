$('.pay-link').on('click', function () {

console.log("hello world");

function gup( name, url ) {
      if (!url) url = location.href;
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
      
    }

jQuery(function($) {
    result = gup('cbf', null );
    if (result) {
        $('.pay-link').each(function(i,obj) {
            obj.href += "&cbf=" + result;
        });
       
    }
});


});

$('.close-re').on('click', function () {

// console.log("hello world");

function gup( name, url ) {
      if (!url) url = location.href;
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
      
    }

jQuery(function($) {
    result = gup('cbf', null );
    if (result) {
        $('.close-re').each(function(i,obj) {
            obj.href += "&cbf=" + result;
        });
       
    }
});


});


// whistory.pushState = ( f => function pushState(){
//     var ret = f.apply(this, arguments);
//     window.dispatchEvent(new Event('pushstate'));
//     window.dispatchEvent(new Event('locationchange'));
//     return ret;
// })(history.pushState);

history.replaceState = ( f => function replaceState(){
    var ret = f.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
})(history.replaceState);

window.addEventListener('popstate',()=>{
    window.dispatchEvent(new Event('locationchange'))
});

