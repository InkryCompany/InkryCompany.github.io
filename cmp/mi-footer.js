class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = 
      `<p>
        Copryright &copy; 2021 Carrillo Portugal José Genaro
      </p>`;
  }
}
customElements.define("mi-footer", MiFooter);
