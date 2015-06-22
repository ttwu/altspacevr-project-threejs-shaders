/**
 * diffuse shader - simple diffuse shader
 **/
 
//init DiffuseShader --------------------------------
function diffuseShader(){
	clearAddedMeshes();
	curShader = "DiffuseShader";
	curShaderFunc = diffuseShader;
	
	DiffuseShader.uniforms.lightColor.value = light1Color;
	DiffuseShader.uniforms.diffuseColor.value = new THREE.Color(0.8, 0.8, 0.3);
	DiffuseShader.uniforms.lightPos.value = light1.position;
	var material = new THREE.ShaderMaterial(DiffuseShader);
	var mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	meshList[0] = mesh;
}

//--------------------------------------- 
DiffuseShader = {

	uniforms: {
		"camPos": {type: "v3", value: new THREE.Vector3(0.0, 0.0, 4.0) },
		"lightPos": {type: "v3", value: new THREE.Vector3(5.0, 5.0, 20.0) },
		"lightColor": {type: "c", value: new THREE.Color(0.3, 0.8, 0.8)},
		"diffuseColor": {type: "c", value: new THREE.Color(0.8, 0.8, 0.3)},
	},

	vertexShader: [
		"uniform vec3 camPos;",
		"uniform vec3 lightPos;",
		"varying float NdotL;",

		"void main() {",
		"	vec3 V = normalize(camPos - position);",
		"	vec3 L = normalize(lightPos - position);",
		"	NdotL = dot(normal, L);	",
		"	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
		"}"
	].join("\n"),
	
	fragmentShader: [	
		"uniform vec3 lightColor;",
		"uniform vec3 diffuseColor;",
		"varying float NdotL;",

		"void main() {",
		"	vec3 diffuse = max(NdotL, 0.0)* vec3(diffuseColor.r*lightColor.r, diffuseColor.g*lightColor.g, diffuseColor.b*lightColor.b);",
		"	gl_FragColor = vec4(diffuse, 1.0);",
		"}"
	].join("\n")
};

