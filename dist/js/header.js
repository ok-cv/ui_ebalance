(() => {
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header')

    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY >= 5)
    }
  })
})()
