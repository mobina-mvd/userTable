$(document).ready(function () {
  const urlAPI = "https://fakerapi.it/api/v2/persons?_quantity=4&_locale=fa_IR";
  $.get(urlAPI, function (response, status, xhr) {
    // console.log(response.data, status, xhr);

    if (status === "success") {
      const users = response.data;

      users.forEach((user, index) => {
        $("tbody").append(
          "<tr>" +
            "<td>" +
            (index + 1) +
            "</td>" +
            "<td>" +
            user.firstname +
            "</td>" +
            "<td>" +
            user.lastname +
            "</td>" +
            "<td>" +
            user.birthday +
            "</td>" +
            "<td>" +
            user.email +
            "</td>" +
            "</tr>"
        );
      });
    }
  }).fail(function () {
    alert("مشکلی  پیش آمده است.");
  });
});
