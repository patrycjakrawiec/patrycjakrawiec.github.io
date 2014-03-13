(function($){
    $.fn.extend({ 
        hoverZoom: function(settings) {
 
            var defaults = {
                overlay: true,
                overlayColor: '#1abc9c',
                overlayOpacity: 0.9,
                zoom: 0,
                speed: 300
            };
             
            settings = $.extend(defaults, settings);
         
            return this.each(function() {
            
                var s = settings;
                var hz = $(this);
                var image = $('img', hz);
                    
                if(s.overlay === true) {
                    $(image).parent()
                    .append('<div class="zoomOverlay"><div style="vertical-align: middle;margin-top: 35%;"><h4>'+
                        $(image).parent().data("title") +
                        '</h4><hr><p>'+
                        $(image).parent().data("city")+
                        '</p></div></div>');
                    $(image).parent().find('.zoomOverlay').css({
                        opacity:0, 
                        display: 'block', 
                        backgroundColor: s.overlayColor
                    }); 
                }
            
                var width = $(image).width();
                var height = $(image).height();
            
                $(image).fadeIn(1000, function() {
                    $(image).parent().css('background-image', 'none');
                    hz.hover(function() {
                        $('img', image).stop().animate({
                            height: height + s.zoom,
                            marginLeft: -(s.zoom),
                            marginTop: -(s.zoom)
                        }, s.speed);
                        if(s.overlay === true) {
                            $(image).parent().find('.zoomOverlay').stop().animate({
                                opacity: s.overlayOpacity
                            }, s.speed);
                        }
                    }, function() {
                        $('img', image).stop().animate({
                            height: height,
                            marginLeft: 0,
                            marginTop: 0
                        }, s.speed);
                        if(s.overlay === true) {
                            $(image).parent().find('.zoomOverlay').stop().animate({
                                opacity: 0
                            }, s.speed);
                        }
                    });
                });
            });
        }
    });
    $(document).ready( function () {
        $('.lazy').lazyload({
            effect: 'fadeIn',
            trehshold: 200
        });
        
        $('.green').hoverZoom({
            overlayColor: '#1abc9c',
            zoom: 0
        });
    });
})(jQuery);