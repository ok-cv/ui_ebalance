const iosSafari = () => {
  /* https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi */
  const _overlay = document.querySelector('.offcanvas ul')
  let _clientY = null

  const isOverlayTotallyScrolled = () => {
    return _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight
  }

  const disableRubberBand = (e) => {
    const clientY = e.targetTouches[0].clientY - _clientY

    if (_overlay.scrollTop === 0 && clientY > 0) e.preventDefault()

    if (isOverlayTotallyScrolled() && clientY < 0) e.preventDefault()
  }

  if (_overlay) {
    _overlay.addEventListener(
      'touchstart',
      (e) => {
        if (e.targetTouches.length === 1) _clientY = e.targetTouches[0].clientY
      },
      false
    )

    _overlay.addEventListener(
      'touchmove',
      (e) => {
        if (e.targetTouches.length === 1) disableRubberBand(e)
      },
      false
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  iosSafari()
})
