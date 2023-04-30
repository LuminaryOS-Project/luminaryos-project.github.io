function fadeBackground() {
    let startColor = [43, 111, 214];
    let endColor = [240, 29, 46];
    let currentColor = startColor.slice();
    let steps = 100;
    let stepSize = 1 / steps;
    let currentStep = 0;
    let direction = 1;
    let timerId = setInterval(function() {
        currentStep += direction;
        for (let i = 0; i < 3; i++) {
            currentColor[i] = Math.round(startColor[i] + (endColor[i] - startColor[i]) * currentStep * stepSize);
        }
        document.documentElement.style.setProperty('--background-grid-color', 'rgb(' + currentColor.join(',') + ')');
        if (currentStep === steps || currentStep === 0) {
            direction = -direction;
        }
    }, 20);
}
fadeBackground();