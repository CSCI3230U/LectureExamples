/* CSCI 3230U - JavaScript */

window.onload = function() {
   let allPs = document.getElementsByTagName('p');
   select(allPs[0]);

   resetButton = document.getElementById('resetButton');
   resetButton.onclick = function() {
      allPs = document.getElementsByTagName('p');
      select(allPs[0]);
   };

   parentButton = document.getElementById('parentButton');
   parentButton.onclick = function() {
      select(currentElement.parentElement);
   };

   previousButton = document.getElementById('previousButton');
   previousButton.onclick = function() {
      select(currentElement.previousElementSibling);
   };

   nextButton = document.getElementById('nextButton');
   nextButton.onclick = function() {
      select(currentElement.nextElementSibling);
   };

   firstButton = document.getElementById('firstButton');
   firstButton.onclick = function() {
      // console.log('firstChild: ' + currentElement.firstChild);
      select(currentElement.firstElementChild);
   };

   lastButton = document.getElementById('lastButton');
   lastButton.onclick = function() {
      select(currentElement.lastElementChild);
   };

   visibilityList = document.getElementById('visibilityList');
   visibilityList.onchange = function() {
      // accessing a local variable outside of scope!
      selectedIndex = visibilityList.selectedIndex;
      visibility = visibilityList.options[selectedIndex].text;
      currentElement.style.display = visibility;
   };

   addButton = document.getElementById('addButton');
   addButton.onclick = function() {
      newPlaceField = document.getElementById('newPlaceField');
      newPlaceName = newPlaceField.value;

      // create a new #text node
      let content = document.createTextNode(newPlaceName);
      let newListItem = document.createElement('li');
      newListItem.appendChild(content);

      coolPlaces = document.getElementById('coolPlaces');
      coolPlaces.appendChild(newListItem);
   };

   searchButton = document.getElementById('searchButton');
   searchButton.onclick = function() {
      searchTypeField = document.getElementById('searchType');
      searchType = searchTypeField.value;

      searchKeyField = document.getElementById('searchKey');
      searchKey = searchKeyField.value;

      var foundElement = '';
      if (searchType === 'tag') {
         let results = document.getElementsByTagName(searchKey);
         if (results.length > 0) {
            foundElement = results[0];
         }
      } else if (searchType == 'name') {
         let results = document.getElementsByName(searchKey);
         if (results.length > 0) {
            foundElement = results[0];
         }
      } else if (searchType == 'class') {
         let results = document.getElementsByClassName(searchKey);
         if (results.length > 0) {
            foundElement = results[0];
         }
      }

      if (foundElement !== '') {
         select(foundElement);
      }
   };
};

var currentElement;

function select(element) {
   if (element) {
      if (currentElement) {
         currentElement.className = '';
      }

      element.className = 'selected';
      currentElement = element;
   }
}
