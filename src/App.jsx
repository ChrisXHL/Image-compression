import React, { useState } from 'react';
import { DropZone } from './components/DropZone';
import { Controls } from './components/Controls';
import { Preview } from './components/Preview';
import { compressImage } from './utils/compress';
import { Zap } from 'lucide-react';

function App() {
    const [file, setFile] = useState(null);
    const [targetSize, setTargetSize] = useState(null); // in KB
    const [compressedBlob, setCompressedBlob] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
        setCompressedBlob(null); // Reset previous result
        // Auto-set target to 50% of original, handled in Controls effect
    };

    const handleProcess = async () => {
        if (!file || !targetSize) return;

        setIsProcessing(true);
        // Add small delay to allow UI to render "Processing" state
        setTimeout(async () => {
            try {
                const resultItem = await compressImage(file, targetSize);
                setCompressedBlob(resultItem);
            } catch (error) {
                console.error("Compression failed", error);
                alert("Compression failed. Please try another image.");
            } finally {
                setIsProcessing(false);
            }
        }, 100);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>
                    Smart Compress
                </h1>
                <p>Control exact file size for your uploads</p>
            </div>

            {!file ? (
                <DropZone onFileSelect={handleFileSelect} />
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <button
                            onClick={() => setFile(null)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline' }}>
                            ← Upload different image
                        </button>
                    </div>

                    <Preview originalFile={file} compressedBlob={compressedBlob} />

                    <Controls
                        targetSize={targetSize}
                        setTargetSize={setTargetSize}
                        onProcess={handleProcess}
                        isProcessing={isProcessing}
                        originalSize={file.size}
                    />
                </>
            )}
        </div>
    );
}

export default App;
