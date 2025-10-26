import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';

interface MovieShow {
  id: number;
  title: string;
  type: string;
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface MovieShowFormData {
  title: string;
  type: string;
  director: string;
  budget: string;
  location: string;
  duration: string;
  yearTime: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const [movieShows, setMovieShows] = useState<MovieShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MovieShow | null>(null);
  const [formData, setFormData] = useState<MovieShowFormData>({
    title: '',
    type: '',
    director: '',
    budget: '',
    location: '',
    duration: '',
    yearTime: '',
    image: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { logout, user } = useAuth();

  const fetchMovieShows = useCallback(async (pageNum = 1, append = false) => {
    try {
      const params = new URLSearchParams();
      params.append('page', pageNum.toString());
      params.append('limit', '10');

      if (searchTerm) params.append('search', searchTerm);
      if (filterType) params.append('type', filterType);

      const response = await axios.get(`http://localhost:5000/api/movie-shows?${params}`);
      const newData = response.data.data;

      if (append) {
        setMovieShows(prev => [...prev, ...newData]);
      } else {
        setMovieShows(newData);
      }

      setHasMore(newData.length === 10);
      setLoading(false);
      setIsLoadingMore(false);
    } catch (err) {
      setError('Failed to fetch movie shows');
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [searchTerm, filterType]);

  useEffect(() => {
    fetchMovieShows();
  }, [fetchMovieShows]);

  const handleLogout = () => {
    logout();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: '',
      director: '',
      budget: '',
      location: '',
      duration: '',
      yearTime: '',
      image: ''
    });
  };

  const handleAddNew = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const handleEdit = (item: MovieShow) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      director: item.director,
      budget: item.budget,
      location: item.location,
      duration: item.duration,
      yearTime: item.yearTime,
      image: item.image || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🗑️</span>
          <span className="font-semibold">Delete Item</span>
        </div>
        <p className="text-sm">Are you sure you want to delete this movie/TV show? This action cannot be undone.</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await axios.delete(`http://localhost:5000/api/movie-shows/${id}`);
                setMovieShows(movieShows.filter(item => item.id !== id));
                toast.success('Item deleted successfully!');
              } catch (error: any) {
                toast.error(error?.response?.data?.message || 'Failed to delete item');
              }
            }}
            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 10000,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingItem) {
        // Update existing item
        const response = await axios.put(`http://localhost:5000/api/movie-shows/${editingItem.id}`, formData);
        setMovieShows(movieShows.map(item =>
          item.id === editingItem.id ? response.data.data : item
        ));
        toast.success('Item updated successfully!');
        setIsEditDialogOpen(false);
      } else {
        // Create new item
        const response = await axios.post('http://localhost:5000/api/movie-shows', formData);
        setMovieShows([response.data.data, ...movieShows]);
        toast.success('Item added successfully!');
        setIsAddDialogOpen(false);
      }
      resetForm();
      setEditingItem(null);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to save item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🎬 Movie & TV Show Manager
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, <span className="font-medium text-gray-800">{user?.email}</span></p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors">
              🚪 Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Favorite Movies & TV Shows</h2>
              <p className="text-gray-600 mt-1">Manage your personal collection</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="flex-1 lg:w-80">
                <Input
                  type="text"
                  placeholder="Search by title, director..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Movie">🎬 Movies</SelectItem>
                  <SelectItem value="TV Show">📺 TV Shows</SelectItem>
                </SelectContent>
              </Select>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddNew} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200">
                  ➕ Add New Entry
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-emerald-800">Add New Movie/TV Show</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Enter title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Movie">🎬 Movie</SelectItem>
                          <SelectItem value="TV Show">📺 TV Show</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="director">Director</Label>
                    <Input
                      id="director"
                      value={formData.director}
                      onChange={(e) => setFormData({...formData, director: e.target.value})}
                      placeholder="Enter director"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      placeholder="Enter budget"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Enter location"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="Enter duration"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="yearTime">Year/Time</Label>
                    <Input
                      id="yearTime"
                      value={formData.yearTime}
                      onChange={(e) => setFormData({...formData, yearTime: e.target.value})}
                      placeholder="Enter year or time period"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="image">Image URL (Optional)</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="Enter image URL or leave empty"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="image">Image URL (Optional)</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="Enter image URL or leave empty"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => {setIsAddDialogOpen(false); resetForm();}}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Add Entry
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-sm">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <span className="font-medium">Error:</span> {error}
              </div>
            </div>
          )}

          <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden border border-gray-200/50">
            <div className="px-6 py-4 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-900">Your Collection ({movieShows.length})</h3>
            </div>
            <ul className="divide-y divide-gray-100">
              {movieShows.length === 0 ? (
                <li className="px-6 py-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <span className="text-6xl">🎭</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No movies or TV shows yet</h4>
                  <p className="text-gray-500 mb-4">Start building your collection by adding your first favorite!</p>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleAddNew} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Add Your First Entry
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="text-emerald-800">Add Your First Movie/TV Show</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => setFormData({...formData, title: e.target.value})}
                              placeholder="Enter title"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Movie">🎬 Movie</SelectItem>
                                <SelectItem value="TV Show">📺 TV Show</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="director">Director</Label>
                            <Input
                              id="director"
                              value={formData.director}
                              onChange={(e) => setFormData({...formData, director: e.target.value})}
                              placeholder="Enter director"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="budget">Budget</Label>
                            <Input
                              id="budget"
                              value={formData.budget}
                              onChange={(e) => setFormData({...formData, budget: e.target.value})}
                              placeholder="Enter budget"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                              placeholder="Enter location"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                              id="duration"
                              value={formData.duration}
                              onChange={(e) => setFormData({...formData, duration: e.target.value})}
                              placeholder="Enter duration"
                              required
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="yearTime">Year/Time</Label>
                            <Input
                              id="yearTime"
                              value={formData.yearTime}
                              onChange={(e) => setFormData({...formData, yearTime: e.target.value})}
                              placeholder="Enter year or time period"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button type="button" variant="outline" onClick={() => {setIsAddDialogOpen(false); resetForm();}}>
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Add Entry
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </li>
              ) : (
                movieShows.map((item) => (
                  <li key={item.id} className="px-6 py-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-3">
                          {item.image && (
                            <div className="flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-20 h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h3 className="text-xl font-semibold text-gray-900 mr-3">{item.title}</h3>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                item.type === 'Movie'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : 'bg-purple-100 text-purple-800 border border-purple-200'
                              }`}>
                                {item.type === 'Movie' ? '🎬' : '📺'} {item.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">🎭</span>
                            <span className="font-medium text-gray-700">Director:</span>
                            <span className="ml-1 text-gray-900">{item.director}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">💰</span>
                            <span className="font-medium text-gray-700">Budget:</span>
                            <span className="ml-1 text-gray-900">{item.budget}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">📍</span>
                            <span className="font-medium text-gray-700">Location:</span>
                            <span className="ml-1 text-gray-900">{item.location}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">⏱️</span>
                            <span className="font-medium text-gray-700">Duration:</span>
                            <span className="ml-1 text-gray-900">{item.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">📅</span>
                            <span className="font-medium text-gray-700">Year/Time:</span>
                            <span className="ml-1 text-gray-900">{item.yearTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3 lg:flex-shrink-0">
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                          <DialogTrigger asChild>
                            <Button onClick={() => handleEdit(item)} variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors">
                              ✏️ Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle className="text-emerald-800">Edit Movie/TV Show</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-title">Title</Label>
                                  <Input
                                    id="edit-title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="Enter title"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-type">Type</Label>
                                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Movie">🎬 Movie</SelectItem>
                                      <SelectItem value="TV Show">📺 TV Show</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-director">Director</Label>
                                  <Input
                                    id="edit-director"
                                    value={formData.director}
                                    onChange={(e) => setFormData({...formData, director: e.target.value})}
                                    placeholder="Enter director"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-budget">Budget</Label>
                                  <Input
                                    id="edit-budget"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                                    placeholder="Enter budget"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-location">Location</Label>
                                  <Input
                                    id="edit-location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    placeholder="Enter location"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-duration">Duration</Label>
                                  <Input
                                    id="edit-duration"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                    placeholder="Enter duration"
                                    required
                                  />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <Label htmlFor="edit-yearTime">Year/Time</Label>
                                  <Input
                                    id="edit-yearTime"
                                    value={formData.yearTime}
                                    onChange={(e) => setFormData({...formData, yearTime: e.target.value})}
                                    placeholder="Enter year or time period"
                                    required
                                  />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <Label htmlFor="edit-image">Image URL (Optional)</Label>
                                  <Input
                                    id="edit-image"
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    placeholder="Enter image URL or leave empty"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => {setIsEditDialogOpen(false); resetForm(); setEditingItem(null);}}>
                                  Cancel
                                </Button>
                                <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                  Update Entry
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button onClick={() => handleDelete(item.id)} variant="destructive" size="sm" className="hover:bg-red-600 hover:shadow-lg transition-all">
                          🗑️ Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
            {hasMore && movieShows.length > 0 && (
              <div className="px-6 py-4 text-center">
                <Button
                  onClick={() => {
                    setPage(prev => prev + 1);
                    setIsLoadingMore(true);
                    fetchMovieShows(page + 1, true);
                  }}
                  disabled={isLoadingMore}
                  variant="outline"
                  className="hover:bg-blue-50 hover:border-blue-200"
                >
                  {isLoadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                      Loading more...
                    </>
                  ) : (
                    'Load More Entries'
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;