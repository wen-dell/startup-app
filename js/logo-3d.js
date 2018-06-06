var scene = new THREE.Scene();
scene.background = new THREE.Color(0x141414);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var geometry = new THREE.OctahedronGeometry(1, 0);
var edges = new THREE.EdgesGeometry(geometry);
var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xab47bc }));

var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
var scene, renderer;
var particles, particle, count = 0;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function init() {
    particles = new Array();
    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial({
        color: 0xab47bc,
        program: function (context) {
            context.beginPath();
            context.arc(0, 0, 0.5, 0, PI2, true);
            context.fill();
        }
    });
    var i = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++] = new THREE.Sprite(material);
            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2) * 2.2;
            scene.add(particle);
        }
    }
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("logo3d").appendChild(renderer.domElement);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (- mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);
    var i = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++];
            particle.position.y = (Math.sin((ix + count) * 0.5) * 50) +
                (Math.sin((iy + count) * 0.5) * 50);
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 +
                (Math.sin((iy + count) * 0.5) + 1) * 4;
        }
    }
    renderer.render(scene, camera);
    count += 0.1;
}

scene.add(line);

camera.position.z = 5;
camera.position.y = 10;

var animate = function () {
    requestAnimationFrame(animate);

    render();

    line.rotation.y += 0.01;

    renderer.render(scene, camera);
};

init();
animate();
