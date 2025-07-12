
import React, { useState } from 'react';
import { Search, Filter, Grid, List, Upload, User, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FeaturedSlider } from './FeaturedSlider';
import { GalleryCard } from './GalleryCard';
import { ImageSlider } from './ImageSlider';

const featuredImages = [
  {
    id: '1',
    url: 'photo-1649972904349-6e44c42644a7',
    title: 'Digital Artistry',
    subtitle: 'Where Technology Meets Creativity',
    description: 'Explore the intersection of modern technology and artistic expression through our curated collection of digital masterpieces.',
    category: 'Featured'
  },
  {
    id: '2',
    url: 'photo-1488590528505-98d2b5aba04b',
    title: 'Innovation Hub',
    subtitle: 'Capturing the Future of Work',
    description: 'Discover how modern workspaces and cutting-edge technology are shaping the future of creative industries.',
    category: 'Technology'
  },
  {
    id: '3',
    url: 'photo-1518770660439-4636190af475',
    title: 'Circuit Symphony',
    subtitle: 'The Beauty of Engineering',
    description: 'Dive into the intricate world of electronics and discover the hidden beauty in the circuits that power our digital age.',
    category: 'Engineering'
  }
];

const galleryData = [
  {
    id: '1',
    title: 'Modern Workspace Collection',
    description: 'A curated selection of contemporary office environments and technology setups that inspire productivity and creativity.',
    coverImage: 'photo-1461749280684-dccba630e2f6',
    imageCount: 24,
    views: 15420,
    likes: 892,
    createdAt: '2024-01-15',
    author: 'Sarah Chen',
    tags: ['workspace', 'technology', 'modern', 'productivity']
  },
  {
    id: '2',
    title: 'Tech Innovation Series',
    description: 'Exploring the cutting-edge world of technology, from AI development to sustainable computing solutions.',
    coverImage: 'photo-1486312338219-ce68d2c6f44d',
    imageCount: 18,
    views: 8930,
    likes: 456,
    createdAt: '2024-01-10',
    author: 'Alex Rivera',
    tags: ['innovation', 'AI', 'development', 'future']
  },
  {
    id: '3',
    title: 'Digital Collaboration',
    description: 'Capturing the essence of modern teamwork and digital collaboration in today\'s connected world.',
    coverImage: 'photo-1581091226825-a6a2a5aee158',
    imageCount: 32,
    views: 12650,
    likes: 723,
    createdAt: '2024-01-08',
    author: 'Maria Santos',
    tags: ['collaboration', 'teamwork', 'digital', 'remote']
  },
  {
    id: '4',
    title: 'Robotic Revolution',
    description: 'An intimate look at the robotics industry and how automation is transforming our daily lives.',
    coverImage: 'photo-1485827404703-89b55fcc595e',
    imageCount: 15,
    views: 6780,
    likes: 234,
    createdAt: '2024-01-05',
    author: 'David Kim',
    tags: ['robotics', 'automation', 'future', 'technology']
  },
  {
    id: '5',
    title: 'Code & Coffee',
    description: 'The daily rituals and environments of software developers around the world.',
    coverImage: 'photo-1531297484001-80022131f5a1',
    imageCount: 28,
    views: 9340,
    likes: 567,
    createdAt: '2024-01-03',
    author: 'Emma Wilson',
    tags: ['coding', 'developer', 'lifestyle', 'workspace']
  },
  {
    id: '6',
    title: 'Innovation Labs',
    description: 'Behind the scenes at the world\'s most innovative technology companies and research facilities.',
    coverImage: 'photo-1487058792275-0ad4aaf24ca7',
    imageCount: 21,
    views: 11250,
    likes: 678,
    createdAt: '2023-12-28',
    author: 'James Park',
    tags: ['innovation', 'research', 'lab', 'technology']
  }
];

const sliderImages = [
  {
    id: '1',
    url: 'photo-1649972904349-6e44c42644a7',
    title: 'Modern Workspace Setup',
    description: 'A beautifully organized workspace featuring the latest technology and ergonomic design principles.',
    tags: ['workspace', 'modern', 'technology']
  },
  {
    id: '2',
    url: 'photo-1488590528505-98d2b5aba04b',
    title: 'Laptop Innovation',
    description: 'Cutting-edge laptop technology showcasing the evolution of portable computing.',
    tags: ['laptop', 'technology', 'innovation']
  },
  {
    id: '3',
    url: 'photo-1518770660439-4636190af475',
    title: 'Circuit Board Artistry',
    description: 'The intricate beauty of electronic components and circuit board design.',
    tags: ['electronics', 'circuit', 'engineering']
  },
  {
    id: '4',
    url: 'photo-1461749280684-dccba630e2f6',
    title: 'Programming Excellence',
    description: 'Java programming in action, showcasing the art of software development.',
    tags: ['programming', 'java', 'development']
  }
];

export const PhotoGalleryApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const [showSlider, setShowSlider] = useState(false);

  const filteredGalleries = galleryData.filter(gallery =>
    gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gallery.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleGalleryClick = (galleryId: string) => {
    setSelectedGallery(galleryId);
    setShowSlider(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PhotoGallery Pro
              </h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Home</a>
                <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Galleries</a>
                <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">Collections</a>
                <a href="#" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">About</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Featured Slider */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FeaturedSlider images={featuredImages} />
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search galleries, tags, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex rounded-lg border border-slate-300 overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredGalleries.map((gallery) => (
            <GalleryCard
              key={gallery.id}
              {...gallery}
              onClick={() => handleGalleryClick(gallery.id)}
            />
          ))}
        </div>
      </section>

      {/* Image Slider Modal */}
      {showSlider && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            <ImageSlider
              images={sliderImages}
              isFullscreen={true}
              onClose={() => setShowSlider(false)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PhotoGallery Pro</h3>
              <p className="text-slate-400 leading-relaxed">
                Professional photo gallery platform for photographers, creatives, and businesses to showcase their visual content.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">© 2024 PhotoGallery Pro. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
