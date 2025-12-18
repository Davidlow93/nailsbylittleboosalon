
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Navigation,
  ExternalLink
} from 'lucide-react';

// --- Constants & Assets ---
const ASSET_BASE = "https://raw.githubusercontent.com/Davidlow93/nailsbylittleboosalon/main/assets/";
const LOGO_URL = `${ASSET_BASE}logo.png`;
const WHATSAPP_NUMBER = "60183887390";
const WECHAT_ID = "Nailsbylittleboo";

const HERO_SLIDES = ['hp1.png', 'hp2.png', 'hp3.png', 'hp4.png', 'hp5.png'];
const MENU_IMAGES = ['menu%201.png', 'menu%202.png', 'menu%203.png', 'menu%204.png'];

const ARTISTS = [
  { name: 'Boo', img: 'boo.jpg', ig: 'nailsbylittleboo' },
  { name: 'Shean Yuan', img: 'sy.jpg', ig: 'salon_de_mie' },
  { name: 'Pei Ying', img: 'py.jpg', ig: 'popeye.nailsart' },
  { name: 'Ke Xin', img: 'kx.jpg', ig: '_xinnails' },
  { name: 'Ivy', img: 'ivy.jpg', ig: 'ivnails_nailsbylittleboo' },
  { name: 'Gisselle', img: 'gs.jpg', ig: 'yimagine.nails' },
  { name: 'Jayee', img: 'jy.jpg' },
  { name: 'Wen Jing', img: 'wj.jpg' },
  { name: 'Yi Xuan', img: 'yx.jpg' },
  { name: 'Ting Ting', img: 'tt.jpg' },
];

const COURSES = [
  { 
    title: 'Design Class', 
    instructors: 'Shean Yuan / Pei Ying / Ke Xin', 
    img: 'sj1.jpg',
    igLink: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODgxNzkxNzE3MzkxMDQ2?story_media_id=3428290401449686665'
  },
  { 
    title: 'Full Course', 
    instructors: 'Ivy / Ke Xin / Boo', 
    img: 'qk1.jpg',
    igLink: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTYxMDM3MjQ0NzA5MTgw?story_media_id=3316392326037451379'
  },
  { 
    title: 'Correction Class', 
    instructors: 'Shean Yuan / Boo', 
    img: 'jz1.jpg',
    igLink: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTAwOTUxMzk2NTU0Njc4?story_media_id=3581259703613504690'
  },
  { 
    title: '1-on-1 Custom', 
    instructors: 'SY / KX / PY / Boo', 
    img: 'dz1.jpg',
    igLink: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4Mzk5ODQzMTMzMTQzMTA0?story_media_id=3438517743778417452'
  },
];

