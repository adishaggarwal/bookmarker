
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){

  e.preventDefault();
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;
  
  if(!siteName || !siteUrl)
  {
    alert('Please fill the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex))
  {
    alert('Please use a valid URL');
    return false;
  }


  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Test if bookmarks is null
  if(localStorage.getItem("bookmarks") === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }


  fetchBookmarks();
  
}

// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Loop through the bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+(url)+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}