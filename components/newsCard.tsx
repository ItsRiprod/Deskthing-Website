import React, { FC } from 'react';
import { ExternalLink } from 'lucide-react';

interface NewsCardProps {
  source: string;
  sourceUrl: string;
  title: string;
  description: string;
  imgUrl: string;
  imgCredit: string;
  featured?: boolean;
}

export const NewsCard: FC<NewsCardProps> = ({ source, sourceUrl, title, description, imgUrl, imgCredit }) => {
  return (
    <a href={sourceUrl} className="relative bg-neutral-925 flex flex-col p-6 gap-2 border border-neutral-800 rounded-lg hoverDropShadow transition ease-in-out duration-200">
      <p className='text-neutral-400 font-mono text-sm'>{source}</p>
      <h4>{title}</h4>
      <p>{description}</p>
      <img src={imgUrl} className="bg-white aspect-video w-full rounded-lg"/>
      <p className='font-mono text-neutral-400 text-sm'>CREDIT: {imgCredit}</p>
      <span className='absolute top-6 right-6 text-neutral-400'>
       <ExternalLink size={14}/>
      </span>
    </a>
  )
}