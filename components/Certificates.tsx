import React from 'react';

const certificates = [
    'Adobe Certified Expert - Photoshop CC',
    'Google UX Design Professional Certificate',
    'Interaction Design Foundation - UI Design Patterns',
];

const Certificates: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mx-auto py-20 px-4">
             <h2 className="text-sm font-medium tracking-[0.3em] text-gray-400 mb-12 text-center">CERTIFICATES</h2>
            <div className="text-center">
                <ul className="space-y-3 text-lg text-gray-200">
                    {certificates.map((cert, index) => (
                         <li key={index} className="flex items-center justify-center gap-3">
                            <span className="text-yellow-400">◆</span>
                            <span>{cert}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Certificates;