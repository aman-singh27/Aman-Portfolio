import React from 'react';

const skills = {
    'Design': ['UI/UX Design', 'Branding & Identity', 'Prototyping', 'Wireframing', 'Figma', 'Adobe Creative Suite'],
    'Development': ['HTML5 & CSS3', 'JavaScript (ES6+)', 'React', 'Tailwind CSS', 'Git & GitHub', 'Web Accessibility'],
    'General': ['Project Management', 'Agile Methodologies', 'User Research', 'Creative Strategy', 'Client Communication'],
};

const Skills: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mx-auto py-20 px-4">
             <h2 className="text-sm font-medium tracking-[0.3em] text-gray-400 mb-12 text-center">SKILLS</h2>
            <div className="grid md:grid-cols-3 gap-12 text-center">
                {Object.entries(skills).map(([category, list]) => (
                    <div key={category}>
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">{category}</h3>
                        <ul className="space-y-2 text-gray-300">
                            {list.map(skill => <li key={skill}>{skill}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skills;