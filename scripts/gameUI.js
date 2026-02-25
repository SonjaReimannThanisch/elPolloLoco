function injectStartScreen() {
  if (document.getElementById('startscreen')) return;
  let markup = `
    <div id="startscreen" class="overlay-start">
      <div class="start-wrap">
        <img class="start-instructions" src="img/6.Botones/Instructions 2.png" alt="Instructions">

        <button id="btn-start" class="img-btn" aria-label="Start">
          <img src="img/6.Botones/Start/1.png" alt="Start">
        </button>

        <div class="start-footer">
          <button id="btn-fullscreen" class="img-btn small" aria-label="Fullscreen">
            <img src="img/6.Botones/Full Screen/Mesa de trabajo 9.png" alt="Full screen">
          </button>

          <a class="impressum-link" href="impressum.html">Impressum</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('fullscreen').insertAdjacentHTML('beforeend', markup);
}


function bindStartUi(worldInstance) {
  document.getElementById('btn-start')?.addEventListener('click', () => {
    document.getElementById('startscreen')?.classList.add('hidden');
    worldInstance.startGame();
  });

  document.getElementById('btn-fullscreen')?.addEventListener('click', async () => {
    const el = document.getElementById('fullscreen');
    if (!el) return;

    if (!document.fullscreenElement) enterFullscreen(el);
    else exitFullscreen();
  });
}


function enterFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {       // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  }
}

function exitFullscreen() { console.log('exit');
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

