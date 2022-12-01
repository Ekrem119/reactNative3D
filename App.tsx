import React from "react";
import { View } from "react-native";
import Expo from "expo";
import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  BoxGeometry,
  SphereGeometry
} from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { StatusBar } from "expo-status-bar";

const App = () => {

  const onContextCreate = async (gl: any) => {
    // three.js implementation.
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };

    // set camera position away from cube
    camera.position.z = 2;

    const renderer = new Renderer({ gl });
    // set size of buffer to be equal to drawing buffer width
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // create cube
    // define geometry
    const geometry = new SphereGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: "cyan",
    });

    const sphere = new Mesh(geometry, material);

    // add cube to scene
    scene.add(sphere);

    // create render function
    const render = () => {
      requestAnimationFrame(render);
      // create rotate functionality
      // rotate around x axis
      sphere.rotation.x += 0.01;

      // rotate around y axis
      sphere.rotation.y += 0.01;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    // call render
    render();
  };

  return (
    <View>
      <GLView
        onContextCreate={onContextCreate}
        // set height and width of GLView
        style={{ width: 400, height: 400 }}
      />
    </View>
  );
};

export default App;

