
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Instagram, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Navigation,
  ExternalLink,
  MessageCircle,
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
    title: '基础入门班 (Fundamental)',
    duration: '5 - 8 周',
    target: '零基础学员 / 美甲爱好者',
    img: 'JZB.jpg',
    igLink: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTYxMDM3MjQ0NzA5MTgw?story_media_id=3316392326037451379',
    core: ['专业理论与卫生规范', '标准修型与极致护理', '基础凝胶/单色/法式', '基础线条/花卉彩绘']
  },
  {
    title: '全科创业班 (Professional)',
    duration: '10 - 14 周',
    target: '零基础、职业美甲师或创业者',
    img: 'qk3.jpg',
    igLink: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTYxMDM3MjQ0NzA5MTgw?story_media_id=3316392326037451379',
    core: ['涵盖入门班全部内容', '快速延长/异形甲矫正', '复杂彩绘/立体饰品', '门店运营/定价/摄影修图']
  },
  {
    title: '美甲师矫正班 (Refinement)',
    duration: '7 天',
    target: '有经验但需解决痛点的美甲师',
    img: 'jz1.jpg',
    igLink: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTAwOTUxMzk2NTU0Njc4?story_media_id=3581259703613504690',
    core: ['纠正握笔与打磨机手法', '极致包边/提升维持度(4周+)', '优化流程/大幅提升实操速度']
  },
  {
    title: '设计进修班 (Masterclass)',
    duration: '2 - 3 天',
    target: '寻求风格突破的在职美甲师',
    img: 'sj1.jpg',
    igLink: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODgxNzkxNzE3MzkxMDQ2?story_media_id=3428290401449686665',
    core: ['A班：日式高透感晕染技法', 'B班：构图美学/原创灵感转化', '色彩搭配理论/复合素材运用']
  },
  {
    title: '一对一定制班 (Private)',
    duration: '灵活预约',
    target: '需针对性攻克薄弱点的学员',
    img: 'dz1.jpg',
    igLink: 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4Mzk5ODQzMTMzMTQzMTA0?story_media_id=3438517743778417452',
    core: ['全私人定制教学模块', '根据现有水平深度陪跑', '手把手解决个人实操盲点']
  }
];

const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

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
              <button onClick={prevLightbox} className="absolute left-2 md:left-8 text-white p-4 hover:bg-white/10 rounded-full transition"><ChevronLeft size={40} /></button>
              <button onClick={nextLightbox} className="absolute right-2 md:right-8 text-white p-4 hover:bg-white/10 rounded-full transition"><ChevronRight size={40} /></button>
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
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-gray-500 transition-colors">{item}</a>
          ))}
        </nav>

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
          <div key={slide} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${currentHero === idx ? 'opacity-100' : 'opacity-0'}`}>
            <img src={`${ASSET_BASE}${slide}`} className="w-full h-full object-cover object-center" alt="Hero Slide" />
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
            <button key={idx} onClick={() => setCurrentHero(idx)} className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${currentHero === idx ? 'bg-white scale-150' : 'bg-white/30'}`} />
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
              className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-8 py-3.5 border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300"
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-start">
            {MENU_IMAGES.map((img, idx) => (
              <div 
                key={img}
                onClick={() => openLightbox(MENU_IMAGES, idx)}
                className="group relative cursor-zoom-in overflow-hidden aspect-[3/4] shadow-md rounded-sm bg-gray-50 flex flex-col"
              >
                <img src={`${ASSET_BASE}${img}`} className="w-full h-auto object-cover transition duration-1000 group-hover:scale-105" alt={`Menu Page ${idx + 1}`} />
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
                  <img src={`${ASSET_BASE}${artist.img}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" alt={artist.name} />
                </div>
                <h3 className="text-sm md:text-lg font-serif tracking-wide text-black">{artist.name}</h3>
                {artist.ig && (
                  <a 
                    href={`https://www.instagram.com/${artist.ig}`} 
                    target="_blank"
                    className="mt-2 inline-flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-[0.1em]"
                  >
                    <Instagram size={12} /> Portfolio
                  </a>
                )}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {COURSES.map((course) => (
              <div key={course.title} className="bg-white flex flex-col shadow-xl rounded-sm overflow-hidden border border-gray-100 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={`${ASSET_BASE}${course.img}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={course.title} />
                  <div className="absolute top-4 left-4 bg-black/80 text-white text-[9px] px-3 py-1.5 rounded-full uppercase tracking-widest">{course.duration}</div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif font-bold mb-4 tracking-tight leading-tight">{course.title}</h3>
                  
                  <div className="mb-6">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">面向对象</p>
                    <p className="text-sm text-gray-700 font-medium">{course.target}</p>
                  </div>

                  <div className="flex-grow">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">教学核心</p>
                    <ul className="space-y-2">
                      {course.core.map((item, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-200 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <a 
                      href={course.igLink} 
                      target="_blank" 
                      className="text-[10px] font-bold uppercase tracking-widest text-black hover:text-gray-500 transition"
                    >
                      查看精华亮點 &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 max-w-2xl mx-auto px-4">
            <div className="relative bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-white text-center overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl font-serif mb-4 italic">Master the Craft</h4>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed text-xs">
                  Ready to start your nail career? We provide personalized mentorship. 
                  Enquire via WeChat for schedules and pricing.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href={`weixin://dl/chat?username=${WECHAT_ID}`} 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-green-500 text-white px-10 py-4 rounded-full hover:bg-green-600 transition shadow-xl font-bold tracking-[0.2em] text-[10px] uppercase active:scale-95"
                  >
                    <MessageCircle size={18} /> WeChat Enquiry
                  </a>
                  <span className="text-gray-400 text-[10px] tracking-widest uppercase">ID: {WECHAT_ID}</span>
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
                    <a href="https://www.google.com/maps?q=Nailsbylittleboo+Salon" target="_blank" className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm"><Navigation size={14} /> Google Maps</a>
                    <a href="https://waze.com/ul/hw2832jyph" target="_blank" className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm"><ExternalLink size={14} /> Open Waze</a>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="inline-block w-full text-center py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition shadow-2xl active:scale-[0.98]">Message Us on WhatsApp</a>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-[#F7F2ED] p-10 md:p-16 rounded-2xl border border-gray-100 shadow-sm relative">
                <h3 className="text-2xl font-serif mb-12">Opening Hours</h3>
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

      {/* Floating WhatsApp FAB - Corrected Logo & Pulse Animation */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        className="fixed bottom-6 right-6 z-[100] bg-[#25d366] text-white p-5 rounded-full shadow-2xl hover:bg-[#1ebe57] transition-all duration-300 flex items-center justify-center group animate-pulse-wa"
      >
        <WhatsAppLogo className="w-8 h-8 md:w-9 md:h-9" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] ml-0 group-hover:ml-3">
          Book Appointment
        </span>
      </a>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        img { user-select: none; -webkit-user-drag: none; }
        html { scroll-behavior: smooth; }

        @keyframes pulse-wa {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          50% { transform: scale(1.15); box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .animate-pulse-wa {
          animation: pulse-wa 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
