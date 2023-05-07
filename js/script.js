const searchInput = document.getElementById("searchInput");
const searchList = document.getElementById("searchList");

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
        searchList.innerHTML = filteredItems.map(item => `<li>${item}</li>`).join("");
    }
    
    searchInput.addEventListener("input", updateSearchList);
    updateSearchList();
})