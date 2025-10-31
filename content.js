(function removeGray() {
  const css = `
    * {
      -webkit-filter: none !important;
      filter: none !important;
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.documentElement.appendChild(style);

  // Optional: reapply after a delay in case JS re-adds grayscale
  setTimeout(() => {
    document.documentElement.appendChild(style.cloneNode(true));
  }, 1000);
})();