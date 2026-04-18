"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils, VRM } from "@pixiv/three-vrm";
import { setVRM, isSpeaking, currentEmotion } from "@/lib/vrmController";

export default function VRMViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vrmRef = useRef<VRM | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    console.log("VRMViewer mounted");

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    camera.position.set(0, 1.4, 1.6); // lebih dekat
    camera.lookAt(0, 1.4, 0); // fokus ke dada

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );

    containerRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    loader.load("/mykisah/sample.vrm", (gltf) => {
      console.log("VRM LOADED");

      const vrm = gltf.userData.vrm as VRM;
      vrmRef.current = vrm;

      setVRM(vrm);

      // optimization
      VRMUtils.removeUnnecessaryVertices(gltf.scene);
      VRMUtils.removeUnnecessaryJoints(gltf.scene);

      // FIX POSITION & SCALE
      vrm.scene.position.set(0, -1.35, 0); 
      vrm.scene.scale.set(2, 2, 2);

      console.log("MODEL POSITION:", vrm.scene.position);

      scene.add(vrm.scene);
    });

    const clock = new THREE.Clock();

    // FOLLOW MOUSE
    const handleMouseMove = (e: MouseEvent) => {
      const vrm = vrmRef.current;
      if (!vrm) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.3;

      const neck = vrm.humanoid.getNormalizedBoneNode("neck");
      if (neck) {
        neck.rotation.y = x;
        neck.rotation.x = y;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ANIMATION LOOP
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const vrm = vrmRef.current;

      if (vrm) {
        vrm.update(delta);

        // idle movement
        const head = vrm.humanoid.getNormalizedBoneNode("head");

        if (head) {
          head.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.1;
          head.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.05;
        }

        
        const leftUpperArm = vrm.humanoid.getNormalizedBoneNode("leftUpperArm");
        const rightUpperArm = vrm.humanoid.getNormalizedBoneNode("rightUpperArm");
        const leftLowerArm = vrm.humanoid.getNormalizedBoneNode("leftLowerArm");
        const rightLowerArm = vrm.humanoid.getNormalizedBoneNode("rightLowerArm");
        const rightHand = vrm.humanoid.getNormalizedBoneNode("rightHand");

        if (leftUpperArm && rightUpperArm && leftLowerArm && rightLowerArm) {
          // Pose Tangan Kiri lurus ke bawah
          leftUpperArm.rotation.x = 0;
          leftUpperArm.rotation.y = 0;
          leftUpperArm.rotation.z = -Math.PI / 2.2; 
          leftLowerArm.rotation.x = 0;
          leftLowerArm.rotation.y = 0;
          leftLowerArm.rotation.z = 0;

          // Pose Tangan Kanan lurus ke bawah
          rightUpperArm.rotation.x = 0;
          rightUpperArm.rotation.y = 0; 
          rightUpperArm.rotation.z = Math.PI / 2.2; 
          rightLowerArm.rotation.x = 0; 
          rightLowerArm.rotation.y = 0; 
          rightLowerArm.rotation.z = 0; 
        }

        if (leftUpperArm && rightUpperArm) {
          // Tambahkan sedikit pergerakan nafas dinamis di bahu
          leftUpperArm.rotation.z += Math.sin(clock.elapsedTime) * 0.005;
          rightUpperArm.rotation.z -= Math.sin(clock.elapsedTime) * 0.005;
        }

        const chest = vrm.humanoid.getNormalizedBoneNode("chest");
        const spine = vrm.humanoid.getNormalizedBoneNode("spine");

        const time = clock.elapsedTime;

        // if (spine) {
        //   // Gerakan menengok / memutar badan perlahan ke kiri dan kanan
        //   // Menggunakan kombinasi sin dan cos agar gerakannya rileks dan lurus terkadang
        //   spine.rotation.y = Math.sin(time * 0.4) * Math.cos(time * 0.2) * 0.15;
        //   // Ayunan tubuh ke samping (kiri-kanan) secara halus
        //   spine.rotation.z = Math.sin(time * 0.5) * 0.04;
        //   // Ayunan tubuh membungkuk/tegap 
        //   spine.rotation.x = Math.sin(time * 0.6) * 0.02;
        // }

        if (chest) {
          // Nafas (naik turun dada)
          chest.position.y = Math.sin(time * 2) * 0.005;
          
          // Gerakan dada sedikit mengimbangi spine
          chest.rotation.x = Math.sin(time * 0.8) * 0.02;
          chest.rotation.z = Math.sin(time * 0.5 + Math.PI / 4) * 0.02;
        }

        const blink = Math.sin(time * 3);

        if (vrm.expressionManager) {
          // Mood & Expression Logic
          let targetEmotion = "neutral";
          let moodIntensity = 0;
          let allowBlink = true;

          if (isSpeaking) {
             // Override idle mood with current speaking emotion
             targetEmotion = currentEmotion;
             moodIntensity = 1.0;
             allowBlink = targetEmotion !== "happy"; 
          } else {
             // Siklus Mood Wajah Idle (Berganti tiap 10 detik)
             const moodDuration = 10;
             const moodPhase = (time % moodDuration) / moodDuration; 
             const moodIndex = Math.floor(time / moodDuration) % 4;
             
             if (moodIndex === 0) {
               targetEmotion = "happy";
               if (moodPhase < 0.1) moodIntensity = moodPhase / 0.1; 
               else if (moodPhase < 0.25) moodIntensity = 1;         
               else if (moodPhase < 0.35) moodIntensity = (0.35 - moodPhase) / 0.1;
               else moodIntensity = 0; 
             } else if (moodIndex === 1) {
               targetEmotion = "relaxed";
               if (moodPhase < 0.2) moodIntensity = moodPhase / 0.2; 
               else if (moodPhase < 0.8) moodIntensity = 1;          
               else moodIntensity = (1.0 - moodPhase) / 0.2;         
             } else if (moodIndex === 2) {
               targetEmotion = "angry";
               if (moodPhase < 0.2) moodIntensity = moodPhase / 0.2; 
               else if (moodPhase < 0.8) moodIntensity = 1;          
               else moodIntensity = (1.0 - moodPhase) / 0.2;         
             }
             allowBlink = moodIndex !== 0;
          }

          // Matikan semua mood utama dulu
          vrm.expressionManager.setValue("happy", 0);
          vrm.expressionManager.setValue("angry", 0);
          vrm.expressionManager.setValue("sad", 0);
          vrm.expressionManager.setValue("relaxed", 0);

          // Jika tidak sedang "happy" (senyum tutup mata), boleh nge-blink
          if (allowBlink) {
            vrm.expressionManager.setValue("blink", blink > 0.95 ? 1 : 0);
          } else {
            vrm.expressionManager.setValue("blink", 0); // Cegah kedip bertabrakan
          }

          // Set Mood Aktif
          if (targetEmotion !== "neutral" && moodIntensity > 0) {
             vrm.expressionManager.setValue(targetEmotion, moodIntensity);
          }

          // Simulasi Lipsync (Berbicara)
          if (isSpeaking) {
            // Karakter sedang "berbicara"
            // Gabungan gelombang memberikan ritme cepat seperti orang mengucapkan suku kata
            const volume = Math.max(0, Math.sin(time * 15) * Math.cos(time * 7)); 
            
            // Mencampur bentuk mulut agar tidak monoton
            vrm.expressionManager.setValue("aa", volume * 0.7); 
            vrm.expressionManager.setValue("ih", volume * 0.4 * Math.max(0, Math.sin(time * 4)));
            vrm.expressionManager.setValue("oh", volume * 0.4 * Math.max(0, Math.cos(time * 11)));
            
            // Pastikan tertutup sisanya
            vrm.expressionManager.setValue("ou", 0);
            vrm.expressionManager.setValue("ee", 0);
          } else {
            // Karakter sedang diam 
            vrm.expressionManager.setValue("aa", 0);
            vrm.expressionManager.setValue("ih", 0);
            vrm.expressionManager.setValue("oh", 0);
            vrm.expressionManager.setValue("ou", 0);
            vrm.expressionManager.setValue("ee", 0);
          }
        }
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        width: "250px",
        height: "350px",
        zIndex: 999,
        pointerEvents: "none",
      }}
    />
  );
}