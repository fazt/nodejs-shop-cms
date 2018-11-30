// CKEDITOR
ClassicEditor
  .create( document.querySelector('#editor'))

const delBtn = document.querySelector('a.confirm-delete');
if (delBtn) {
  delBtn.addEventListener('click', e => {
    if(!confirm('Are you sure you want to delete it?')) return e.preventDefault();
  });
}
