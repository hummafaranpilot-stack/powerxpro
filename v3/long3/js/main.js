$(document).ready(function(){

    if ($('.testimonial').length) {
        $('.testimonial').slick({
        autoplay: true,
        autoplaySpeed: 40000,
        dots: true,
        infinite: true,
        adaptiveHeight: true,
        slidesToShow: 1,
        draggable: false,
      });
    }

        
    

    // function initClickBank(){
    // 	var define = window.define;
	   //  window.define = function(package) {
	   //      if (package.HandlebarsEnvironment) {
	   //          window.Handlebars = package;
	   //      }
	   //      define.apply(this, arguments);
	   //  }
	   //  // console.log('clickbank');
    // }

    // function acceptOrderLink() {
    //   window.location.href = "https://rockhardx.pay.clickbank.net/?cbitems=501&amp;cbur=a";
    // }

    // function declineOrderLink(){
    //  window.location.href = "https://rockhardx.pay.clickbank.net/?cbitems=501&amp;cbur=d";   
    // }

    // $("body").on('click', '#modal-accept', acceptOrderLink);
    // $("body").on('click', '#modal-decline', acceptOrderLink);

    // // function mustAccept() {
    // //     window.alert("By clicking accept, you agree to the payment terms of this recurring product.");
    // // }

    // // var acceptLink = document.getElementById("accept");
    // // acceptLink.onclick = acceptCheck;

    // initClickBank();
    var result;
    function cbf( name, url ) {
      if (!url) url = location.href;
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
    }

    result = cbf('cbf', null );
        if (result) {
            $('.paylink').each(function(i,obj) {
                obj.href += "&cbf=" + result;
            });
        }else{
            console.log(result);
        }


});