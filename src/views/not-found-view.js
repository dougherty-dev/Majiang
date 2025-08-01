/**
 * @author nido24
 * @module views/not-found-view
 * @property {Function} connectedCallback Render view.
 */

export default class NotFoundView extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
      <header>
        <h2>404</h2>
      </header>
      <main class="center">
        <div>Page not found</div>
      </main>
    `
	}
}
