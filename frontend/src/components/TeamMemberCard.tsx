import React from 'react';

interface TeamMemberCardProps {
  name: string;
  title: string;
  image: string;
}

/**
 * Card showing an individual team member.
 */
export default function TeamMemberCard({ name, title, image }: TeamMemberCardProps) {
  return (
    <div className="text-center">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 mx-auto rounded-full shadow-lg"
      />
      <h3 className="mt-4 text-xl font-semibold">{name}</h3>
      <p className="mt-2 text-indigo-600">{title}</p>
    </div>
  );
}
