(() => {
  const toggle = document.querySelector('.offcanvas-toggle')
  const sidebar = document.querySelector('.offcanvas')

  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('is-open')
      sidebar.classList.toggle('is-open')
    })
  }
})()
