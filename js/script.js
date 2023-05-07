const searchInput = document.getElementById("searchInput");
const searchList = document.getElementById("searchList");
let currentPage = 1;
const itemsPerPage = 10;

async function fetchData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

fetchData().then(users => {
    const items = users.map(user => user.name);

    function updateSearchList() {
        const searchValue = searchInput.value.toLowerCase();
        const filteredItems = items.filter(item => item.toLowerCase().includes(searchValue));
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleItems = filteredItems.slice(startIndex, endIndex);
        searchList.innerHTML = visibleItems.map(item => `<li>${highlightSearch(item, searchValue)}</li>`).join("");
    }    

    searchInput.addEventListener("input", updateSearchList);
    updateSearchList();
})

function highlightSearch(text, searchValue) {
    const index = text.toLowerCase().indexOf(searchValue);
    if (index === -1) {
        return text;
    }
    const beforeMatch = text.slice(0, index);
    const match = text.slice(index, index + searchValue.length);
    const afterMatch = text.slice(index + searchValue.length);
    return `${beforeMatch}<span class="highlight">${match}</span>${afterMatch}`;
}

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loader.style.display = "block";
        currentPage++;
        updateSearchList();
        loader.style.display = "none";
    }
})