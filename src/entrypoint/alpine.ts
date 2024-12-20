import type { Alpine } from 'alpinejs';

export default (Alpine: Alpine) => {
  Alpine.data('astro', () => ({
    pageLoaded: 1,
    refreshOnPageLoad: {
      ['@astro:page-load.document']() {
        this.pageLoaded++;
      }
    }
  }));
};
