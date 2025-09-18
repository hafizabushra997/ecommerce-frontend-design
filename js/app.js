    // ✅ Generic Dropdown Setup
    function setupDropdown(dropdownSelector, buttonSelector, menuSelector, textSelector, imgSelector) {
      const dropdown = document.querySelector(dropdownSelector);
      if (!dropdown) return;

      const button = dropdown.querySelector(buttonSelector);
      const menu = dropdown.querySelector(menuSelector);
      const textEl = button.querySelector(textSelector);
      const imgEl = button.querySelector(imgSelector);

      // Toggle dropdown
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("active");
      });

      // Update selection
      menu.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", () => {
          const text = item.dataset.country || item.dataset.language;
          const flag = item.dataset.flag;

          textEl.textContent = text;
          imgEl.src = flag;

          menu.classList.remove("active");
        });
      });

      // Close when clicking outside
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          menu.classList.remove("active");
        }
      });
    }

    // ✅ Initialize both dropdowns
    setupDropdown(".shipToDropdown", "#ship-to-btn", "#ship-to-menu", "span", "#flag-image");
    setupDropdown(".languageDropdown", "#language-btn", "#language-menu", "span", "#language-flag");

// <-----------------------xxx------------------------>

