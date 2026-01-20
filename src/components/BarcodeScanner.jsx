import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Search, Plus, Check } from 'lucide-react';

const BarcodeScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [savedFoods, setSavedFoods] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Charger les aliments sauvegardés depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('neguslunar-foods');
    if (saved) {
      setSavedFoods(JSON.parse(saved));
    }
  }, []);

  // Sauvegarder les aliments dans localStorage
  useEffect(() => {
    localStorage.setItem('neguslunar-foods', JSON.stringify(savedFoods));
  }, [savedFoods]);

  // Rechercher un produit par code-barres via OpenFoodFacts API
  const searchByBarcode = async (code) => {
    setLoading(true);
    setError('');
    setFoodData(null);

    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}.json`);
      const data = await response.json();

      if (data.status === 1 && data.product) {
        const product = data.product;
        setFoodData({
          name: product.product_name || 'Produit inconnu',
          brand: product.brands || 'Marque inconnue',
          barcode: code,
          calories: product.nutriments?.['energy-kcal_100g'] || 0,
          proteins: product.nutriments?.proteins_100g || 0,
          carbs: product.nutriments?.carbohydrates_100g || 0,
          fats: product.nutriments?.fat_100g || 0,
          fiber: product.nutriments?.fiber_100g || 0,
          image: product.image_url || null,
          quantity: product.quantity || 'N/A',
          categories: product.categories || '',
          nutriscore: product.nutriscore_grade || null
        });
      } else {
        setError('Produit non trouvé dans la base de données');
      }
    } catch (err) {
      setError('Erreur lors de la recherche du produit');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Démarrer la caméra pour scanner
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setScanning(true);
    } catch (err) {
      setError('Impossible d\'accéder à la caméra');
      console.error(err);
    }
  };

  // Arrêter la caméra
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  // Ajouter un aliment à la liste
  const addFood = (food) => {
    const newFood = {
      ...food,
      id: Date.now(),
      addedAt: new Date().toISOString(),
      portion: 100 // portion par défaut en grammes
    };
    setSavedFoods([newFood, ...savedFoods]);
    setFoodData(null);
    setBarcode('');
  };

  // Supprimer un aliment
  const removeFood = (id) => {
    setSavedFoods(savedFoods.filter(food => food.id !== id));
  };

  // Calculer les totaux nutritionnels
  const getTotals = () => {
    return savedFoods.reduce((acc, food) => {
      const factor = food.portion / 100;
      return {
        calories: acc.calories + (food.calories * factor),
        proteins: acc.proteins + (food.proteins * factor),
        carbs: acc.carbs + (food.carbs * factor),
        fats: acc.fats + (food.fats * factor)
      };
    }, { calories: 0, proteins: 0, carbs: 0, fats: 0 });
  };

  const totals = getTotals();

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-400 mb-2">
          🍎 Scanner d'Aliments
        </h2>
        <p className="text-gray-400 text-sm">
          Scannez ou recherchez des aliments pour suivre votre nutrition
        </p>
      </div>

      {/* Section Scanner/Recherche */}
      <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-xl p-6 border border-amber-700/30">
        {!scanning ? (
          <div className="space-y-4">
            {/* Recherche manuelle */}
            <div className="flex gap-2">
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Entrez un code-barres..."
                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
                onKeyPress={(e) => e.key === 'Enter' && barcode && searchByBarcode(barcode)}
              />
              <button
                onClick={() => barcode && searchByBarcode(barcode)}
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Bouton Scanner */}
            <button
              onClick={startCamera}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Camera size={20} />
              <span>Scanner un code-barres</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Vidéo de la caméra */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 border-2 border-amber-500/50 m-8" />
            </div>

            {/* Contrôles */}
            <div className="flex gap-2">
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Code-barres détecté..."
                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <button
                onClick={stopCamera}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Messages d'erreur */}
        {error && (
          <div className="mt-4 bg-red-900/30 border border-red-700/50 rounded-lg p-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Chargement */}
        {loading && (
          <div className="mt-4 text-center text-amber-400">
            <div className="animate-spin inline-block w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full" />
            <p className="mt-2">Recherche en cours...</p>
          </div>
        )}
      </div>

      {/* Résultat de la recherche */}
      {foodData && (
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-700/30 animate-fadeIn">
          <div className="flex gap-4">
            {foodData.image && (
              <img 
                src={foodData.image} 
                alt={foodData.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{foodData.name}</h3>
              <p className="text-gray-400 text-sm mb-2">{foodData.brand}</p>
              {foodData.nutriscore && (
                <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                  foodData.nutriscore === 'a' ? 'bg-green-600' :
                  foodData.nutriscore === 'b' ? 'bg-lime-600' :
                  foodData.nutriscore === 'c' ? 'bg-yellow-600' :
                  foodData.nutriscore === 'd' ? 'bg-orange-600' :
                  'bg-red-600'
                }`}>
                  Nutri-Score {foodData.nutriscore.toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Valeurs nutritionnelles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-amber-400">{Math.round(foodData.calories)}</div>
              <div className="text-xs text-gray-400">kcal/100g</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">{foodData.proteins.toFixed(1)}g</div>
              <div className="text-xs text-gray-400">Protéines</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{foodData.carbs.toFixed(1)}g</div>
              <div className="text-xs text-gray-400">Glucides</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-yellow-400">{foodData.fats.toFixed(1)}g</div>
              <div className="text-xs text-gray-400">Lipides</div>
            </div>
          </div>

          <button
            onClick={() => addFood(foodData)}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            <span>Ajouter à ma liste</span>
          </button>
        </div>
      )}

      {/* Liste des aliments ajoutés */}
      {savedFoods.length > 0 && (
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-xl p-6 border border-purple-700/30">
          <h3 className="text-xl font-bold text-purple-400 mb-4">
            📊 Mes Aliments du Jour
          </h3>

          {/* Totaux */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-amber-400">{Math.round(totals.calories)}</div>
              <div className="text-xs text-gray-400">kcal total</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-400">{totals.proteins.toFixed(1)}g</div>
              <div className="text-xs text-gray-400">Protéines</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-green-400">{totals.carbs.toFixed(1)}g</div>
              <div className="text-xs text-gray-400">Glucides</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-yellow-400">{totals.fats.toFixed(1)}g</div>
              <div className="text-xs text-gray-400">Lipides</div>
            </div>
          </div>

          {/* Liste */}
          <div className="space-y-2">
            {savedFoods.map(food => (
              <div 
                key={food.id}
                className="bg-gray-800/50 rounded-lg p-3 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="font-semibold text-white">{food.name}</div>
                  <div className="text-sm text-gray-400">
                    {Math.round(food.calories)} kcal • {food.proteins.toFixed(1)}g P • {food.carbs.toFixed(1)}g G • {food.fats.toFixed(1)}g L
                  </div>
                </div>
                <button
                  onClick={() => removeFood(food.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setSavedFoods([])}
            className="w-full mt-4 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Réinitialiser la journée
          </button>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
