"use client"
import React, { useState, useRef } from 'react';

const Assinatura = () => {
    const [assinatura, setAssinatura] = useState('');
    const [desenhando, setDesenhando] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!canvasRef.current) return;
        setDesenhando(true);
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctxRef.current = ctx;
            ctx.beginPath();
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ctx.moveTo(x, y);
        }
    };

    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!canvasRef.current || !ctxRef.current || !desenhando) return;
        const ctx = ctxRef.current;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const handleCanvasMouseUp = () => {
        setDesenhando(false);
        if (canvasRef.current && ctxRef.current) {
            const dataUrl = canvasRef.current.toDataURL();
            setAssinatura(dataUrl);
        }
    };

    const handleLimparAssinatura = () => {
        if (!canvasRef.current || !ctxRef.current) return;
        const ctx = ctxRef.current;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setAssinatura('');
    };

    return (
        <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
                <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
                <div className="border border-gray-300 rounded-md p-2">
                    <canvas
                        ref={canvasRef}
                        width={400}
                        height={200}
                        className="assinatura-canvas"
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
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
                        type="submit"
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
