"use client"
import React, { useState, useRef } from 'react';

const Assinatura = () => {
    const [assinatura, setAssinatura] = useState('');
    const [desenhando, setDesenhando] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const startDrawing = (x: number, y: number) => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctxRef.current = ctx;
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    };

    const continueDrawing = (x: number, y: number) => {
        if (!canvasRef.current || !ctxRef.current || !desenhando) return;
        const ctx = ctxRef.current;
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const endDrawing = () => {
        setDesenhando(false);
        if (canvasRef.current && ctxRef.current) {
            const dataUrl = canvasRef.current.toDataURL();
            setAssinatura(dataUrl);
        }
    };

    const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        e.preventDefault();
        setDesenhando(true);
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = e.clientX - (rect?.left || 0);
        const y = e.clientY - (rect?.top || 0);
        startDrawing(x, y);
    };

    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        e.preventDefault();
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = e.clientX - (rect?.left || 0);
        const y = e.clientY - (rect?.top || 0);
        continueDrawing(x, y);
    };

    const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        e.preventDefault();
        endDrawing();
    };

    const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = e.touches[0].clientX - (rect?.left || 0);
        const y = e.touches[0].clientY - (rect?.top || 0);
        startDrawing(x, y);
    };

    const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = e.touches[0].clientX - (rect?.left || 0);
        const y = e.touches[0].clientY - (rect?.top || 0);
        continueDrawing(x, y);
    };

    const handleCanvasTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        endDrawing();
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
                        onTouchStart={handleCanvasTouchStart}
                        onTouchMove={handleCanvasTouchMove}
                        onTouchEnd={handleCanvasTouchEnd}
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
