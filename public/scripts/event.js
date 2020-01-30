const input = document.getElementById('location');

if (input) {
  const defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));
  const searchBox = new google.maps.places.SearchBox(input, {
    bounds: defaultBounds
  });
}

const modal = document.getElementById('modal-delete');
const closeModal = () => {
  modal.style.display = 'none';
  document.getElementsByTagName('body')[0].removeAttribute('style')
}
const openModal = (url) => {
  modal.style.display = 'block';
  document.getElementById('delete-book').setAttribute('href', url)
  document.getElementsByTagName('body')[0].setAttribute('style', 'overflow:hidden;')
}

const span = document.getElementsByClassName('close')[0];
const btnClose = document.getElementById('btn-close-modal')

span.onclick = () => {
  closeModal()
}

btnClose.onclick = () => {
  closeModal()
}

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal()
  }
}