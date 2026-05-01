document.addEventListener("DOMContentLoaded", () => {

  // ========= USER DATA LOAD =========
  const user = JSON.parse(localStorage.getItem("studentData"));

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // ========= PROFILE AUTO FILL =========
  const fullName = user.name ? user.name.trim() : "";
  const parts = fullName.split(" ");

  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";

  if (document.getElementById("firstName"))
    document.getElementById("firstName").value = firstName;

  if (document.getElementById("lastName"))
    document.getElementById("lastName").value = lastName;

  if (document.getElementById("email"))
    document.getElementById("email").value = user.email || "";

  // profile image
  if (user.image) {
    const img1 = document.getElementById("profilePreview");
    const img2 = document.getElementById("headerProfileImg");

    if (img1) {
      img1.src = user.image;
      img1.style.display = "block";
    }

    if (img2) {
      img2.src = user.image;
      img2.style.display = "block";
    }
  }

  // ========= SECTION NAVIGATION =========
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content-section");

  links.forEach(link => {
    link.addEventListener("click", function (e) {

      const page = this.dataset.page;

      // HOME external page
      if (this.getAttribute("href") === "index.html") {
        return; // normal link allow
      }

      e.preventDefault();

      sections.forEach(sec => sec.classList.remove("active"));

      const target = document.getElementById(page);
      if (target) target.classList.add("active");

      const nav = document.getElementById("main-nav-dropdown");
      if (nav) nav.classList.remove("show");
    });
  });

  // ========= MENU TOGGLE =========
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav-dropdown");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  // ========= SAVE PROFILE =========
  const saveBtn = document.getElementById("saveProfile");

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {

      const updatedName =
        document.getElementById("firstName").value + " " +
        document.getElementById("lastName").value;

      user.name = updatedName.trim();
      user.email = document.getElementById("email").value;

      localStorage.setItem("studentData", JSON.stringify(user));

      alert("Profile Updated Successfully");
    });
  }

});

document.addEventListener("DOMContentLoaded", () => {

  /* ========= MENU DROPDOWN ========= */
  const enrolledBtn = document.querySelector(".enrolled-toggle");
  const dropdown = document.querySelector(".dropdown");

  if (enrolledBtn && dropdown) {
    enrolledBtn.addEventListener("click", function(e){
      e.preventDefault();
      dropdown.classList.toggle("open");
    });
  }

  /* ========= CALENDAR ========= */
  const calendarGrid = document.querySelector(".calendar-grid");
  const monthTitle = document.querySelector(".calendar-header h2");

  if(calendarGrid && monthTitle){

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    monthTitle.textContent = monthNames[month] + " " + year;

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    calendarGrid.innerHTML = "";

    days.forEach(day=>{
      calendarGrid.innerHTML += `<div class="day-name">${day}</div>`;
    });

    for(let i=0;i<firstDay;i++){
      calendarGrid.innerHTML += `<div class="day-cell empty"></div>`;
    }

   for(let d=1; d<=totalDays; d++){

  let cls = "day-cell";

  if(
    d === date.getDate() &&
    month === new Date().getMonth() &&
    year === new Date().getFullYear()
  ){
    cls += " today";
  }

  calendarGrid.innerHTML += `<div class="${cls}">${d}</div>`;
}
  }


const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".content-section");

navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();

    const page = this.getAttribute("data-page");

    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(page).classList.add("active");
  });
});



});