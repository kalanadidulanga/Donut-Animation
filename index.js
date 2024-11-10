(function () {
    let preTag = document.getElementById('donut');

    let A = 1;
    let B = 1;
    let R1 = 1;
    let R2 = 2;
    let K1 = 150;
    let K2 = 5;

    function renderAsciiFrame() {
        let b = [];
        let z = [];

        let width = 200;
        let height = 80;

        A += 0.07;
        B += 0.03;

        let cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B);

        for (let k = 0; k < width * height; k++) {
            b[k] = k % width === width - 1 ? '\n' : ' ';
            z[k] = 0;
        }

        for (let j = 0; j < 6.28; j += 0.07) {
            let ct = Math.cos(j);
            let st = Math.sin(j);

            for (let i = 0; i < 6.28; i += 0.02) {
                let sp = Math.sin(i);
                let cp = Math.cos(i);
                let h = ct + 2;
                let D = 1 / (sp * h * sA + st * cA + 5);
                let t = sp * h * cA - st * sA;

                let x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                let y = Math.floor(height / 2 + (height / 2) * D * (cp * h * sB + t * cB));
                let o = x + width * y;

                let N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
                if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                    z[o] = D;
                    b[o] = ".,-~:;=!*#$@"[Math.max(N, 0)];
                }
            }
        }

        preTag.innerHTML = b.join('');
    }

    function startAsciiAnimation() {
        window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
    }

    window.addEventListener('load', startAsciiAnimation);
    window.addEventListener('resize', renderAsciiFrame);
})();
