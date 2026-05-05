document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded")

  const links = document.querySelectorAll("a")

  links.forEach(link => {
    if (link.href.includes(".html")) {
      link.addEventListener("click", function (e) {
        e.preventDefault()

        const url = this.href

        document.body.classList.remove("loaded")
        document.body.classList.add("fade-out")

        setTimeout(() => {
          window.location.href = url
        }, 400)
      })
    }
  })
})