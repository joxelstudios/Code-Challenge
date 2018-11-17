$(document).ready(function () {

  const handleFilter = function () {
    let value = $('input[name=filter]:checked').val();
    console.log(value);
    $.getJSON(`/dealers/${value}`, function (data) {
      // Call our function to generate a table body
      $(".business-cards").empty();

      console.log(data);
      data.forEach(element => {
        console.log(element.data.name);
        let business = element.data;
        let name = business.name;
        let weekHours = business.weekHours.mon;
        let satHours = business.weekHours.sat;
        let sunHours = business.weekHours.sun;
        let phone = business.phone1;
        let certs = business.certifications;
        console.log(certs);

        let newCard = $(
          `<div class="col-4 col-12-sm">
          <div class="card">
            <div class="container">
                <div class="row">
                    <h2><b>${name}</b></h2>
                    <hr>
                </div>
                <div class="row">
                    <h2 class="business-phone"><img src="/assets/phone-icon-desktop.png" style="width: 30px;">
                        <b>${phone}</b></h2>
                </div> 
                <div class="row">
                    <p id="email-text">Can't talk now? Click below to send an email.</p> <button class="contact-pro-button" data-title=\"${name}\" id="contact" ><img
                            src="/assets/email-icon.png" style="width: 15px;"> Contact this Pro</button>
                </div>
                <div class="row">
                  <p><b>Business Hours:</b></p>
                </div>
                <div class="row">
                    <ul class="business-hours">
                        <li>Weekdays: ${weekHours}</li>
                        <li>Saturdays: ${satHours}</li>
                        <li>Sundays: ${sunHours}</li>
                    </ul>
                </div>
            </div>
            <footer>
                <div class="row">
                </div>
                <div class="row">           
                </div>
        </div>
        </footer>
    </div>
      </div>`);

        certs.forEach(element => {
          if (element === "Installation Pro") {
            newCard.find("footer .row:nth-of-type(1)").append(`<div class="col-6 pro"> <img src="/assets/star-installation-pro.png" style="width: 10px;"><label>Installation Pro</label></div>`);
            console.log(`Appending Installation Pro to ${name}`);

          }
          if (element === "Commercial Pro") {
            newCard.find("footer .row:nth-of-type(2)").append(`<div class="col-6 pro"> <img src="/assets/users-commercial-pro.png" style="width: 10px;"> <label>Commercial Pro </label> </div>`);
            console.log(`Appending Commercial Pro to ${name}`)
          }
          if (element === "Residential Pro") {
            newCard.find("footer .row:nth-of-type(2)").append(`<div class="col-6 pro"> <img src="/assets/home-residential-pro.png" style="width: 10px;"> <label>Residential Pro </label> </div>`);
            console.log(`Appending Residential Pro to ${name}`)
          }
          if (element === "Service Pro") {
            newCard.find("footer .row:nth-of-type(1)").append(`<div class="col-6 pro"> <img src="/assets/gear-service-pro.png" style="width: 10px;"><label>Service Pro</label></div>`);
            console.log(`Appending Service Pro to ${name}`)
          }
        });
        $(".business-cards").append(newCard);
        $("#contact").click(function () {
          console.log("Modal me!");
          $("#contactModal").css("display", "block");
        });


      });
    });
  };

  $(".filter-form").on("change", handleFilter);



  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal 

  $(document).on("click","#contact", function(){
    $(".modal").css("display", "block");
    $(".modal-dealerName").text($(this).data("title"));
  });



  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    $(".modal").css("display", "none");
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == $(".modal")) {
      $(".modal").css("display", "none");
    }
  }
});