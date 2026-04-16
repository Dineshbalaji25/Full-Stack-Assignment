import React from 'react';
import { Trash2, Edit3, Package } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin, onDelete, onEdit }) => {
  return (
    <div className="glass animate-fade" style={{ 
      borderRadius: '1rem', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      transition: 'transform 0.2s ease',
    }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ 
          position: 'absolute', top: '10px', right: '10px', 
          background: 'rgba(0,0,0,0.6)', padding: '4px 8px', 
          borderRadius: '4px', fontSize: '0.75rem', color: 'white'
        }}>
          {product.category}
        </div>
      </div>
      
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{product.name}</h3>
          <span style={{ color: 'var(--primary)', fontWeight: 700 }}>${product.price}</span>
        </div>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
          {product.description}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ 
            flex: 1, padding: '0.625rem', borderRadius: '0.5rem', 
            background: 'var(--primary)', color: 'white', fontSize: '0.875rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem'
          }}>
            <Package size={16} /> Buy Now
          </button>
          
          {isAdmin && (
            <>
              <button 
                onClick={() => onEdit(product)}
                style={{ background: '#334155', color: 'white', padding: '0.625rem', borderRadius: '0.5rem' }}
                title="Edit Product"
              >
                <Edit3 size={16} />
              </button>
              <button 
                onClick={() => onDelete(product.id)}
                style={{ background: '#ef444422', color: '#ef4444', border: '1px solid #ef444444', padding: '0.625rem', borderRadius: '0.5rem' }}
                title="Delete Product"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
