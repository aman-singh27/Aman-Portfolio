import React from 'react';

const projects = [
    { id: '01', title: 'PROJECT ONE', category: 'WEB DESIGN' },
    { id: '02', title: 'PROJECT TWO', category: 'BRANDING' },
    { id: '03', title: 'PROJECT THREE', category: 'DEVELOPMENT' },
    { id: '04', title: 'PROJECT FOUR', category: 'UI/UX' },
];

const Work: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mx-auto py-20">
             <h2 className="text-sm font-medium tracking-[0.3em] text-gray-400 mb-12 text-center">SELECTED WORK</h2>
            <div className="space-y-4">
                {projects.map(project => (
                    <div 
                        key={project.id} 
                        className="cursor-pointer flex justify-between items-center py-8 border-b border-gray-700 transition-colors hover:bg-yellow-400/10"
                    >
                        <div className="flex items-center gap-8">
                            <span className="text-xl font-semibold text-gray-500">{project.id}</span>
                            <h3 className="text-5xl font-bold">{project.title}</h3>
                        </div>
                        <span className="text-lg font-medium tracking-wider text-gray-300">{project.category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Work;
