import './css/styles.css';
import colorApi from './js/apiService';
import colorListItemsTemplate from './template/content.hbs';
// import PNotify from 'pnotify/dist/es/PNotify.js';
// import PNotifyStyleMaterial from 'pnotify/dist/PNotifyBrightTheme.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  colorList: document.querySelector('.gallery'),
  searchInput: document.querySelector('.search__input'),
  loadMoreBnt: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', searchFormInputHandler);

function searchFormInputHandler(e) {
  e.preventDefault();

  clearListItems();
  refs.loadMoreBnt.addEventListener('click', loadMoreBtnHandler);

  const form = e.currentTarget;
  const input = form.elements.query;
  const inputValue = input.value;
  colorApi.query = inputValue;

  colorApi.fetchColor().then(data => {
    insertListItem(data);
    console.log(window.scrollY);
  });
}

function loadMoreBtnHandler() {
  colorApi.fetchColor().then(data => {
    insertListItem(data);
    window.scrollTo({
      top: window.scrollY -600,
      behavior: 'smooth',
    });
  });
}

function insertListItem(data) {
  const markup = colorListItemsTemplate(data);
  refs.colorList.insertAdjacentHTML('beforeend', markup);

}

function clearListItems() {
  refs.colorList.innerHTML = '';
  colorApi.resetPage();
  refs.loadMoreBnt.removeEventListener('click', loadMoreBtnHandler);
}
