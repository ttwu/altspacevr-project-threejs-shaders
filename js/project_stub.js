var scene, camera, renderer;
var envSphere, light1;
var geometry, geometryType;
var curShader;
var curShaderFunc;
var lightMove;

var light1Color;
var uniformsList, meshList;
var ambientColor, diffuseColor, specularColor;
var time, timeIncrement, lightTime;
var FurShader, FresnelShader, AmbDiffSpecShader, ToonOutlineShader;

function init(){
	uniformsList = [];
	meshList = [];
	curShader = "DiffuseShader";
	curShaderFunc = diffuseShader;
	timeIncrement = 0.1;
	lightTime = 0;

	//the essentials - a scene, a camera, a renderer
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.z = 4.0;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	//envir
	var envGeometry = new THREE.SphereGeometry(500, 100, 100);
	var envMaterial = new THREE.MeshBasicMaterial({color: 0x333333, side: THREE.DoubleSide});
	envSphere = new THREE.Mesh(envGeometry, envMaterial);
	scene.add(envSphere);

	//create geometry for textures
	geometry = new THREE.SphereGeometry(2.0,80,80);
	geometryType = "sphere";
	
	//light
	light1Color = new THREE.Color(0.3, 0.8, 0.8);
	light1 = new THREE.PointLight( 0xffffff, 2, 50 );
	//set position
	light1.position.x = 5;
	light1.position.y = 5;
	light1.position.z = 20;
	lightMove = false;

	scene.add(light1);
	
	curShaderFunc();
}
init();
animate(); 

//clear prev shaders before adding new one(s)
function clearAddedMeshes(){
	for (var i=0; i<meshList.length; i++){
		scene.remove(meshList[i]);
	}
}


//animation and render loop--------------------------------
function animate(){
	requestAnimationFrame(animate);
		
	//for phong and fresnel, update light location if light is supposed to be moving
	if (lightMove){
		lightTime += timeIncrement;
		light1.position.x = 5.0 + 20.0*Math.sin(8.0*lightTime/180.0*3.14);
		light1.position.z = 20.0*Math.cos(8.0*lightTime/180.0*3.14);
		meshList[0].material.uniforms.camPos.value = light1.position;
	}

	render();
}

//render loop
function render(){
	renderer.render(scene, camera);
}	


//toggle light rotation ------------------------------------
function toggleLightMove(){
	lightMove = !lightMove;
}

//update if window gets resized-----------------------------
function updateRendererSize(){
	renderer.setSize( window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
}

window.onresize = updateRendererSize;
