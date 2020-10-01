$(".filter").on("keyup", function() {
    var input = $(this).val().toUpperCase();
  
    $(".card").each(function() {
      if ($(this).data("string").toUpperCase().indexOf(input) < 0) {
        $(this).hide();
      } else {
        $(this).show();
      }
    })
  });