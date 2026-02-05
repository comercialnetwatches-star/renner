import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Menu as MenuIcon, 
  X, 
  Utensils, 
  ShoppingBag, 
  Car,
  MessageCircle,
  ExternalLink,
  ChefHat,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import { BUSINESS_INFO, MENU_ITEMS, REVIEWS } from './constants';
import { MenuItem } from './types';

const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group flex flex-col h-full">
      <div className="h-48 overflow-hidden relative shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-stone-800 uppercase">
          {item.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-lg text-stone-900">{item.name}</h4>
        </div>
        <p className="text-stone-500 text-sm mb-4">{item.description}</p>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-brand-600 text-xs font-bold uppercase tracking-wide flex items-center gap-1 mb-3 hover:text-brand-700 transition-colors self-start"
        >
            {isExpanded ? 'Ocultar detalhes' : 'Ver detalhes'}
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        
        {isExpanded && (
            <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-lg mb-4 animate-in fade-in slide-in-from-top-1 border border-stone-100">
                <p className="font-bold text-stone-700 mb-1">Ingredientes & Preparo:</p>
                <p className="leading-relaxed">{item.details || "Consulte o restaurante para mais detalhes."}</p>
            </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
          <span className="font-bold text-brand-600">{item.price}</span>
          <a 
            href={`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=Olá! Gostaria de pedir: ${item.name}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-stone-900 text-white p-2 rounded-full hover:bg-brand-600 transition-colors"
            aria-label={`Pedir ${item.name}`}
          >
            <ShoppingBag size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=Olá! Gostaria de fazer um pedido.`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header (approx 100px)
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Calculate review counts safely
  const reviewCounts = REVIEWS.reduce((acc, review) => {
    if (review && review.rating) {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  // Filter reviews
  const filteredReviews = filterRating === null
    ? REVIEWS
    : REVIEWS.filter(review => review.rating === filterRating);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-brand-500 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${scrolled ? 'bg-brand-600 text-white' : 'bg-white text-brand-600'}`}>
              <ChefHat size={24} />
            </div>
            <span className={`text-xl font-bold font-serif ${scrolled ? 'text-stone-900' : 'text-white drop-shadow-md'}`}>
              Restaurante do Renner
            </span>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-8 font-medium ${scrolled ? 'text-stone-600' : 'text-white drop-shadow-sm'}`}>
            <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className="hover:text-brand-500 transition-colors cursor-pointer">Sobre</a>
            <a href="#menu" onClick={(e) => scrollToSection(e, 'menu')} className="hover:text-brand-500 transition-colors cursor-pointer">Cardápio</a>
            <a href="#avaliacoes" onClick={(e) => scrollToSection(e, 'avaliacoes')} className="hover:text-brand-500 transition-colors cursor-pointer">Avaliações</a>
            <a href="#contato" onClick={(e) => scrollToSection(e, 'contato')} className="hover:text-brand-500 transition-colors cursor-pointer">Contato</a>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-md font-bold ${
                scrolled 
                  ? 'bg-brand-600 hover:bg-brand-700 text-white' 
                  : 'bg-white text-brand-600 hover:bg-stone-100'
              }`}
            >
              <MessageCircle size={18} />
              Pedir Agora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-stone-800' : 'text-white'}`}
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-stone-100 py-4 px-4 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5">
            <a href="#sobre" className="text-lg py-2 border-b border-stone-100" onClick={(e) => scrollToSection(e, 'sobre')}>Sobre</a>
            <a href="#menu" className="text-lg py-2 border-b border-stone-100" onClick={(e) => scrollToSection(e, 'menu')}>Cardápio</a>
            <a href="#avaliacoes" className="text-lg py-2 border-b border-stone-100" onClick={(e) => scrollToSection(e, 'avaliacoes')}>Avaliações</a>
            <a href="#contato" className="text-lg py-2 border-b border-stone-100" onClick={(e) => scrollToSection(e, 'contato')}>Contato</a>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-3 rounded-lg flex justify-center items-center gap-2 font-bold"
            >
              <MessageCircle size={20} />
              Fazer Pedido no WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Mesa farta de comida deliciosa" 
            className="w-full h-full object-cover"
          />
          {/* Multi-layered gradient for depth */}
          <div className="absolute inset-0 bg-stone-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-stone-950/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white flex flex-col items-center pt-10">
          {/* Premium Glass Badge */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-sm font-semibold mb-8 shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-700">
            <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
            </div>
            <span className="text-stone-100 tracking-wide font-medium border-l border-white/20 pl-3">O mais bem avaliado de Betim</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight drop-shadow-2xl tracking-tight animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-150">
            Sabor Caseiro <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-amber-500">Inesquecível</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300">
            Comida de verdade, feita com amor e ingredientes selecionados. <br className="hidden md:block"/>
            O almoço perfeito para o seu dia.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-500">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white text-lg font-bold px-8 py-4 rounded-full shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)] hover:shadow-[0_0_60px_-10px_rgba(234,88,12,0.6)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <Utensils size={20} />
              <span>Pedir Agora</span>
              <ArrowRight size={20} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </a>
            <button 
              onClick={(e) => scrollToSection(e as any, 'contato')}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 backdrop-blur-md text-white text-lg font-semibold px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-3 group"
            >
              <MapPin size={20} className="text-brand-500 group-hover:text-brand-400 transition-colors"/>
              Como Chegar
            </button>
          </div>

          {/* Floating Info Pills */}
          <div className="mt-20 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm md:text-base font-medium text-stone-200 animate-in fade-in zoom-in duration-1000 delay-700">
            <div className="flex items-center gap-2 bg-stone-900/40 border border-white/5 px-5 py-2.5 rounded-2xl backdrop-blur-md">
              <Clock size={16} className="text-brand-500" />
              <span>{BUSINESS_INFO.hours}</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-900/40 border border-white/5 px-5 py-2.5 rounded-2xl backdrop-blur-md">
              <ShoppingBag size={16} className="text-brand-500" />
              <span>{BUSINESS_INFO.priceRange} por pessoa</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-stone-400/70 cursor-pointer" onClick={(e) => scrollToSection(e as any, 'sobre')}>
            <ChevronDown size={32} />
        </div>
      </header>

      {/* Features / Services */}
      <section className="py-12 bg-white -mt-10 relative z-20 container mx-auto px-4 rounded-xl shadow-xl max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-stone-100">
          <div className="p-4">
            <div className="bg-brand-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
              <Utensils size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Refeição no Local</h3>
            <p className="text-stone-500 text-sm">Ambiente limpo, ventilado e acolhedor para você almoçar com tranquilidade.</p>
          </div>
          <div className="p-4">
            <div className="bg-brand-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
              <ShoppingBag size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Retirada no Balcão</h3>
            <p className="text-stone-500 text-sm">Faça seu pedido e passe para buscar. Rápido e prático para seu dia a dia.</p>
          </div>
          <div className="p-4">
            <div className="bg-brand-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
              <Car size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">Entrega sem Contato</h3>
            <p className="text-stone-500 text-sm">Levamos o melhor da nossa cozinha até você com total segurança.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Buffet de comida brasileira" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 bg-brand-600 text-white px-6 py-4 rounded-tr-2xl">
                <span className="block text-2xl font-bold">4.8</span>
                <span className="text-xs uppercase tracking-wider">Nota Google</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-brand-600 font-bold tracking-wider uppercase mb-2 text-sm">Sobre Nós</h2>
            <h3 className="text-4xl font-serif font-bold text-stone-900 mb-6">Tradição e Qualidade em Betim</h3>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Localizado no bairro Dom Bosco, o <strong>Restaurante do Renner</strong> é referência quando o assunto é comida caseira de qualidade. 
              Servimos refeições preparadas no dia, com aquele tempero que lembra comida de mãe.
            </p>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Seja para um almoço rápido no meio do expediente ou uma refeição tranquila, nosso compromisso é oferecer sabor, higiene e um preço justo que cabe no seu bolso.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
               <div className="flex items-center gap-3 text-stone-700 bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                 <Clock className="text-brand-500" />
                 <div>
                   <p className="text-xs text-stone-500 font-bold uppercase">Horário</p>
                   <p className="font-semibold">{BUSINESS_INFO.hours}</p>
                 </div>
               </div>
               <div className="flex items-center gap-3 text-stone-700 bg-white p-3 rounded-lg border border-stone-200 shadow-sm">
                 <MapPin className="text-brand-500" />
                 <div>
                   <p className="text-xs text-stone-500 font-bold uppercase">Localização</p>
                   <p className="font-semibold">Dom Bosco, Betim</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section id="menu" className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brand-600 font-bold tracking-wider uppercase mb-2 text-sm">Nosso Cardápio</h2>
            <h3 className="text-4xl font-serif font-bold text-stone-900 mb-4">Destaques do Dia</h3>
            <p className="text-stone-600">Opções deliciosas preparadas na hora. Consulte disponibilidade via WhatsApp.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENU_ITEMS.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-700 font-bold hover:text-brand-800 transition-colors border-b-2 border-brand-200 hover:border-brand-600 pb-1"
            >
              Ver cardápio completo no WhatsApp <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="avaliacoes" className="py-20 container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">O que nossos clientes dizem</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Com uma nota média de <strong>{BUSINESS_INFO.rating}</strong> baseada em <strong>{BUSINESS_INFO.reviewCount} avaliações</strong>, 
            somos orgulhosos de servir a comunidade de Betim.
          </p>
        </div>

        {/* Review Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilterRating(null)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 ${
              filterRating === null
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-brand-300'
            }`}
          >
            Todas ({REVIEWS.length})
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilterRating(rating)}
              disabled={!reviewCounts[rating]}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 ${
                !reviewCounts[rating] ? 'opacity-50 cursor-not-allowed bg-stone-50 text-stone-400 border border-stone-100' :
                filterRating === rating
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20 transform scale-105'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-brand-300 hover:text-brand-600 transform hover:scale-105'
              }`}
            >
              {rating} <Star size={14} className={filterRating === rating ? "fill-white" : "fill-yellow-400 text-yellow-400"} /> ({reviewCounts[rating] || 0})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm relative animate-in fade-in zoom-in-95">
                <div className="absolute top-8 right-8 text-stone-200">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                  </svg>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-stone-700 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center font-bold text-stone-500">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-stone-900">{review.author}</p>
                    <p className="text-xs text-stone-400">{review.timeAgo}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-1 md:col-span-3 text-center py-16 bg-stone-50 rounded-2xl border border-stone-100 border-dashed">
                <Star className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-500 font-medium text-lg">Nenhuma avaliação encontrada com esta nota.</p>
                <button 
                  onClick={() => setFilterRating(null)}
                  className="mt-4 text-brand-600 font-bold hover:underline"
                >
                  Ver todas as avaliações
                </button>
             </div>
          )}
        </div>
      </section>

      {/* CTA / Location Section */}
      <section id="contato" className="bg-stone-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Visite-nos hoje mesmo</h2>
              <p className="text-stone-400 mb-8 text-lg">
                Estamos prontos para te atender com o melhor sabor da região. 
                Peça delivery ou venha comer aqui.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-stone-800 p-3 rounded-lg text-brand-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Endereço</h3>
                    <p className="text-stone-300">{BUSINESS_INFO.fullAddress}</p>
                    <a href={BUSINESS_INFO.mapLink} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-400 text-sm mt-1 inline-block border-b border-transparent hover:border-brand-500">
                      Ver no Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-stone-800 p-3 rounded-lg text-brand-500">
                    <Clock size={24} />
                  </div>
                  <div className="w-full">
                    <h3 className="font-bold text-lg mb-2">Horário de Funcionamento</h3>
                    <div className="space-y-1">
                      {BUSINESS_INFO.openingHours.map((item, index) => (
                        <div key={index} className="flex justify-between text-stone-300 text-sm">
                           <span>{item.label}</span>
                           <span>{item.time}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-stone-500 mt-2 italic">{BUSINESS_INFO.holidayNote}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-stone-800 p-3 rounded-lg text-brand-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Contato</h3>
                    <p className="text-stone-300">{BUSINESS_INFO.phone}</p>
                    <a href={whatsappLink} className="text-brand-500 hover:text-brand-400 text-sm mt-1 inline-block">
                      Chamar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-stone-800 relative">
              {/* Fallback visual for map since we can't embed real interactive maps easily without API keys */}
              <img 
                 src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
                 className="w-full h-full object-cover opacity-60"
                 alt="Mapa estático"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <a 
                   href={BUSINESS_INFO.mapLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full font-bold shadow-xl transition-transform hover:scale-105 flex items-center gap-2"
                 >
                   <MapPin size={20} />
                   Abrir no Google Maps
                 </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-500 py-8 border-t border-stone-900">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 text-white">
            <ChefHat size={20} />
            <span className="font-serif font-bold text-lg">Restaurante do Renner</span>
          </div>
          <p className="text-sm mb-4">
            &copy; {new Date().getFullYear()} Restaurante do Renner. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-brand-500 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-brand-500 transition-colors">Termos</a>
            <a href={BUSINESS_INFO.mapLink} className="hover:text-brand-500 transition-colors">Localização</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;