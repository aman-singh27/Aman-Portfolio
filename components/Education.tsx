import React from 'react';

const education = [
    {
        degree: 'Bachelor of Fine Arts in Graphic Design',
        institution: 'University of Creative Arts',
        date: '2011 - 2015',
    },
    {
        degree: 'Advanced Coursework in UI/UX for Digital Products',
        institution: 'Online Design Institute',
        date: '2016',
    },
];

const Education: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mx-auto py-20 px-4">
             <h2 className="text-sm font-medium tracking-[0.3em] text-gray-400 mb-12 text-center">EDUCATION</h2>
            <div className="space-y-8">
                {education.map((edu, index) => (
                    <div key={index} className="text-center">
                        <h3 className="text-2xl font-bold">{edu.degree}</h3>
                        <p className="text-yellow-400 text-lg">{edu.institution}</p>
                        <p className="text-gray-400">{edu.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Education;