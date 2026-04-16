import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted successfully');
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      toast.error('Failed to delete product. Access denied?');
    }
  };

  const handleEdit = (_product: any) => {
    toast('Edit functionality would open a modal here!', { icon: '📝' });
  };

  if (loading) return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      Loading products...
    </div>
  );

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Marketplace</h2>
          <p style={{ color: 'var(--text-muted)' }}>Discover our curated collection of premium products</p>
        </div>
        
        {user?.role === 'admin' && (
          <button style={{ 
            padding: '0.75rem 1.25rem', borderRadius: '0.75rem', 
            background: 'var(--primary)', color: 'white', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <Plus size={20} /> Add Product
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          No products found. Seed the database if needed.
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isAdmin={user?.role === 'admin'}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
