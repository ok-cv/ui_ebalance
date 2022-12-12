window.ebalanceCookieBanner = (agbUrl) => {
  document.querySelector('body').insertAdjacentHTML('beforeend', `
    <div class="cookiebanner">
      <p>
        Diese Webseite verwendet Cookies um eine optimale Nutzererfahrung
        sicherzustellen. Mit der Verwendung dieser Seite stimmen Sie dem zu.
        <a href="${agbUrl || 'https://ebalance.ch/agb'}">Details ansehen.</a>
      </p>
      <a class="btn is-small">Ich stimme zu</a>
    </div>
  `)
  
  const cookieBanner = document.querySelector('.cookiebanner')
  const cookieButton = document.querySelector('.cookiebanner .btn')
  
  if (document.cookie.indexOf('ebalanceConsentCookie=') === -1) {
    cookieBanner.style.display = 'flex'
  }
  
  cookieButton.onclick = () => {
    const cookieDate = new Date()
    cookieDate.setTime(new Date().getTime() + 86400 * 150)
    
    const rootDomain = window.location.hostname.split('.').slice(-2).join('.')
    
    document.cookie = 'ebalanceConsentCookie = 1; path=/; secure; domain=' + rootDomain + ';samesite=lax; expires=' + cookieDate.toUTCString()
    
    cookieBanner.style.display = 'none'
  }
}
