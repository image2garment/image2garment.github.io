document.addEventListener('DOMContentLoaded', function () {
const zoomables = document.querySelectorAll('.zoomable');
zoomables.forEach(img => {
  let scale = 1;
  let offsetX = 0, offsetY = 0;
  let isDragging = false;
  let startX = 0, startY = 0;

  const fitImage = () => {
    const container = img.parentElement;
    const ratio = img.naturalWidth / img.naturalHeight;
    if (ratio > 1) { img.style.width = '100%'; img.style.height = 'auto'; }
    else { img.style.height = '100%'; img.style.width = 'auto'; }
  };
  if (img.complete) fitImage();
  else img.addEventListener('load', fitImage);

  img.parentElement.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.1 : 0.9;
    scale *= delta;
    scale = Math.min(Math.max(1, scale), 5);
    img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  });

  img.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
    img.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  });

  window.addEventListener('mouseup', e => {
    isDragging = false;
    img.style.cursor = 'grab';
  });
});

});
