/**
 * A set of functions to determine if event handlers have been bound to a
 * given DOM element, and to access the list
 */
module.exports = (function(_, $){
	
	_ = _ || window._ || require('lodash');
	
	$ = $ || jQuery || require('jquery');

	var findEventHandlers,
		hasChangeHandler, 
		hasSubmitHandler,
		hasClickHandler,
		isEventHandlersEmpty,
		hasResizeHandler,
		hasAnyStandardHandler,
		hasSelectHandler,
		hasMouseLeaveHandler,
		hasMouseEnterHandler,
		hasMouseOutHandler,
		hasMouseDownHandler,
		hasMouseUpHandler,
		hasMouseOverHandler,
		hasDblClickHandler;

			
	findEventHandlers = function(eventType, jqSelector)  {
		var arrayIntersection, haveCommonElements, addEventHandlerInfo,
			$elementsToWatch, $allElements;
		
	    var results = [],
	    	$ = 	  jQuery; // to avoid conflict between others frameworks like Mootools
	
	    arrayIntersection = function (array1, array2) {
			return $(array1).filter(function (index, element) {
				return $.inArray(element, $(array2)) !== -1;
			});
	    };
		
	    haveCommonElements = function (array1, array2) {
	    	return arrayIntersection(array1, array2).length !== 0;
	    };
		
		
	    addEventHandlerInfo = function (element, event, $elementsCovered) {
	    	var eventInfo, eventsInfo, extendedEvent;
		    	
			extendedEvent = event;

			if ($elementsCovered !== void 0 && $elementsCovered !== null) {
			    $.extend(extendedEvent, {
			    	targets: $elementsCovered.toArray()
			    });
			};
		
			eventsInfo = $.grep(results, function (evInfo, index) {
			    return element === evInfo.element;
			});
			
			if (eventsInfo.length === 0) {
			    eventInfo = {
				    element: element,
					events: [extendedEvent]
			    };
			    results.push(eventInfo);
			} else {
			    eventInfo = eventsInfo[0];
			    eventInfo.events.push(extendedEvent);
			}
	    };
		
	    $elementsToWatch = $(jqSelector);
		    
	    if (jqSelector === "*") {//* does not include document and we might be interested in handlers registered there
	    	$elementsToWatch = $elementsToWatch.add(document);
	    }

	    $allElements = $("*").add(document);
		
	    $.each($allElements, function (elementIndex, element) {
			var allElementEvents, eventContainer;
			
			allElementEvents = $._data(element, "events");

			if (allElementEvents !== void 0 && allElementEvents[eventType] !== void 0) {
			    eventContainer = allElementEvents[eventType];

			    $.each(eventContainer, function(eventIndex, event){
			    	var isDelegateEvent, $elementsCovered;
			    	
			        isDelegateEvent = event.selector !== void 0 && event.selector !== null;

					if (isDelegateEvent) {
					    $elementsCovered = $(event.selector, element); //only look at children of the element, since those are the only ones the handler covers
					} else {
					    $elementsCovered = $(element); //just itself
					}

					if (haveCommonElements($elementsCovered, $elementsToWatch)) {
					    addEventHandlerInfo(element, event, $elementsCovered);
					}
			    });
			}

	    });
	
	    return results;
	};


	//Returns true or false based on content of object
	isEventHandlersEmpty = function(eventType, jqSelector){
	  	return (!(_.isEmpty(findEventHandlers(eventType, jqSelector))));
	};

	hasClickHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("click", jqSelector));
	};

	hasSubmitHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("submit", jqSelector));
	};

	hasChangeHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("change", jqSelector));
	};

	hasDblClickHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("dblclick", jqSelector));
	};

	hasMouseOverHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("mouseover", jqSelector));
	};

	hasMouseUpHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("mouseup", jqSelector));
	};

	hasMouseDownHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("mousedown", jqSelector));
	};

	hasMouseOutHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("mouseout", jqSelector));
	};

	hasMouseEnterHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("mouseenter", jqSelector));
	};

	hasMouseLeaveHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("mouseleave", jqSelector));
	};

	hasSelectHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("select", jqSelector));
	};

	hasResizeHandler = function(jqSelector){
	   	return (isEventHandlersEmpty("resize", jqSelector));
	};

	hasAnyStandardHandler = function(jqSelector){
		var isHandler = false;
		var handlers = ['resize', 'select', 'changed', 'click', 'dblclick',
		                'mouseleave', 'mouseenter', 'mouseout', 'mousedown',
		                'mouseup', 'mouseover', 'submit'];

		handlers.foreach(function(item){
			if (!(isEventHandlersEmpty(item, jqSelector))) { 
				isHandler = true;
			}
		});

		return isHandler;
	};


	/** @export */
	return({
		findEventHandlers: 		findEventHandlers,
		hasChangeHandler: 		hasChangeHandler,
		hasSubmitHandler: 		hasSubmitHandler,
		hasClickHandler: 		hasClickHandler,
		isEventHandlersEmpty: 	isEventHandlersEmpty,
		hasResizeHandler: 		hasResizeHandler,
		hasAnyStandardHandler: 	hasAnyStandardHandler,
		hasSelectHandler: 		hasSelectHandler,
		hasMouseLeaveHandler: 	hasMouseLeaveHandler,
		hasMouseEnterHandler: 	hasMouseEnterHandler,
		hasMouseOutHandler: 	hasMouseOutHandler,
		hasMouseDownHandler: 	hasMouseDownHandler,
		hasMouseUpHandler: 		hasMouseUpHandler,
		hasMouseOverHandler: 	hasMouseOverHandler,
		hasDblClickHandler: 	hasDblClickHandler
	});

}(_, $));