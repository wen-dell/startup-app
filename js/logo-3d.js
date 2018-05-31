var scene = new THREE.Scene();
scene.background = new THREE.Color();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("logo3d").appendChild(renderer.domElement);

var geometry = new THREE.OctahedronGeometry(1, 0);

var edges = new THREE.EdgesGeometry(geometry);
var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xab47bc }));

var loader = new THREE.FontLoader();

scene.add(line);

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame(animate);

    line.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();