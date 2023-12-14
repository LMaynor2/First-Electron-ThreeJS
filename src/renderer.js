/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * Attempt to render a 3d image of a Rock =D
 */
const loader = new GLTFLoader();
loader.load( './public/3DModels/Rock.glb', function ( gltf ) {
    scene.add( gltf.scene );
}, undefined, function ( error ) {
    console.error( error );
} );

/**
 * THREE.js Starts here and renders through the Electron BrowserWindow.
 * Scene, Camera, and Renderer are always needed.
 */
const scene = new THREE.Scene();
/**
 * We can do some interesting things with cameras it seems
 * Here is where to do it. Set its position, and its look at (assuming  x, y, z)
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 
window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 20);
camera.lookAt( 0, 0, 0 );


const renderer = new THREE.WebGLRenderer();

/**
 * Sets the window size.  This particualar value sets the window size to match the size of
 * BrowserWindow.  A third argument to setSize() would be to set to false allowing rendering 
 * without changing the size of the frame.  It then appends a <canvas> element to the html document
 */
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/**
 * This creates a 3d Shape, Produces a Mesh for it (In this case the color green),
 * applies the Mesh to the 3d Shape,
 * Then adds it to the scene.
 */
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

/**
 * Gonna define a material.  In this case blue line
 */
const materialTwo = new THREE.LineBasicMaterial( { color: 0x0000ff } );


/**
 * Now we need some geometry with some vertices...
 * Lines are drawn between each consecutive pair of vertices, but not between the first and last
 * (the line is not close)
 */
const points = [];
points.push( new THREE.Vector3( -10, 0, 0 ) );
points.push( new THREE.Vector3(  0, 10, 0 ) );
points.push( new THREE.Vector3(  10, 0, 0 ) );

const geometryTwo = new THREE.BufferGeometry().setFromPoints( points )
const line = new THREE.Line( geometryTwo, materialTwo)
scene.add( line );

/**
 * Required for THREE.js to function.  This is the process that gives the object animation
 * 
 */
function animate() {
    requestAnimationFrame(animate);
    /**
     * In the following code we animate the cube
     * z is front facing spin
     * x is head over heel, or front/back flip
     * y is like seeing the davinci man spin on his heels.
     * +/- is the direction.
     * 0.01 is the speed.  In this case it will make one complete revolution in 10.47 seconds?
     * (2 * 3.14) / Rotation speed per second.
     */
    cube.rotation.x += 0.01;
    //cube.rotation.z += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

console.log('👋 This message is being logged by "renderer.js", included via webpack');
