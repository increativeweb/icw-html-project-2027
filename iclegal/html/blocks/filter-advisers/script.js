document.addEventListener("DOMContentLoaded", function () {
    const cards = [...document.querySelectorAll(".advisers-card")];
    const filterGroups = [...document.querySelectorAll(".filter-lists")];
    const resetBtn = document.querySelector(".reset-filter");
    const noData = document.querySelector(".alert-no-data");
    const totalCards = cards.length;
    // Initial State
    if (resetBtn) resetBtn.style.display = "none";
    if (noData) noData.style.display = "none";
    function updateCount(visible) {
        document.querySelectorAll(".filter-count").forEach(el => {
            el.textContent = `${String(visible).padStart(2, "0")} / ${String(totalCards).padStart(2, "0")} showing`;
        });
    }
    function applyFilters() {
        const filters = {};
        // Show/Hide Reset Button
        if (resetBtn) {
            resetBtn.style.display = document.querySelector(".filter-item.active") ? "" : "none";
        }
        // Get Active Filters
        filterGroups.forEach(group => {
            const label = group.querySelector(".filter-label") ?.textContent .replace(":", "").trim().toLowerCase();
            const active = [...group.querySelectorAll(".filter-item.active")].map(item => item.textContent.trim().replace(/\s*\/\s*/g, "/").toLowerCase());
            if (active.length) {filters[label] = active;}
        });
        let visible = 0;
        cards.forEach(card => {
            let matched = true;
            for (const group in filters) {
                const info = [...card.querySelectorAll(".personal-info")].find(item => {
                    const title = item.querySelector(".title")?.textContent.replace(":", "").trim().toLowerCase();
                    return (
                        (group === "language" && title === "languages") ||
                        (group === "speciality" && title === "specialties")
                    );
                });
                if (!info) {
                    matched = false; break;
                }
                const values = [...info.querySelectorAll("span")].map(
                    span =>span.textContent.trim().replace(/\s*\/\s*/g, "/").toLowerCase()
                );
                // OR within same group
                if (!filters[group].some(value => values.includes(value))) {
                    matched = false;
                    break;
                }
            }
            card.style.display = matched ? "" : "none";
            if (matched) visible++;
        });
        updateCount(visible);
        // Show/Hide No Data
        if (noData) {
            noData.style.display = visible ? "none" : "";
        }
    }
    // Filter Click
    document.querySelectorAll(".filter-item").forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            this.classList.toggle("active");
            applyFilters();
        });
    });
    // Reset All Filters
    if (resetBtn) {
        resetBtn.addEventListener("click", function (e) {
            e.preventDefault();
            // Remove active from ALL filter items
            document.querySelectorAll(".filter-item.active").forEach(item => {
                item.classList.remove("active");
            });
            applyFilters();
        });
    }
    // Initial Count
    updateCount(totalCards);
});