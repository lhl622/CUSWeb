(function(GLOBAL) {
    'use strict';
    var gridFramePrototype = {
        is: 'ra-gridframe',
        behaviors: [GLOBAL.DS.RAComponents.overlayelement]
    };

    gridFramePrototype.stackOrder = [];

    gridFramePrototype.createdCallback = function() {
        GLOBAL.DS.RAComponents.overlayelement.createdCallback.call(this);
        this.reappendOnFocus = false;

        var that = this;

        this.addEventListener('focus', function(e) {
            that.classList.add('focused');
        });

        this.addEventListener('blur', function(e) {
            that.classList.remove('focused');
        });

        this.addEventListener('mousedown', function(e) {
            // only focus if not already in focus
            if(!that.classList.contains('focused')){
                that.focusElement(e);
            }
        });

        this.addEventListener('dragenter', function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            // below was blocking the ra-overlayelement from being properly resized
            // via a hack designed to get the resize to work in firefox
            // if(e.stopPropagation) { e.stopPropagation(); }

            GLOBAL.DS.RAComponents.chartdroptarget.dragCounter += 1;

            that.dragging = true;
            Array.prototype.forEach.call(
                that.querySelectorAll('ra-chartdroptarget'),
                function(dropZone) {
                    if (typeof dropZone.dragHappening === 'function') {
                        dropZone.dragHappening(e);
                        window.setTimeout(function() {
                            if (typeof dropZone.dragEnded === 'function') {
                                if (!that.dragging) {
                                    dropZone.dragEnded(e);
                                }
                            }
                        }, 1000);
                    }
                }
            );
            // e.stopImmediatePropagation();
        });

        // this is never firing in IE11, I think is called on the dragged element
        this.addEventListener('dragend', function(e) {
            console.log('dragend happened');
            that.dragging = false;
            Array.prototype.forEach.call(
                that.querySelectorAll('ra-chartdroptarget'),
                function(dropZone) {
                    if (typeof dropZone.dragEnded === 'function') {
                        dropZone.dragEnded(e);
                    }
                }
            );
        });

        this.addEventListener('dragleave', function(e) {
            GLOBAL.DS.RAComponents.chartdroptarget.dragCounter -= 1;

            // TODO: test in IE11/Edge as I'm not sure if relatedTarget and the
            // contains function will work there
            
            if (
                (e.relatedTarget && !that.contains(e.relatedTarget)) ||
                GLOBAL.DS.RAComponents.chartdroptarget.dragCounter === 0
            ) {
                console.log(e.relatedTarget);
                Array.prototype.forEach.call(
                    that.querySelectorAll('ra-chartdroptarget'),
                    function(dropZone) {
                        if (typeof dropZone.dragEnded === 'function') {
                            dropZone.dragEnded(e);
                        }
                    }
                );
            }
        });

        this.dragData.translating = false;

        this.addCallback('resize', function() {
            Array.prototype.forEach.call(
                that.querySelector('.content').children,
                function(child) {
                    if (typeof child.resize === 'function') {
                        child.resize();
                        console.log('frame resizing');
                    }
                }
            );
        });

        this.addCallback('close', function() {
            // remove the charts within this gridframe
            Array.prototype.forEach.call(
                that.querySelector('.content').children,
                function(child) {
                    if (typeof child.chartId !== 'undefined') {
                        child.chartParent.removeChart(child.chartId);
                        console.log('Closed chart: ' + child.chartId);
                    }
                }
            );
            
            // remove the gridframe from the stackorder
            var stackIndex = gridFramePrototype.stackOrder.indexOf(that);
            if(stackIndex > -1){
                gridFramePrototype.stackOrder.splice(stackIndex);
            }
        });
    };
    
    gridFramePrototype.focusElement = function(e) {
        var stackIndex = gridFramePrototype.stackOrder.indexOf(this);
        if(stackIndex > -1){
            gridFramePrototype.stackOrder.splice(stackIndex,1);
        }
        gridFramePrototype.stackOrder.push(this);
        this.style.zIndex = gridFramePrototype.stackOrder.length;
        
        this.parentElement.focusFrame(this);
        
        this.classList.add('focused');
        this.onFocus(e);
    };

    gridFramePrototype.blurElement = function(e) {
        var stackIndex = gridFramePrototype.stackOrder.indexOf(this);
        if(stackIndex > -1){
            this.style.zIndex = stackIndex + 1;
        }
        this.classList.remove('focused');
    };

    gridFramePrototype.onFocus = function() {};

    gridFramePrototype.setChart = function(chart) {
        this.chart = chart;
    };

    gridFramePrototype.renderControlPanel = function(panel) {
        if (
            typeof this.chart !== 'undefined' &&
            panel.currentChart() !== this.chart
        ) {
            panel.clearPanel();

            panel.currentChart(this.chart);
            this.chart.renderControlPanel(panel);
        }
    };

    gridFramePrototype.renderStylePanel = function(panel) {
        if (
            typeof this.chart !== 'undefined' &&
            panel.currentChart() !== this.chart
        ) {
            // panel.clearPanel();

            panel.currentChart(this.chart);
            this.chart.renderStylePanel(panel);
        } else {
            this.chart.updateStylePanel();
        }
    };

    gridFramePrototype.startDrag = function(e, element) {
        var translating = this.dragData.translating;

        GLOBAL.DS.RAComponents.overlayelement.startDrag.call(this, e, element);

        this.dragData.translateX = 0;
        this.dragData.translateY = 0;
        this.dragData.startScrollLeft = this.parentElement.scrollLeft;
        this.dragData.startScrollTop = this.parentElement.scrollTop;
        this.dragData.lastEvent = e;
        this.dragData.translateFrame = false;
        this.dragData.translating = translating;
        this.dragData.lastTimeout = 0;

        // We add a drag box to smooth out repositioning operations while dragging.
        // this is deleted after the drag is over.
        this.dragGhost = document.createElement('div');

        d3.select(this.dragGhost).style({
            'z-index': '-1000',
            position: 'absolute',
            left: this.dimensions.x + 'px',
            top: this.dimensions.y + 'px',
            height: this.getBoundingClientRect().height + 'px',
            width: this.getBoundingClientRect().width + 'px'
        });

        this.parentElement.appendChild(this.dragGhost);
    };

    gridFramePrototype.translateFrame = function() {
        // console.log('Translating!');
        // console.log('This.dragData.translateFrame: ' +
        // this.dragData.translateFrame);

        var that = this;

        if (this.dragData.translateFrame) {
            this.dragData.translating = true;

            var parentBox = this.parentElement.getBoundingClientRect(),
                thisBox = this.getBoundingClientRect();

            var scrollMaxSpeed = 10,
                scrollXSpeed = 0,
                scrollYSpeed = 0;

            var scrollZoneWidth = 100;

            var dragBoxLeft = thisBox.left - parentBox.left, // Left position of this element,
                // relative to the container
                dragBoxRight = parentBox.right - thisBox.right;

            var e = this.dragData.lastEvent;

            // Handle x positioning
            if (e.x < parentBox.left + scrollZoneWidth) {
                // mouse within scrollzone of left edge of parent
                scrollXSpeed =
                    (parentBox.left + scrollZoneWidth - e.x) / scrollZoneWidth;
                this.dragData.translateX -= Math.min(
                    scrollXSpeed,
                    this.parentElement.scrollLeft
                );
            } else if (
                e.x >
                parentBox.left + parentBox.width - scrollZoneWidth
            ) {
                // mouse within 50px of the right edge of parent
                scrollXSpeed =
                    (e.x -
                        (parentBox.left + parentBox.width - scrollZoneWidth)) /
                    scrollZoneWidth;
                this.dragData.translateX += scrollXSpeed;
            }

            // Handle y positioning
            if (e.y < parentBox.top + scrollZoneWidth) {
                scrollYSpeed =
                    (parentBox.top + scrollZoneWidth - e.y) / scrollZoneWidth;
                this.dragData.translateY -= Math.min(
                    scrollYSpeed,
                    this.parentElement.scrollTop
                );
            } else if (
                e.y >
                parentBox.top + parentBox.height - scrollZoneWidth
            ) {
                scrollYSpeed =
                    (e.y -
                        (parentBox.top + parentBox.height - scrollZoneWidth)) /
                    scrollZoneWidth;
                this.dragData.translateY += scrollYSpeed;
            }

            // Clamp x and y such that the div remains in its parent.
            var x =
                this.dragData.startElementX +
                (e.clientX - this.dragData.startMouseX) +
                this.dragData.translateX;
            x = Math.max(x, 0);
            // x = Math.min(x, this.parentElement.offsetWidth -
            // this.dimensions.width);
            this.parentElement.scrollLeft =
                this.dragData.startScrollLeft + this.dragData.translateX;

            var y =
                this.dragData.startElementY +
                (e.clientY - this.dragData.startMouseY) +
                this.dragData.translateY;
            y = Math.max(y, 0);
            // y = Math.min(y, this.parentElement.offsetHeight -
            // this.dimensions.height);
            this.parentElement.scrollTop =
                this.dragData.startScrollTop + this.dragData.translateY;

            d3.select(this).style({ top: y + 'px', left: x + 'px' });

            var ghostTop = this.dragGhost.offsetTop,
                ghostLeft = this.dragGhost.offsetLeft;

            d3.select(this.dragGhost).style({
                left: Math.max(ghostLeft, x),
                top: Math.max(ghostTop, y)
            });

            var avgTimeout = 25;
            var t = new Date().getTime();
            var timeoutTime = Math.max(0, 25 - t + this.dragData.lastTimeout);

            // Run translate again after a timeout
            window.setTimeout(function() {
                that.translateFrame();
            }, timeoutTime);
        } else {
            this.dragData.translating = false;
        }
    };

    gridFramePrototype.onOverlayDrag = function(e, element) {
        this.dragData.lastEvent = e;

        var parentBox = this.parentElement.getBoundingClientRect(),
            thisBox = this.getBoundingClientRect();

        var scrollMaxSpeed = 25,
            scrollXSpeed = 0,
            scrollYSpeed = 0;

        var scrollZoneWidth = 100;

        var dragBoxLeft = thisBox.left - parentBox.left, // Left position of this element, relative to the container
            dragBoxRight = parentBox.right - thisBox.right;

        this.dragData.translateFrame = false;

        // Set translate to true if close to any border.
        // Specific translations are handled by this.translateFrame
        if (
            e.x < parentBox.left + scrollZoneWidth ||
            e.x > parentBox.left + parentBox.width - scrollZoneWidth ||
            e.y < parentBox.top + scrollZoneWidth ||
            e.y > parentBox.top + parentBox.height - scrollZoneWidth
        ) {
            this.dragData.translateFrame = true;
        }

        // Clamp x and y such that the div remains in its parent.
        var x =
            this.dragData.startElementX +
            (e.clientX - this.dragData.startMouseX) +
            this.dragData.translateX;
        x = Math.max(x, 0);
        // x = Math.min(x, this.parentElement.offsetWidth - this.dimensions.width);
        this.parentElement.scrollLeft =
            this.dragData.startScrollLeft + this.dragData.translateX;

        var y =
            this.dragData.startElementY +
            (e.clientY - this.dragData.startMouseY) +
            this.dragData.translateY;
        y = Math.max(y, 0);
        // y = Math.min(y, this.parentElement.offsetHeight -
        // this.dimensions.height);
        this.parentElement.scrollTop =
            this.dragData.startScrollTop + this.dragData.translateY;

        d3.select(this).style({ top: y + 'px', left: x + 'px' });

        var ghostTop = this.dragGhost.offsetTop,
            ghostLeft = this.dragGhost.offsetLeft;

        d3.
            select(this.dragGhost).
            style({
                left: Math.max(ghostLeft, x),
                top: Math.max(ghostTop, y)
            });

        if (
            this.dragData.translating === false &&
            this.dragData.translateFrame === true
        ) {
            this.translateFrame();
        }
    };

    gridFramePrototype.endOverlayDrag = function(e, element) {
        GLOBAL.DS.RAComponents.overlayelement.endOverlayDrag.call(
            this,
            e,
            element
        );

        this.dragData.translateFrame = false;

        // Update dimensions for next drag
        this.dimensions.x =
            this.dragData.startElementX +
            (e.clientX - this.dragData.startMouseX) +
            this.dragData.translateX;
        this.dimensions.y =
            this.dragData.startElementY +
            (e.clientY - this.dragData.startMouseY) +
            this.dragData.translateY;

        this.dimensions.x = Math.max(this.dimensions.x, 0);
        this.dimensions.y = Math.max(this.dimensions.y, 0);

        this.parentElement.removeChild(this.dragGhost);
        delete this.dragGhost;
        
        this.parentElement.updateChartsConfigPreference(this.chart.chartId);
    };

    Polymer(gridFramePrototype);
    GLOBAL.DS.RAComponents.gridframe = gridFramePrototype;
})(this);