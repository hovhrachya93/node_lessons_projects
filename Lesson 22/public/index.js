document.addEventListener('DOMContentLoaded', init, false);

function init() {
    const vp = document.getElementById('videoPlayer')
    const vpToggle = document.getElementById('toggleButton')

    vpToggle.addEventListener('click', function () {
        if (vp.paused) {
            vp.play()
        } else {
            vp.pause()
        }
    })
}
