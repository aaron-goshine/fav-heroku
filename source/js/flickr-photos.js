(function (win) {
  /**
    * @const COLUMNS - number of columns for layout
    * @private
    */
  var COLUMNS = 3;

  /**
    * flickrPhotos namespace
    * @namespace flickrPhotos
    */
  win.flickrPhotos = {};

  /** This function is used to generate classes to label each respective columns
    * @namespace flickrPhotos
    * @function flickrPhotos.generateColClass
    * @param {number} index - The index of the current item
    * @param {number} cols - The number of columns in the current grid
    * @return {string} class name
    */
  win.flickrPhotos.generateColClass = function (index, cols) {
    return 'col-' + (Math.floor(index % cols) + 1);
  };

  /**
    * This is a localStorage service wrapper
    * @namespace flickrStore
    */

  win.flickrStore = {

    /**
      * Retrieves values from the storage by key
      * @namespace flickrStore
      * @function flickrStore.getSelectedByKey
      * @param {string} key - The key to query
      * @return {boolean}
      */
    getSelectedByKey: function (key) {
      return localStorage.getItem(key + '_selected');
    },

    /**
      * Create or update an existing entry that matches the key.
      * This method will also remove an entry form the storage if the
      * parameter value is falsey
      * @namespace flickrStore
      * @function flickStore.setSelectedByKey
      * @param {string} key - The key to query
      * @param {boolean} value - The new value to be updated on the store
      */
    setSelectedByKey: function (key, value) {
      if (typeof key === 'string' && typeof value === 'boolean') {
        if (value) {
          localStorage.setItem(key + '_selected', value);
        } else {
          localStorage.removeItem(key + '_selected');
        }
      }
    }
  };

  /** @const TAGS - tags to filter API results
   * @private
   */
  // insert into localstorage to play with the tags from console
  if (!localStorage.getItem('tags')) {
    localStorage.setItem('tags', 'dance');
  }
  var TAGS = localStorage.getItem('tags');

  /**
    * This method is used to generate the DOM elements for each postcard view
    * @namespace flickrPhotos
    * @function flickrPhotos.generateView
    * @param {object} model - A model to populate the postcard item
    * @param {number} index - This a number representing the index of data
    * collection from which this model is a part of
    */
  win.flickrPhotos.generateView = function (model, index) {
    var postcard = document.createElement('div');
    var image = document.createElement('img');
    var colClass = win.flickrPhotos.generateColClass(index, COLUMNS);
    var idHash = CryptoJS.MD5(JSON.stringify(model)).toString();
    var isSelected = win.flickrStore.getSelectedByKey(idHash);

    image.setAttribute('id', idHash);
    image.setAttribute('src', model.media.m);
    image.setAttribute('data-url', model.link);
    image.setAttribute('alt', model.title);

    if (isSelected === 'true') {
      image.addClassName('selected');
    };
    postcard.addClassName('postcard').addClassName(colClass).appendChild(image);
    return postcard;
  };

  /*
    * The original callback supplied as a part of the starting
    * files with a few scope changes, to make the callback accessible outside
    * of the closure, the jsonp response need access
    */

  /**
   * The callback implemented to process data returned form the API
    * @namespace flickrPhotos
    * @callback flickrPhotos.cb
    * @param {object} data - The response data expected from the API.
    */
  win.flickrPhotos.cb = function (data) {
    var collection = data.items;
    var display = document.getElementById('display');
    for (var i = 0; i < collection.length; i++) {
      var view = win.flickrPhotos.generateView(collection[i], i);
      display.appendChild(view);
    }
    display.addEventListener('click', win.flickrPhotos.clickHandler, true);
    display.addEventListener('dblclick', win.flickrPhotos.dblclickHandler, true);
  };

  /**
    * Click event handler.
    * @namespace flickrPhotos
    * @function flickrPhotos.clickHandler
    * @param {event} - The click event handler for each postcard image
    * @listens element:click~event
    */
  win.flickrPhotos.clickHandler = function (event) {
    var element = event.target;
    if (element.tagName === 'IMG') {
      var id = element.getAttribute('id');
      element.toggleClassName('selected');
      win.flickrStore.setSelectedByKey(id, element.hasClassName('selected'));
    }
  };

  /**
    * Double Click event handler.
    * @namespace flickrPhotos
    * @function flickrPhotos.dblclickHandler
    * @param {event} - The dblclick event handler for each postcard image
    * @listens element:dblclick~event
    *
    */
  win.flickrPhotos.dblclickHandler = function (event) {
    var element = event.target;
    if (element.tagName === 'IMG') {
      var url = element.getAttribute('data-url');
      open(url, '_blank');
    }
  };

  /**
    * This is the main onload handler, where I dispatch the jsonP request
    * once the page is loaded, this will give some control over the page
    * rendering of the page.
    * @function
    * @param {event} - The onload event of window is available as param
    *
    */
  win.flickrPhotos.onload = function (event) {
    var script = document.createElement('script');
    script.setAttribute('id', 'flicker-api');
    script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=window.flickrPhotos.cb&tags=' + TAGS;
    document.head.appendChild(script);
  };

  win.addEventListener('load', win.flickrPhotos.onload, false);
})(window);
