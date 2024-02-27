"use client"
import React, { useState, useRef } from 'react';

interface CameraProps {}

const Camera: React.FC<CameraProps> = () => {
  const [foto, setFoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visualizarCamera, setVisualizarCamera] = useState<boolean>(false);
  const [primeiraVisualizacao, setPrimeiraVisualizacao] = useState<boolean>(true);

  const handleVisualizarCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      setVisualizarCamera(true);
      setPrimeiraVisualizacao(false);
    }
  };

  const handleTirarOutraFoto = async () => {
    handleVisualizarCamera();
    setFoto(null);
  };

  const handleTirarFoto = () => {
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setFoto(dataUrl);
        if (videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          videoRef.current.srcObject = null; // Limpa a visualização da câmera
          setVisualizarCamera(false);
          console.log(dataUrl); // Mostra a foto no console.log
        }
      } else {
        console.error('Failed to get 2d context');
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Camera Capture</h1>
        {foto ? (
          <div>
            <img src={foto} alt="Foto capturada" className="max-w-xs" />
            <button onClick={handleTirarOutraFoto} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Tirar outra foto
            </button>
            <img src={foto}></img>
            {foto}
          </div>
        ) : (
          <div>
            <video ref={videoRef} autoPlay playsInline className="w-full"></video>
            <div className="flex justify-center mt-4">
              {primeiraVisualizacao ? (
                <button onClick={handleVisualizarCamera} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Visualizar Camera
                </button>
              ) : (
                ''
              )}

              {visualizarCamera ? (
                <button onClick={handleTirarFoto} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Tirar Foto
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
