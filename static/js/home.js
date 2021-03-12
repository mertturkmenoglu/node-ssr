window.addEventListener('load', () => {
    const btn = document.getElementById('searchButton');
    btn.addEventListener('click', () => {
        document.getElementById('spinner')
            .classList
            .replace('visually-hidden', 'visible')
    })
})