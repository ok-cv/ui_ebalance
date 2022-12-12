const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const routes = [
  {
    path: '/',
    component: {
      template: Styleguide
    }
  },
  {
    path: '/typography',
    component: {
      template: Typography
    }
  },
  {
    path: '/layout',
    component: {
      template: Layout
    }
  },
  {
    path: '/components',
    component: {
      template: Components
    },
    children: [
      {
        path: '',
        component: {
          template: ComponentsOverview
        }
      },
      {
        path: 'inputs',
        component: {
          template: ComponentsInputs
        }
      },
      {
        path: 'backoffice',
        component: {
          template: ComponentsBackoffice
        }
      },
      {
        path: 'notifications',
        component: {
          template: ComponentsNotifications
        }
      }
    ]
  },
  {
    path: '/icons',
    component: {
      template: Icons
    }
  },
  {
    path: '/pages',
    component: {
      template: Pages
    }
  }
]

const app = Vue.createApp({
  methods: {
    renderColor () {
      const rgb2hex = (rgb) => {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    
        const hex = (x) => ('0' + parseInt(x).toString(16)).slice(-2)
      
        return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3])
      }

      const read = $$('.js-read-color')
      const write = $$('.js-write-color')

      read.forEach((cur, i) => {
        const string = window.getComputedStyle(cur).backgroundColor
      
        write[i].innerText = rgb2hex(string).toUpperCase()
      })
    },
    renderRange () {
      const ranges = $$('.range')

      ranges.forEach((range) => {
        const start = range.dataset.start
        const end = range.dataset.end
        const value = range.dataset.value

        const rangeValues = (start, end) => {
          const rangeArray = []

          for (let i = start; i <= end; i++) rangeArray.push(i - start)

          return rangeArray
        }

        const arr = rangeValues(start, end)
        let steps = ''

        arr.forEach((cur) => {
          if (end - start >= 100) {
            if (cur % 10 === 0) {
              steps += `<div class="range-step"></div>`
            }
          } else {
            steps += `<div class="range-step"></div>`
          }
        })

        const html = `
          <div class="range">
            <div class="range-ui">
              ${steps}
              <div class="range-track"></div>
            </div>
            <div class="range-ui is-empty" style="clip-path: inset(0 -5px 0 calc((100% / calc(${end} - ${start})) * calc(var(--myvar) - ${start})))">
              ${steps}
              <div class="range-track"></div>
            </div>
            <div class="range-marker" style="left: calc((100% / calc(${end} - ${start})) * calc(var(--myvar) - ${start}))">
              <span></span>
            </div>
            <input class="range-input" type="range" min="${start}" max="${end}" step="1" value="${value}">
          </div>
        `

        range.insertAdjacentHTML('beforeend', html)
      })

      const rangesInputs = $$('.range input[type="range"]')

      rangesInputs.forEach((cur) => {
        cur.parentNode.style.setProperty('--myvar', cur.value)
        cur.parentNode.querySelector(':scope .range-marker span').innerText = cur.value == 41 ? '40+' : cur.value

        cur.addEventListener('input', (ev) => {
          ev.target.parentNode.style.setProperty('--myvar', ev.target.value)
          ev.target.parentNode.querySelector(':scope .range-marker span').innerText = ev.target.value == 41 ? '40+' : ev.target.value
        })
      })
    },
    copyIcon () {
      const input = $('.docs-icon-copy')
      const icons = $$('.docs-icon')

      icons.forEach((cur) => {
        cur.addEventListener('click', (ev) => {
          input.value = '<div class="' + ev.target.querySelector('.icon').className + '"></div>'
          input.select()

          document.execCommand('copy')

          icons.forEach((cur) => cur.classList.remove('docs-icon-copied'))

          cur.classList.add('docs-icon-copied')
        })
      })
    },
    handleApp () {
      const self = this.$route.path

      if (self === '/') this.renderColor()
      if (self === '/components/inputs') this.renderRange()
      if (self === '/icons') this.copyIcon()

      window.scroll(0, 0)
    }
  },
  mounted: function () {
    this.handleApp()
  },
  updated: function () {
    this.handleApp()
  }
})

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

app.use(router)

app.mount('#vue')
