const template = document.createElement("template")
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<header class="hero is-small is-primary is-bold p-2">
<div class="hero-body">
  <div class="container">
    <h1 class="title">HW-3 Link Buddy!</h1>
    <h2 class="subtitle">Save your favorite links</h2>
  </div>
</div>
</header>
`
export class MyHero extends HTMLElement{
    constructor(){
        super()
        //Attach a shadow DOM tree to this instance - this creates a ".shadowRoot"
        this.attachShadow({ mode: "open" })
        //Clone "template and append it"
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}
customElements.define("my-hero",MyHero)
