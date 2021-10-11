function Validation() {
  this.checkEmpty = function (input, divID, message) {
    if (input.trim() === "") {
      getEle(divID).style.display = "block";
      getEle(divID).innerHTML = message;
      return false;
    }
    getEle(divID).style.display = "none";
    getEle(divID).innerHTML = "";
    return true;
  };

  this.checkLength = function (input, divID, message, min, max) {
    if (input.length >= min && input.length <= max) {
      getEle(divID).style.display = "none";
      getEle(divID).innerHTML = "";
      return true;
    }
    getEle(divID).style.display = "block";
    getEle(divID).innerHTML = message;
    return false;
  };

  this.checkInput = function (input, divID, message, pattern) {
    if (input.match(pattern)) {
      getEle(divID).style.display = "none";
      getEle(divID).innerHTML = "";
      return true;
    }
    getEle(divID).style.display = "block";
    getEle(divID).innerHTML = message;
    return false;
  };

  this.checkIntegerAndValue = function (input, divID, message, min, max) {
    var pattern = /^[0-9]+$/;
    if (input >= min && input <= max && input.match(pattern)) {
      getEle(divID).style.display = "none";
      getEle(divID).innerHTML = "";
      return true;
    }
    getEle(divID).style.display = "block";
    getEle(divID).innerHTML = message;
    return false;
  };

  this.checkOption = function (idSelect, divID, message) {
    if (getEle(idSelect).selectedIndex != 0) {
      getEle(divID).style.display = "none";
      getEle(divID).innerHTML = "";
      return true;
    }
    getEle(divID).style.display = "block";
    getEle(divID).innerHTML = message;
    return false;
  };
}
