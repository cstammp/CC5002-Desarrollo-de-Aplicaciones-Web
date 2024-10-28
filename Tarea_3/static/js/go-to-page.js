const goToNextPage = () => {
    const nextPageButton = document.getElementById('nextpage-btn');
    let currentPage = parseInt(nextPageButton.getAttribute('data-current-page'));
    
    let nextPage = currentPage + 1;
    
    window.location.href = `/ver-dispositivos/${nextPage}`;
}

const goToPrevPage = () => {
    const prevPageButton = document.getElementById("prevpage-btn");
    let currentPage = parseInt(prevPageButton.getAttribute("data-current-page"));

    let prevPage = currentPage - 1;
    window.location.href = `/ver-dispositivos/${prevPage}`;
}