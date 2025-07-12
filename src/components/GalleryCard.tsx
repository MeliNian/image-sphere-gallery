
import React from 'react';
import { Eye, Heart, Download, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface GalleryCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  imageCount: number;
  views: number;
  likes: number;
  createdAt: string;
  author: string;
  tags: string[];
  onClick: () => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  title,
  description,
  coverImage,
  imageCount,
  views,
  likes,
  createdAt,
  author,
  tags,
  onClick
}) => {
  return (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white">
      <div className="relative overflow-hidden">
        <img
          src={`https://images.unsplash.com/${coverImage}?w=400&h=250&fit=crop`}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onClick={onClick}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Image Count Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          {imageCount} photos
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        
        {/* View Gallery Button */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button onClick={onClick} className="bg-white text-black hover:bg-white/90">
            View Gallery
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-slate-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
            {title}
          </h3>
        </div>
        
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full hover:bg-slate-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
              +{tags.length - 3}
            </span>
          )}
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{likes.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{createdAt}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
