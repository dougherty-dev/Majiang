/**
 * @author nido24
 * @module not-found-view
 * @property {Function} connectedCallback Render view.
 */

export default class NotFoundView extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
      <header>
        <h2>404</h2>
      </header>
      <main class="center">
        <div>Ingen sådan sida</div>
      </main>
    `
	}
}
