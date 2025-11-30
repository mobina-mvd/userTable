$(document).ready(function () {
  const fname = $("#fname");
  const lname = $("#lname");
  const bDate = $("#bdate");
  const email = $("#email");
  const city = $("#city");
  const address = $("#address");

  const validation = $(".validation");
  const search = $(".search");

  const savedData = JSON.parse(localStorage.getItem("tableData")) || [];

  const urlAPI =
    "https://fakerapi.it/api/v2/persons?_quantity=15&_locale=fa_IR";
  $.get(urlAPI, function (response, status, xhr) {
    // console.log(response.data, status, xhr);

    if (status === "success") {
      const users = response.data;

      users.forEach((user, index) => {
        let userAddress = user.address;

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
            "<td>" +
            userAddress.city +
            "</td>" +
            "<td>" +
            userAddress.street +
            "</td>" +
            "</tr>"
        );
      });
    }
    savedData.forEach((item) => {
      addItemToDOM(
        item.fname,
        item.fname,
        item.bDate,
        item.email,
        item.city,
        item.address
      );
    });
  }).fail(function () {
    alert("مشکلی  پیش آمده است.");
  });

  $("form").submit(function (e) {
    e.preventDefault();
    // console.log(fname.val());
    if (
      fname.val() === "" ||
      lname.val() === "" ||
      bDate.val() === "" ||
      email.val() === "" ||
      city.val() === "" ||
      address.val() === ""
    ) {
      validation
        .html("حداقل یکی از باکس ها رو خالی گذاشتی!!!!")
        .css({ color: "red", margin: "20px" });
      return;
    } else {
      validation.html("").css("display", "none");
    }

    checkIfItemExists(
      fname.val(),
      lname.val(),
      bDate.val(),
      email.val(),
      city.val(),
      address.val()
    );

    addItemToDOM(
      fname.val(),
      lname.val(),
      bDate.val(),
      email.val(),
      city.val(),
      address.val()
    );

    addItemToStorage(
      fname.val(),
      lname.val(),
      bDate.val(),
      email.val(),
      city.val(),
      address.val()
    );

    fname.val("");
    lname.val("");
    bDate.val("");
    email.val("");
    city.val("");
    address.val("");
  });

  function checkIfItemExists(fname, lname, bDate, email, city, address) {
    validation
      .html("داری آیتم تکراری درج میکنی دقت کن!!!")
      .css({ color: "yellow", margin: "20px" });
  }

  function addItemToStorage(fname, lname, bDate, email, city, address) {
    savedData.push({
      fname: fname,
      lname: lname,
      bDate: bDate,
      email: email,
      city: city,
      address: address,
    });
    localStorage.setItem("tableData", JSON.stringify(savedData));
  }

  function addItemToDOM(fname, lname, bDate, email, city, address) {
    // console.log(fname, lname, bDate, email, city, address);

    $("tbody").append(
      `<tr>
      <td>#</td>
   <td>${fname}</td>
   <td>${lname}</td>
   <td>${bDate}</td>
   <td>${email}</td>
   <td>${city}</td>
   <td>${address}</td>
   </tr>`
    );
    console.log("apendd shod");
  }

  search.on("keyup", function () {
    var value = $(this).val().toLowerCase();

    $("tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().includes(value));
    });
  });
});
