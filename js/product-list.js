
// Sidebar Section functionality

document.querySelectorAll(".sidebar-section").forEach(section => {
    const header = section.querySelector(".sidebar-header");
    const content = section.querySelector(".sidebar-content");

    header.addEventListener("click", () => {
      section.classList.toggle("active");
      content.style.display = content.style.display === "none" ? "block" : "none";
    });

    // Initially show content
    content.style.display = "block";
  });