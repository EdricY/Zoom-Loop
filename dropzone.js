export default function setUpDropZone(el, dropHandler) {
  const dropZone = el;
  function showDropZone() {
    dropZone.classList.add("shown");
  }
  function hideDropZone() {
    dropZone.classList.remove("shown");
  }
  function allowDrag(e) {
    e.dataTransfer.dropEffect = 'copy';
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    hideDropZone();
    
    dropHandler.call(window, e);
  }
  
  window.addEventListener('dragenter', function(e) {
    showDropZone();
  });
  dropZone.addEventListener('dragenter', allowDrag);
  dropZone.addEventListener('dragover', allowDrag);
  dropZone.addEventListener('dragleave', function(e) {
    hideDropZone();
  });
  dropZone.addEventListener('drop', handleDrop);
}