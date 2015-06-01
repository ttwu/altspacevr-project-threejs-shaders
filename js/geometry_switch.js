
//pick geometry --------------------------------------------
function sphereGeometry(){
	if (geometryType == "sphere")
		return;

	geometryType = "sphere";
	geometry = new THREE.SphereGeometry(2.0,80,80);
	
	rebuildGeometry();
}

function torusKnotGeometry(){
	if (geometryType == "torusKnot")
		return;

	geometryType = "torusKnot";
	geometry = new THREE.TorusKnotGeometry(1.5, 0.6, 100, 16);
	
	rebuildGeometry();
}

function octahedronGeometry(){
	if (geometryType == "octahedron")
		return;

	geometryType = "octahedron";
	geometry = new THREE.OctahedronGeometry(2.2);
	
	rebuildGeometry();
}

function torusGeometry(){
	if (geometryType == "torus")
		return;

	geometryType = "torus";
	geometry = new THREE.TorusGeometry(2.0, .8, 16, 100);
	rebuildGeometry();
}

function rebuildGeometry(){
	clearAddedMeshes();
	curShaderFunc();
}