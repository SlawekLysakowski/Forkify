import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { isView } from 'core-js/internals/array-buffer-view-core';


class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateBtnRight() {
    const nextPage = this._data.page + 1;
    return `
          <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
            <span>${nextPage}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
  }

  _generateBtnLeft() {
    const previousPage = this._data.page - 1;
    return `
            <button data-goto="${previousPage}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>${previousPage}</span>
            </button>
            `
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);

      handler(goToPage);


    })
  }


  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    console.log(numPages);

    if ( currentPage === 1 && numPages > 1) {
      return this._generateBtnRight();
    }
    if (currentPage === numPages && numPages > 1) {
      return this._generateBtnLeft();
    }
    if (currentPage < numPages) {
     return [this._generateBtnLeft(), this._generateBtnRight()];
    }

  return '';
  }
}

export default new PaginationView();
