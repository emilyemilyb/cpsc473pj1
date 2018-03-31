(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;
  var DETAIL_IMAGE_SELECTOR = "[data-image-role='displayImage']";
  var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";

  var imageArray = [];

  /*  remoteDS.getAll(function(data) {
        for (var i = 0; i < data.length; i++) {
          imageArray[i] = data[i];
        }
      }
    });
*/

  function FormHandler(selector) {
    if (!selector) {
      throw new Error("No selector provided");
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error("Could not find element with selector: " + selector);
    }
  }

  function getCurrentImageIndex() {
    imageArray = getimageArray();
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    for (var i = 0; i < imageArray.length; i++) {
      if (imageArray[i].getAttribute("data-image-url") == detailImage.getAttribute("src")) {
        return i;
      }
    }
    return -1;
  }

  function imageFromThumb(thumbnail) {
    return thumbnail.getAttribute("type");
  }


  function setDetailsFromThumb(thumbnail) {
    setDetails(imageFromThumb(thumbnail));
  }

  function getimageArray() {
    //var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    //var thumbnailArray = [].slice.call(thumbnails);
    //return thumbnailArray;
    imageArray[0]="img/Spaghetti.jpg";
    imageArray[1]="img/Taco.jpg";
    imageArray[2]="img/Breakfast.jpg";
    imageArray[3]="img/Hamburger.jpg";
    imageArray[4]="img/Ramen.jpg";

    return imageArray;
  }

  FormHandler.prototype.addPreviousHandler = function(fn) {
    /*eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
    console.log("Setting submit handler for form");
    this.$formElement.on("previous", function(event) {
      event.preventDefault();
      var data = {};
      $(this).serializeArray().forEach(function(item) {
        imageArray = getThumbnailsArray();
        var prevImage = (getCurrentImageIndex() - 1 + thumbnailArray.length) % thumbnailArray.length;
        //setDetails(imageFromThumb(imageArray[prevImage]));
        data[item.name] = item.value;
        $("#mainImage").src = prevImage;
        //console.log(item.name + " is " + item.value);
      });
      console.log(data);
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);