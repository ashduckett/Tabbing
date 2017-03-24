(function($) {

    // Missleading name, we're actually setting up a div so it can accept draggable columns.
    $.fn.DraggableCol = function (onStartDrag, onEndDrag, onDrag, lockY = false) {
        // Get hold of container height
        var desiredColHeight = this.height();
        var desiredColWidth = 200;
        var desiredTop = this.position().top;

        // Get hold of each column
        var columns = $(this).children('.inner-column');

        var currentLeft = 0;
        var context = this;

        var methods = {
            addColumn: function(column) {
                col = $(column);
                col.width(desiredColWidth);
                col.height(desiredColHeight);
                col.offset({left: currentLeft, top: desiredTop});
                col.css('box-sizing', 'border-box');
                col.css('position', 'absolute');
                col.addClass('inner-column');
                $(context).append(col);

                var setters = $(col).draggable(onStartDrag, onEndDrag, function() {

                    // Get hold of each column
                    var columns = $('.column-container').children('.inner-column');

                    $(columns).each(function(index, col) {
                        
                        if(!$(col).hasClass('dragging')) {
                            if(event.pageX > $(col).position().left && event.pageX < $(col).position().left + $(col).width()) {
                            
                                // If we are inside one of the columns not being dragged, move the column
                                // we're dragging over to the returnPosition, and update the returnPosition
                                // to be that of the column that just moved
                                // Get the starting position of the column we're dragging over
                                var tempReturn = $(col).position();

                                var returnPosition = setters.getReturnPosition();



                                $(col).css({left: returnPosition.left, top: returnPosition.top});
                                returnPosition = tempReturn;
                                setters.setReturnPosition(tempReturn.top, tempReturn.left);

                                return false;
                            }


                        }
                    });
                    if(typeof onDrag === 'function') {
                        onDrag();
                    }
            }, true);

                // What should this be?
                console.log('adding ' + desiredColWidth);
                
                currentLeft += desiredColWidth + 1;
                console.log(currentLeft);
            }
        };
        return methods;
    }
}(jQuery));