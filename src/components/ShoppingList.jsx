import React, { useState, useMemo } from 'react';
import { ShoppingCart, Plus, X, Trash2, Check, Download, Filter } from 'lucide-react';
import { ingredientCategories, getIngredientsByCategory, ingredients } from '../data/ingredientsDatabase';

const ShoppingList = () => {
  const [shoppingItems, setShoppingItems] = useState(() => {
    const saved = localStorage.getItem('shoppingList');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({
    ingredient: null,
    quantity: '',
    unit: '',
    notes: ''
  });

  // Sauvegarder automatiquement dans localStorage
  const saveToLocalStorage = (items) => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  };

  // Filtrer les ingrédients disponibles
  const availableIngredients = useMemo(() => {
    let filtered = getIngredientsByCategory(selectedCategory);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(ing => 
        ing.name.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [selectedCategory, searchTerm]);

  // Ajouter un article à la liste
  const addItem = () => {
    if (!newItem.ingredient) return;
    
    const item = {
      id: Date.now(),
      ...newItem,
      checked: false,
      addedAt: new Date().toISOString()
    };
    
    const updated = [...shoppingItems, item];
    setShoppingItems(updated);
    saveToLocalStorage(updated);
    
    setNewItem({
      ingredient: null,
      quantity: '',
      unit: '',
      notes: ''
    });
    setShowAddForm(false);
    setSearchTerm('');
  };

  // Cocher/Décocher un article
  const toggleCheck = (id) => {
    const updated = shoppingItems.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setShoppingItems(updated);
    saveToLocalStorage(updated);
  };

  // Supprimer un article
  const deleteItem = (id) => {
    const updated = shoppingItems.filter(item => item.id !== id);
    setShoppingItems(updated);
    saveToLocalStorage(updated);
  };

  // Vider la liste
  const clearList = () => {
    if (window.confirm('Voulez-vous vraiment vider la liste de courses ?')) {
      setShoppingItems([]);
      saveToLocalStorage([]);
    }
  };

  // Supprimer les articles cochés
  const deleteCheckedItems = () => {
    const updated = shoppingItems.filter(item => !item.checked);
    setShoppingItems(updated);
    saveToLocalStorage(updated);
  };

  // Exporter la liste
  const exportList = () => {
    const text = shoppingItems
      .map(item => {
        const check = item.checked ? '✓' : '○';
        const qty = item.quantity ? `${item.quantity} ${item.unit || ''}` : '';
        const notes = item.notes ? ` (${item.notes})` : '';
        return `${check} ${item.ingredient.name} ${qty}${notes}`;
      })
      .join('\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liste-courses-${new Date().toLocaleDateString('fr-FR')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Grouper par catégorie
  const groupedItems = useMemo(() => {
    const groups = {};
    shoppingItems.forEach(item => {
      const category = item.ingredient.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
    });
    return groups;
  }, [shoppingItems]);

  const checkedCount = shoppingItems.filter(item => item.checked).length;
  const totalCount = shoppingItems.length;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ShoppingCart size={32} />
            <div>
              <h2 className="text-2xl font-bold">Liste de Courses</h2>
              <p className="text-green-100 text-sm">
                {checkedCount}/{totalCount} articles cochés
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
          >
            {showAddForm ? <X size={24} /> : <Plus size={24} />}
          </button>
        </div>

        {/* Barre de progression */}
        {totalCount > 0 && (
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${(checkedCount / totalCount) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="bg-white border-x-2 border-green-600 p-4 space-y-4">
          {/* Filtres de catégorie */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter size={18} className="text-gray-500 flex-shrink-0" />
            {ingredientCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-sm transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>

          {/* Recherche d'ingrédient */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un ingrédient..."
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
          />

          {/* Sélection d'ingrédient */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {availableIngredients.map(ing => (
              <button
                key={ing.id}
                onClick={() => setNewItem({ ...newItem, ingredient: ing })}
                className={`p-3 rounded-lg text-left transition-all ${
                  newItem.ingredient?.id === ing.id
                    ? 'bg-green-600 text-white scale-105'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">{ing.emoji}</span>
                <p className="text-sm font-medium mt-1">{ing.name}</p>
              </button>
            ))}
          </div>

          {newItem.ingredient && (
            <div className="space-y-3 pt-4 border-t-2 border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  placeholder="Quantité (optionnel)"
                  className="flex-1 p-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
                <select
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  className="p-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="">Unité</option>
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="L">L</option>
                  <option value="pièce(s)">pièce(s)</option>
                  <option value="tasse">tasse</option>
                  <option value="c. à soupe">c. à soupe</option>
                  <option value="c. à café">c. à café</option>
                </select>
              </div>
              
              <input
                type="text"
                value={newItem.notes}
                onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                placeholder="Notes (optionnel)"
                className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
              />

              <button
                onClick={addItem}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Ajouter à la liste
              </button>
            </div>
          )}
        </div>
      )}

      {/* Liste des courses */}
      <div className="bg-white border-2 border-t-0 border-green-600 rounded-b-2xl p-4">
        {totalCount === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
            <p>Votre liste de courses est vide</p>
            <p className="text-sm">Cliquez sur + pour ajouter des articles</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Actions globales */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={exportList}
                className="flex-1 min-w-[150px] bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Exporter
              </button>
              {checkedCount > 0 && (
                <button
                  onClick={deleteCheckedItems}
                  className="flex-1 min-w-[150px] bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  Supprimer cochés
                </button>
              )}
              <button
                onClick={clearList}
                className="flex-1 min-w-[150px] bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={18} />
                Tout vider
              </button>
            </div>

            {/* Articles groupés par catégorie */}
            {Object.entries(groupedItems).map(([category, items]) => {
              const categoryInfo = ingredientCategories.find(c => c.id === category);
              return (
                <div key={category} className="space-y-2">
                  <h3 className="font-bold text-gray-700 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                    <span className="text-xl">{categoryInfo?.emoji || '📦'}</span>
                    {categoryInfo?.name || category}
                    <span className="text-sm text-gray-400 ml-auto">
                      {items.length} article{items.length > 1 ? 's' : ''}
                    </span>
                  </h3>
                  
                  <div className="space-y-2">
                    {items.map(item => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          item.checked
                            ? 'bg-green-50 opacity-60'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <button
                          onClick={() => toggleCheck(item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            item.checked
                              ? 'bg-green-600 border-green-600'
                              : 'border-gray-300 hover:border-green-600'
                          }`}
                        >
                          {item.checked && <Check size={16} className="text-white" />}
                        </button>
                        
                        <span className="text-2xl">{item.ingredient.emoji}</span>
                        
                        <div className="flex-1">
                          <p className={`font-medium ${item.checked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {item.ingredient.name}
                          </p>
                          {(item.quantity || item.notes) && (
                            <p className="text-sm text-gray-500">
                              {item.quantity && `${item.quantity} ${item.unit || ''}`}
                              {item.quantity && item.notes && ' • '}
                              {item.notes}
                            </p>
                          )}
                        </div>
                        
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
