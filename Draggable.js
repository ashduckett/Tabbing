(function($) {

    // We should take in an argument for endDrag
    $.fn.draggable = function (startDrag, endDrag, onMove, lockY = false) {
        console.log('draggable called');
        var clickX = null;
        var clickY = null;
        var elementBeingDragged = null;

        // This is done purely so we can see what's draggable and what's not in code.
        // Maybe we should do it another way? I say we in these comments far too much.
        $(this).addClass('draggable');

        var returnPosition = null;

        var setters = {
            setReturnPosition(top, left) {
                returnPosition.top = top;
                returnPosition.left = left;
            },
            getReturnPosition() {
                return returnPosition;
            }
        };
        
        $(this).css('position', 'absolute');

        $(this).mousedown(function (event) {
            // Make sure the element being dragged is on top
            $('.draggable').css('z-index', '1');

            // Bring both the parent element and the element itself to the front
            // this takes care of stacking context issues            
            $(this).css('z-index', '999');
            $(this).parent().css('z-index', '999');
            

            var parentOffset = $(this).position();
            clickX = event.pageX - parentOffset.left;
            clickY = event.pageY - parentOffset.top;
            elementBeingDragged = event.target;
            
            
            // Here, returnPosition is being set to the position it was in relative to its parent
            returnPosition = $(elementBeingDragged).position();
            
            if(typeof startDrag === 'function') {
                startDrag();
            }

            // Escape default mouse down behaviour
            event.stopPropagation();
            return false;
        });

         $(this).mouseup(function (event) {
            if(elementBeingDragged !== null) {
                elementBeingDragged.classList.remove('dragging');

                if(typeof endDrag === 'function') {
                    
                    endDrag();
                }

                var left = returnPosition.left;
                var top = returnPosition.top;

                $(elementBeingDragged).css({left: left, top: top});


                elementBeingDragged = null;

                event.stopPropagation();
            }
         });

        $('html').mouseup(function (event) {
            $(elementBeingDragged).css('z-index', 100); 
             if(elementBeingDragged !== null) {
                elementBeingDragged.classList.remove('dragging');

                if(typeof endDrag === 'function') {
                    
                    endDrag();
                }

                var left = returnPosition.left;
                var top = returnPosition.top;

                $(elementBeingDragged).css({left: left, top: top});


                elementBeingDragged = null;

                event.stopPropagation();
            }
            
            
        });

        $('html').mousemove(function (event) {
            if (elementBeingDragged != null) {
                if(lockY && lockY === false) {
                    elementBeingDragged.style.top = (event.pageY - clickY) + 'px';
                }
               elementBeingDragged.style.left = (event.pageX - clickX) + 'px';
            
        
                    if(typeof onMove === 'function') {
                    onMove();
                }
            }
        });

        $(this).mousemove(function (event) {

            if (elementBeingDragged != null) {
                if(lockY && lockY === false) {
                    elementBeingDragged.style.top = (event.pageY - clickY) + 'px';
                }
                
                
                elementBeingDragged.style.left = (event.pageX - clickX) + 'px';
                
                // This is new but can be generic so not specific to this plugin
                elementBeingDragged.classList.add('dragging');
                    // At this point we need to know if we're dragging over the top of something
                    // It seems a shame to mess with what is currently pure d and d code but let's try

                if(typeof onMove === 'function') {
                    onMove();
                }
                
                event.stopPropagation();
            }
        });
        return setters;
    }
}(jQuery));