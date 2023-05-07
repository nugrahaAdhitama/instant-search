const searchInput = document.getElementById("searchInput");
const searchList = document.getElementById("searchList");

const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Fig",
    "Grape",
    "Kiwi",
    "Lemon",
    "Mango",
    "Orange",
    "Peach",
    "Plum",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Watermelon"
];

function updateSearchList() {
    const searchValue = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item => item.toLowerCase().includes(searchValue));
    searchList.innerHTML = filteredItems.map(item => `<li>${item}</li>`).join("");
}

searchInput.addEventListener("input", updateSearchList);
updateSearchList();