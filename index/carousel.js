document.querySelectorAll('.project-section').forEach(section => {
  const track = section.querySelector('.carousel-track');
  const btnNext = section.querySelector('.btn-next');
  const btnPrev = section.querySelector('.btn-prev');

  let position = 0;
  const gap = 16;
  const card = track.querySelector('.card');
  const cardWidth = card.offsetWidth + gap;

  btnNext.addEventListener('click', () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    position = Math.min(position + cardWidth, maxScroll);
    track.style.transform = `translateX(-${position}px)`;
  });

  btnPrev.addEventListener('click', () => {
    position = Math.max(position - cardWidth, 0);
    track.style.transform = `translateX(-${position}px)`;
  });
});
