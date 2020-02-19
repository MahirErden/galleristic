$(document).ready(function () {
  var artsbycategoryForm = $("#artsbycategory");
  var categorySelect = $("#category");
  var arts_container = $(".arts_container");
  var categoryName;
  var arts;
  runTableQuery();

  function runTableQuery() {
    $.ajax({ url: "/artsbycategory/category", method: "GET" })
      .then(function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createCategoryRow(data[i]));
        }
        categorySelect.empty();
        categorySelect.append(rowsToAdd);
        categorySelect.val(data.id);
      });
  }

  function createCategoryRow(category) {
    var listOption = $("<option>");
    listOption.attr("value", category.id);
    listOption.text(category.name);
    return listOption;
  }

  $(artsbycategoryForm).on("submit", getArts());

  function getArts() {
    categoryName = $("#category option:selected").text();
    console.log(categoryName);
    if (categoryName) {
      categoryName = "/?category=" + categoryName;
    }
    $.get("/artsbycategory/api/artsbycategory", categoryName, function(data) {
      console.log("Arts", data);
      arts = data;
      if (!arts || !arts.length) {
        arts_container.empty();
      }
      else {
        initializeRows();
      }
    });
   }

   function initializeRows() {
    console.log("calistim");
    arts_container.empty();
    var artsToAdd = [];
    for (var i = 0; i < arts.length; i++) {
      artsToAdd.push(createNewRow(arts[i]));
    }
    arts_container.append(artsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(art) {
    console.log("art:" + JSON.stringify(art));
    var newArtCard = $("<div>");
    newArtCard.addClass("card");
    var newArtCardHeading = $("<div>");
    newArtCardHeading.addClass("card-header");
    var newArtImage = $("<img >");
    var newArtCardBody = $("<div>");
    newArtCardBody.addClass("card-body");
    var newArtBody = $("<p>");
    var newArtTitle = $("<h3>");
    var newArtYear = $("<h4>");
    var newArtName = $("<h4>");
    newArtImage.attr("src", art.image)
    newArtTitle.text(art.title);
    newArtYear.text(art.year);
    newArtName.text(art.Artist.name);
    newArtCardHeading.append(newArtImage);
    newArtCardBody.append(newArtBody);
    newArtCard.append(newArtCardHeading);
    newArtCard.append(newArtCardBody);
    newArtCard.data("art", art);
    return newArtCard;
  }
});