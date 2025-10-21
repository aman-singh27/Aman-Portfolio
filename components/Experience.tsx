import React from 'react';

const experience = [
    {
        role: 'Senior Digital Designer',
        company: 'PixelPerfect Inc.',
        date: '2018 - Present',
        description: 'Lead designer for high-profile client projects, focusing on UI/UX for web and mobile applications. Responsible for mentoring junior designers and driving the creative vision from concept to final delivery.'
    },
    {
        role: 'UI/UX Designer',
        company: 'Innovate Solutions',
        date: '2015 - 2018',
        description: 'Crafted user-centric designs for a variety of digital products. Worked closely with product managers and developers to translate user requirements into intuitive and engaging interfaces.'
    },
];

const Experience: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mx-auto py-20 px-4">
             <h2 className="text-sm font-medium tracking-[0.3em] text-gray-400 mb-12 text-center">EXPERIENCE</h2>
            <div className="border-l-2 border-gray-700 pl-8 space-y-12">
                {experience.map((job, index) => (
                     <div key={index} className="relative">
                        <div className="absolute -left-10 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black top-1"></div>
                        <p className="text-sm text-gray-400 mb-1">{job.date}</p>
                        <h3 className="text-2xl font-bold">{job.role}</h3>
                        <p className="text-yellow-400 text-lg mb-2">{job.company}</p>
                        <p className="text-gray-300">{job.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Experience;