import React, { useState, useEffect } from 'react';
import { Moon, Leaf, BookOpen, Plus, X, Home as HomeIcon } from 'lucide-react';

// components
import ProfileManager from './src/components/ProfileManager';
import Home from './src/components/Home';

const NegusLunar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('home');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Charger les notes depuis localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('negusLunarNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Sauvegarder les notes dans localStorage
  useEffect(() => {
    localStorage.setItem('negusLunarNotes', JSON.stringify(notes));
  }, [notes]);

  // Calcul de la phase lunaire
  const getMoonPhase = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    let c = 0, e = 0, jd = 0, b = 0;
    
    if (month < 3) {
      year--;
      month += 12;
    }
    
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);
    
    if (b >= 8) b = 0;
    
    const phases = [
      { name: 'Nouvelle Lune', emoji: '🌑', description: 'Nouveau départ, intentions' },
      { name: 'Premier Croissant', emoji: '🌒', description: 'Germination, action' },
      { name: 'Premier Quartier', emoji: '🌓', description: 'Construction, détermination' },
      { name: 'Gibbeuse Croissante', emoji: '🌔', description: 'Raffinement, ajustement' },
      { name: 'Pleine Lune', emoji: '🌕', description: 'Accomplissement, gratitude' },
      { name: 'Gibbeuse Décroissante', emoji: '🌖', description: 'Partage, récolte' },
      { name: 'Dernier Quartier', emoji: '🌗', description: 'Libération, pardon' },
      { name: 'Dernier Croissant', emoji: '🌘', description: 'Repos, introspection' }
    ];
    
    return phases[b];
  };

  const moonPhase = getMoonPhase(currentDate);

  // Recettes végétaliennes par humeur
  const recipesByMood = {
    énergique: [
      { name: 'Bowl de Quinoa Arc-en-ciel', ingredients: 'Quinoa, légumes croquants, avocat, tahini' },
      { name: 'Smoothie Vert Dynamique', ingredients: 'Épinards, banane, spiruline, lait végétal' },
      { name: 'Salade Thai Épicée', ingredients: 'Chou, carottes, cacahuètes, sauce pimentée' }
    ],
    calme: [
      { name: 'Soupe Miso Réconfortante', ingredients: 'Bouillon, tofu, algues wakame, gingembre' },
      { name: 'Risotto aux Champignons', ingredients: 'Riz arborio, champignons, levure nutritionnelle' },
      { name: 'Porridge Coco-Cardamome', ingredients: 'Flocons d\'avoine, lait de coco, cardamome' }
    ],
    créatif: [
      { name: 'Tacos de Jackfruit BBQ', ingredients: 'Fruit de jacquier, épices BBQ, chou rouge' },
      { name: 'Pizza Verte à la Roquette', ingredients: 'Pâte maison, pesto, roquette, pignons' },
      { name: 'Curry Malais aux Patates Douces', ingredients: 'Patates douces, lait de coco, curry' }
    ],
    contemplatif: [
      { name: 'Dal aux Lentilles Corail', ingredients: 'Lentilles corail, curcuma, lait de coco' },
      { name: 'Bouddha Bowl Équilibré', ingredients: 'Riz complet, légumes rôtis, houmous' },
      { name: 'Thé Chaï & Biscuits Avoine', ingredients: 'Épices chaï, flocons d\'avoine, sirop d\'érable' }
    ]
  };

  const addNote = () => {
    if (newNote.trim() && selectedMood) {
      const note = {
        id: Date.now(),
        text: newNote,
        mood: selectedMood,
        date: new Date().toLocaleDateString('fr-FR'),
        moonPhase: moonPhase.name
      };
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Fonctions pour le calendrier
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    // Retourne l'indice du jour (0 = Lundi .. 6 = Dimanche)
    // JS getDay(): 0 = Dimanche, 1 = Lundi ...
    const d = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return (d + 6) % 7; // decalage pour que Lundi = 0
  };

  const handlePrevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1));
  };

  const handleSelectDate = (day) => {
    const selectedDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    setCurrentDate(selectedDate);
    setShowCalendar(false);
  };

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const daysInMonth = getDaysInMonth(calendarDate);
  const firstDay = getFirstDayOfMonth(calendarDate);

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      {/* Étoiles d'arrière-plan */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Gradient overlay pour la profondeur */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-900/20 to-slate-900/40" />

      <div className="relative z-10 max-w-6xl px-6 py-8 mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-3 text-6xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text">
            NegusLunar
          </h1>
          <p className="text-lg font-light tracking-wide text-purple-200/80">
            Phases lunaires • Notes • Cuisine végétalienne
          </p>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'home'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg shadow-yellow-400/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <HomeIcon size={20} />
            Accueil
          </button>
          <button
            onClick={() => setActiveTab('lunar')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'lunar'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-purple-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Moon size={20} />
            Phase Lunaire
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'notes'
                ? 'bg-gradient-to-r from-green-500 to-teal-500 shadow-lg shadow-green-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <BookOpen size={20} />
            Notes & Idées
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'recipes'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-500/50 scale-105'
                : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
            }`}
          >
            <Leaf size={20} />
            Recettes
          </button>
        </nav>

        {/* Contenu principal */}
        <main className="p-8 border shadow-2xl backdrop-blur-md bg-white/5 rounded-3xl border-white/10">
          {/* Phase Lunaire */}
          {activeTab === 'home' && (
            <Home />
          )}

          {activeTab === 'lunar' && (
            <div className="space-y-8 text-center animate-fadeIn">
              <div className="mb-6 text-9xl animate-pulse">
                {moonPhase.emoji}
              </div>
              <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text">
                {moonPhase.name}
              </h2>
              <p className="max-w-md mx-auto text-xl leading-relaxed text-purple-200/80">
                {moonPhase.description}
              </p>
              <div className="text-sm text-purple-300/60">
                {currentDate.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              
              {/* Bouton Calendrier */}
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center justify-center gap-2 px-6 py-3 mx-auto mt-6 font-medium transition-all rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Moon size={20} />
                Choisir une date
              </button>
            </div>
          )}

          {/* Notes */}
          {activeTab === 'notes' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="mb-6 text-3xl font-bold text-transparent bg-gradient-to-r from-green-200 to-teal-200 bg-clip-text">
                Journal & Intentions
              </h2>
              
              {/* Formulaire de nouvelle note */}
              <div className="p-6 border bg-white/10 rounded-2xl backdrop-blur-sm border-white/20">
                <div className="space-y-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Écris tes pensées, intentions ou idées..."
                    className="w-full p-4 text-white border resize-none bg-white/5 border-white/20 rounded-xl placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 min-h-32"
                  />
                  
                  <div className="flex gap-3">
                    {['énergique', 'calme', 'créatif', 'contemplatif'].map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`px-4 py-2 rounded-full text-sm transition-all ${
                          selectedMood === mood
                            ? 'bg-green-500 text-white scale-105'
                            : 'bg-white/10 hover:bg-white/20 text-purple-200'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={addNote}
                    disabled={!newNote.trim() || !selectedMood}
                    className="flex items-center justify-center w-full gap-2 py-3 font-medium transition-all bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                  >
                    <Plus size={20} />
                    Ajouter la note
                  </button>
                </div>
              </div>

              {/* Liste des notes */}
              <div className="space-y-4">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-5 transition-all border bg-white/10 rounded-2xl backdrop-blur-sm border-white/20 hover:border-green-500/50 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 text-xs font-medium text-green-200 rounded-full bg-green-500/20">
                          {note.mood}
                        </span>
                        <span className="text-xs text-purple-300/60">
                          {note.moonPhase} • {note.date}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-red-400 transition-all opacity-0 group-hover:opacity-100 hover:text-red-300"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <p className="leading-relaxed text-purple-100">{note.text}</p>
                  </div>
                ))}
                
                {notes.length === 0 && (
                  <div className="py-12 text-center text-purple-300/60">
                    <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Aucune note pour le moment. Commence ton journal lunaire !</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Recettes */}
          {activeTab === 'recipes' && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="mb-6 text-3xl font-bold text-transparent bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text">
                Recettes Végétaliennes par Humeur
              </h2>
              
              <div className="space-y-6">
                {Object.entries(recipesByMood).map(([mood, recipes]) => (
                  <div key={mood} className="space-y-3">
                    <h3 className="flex items-center gap-2 text-xl font-semibold text-pink-200 capitalize">
                      <Leaf size={20} className="text-green-400" />
                      {mood}
                    </h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {recipes.map((recipe, idx) => (
                        <div
                          key={idx}
                          className="p-5 transition-all border bg-white/10 rounded-xl backdrop-blur-sm border-white/20 hover:border-pink-500/50 hover:scale-105"
                        >
                          <h4 className="mb-2 font-semibold text-pink-100">
                            {recipe.name}
                          </h4>
                          <p className="text-sm leading-relaxed text-purple-200/70">
                            {recipe.ingredients}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-sm text-center text-purple-300/60">
          <p>Créé avec 🌙 par Négus Dja • Guadeloupe</p>
        </footer>
      </div>

      {/* Pop-up Calendrier */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowCalendar(false)}>
          <div className="w-11/12 max-w-sm p-8 border shadow-2xl bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 rounded-3xl border-white/20" onClick={(e) => e.stopPropagation()}>
            {/* Header du calendrier */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevMonth}
                className="px-4 py-2 transition-all rounded-lg bg-white/10 hover:bg-white/20"
              >
                ←
              </button>
              <h3 className="flex-1 text-xl font-bold text-center">
                {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
              </h3>
              <button
                onClick={handleNextMonth}
                className="px-4 py-2 transition-all rounded-lg bg-white/10 hover:bg-white/20"
              >
                →
              </button>
            </div>

            {/* Jours de la semaine */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                <div key={day} className="text-xs font-semibold text-center text-purple-300">
                  {day}
                </div>
              ))}
            </div>

            {/* Grille des jours */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {/* Jours vides avant le 1er du mois */}
              {[...Array(firstDay)].map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square min-h-[48px]" />
              ))}
              
              {/* Jours du mois */}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isSelected = 
                  day === currentDate.getDate() &&
                  calendarDate.getMonth() === currentDate.getMonth() &&
                  calendarDate.getFullYear() === currentDate.getFullYear();
                
                return (
                  <button
                    key={day}
                    onClick={() => handleSelectDate(day)}
                    className={`aspect-square min-h-[48px] flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Bouton de fermeture */}
            <button
              onClick={() => setShowCalendar(false)}
              className="w-full px-4 py-2 font-medium text-white transition-all rounded-lg bg-white/10 hover:bg-white/20"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Poppins:wght@300;400;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        h1 {
          font-family: 'Space Mono', monospace;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at 50% 50%, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default NegusLunar;
