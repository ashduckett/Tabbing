(function($) {

    $.fn.tabify = function () {
        
        var Tab = function(caption, contentURL, tabBar) {
            this.tabBar = tabBar;
            this.id = TabBar.currentTabId;
            this.domElement = null;
            this.createDomElement(caption, contentURL);
            this.caption = caption;

            // Create the div for the tab's associated content.
            this.tabContent = document.createElement('div');
            this.tabContent.classList.add('tab-content');
            this.tabContent.style.width = '100%';
            this.tabContent.style.height = '100%';
            this.tabContent.style.position = 'absolute';


            $(this.tabContent).load(contentURL);

            this.tabBar.tabContentAreas[this.id] = $(this.tabContent);
        }

        Tab.prototype.getTabContent = function() {
            return this.tabContent;
        }

        Tab.prototype.createDomElement = function(caption, contentURL) {
           
            // First a div to put the tab in
            var tab = document.createElement('div');
           
            tab.classList.add('tab');
            tab.style.backgroundColor = 'black';
           // tab.style.display = 'inline-block';
            tab.style.color = 'white';
            tab.style.height = '100%';
            tab.style.borderRadius = '11px 11px 0 0';
          //  tab.style.marginLeft = '1px';


            // An element for the text. This should be vertially centered in the div.
            var text = document.createElement('div');
            text.style.display = 'inline-block';
            text.innerHTML = caption;
            text.style.position = 'relative';
            text.classList.add('disable-select');
            text.style.cursor = 'default';

            // Three lines to vertically align. It worked!
            text.style.top = '50%';
            text.style.transform = 'translateY(-50%)';
            text.style.marginLeft = '8px';
            text.style.pointerEvents = 'none';
           

            // We also need an element for the close button.
            var close = document.createElement('span');
            close.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
            close.style.float = 'right';
            close.style.marginLeft = '15px';
            close.style.marginTop = '5px';
            close.style.marginRight = '8px';
            close.style.cursor = 'pointer';

            // Add the text to the tab
            $(tab).append($(text));

            // Add the close button
            $(tab).append($(close));

            var context = this;

            $(tab).click(function() {

                // Hide all the other tabs contents
                context.tabBar.hideAllTabContent();
                
                // Show the tab with the id that matches this tab
                $(context.tabBar.tabContentAreas[context.id]).show();

                context.tabBar.tabObjects.forEach(function(element) {
                    console.log('My caption is ' + element.caption);
                });

            });

            $(close).click(function(event) {
                $(this).parent().remove();

                // Only fire close click and not tab click.
                event.stopPropagation();
            });
            this.tabElement = $(tab);
        }

        Tab.prototype.getTabElement = function() {
            return this.tabElement;
        };

        var TabBar = function() {
//            this.tabs = [];
            this.tabContentAreas = [];
            this.tabObjects = [];

            this.entireTabArea = document.createElement('div');
            this.entireTabArea.style.width = '100%';
            this.entireTabArea.style.height = '100%';
            this.entireTabArea.style.position = 'relative';


            // A place for the clickable tabs
            this.tabArea = document.createElement('div');
            this.tabArea.style.width = '100%';
            this.tabArea.style.height = '40px';
            this.tabArea.style.backgroundColor = 'red';
            this.tabArea.classList.add('column-container');
            this.methods = $(this.tabArea).DraggableCol();

            // A place for each tab to display its content
            this.contentArea = document.createElement('div');
            this.contentArea.style.width = '100%';
            this.contentArea.style.height = 'calc(100% - 40px)';
            this.contentArea.style.position = 'absolute';
            this.contentArea.style.top = '40px';
            //this.contentArea.style.height = 'calc(100% - 40px)';
            this.contentArea.style.backgroundColor = 'yellow';

            $(this.entireTabArea).append($(this.tabArea));
            $(this.entireTabArea).append($(this.contentArea));

        };

        TabBar.prototype.hideAllTabContent = function() {
            this.tabContentAreas.forEach(function(element) {
                $(element).hide();
            });
        }

        TabBar.currentTabId = 0;

        TabBar.prototype.addTab = function(caption, contentURL) {

            // Create a new tab object            
            var tab = new Tab(caption, contentURL, this);
            this.tabObjects[tab.id] = tab;

            this.methods.addColumn(tab.getTabElement());

            // Add the tab content to the content area
            $(this.contentArea).append($(tab.getTabContent()));
       
            // Make sure any other content is hidden
            this.hideAllTabContent();            

            // Show the content we're interested in
            $(tab.getTabContent()).show();

            // Increment to next id
            TabBar.currentTabId++;
        }

        TabBar.prototype.draw = function(element) {
            $(element).append(this.entireTabArea);
        }

        var tabBar = new TabBar();
        tabBar.draw(this);

        var methods = {
            addTab: function(caption, contentURL) {
                tabBar.addTab(caption, contentURL);    
            }
        };
        return methods;
    };
}(jQuery));

/*
    Every time you add a tab, you should assign it an id.
    Every time you add a tab, you should stash it, indexing it by its id.
*/