const App: React.FC = () => {
  const [lightbox, setLightbox] = useState<{ isOpen: boolean, images: string[], index: number }>({
    isOpen: false,
    images: [],
    index: 0
  });
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const openLightbox = (images: string[], index: number) => {
    setLightbox({ isOpen: true, images, index });
  };

  const closeLightbox = () => setLightbox({ ...lightbox, isOpen: false });

  const nextLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
  };

  const prevLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightbox(prev => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
  };

  return (
    <div className="min-h-screen bg-[#F7F2ED] font-sans text-[#222222] overflow-x-hidden selection:bg-[#d9cfc5]">
      {/* Lightbox Overlay */}
      {lightbox.isOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 touch-none"
          onClick={closeLightbox}
        >
          <button className="absolute top-6 right-6 text-white hover:text-gray-300 z-50 p-2">
            <X size={32} />
          </button>
          
          {lightbox.images.length > 1 && (
            <>
              <button 
                onClick={prevLightbox}
                className="absolute left-2 md:left-8 text-white p-4 hover:bg-white/10 rounded-full transition"
              >
                <ChevronLeft size={40} />
              </button>
              <button 
                onClick={nextLightbox}
                className="absolute right-2 md:right-8 text-white p-4 hover:bg-white/10 rounded-full transition"
              >
                <ChevronRight size={40} />
              </button>
            </>
          )}

          <img 
            src={lightbox.images[lightbox.index].startsWith('http') ? lightbox.images[lightbox.index] : `${ASSET_BASE}${lightbox.images[lightbox.index]}`} 
            className="max-h-[85vh] max-w-full object-contain shadow-2xl transition-all duration-500"
            onClick={e => e.stopPropagation()}
            alt="Gallery item"
          />
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 md:h-24 bg-[#F7F2ED]/95 backdrop-blur-md border-b border-gray-200 shadow-sm px-4 md:px-12 flex items-center justify-between">
        <a href="#" className="h-full flex items-center py-2 flex-shrink-0">
          <img src={LOGO_URL} alt="Nailsbylittleboo" className="h-10 md:h-14 lg:h-16 w-auto object-contain" />
        </a>
        
        <nav className="hidden lg:flex gap-8 text-[11px] font-bold tracking-[0.2em] uppercase">
          {['Gallery', 'Services', 'Artists', 'Course', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gray-500 transition-colors">
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Mini Nav */}
        <div className="lg:hidden flex gap-3 text-[10px] font-bold tracking-[0.1em] uppercase overflow-x-auto no-scrollbar py-2 pr-4">
           <a href="#gallery" className="px-3">Gallery</a>
           <a href="#services" className="px-3">Services</a>
           <a href="#course" className="px-3">Course</a>
           <a href="#contact" className="px-3">Contact</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[75vh] md:h-[calc(100vh-6rem)] mt-20 md:mt-24 bg-gray-900 group">
        {HERO_SLIDES.map((slide, idx) => (
          <div 
            key={slide}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${currentHero === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={`${ASSET_BASE}${slide}`} 
              className="w-full h-full object-cover object-center" 
              alt="Hero Slide"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
        
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center transform translate-y-16 md:translate-y-24">
          <h1 className="text-white text-xl md:text-4xl font-serif tracking-[0.2em] uppercase drop-shadow-2xl mb-8 leading-tight">
            Premium Japanese <br className="hidden md:block" /> Nail Art Salon
          </h1>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            className="px-10 md:px-14 py-3.5 md:py-4 bg-[#F7F2ED] text-gray-800 font-bold tracking-[0.2em] uppercase hover:bg-white transition-all shadow-xl rounded-sm text-[10px] md:text-xs"
          >
            Book Appointment
          </a>
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
          {HERO_SLIDES.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentHero(idx)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${currentHero === idx ? 'bg-white scale-150' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-4 tracking-wide text-black/80">Art Gallery</h2>
          <p className="text-gray-400 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-12">Professional Craftsmanship</p>
          
          <div className="w-full bg-white rounded-xl p-2 md:p-6 shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
            <script src="https://elfsightcdn.com/platform.js" async></script>
            <div className="elfsight-app-ecf4cf75-bd8e-436d-be60-0f299a9d4861" data-elfsight-app-lazy></div>
          </div>
          
          <div className="mt-14">
            <a 
              href="https://www.instagram.com/nailsbylittleboo/" 
              target="_blank"
              className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2 hover:text-gray-500 hover:border-gray-300 transition-all"
            >
              <Instagram size={14} /> Follow Us @nailsbylittleboo
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28 bg-white/40 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Our Services</h2>
            <div className="w-12 h-px bg-black/20 mx-auto" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {MENU_IMAGES.map((img, idx) => (
              <div 
                key={img}
                onClick={() => openLightbox(MENU_IMAGES, idx)}
                className="group relative cursor-zoom-in overflow-hidden aspect-[3/4] shadow-md rounded-sm bg-gray-50"
              >
                <img 
                  src={`${ASSET_BASE}${img}`} 
                  className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" 
                  alt={`Menu Page ${idx + 1}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-500 flex items-center justify-center">
                   <div className="bg-white/95 text-black text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">Zoom</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-gray-400 text-[10px] uppercase tracking-[0.2em] italic">Click to view services and pricing</p>
        </div>
      </section>

      {/* Artists */}
      <section id="artists" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-16">Our Artists</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-20">
            {ARTISTS.map((artist) => (
              <div key={artist.name} className="group flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 mb-4 rounded-sm">
                  <img 
                    src={`${ASSET_BASE}${artist.img}`} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105" 
                    alt={artist.name}
                  />
                  {artist.ig && (
                    <a 
                      href={`https://www.instagram.com/${artist.ig}`} 
                      target="_blank"
                      className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-[9px] py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest flex items-center justify-center gap-1"
                    >
                      <Instagram size={10} /> Portfolio
                    </a>
                  )}
                </div>
                <h3 className="text-sm md:text-lg font-serif tracking-wide">{artist.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nail Course */}
      <section id="course" className="py-20 md:py-32 bg-[#F7F2ED] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Nail Academy</h2>
            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.3em]">Excellence in Japanese Nail Art Education</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {COURSES.map((course) => (
              <div key={course.title} className="group relative bg-white overflow-hidden shadow-xl rounded-sm">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={`${ASSET_BASE}${course.img}`} 
                    className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" 
                    alt={course.title}
                  />
                  
                  <div className="absolute top-3 right-3 z-10">
                    <a 
                        href={`weixin://dl/chat?username=${WECHAT_ID}`}
                        className="bg-green-500 text-white p-2.5 rounded-full shadow-xl flex items-center justify-center hover:bg-green-600 transition-transform hover:scale-110 active:scale-90 border-2 border-white/30"
                    >
                        <MessageCircle size={18} fill="currentColor" />
                    </a>
                  </div>

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-white text-[11px] mb-8 leading-relaxed font-light italic">Learn professional Japanese techniques from industry experts. Connect with us for enrolment info.</p>
                    <a 
                      href={course.igLink} 
                      target="_blank" 
                      className="bg-white text-black text-[10px] font-bold uppercase py-3 px-8 tracking-[0.2em] rounded-full hover:bg-[#F7F2ED] transition active:scale-95"
                    >
                      View Highlights
                    </a>
                  </div>
                </div>
                
                <div className="p-8 text-center bg-white">
                  <h3 className="text-lg md:text-xl font-serif font-bold mb-2 tracking-wide">{course.title}</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">{course.instructors}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 max-w-4xl mx-auto px-4">
            <div className="relative bg-white p-10 md:p-20 rounded-2xl shadow-2xl border border-white text-center overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-green-500/5 transform translate-x-1/4 -translate-y-1/4">
                <MessageCircle size={300} />
              </div>
              <div className="relative z-10">
                <h4 className="text-2xl md:text-4xl font-serif mb-6 italic tracking-tight">Master the Craft</h4>
                <p className="text-gray-500 mb-12 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                  Ready to start your nail career? We provide personalized mentorship to help you succeed.
                  Enquire via WeChat for the latest course schedules and pricing.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <a 
                    href={`weixin://dl/chat?username=${WECHAT_ID}`} 
                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-green-500 text-white px-12 py-5 rounded-full hover:bg-green-600 transition shadow-xl font-bold tracking-[0.2em] text-[11px] uppercase active:scale-95"
                  >
                    <MessageCircle size={20} /> WeChat Enquiry
                  </a>
                  <div className="text-gray-400 text-[10px] tracking-[0.3em] uppercase border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-10">
                    ID: {WECHAT_ID}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-white px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif mb-10 text-black">Visit Our Studio</h2>
                <div className="space-y-10">
                  <div className="flex items-start gap-5">
                    <MapPin className="text-red-500 mt-1 flex-shrink-0" size={26} />
                    <div className="text-gray-600 leading-relaxed text-sm md:text-base">
                      <strong className="text-black block mb-3 font-serif text-xl tracking-wide uppercase">NAILSBYLITTLEBOO SALON</strong>
                      <p>B-05-21 Sunway Geo Avenue,<br />Jalan Lagoon Selatan Bandar Sunway,<br />47500 Subang Jaya, Selangor, Malaysia.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a 
                      href="https://www.google.com/maps?q=Nailsbylittleboo+Salon" 
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm"
                    >
                      <Navigation size={14} /> Google Maps
                    </a>
                    <a 
                      href="https://waze.com/ul/hw2832jyph" 
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm"
                    >
                      <ExternalLink size={14} /> Open Waze
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  className="inline-block w-full text-center py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition shadow-2xl active:scale-[0.98]"
                >
                  Message Us on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-[#F7F2ED] p-10 md:p-16 rounded-2xl border border-gray-100 shadow-sm relative">
                <div className="absolute top-0 right-0 p-8 text-gray-200/20">
                    <Clock size={80} />
                </div>
                <h3 className="text-2xl font-serif mb-12 flex items-center gap-3">Opening Hours</h3>
                <div className="space-y-8 text-sm">
                  <div className="flex justify-between items-center border-b border-black/5 pb-5">
                    <span className="text-gray-500 font-light">Monday — Friday</span>
                    <span className="font-bold tracking-[0.1em] text-black">11:00 AM — 6:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-black/5 pb-5">
                    <span className="text-gray-500 font-light">Saturday — Sunday</span>
                    <span className="font-bold tracking-[0.1em] text-black">9:00 AM — 4:30 PM</span>
                  </div>
                </div>
                
                <div className="mt-20 text-[9px] text-gray-400 space-y-2 uppercase tracking-[0.3em] leading-loose">
                  <p>Operated by Daun Segar Sdn Bhd (1444290-V)</p>
                  <p>&copy; {new Date().getFullYear()} Nailsbylittleboo Salon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp FAB */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        className="fixed bottom-6 right-6 z-[100] bg-[#25d366] text-white p-4.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      >
        <MessageCircle size={28} fill="currentColor" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] ml-0 group-hover:ml-3">
          Book Appointment
        </span>
      </a>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        img { user-select: none; -webkit-user-drag: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

