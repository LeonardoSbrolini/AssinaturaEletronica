"use client"
import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const Assinatura = () => {
    const [assinatura, setAssinatura] = useState('');
    const signatureRef = useRef<any>(null);

    const handleLimparAssinatura = () => {
        signatureRef.current?.clear();
        setAssinatura('');
    };

    const handleSalvarAssinatura = () => {
        const dataUrl = signatureRef.current?.getTrimmedCanvas().toDataURL();
        setAssinatura(dataUrl);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
                <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
                <div className="border border-gray-300 rounded-md p-2">
                    <SignatureCanvas
                        ref={signatureRef}
                        canvasProps={{ width: 400, height: 200, className: 'assinatura-canvas' }}
                        backgroundColor="#fff"
                        penColor="black"
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
                {assinatura ? (
                    <>
                        <img src={assinatura} alt="Assinatura" className="mt-2" />
                        {assinatura}
                    </>
                ) : ''}
            </div>
        </div>
    );
};

export default Assinatura;
