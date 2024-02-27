"use client"
import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const Assinatura = () => {
    const canvasRef = useRef<any>(null);
  const [assinatura, setAssinatura] = useState<string>('');

  const handleLimparAssinatura = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setAssinatura('');
    }
  };

  const handleSalvarAssinatura = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      console.log(dataUrl)
      setAssinatura(dataUrl);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Assinatura</h1>
        <div className="border border-gray-300 rounded-md p-2">
          <SignatureCanvas
            ref={canvasRef}
            canvasProps={{ width: 400, height: 200, className: 'assinatura-canvas' }}
          />
        </div>
        <div className="flex mt-2">
          <button
            type="button"
            onClick={handleLimparAssinatura}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Limpar
          </button>
          <button
            type="button"
            onClick={handleSalvarAssinatura}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Salvar
          </button>
        </div>
        {assinatura && <img src={assinatura} alt="Assinatura" className="mt-2" style={{ maxWidth: '100%', height: 'auto' }} />}
      </div>
    </div>
  );
};

export default Assinatura;
