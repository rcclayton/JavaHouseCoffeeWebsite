/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Coffee, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Menu as MenuIcon, 
  X, 
  Star, 
  Wifi, 
  Zap, 
  Users,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'menu' | 'about' | 'location' | 'contact';

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Menu', value: 'menu' },
    { label: 'About', value: 'about' },
    { label: 'Location', value: 'location' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-10 h-10 bg-coffee-dark rounded-full flex items-center justify-center text-cream group-hover:rotate-12 transition-transform">
            <Coffee size={24} />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight">Java House</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => setCurrentPage(link.value)}
              className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-accent ${currentPage === link.value ? 'text-accent border-b-2 border-accent' : 'text-coffee-dark'}`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('location')}
            className="btn-primary py-2 px-6 text-sm"
          >
            Visit Us
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-coffee-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-cream shadow-xl border-t border-coffee-dark/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  setCurrentPage(link.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-lg font-serif text-left ${currentPage === link.value ? 'text-accent' : 'text-coffee-dark'}`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage('location');
                setIsMobileMenuOpen(false);
              }}
              className="btn-primary w-full mt-2"
            >
              Visit Us Today
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=2000" 
        alt="Freshly brewed specialty coffee" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-coffee-dark/40 backdrop-blur-[2px]"></div>
    </div>

    <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block text-accent font-medium tracking-[0.3em] uppercase mb-4">Est. 2012 • Local & Organic</span>
        <h1 className="text-5xl md:text-8xl text-cream font-bold mb-6 leading-tight">
          Your Daily Dose of <br />
          <span className="italic font-serif font-light">Connection.</span>
        </h1>
        <p className="text-cream/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Crafting specialty coffee and community in the heart of the city. Join us for a cup of perfection and a space to call home.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
            Visit Us Today <ArrowRight size={18} />
          </button>
          <button onClick={onMenuClick} className="btn-outline border-cream text-cream hover:bg-cream hover:text-coffee-dark w-full sm:w-auto">
            View Our Menu
          </button>
        </div>
      </motion.div>
    </div>

    {/* Scroll Indicator */}
    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream/60 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      <div className="w-[1px] h-12 bg-cream/30"></div>
    </motion.div>
  </section>
);

const QuickInfo = () => (
  <section className="py-12 bg-coffee-dark text-cream">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
          <Clock size={24} />
        </div>
        <div>
          <h3 className="font-serif text-xl">Open Daily</h3>
          <p className="text-cream/60 text-sm">Mon–Fri: 7am–7pm • Sat–Sun: 8am–6pm</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
          <MapPin size={24} />
        </div>
        <div>
          <h3 className="font-serif text-xl">Find Us</h3>
          <p className="text-cream/60 text-sm">123 Brew Street, Downtown City</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
          <Phone size={24} />
        </div>
        <div>
          <h3 className="font-serif text-xl">Call Ahead</h3>
          <p className="text-cream/60 text-sm">(555) 123-4567</p>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    { icon: <Wifi size={24} />, title: "Gigabit WiFi", desc: "High-speed internet for your remote work needs." },
    { icon: <Zap size={24} />, title: "Power Outlets", desc: "Abundant charging stations at every table." },
    { icon: <Users size={24} />, title: "Community Space", desc: "Large communal tables and cozy corners." },
    { icon: <Coffee size={24} />, title: "Ethical Beans", desc: "Direct-trade beans roasted in small batches." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-widest uppercase text-sm">The Java Experience</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">More Than Just Coffee</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-cream/50 border border-coffee-dark/5 hover:border-accent/30 transition-all"
            >
              <div className="text-accent mb-6">{f.icon}</div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-coffee-dark/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuPreview = ({ onFullMenu }: { onFullMenu: () => void }) => {
  const items = [
    { name: "Signature Latte", price: "$5.50", desc: "Double espresso with silky steamed milk and house vanilla.", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=400" },
    { name: "Cold Brew Tonic", price: "$6.00", desc: "12-hour cold brew, artisanal tonic, and a twist of orange.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400" },
    { name: "Avocado Sourdough", price: "$12.00", desc: "Local sourdough, smashed avocado, chili flakes, and radish.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-medium tracking-widest uppercase text-sm">Seasonal Favorites</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Crafted with Care</h2>
          </div>
          <button onClick={onFullMenu} className="btn-outline flex items-center gap-2">
            View Full Menu <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-sm font-bold">
                  {item.price}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{item.name}</h3>
              <p className="text-coffee-dark/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold">What Our Neighbors Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: "Sarah J.", role: "Local Resident", text: "Java House is my second home. The atmosphere is unmatched and the baristas know my order by heart." },
          { name: "Mark D.", role: "Remote Developer", text: "Best WiFi in the city and the coffee actually keeps me focused. A true gem for the remote work community." },
          { name: "Elena R.", role: "Coffee Enthusiast", text: "Their pour-over selection is world-class. You can tell they really care about the origin of their beans." }
        ].map((t, i) => (
          <div key={i} className="p-10 rounded-3xl bg-cream border border-coffee-dark/5 relative">
            <div className="flex gap-1 text-accent mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-lg italic font-serif mb-8 text-coffee-dark/80">"{t.text}"</p>
            <div>
              <p className="font-bold">{t.name}</p>
              <p className="text-xs text-coffee-dark/40 uppercase tracking-widest">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Loyalty = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-coffee-dark rounded-[3rem] p-12 md:p-20 text-center text-cream relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Join the Java Club</h2>
          <p className="text-cream/70 text-lg mb-10">
            Get your 10th coffee on us. Plus, exclusive access to seasonal launches and community events.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-cream placeholder:text-cream/30 focus:outline-none focus:border-accent"
            />
            <button className="btn-secondary whitespace-nowrap">Sign Up Free</button>
          </form>
          <p className="mt-6 text-xs text-cream/40">No spam, just coffee. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <footer className="bg-cream pt-24 pb-12 border-t border-coffee-dark/5">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-coffee-dark rounded-full flex items-center justify-center text-cream">
              <Coffee size={18} />
            </div>
            <span className="text-xl font-serif font-bold">Java House</span>
          </div>
          <p className="text-coffee-dark/60 text-sm leading-relaxed mb-6">
            Crafting community and specialty coffee since 2012. Locally owned and operated in the heart of the city.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-coffee-dark/10 flex items-center justify-center hover:bg-coffee-dark hover:text-cream transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-coffee-dark/10 flex items-center justify-center hover:bg-coffee-dark hover:text-cream transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-sm text-coffee-dark/60">
            <li><button onClick={() => setCurrentPage('home')} className="hover:text-accent transition-colors">Home</button></li>
            <li><button onClick={() => setCurrentPage('menu')} className="hover:text-accent transition-colors">Menu</button></li>
            <li><button onClick={() => setCurrentPage('about')} className="hover:text-accent transition-colors">About Us</button></li>
            <li><button onClick={() => setCurrentPage('location')} className="hover:text-accent transition-colors">Location</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Contact</h4>
          <ul className="flex flex-col gap-4 text-sm text-coffee-dark/60">
            <li className="flex items-center gap-2"><MapPin size={14} /> 123 Brew Street, City</li>
            <li className="flex items-center gap-2"><Phone size={14} /> (555) 123-4567</li>
            <li className="flex items-center gap-2"><Clock size={14} /> Open Daily from 7am</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
          <p className="text-xs text-coffee-dark/60 mb-4">Stay updated on new roasts and events.</p>
          <div className="flex gap-2">
            <input type="text" placeholder="Email" className="bg-white border border-coffee-dark/10 rounded-full px-4 py-2 text-xs w-full" />
            <button className="bg-coffee-dark text-cream rounded-full px-4 py-2 text-xs">Join</button>
          </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-coffee-dark/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-coffee-dark/40">
        <p>© 2026 Java House Coffee Roasters. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-accent">Privacy Policy</a>
          <a href="#" className="hover:text-accent">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <>
    <Hero onMenuClick={() => setCurrentPage('menu')} />
    <QuickInfo />
    <Features />
    <MenuPreview onFullMenu={() => setCurrentPage('menu')} />
    <Testimonials />
    <Loyalty />
  </>
);

const MenuPage = () => {
  const menuData = [
    {
      category: "Coffee & Espresso",
      items: [
        { name: "House Drip", price: "$3.50", desc: "Our signature medium roast blend." },
        { name: "Espresso", price: "$3.00", desc: "Double shot of our seasonal single-origin." },
        { name: "Cappuccino", price: "$4.75", desc: "Equal parts espresso, steamed milk, and foam." },
        { name: "Signature Latte", price: "$5.50", desc: "House-made vanilla bean syrup and double espresso." },
        { name: "Flat White", price: "$4.50", desc: "Micro-foam over a double ristretto shot." },
        { name: "Mocha", price: "$5.75", desc: "Rich dark chocolate and espresso." },
      ]
    },
    {
      category: "Cold Drinks",
      items: [
        { name: "Cold Brew", price: "$5.00", desc: "Steeped for 12 hours for a smooth finish." },
        { name: "Nitro Cold Brew", price: "$6.00", desc: "Infused with nitrogen for a creamy head." },
        { name: "Iced Matcha Latte", price: "$5.50", desc: "Ceremonial grade matcha and honey." },
        { name: "House Lemonade", price: "$4.00", desc: "Fresh squeezed with a hint of lavender." },
      ]
    },
    {
      category: "Food & Pastries",
      items: [
        { name: "Butter Croissant", price: "$4.50", desc: "Flaky, buttery, and baked fresh daily." },
        { name: "Avocado Toast", price: "$12.00", desc: "Sourdough, chili flakes, and microgreens." },
        { name: "Breakfast Burrito", price: "$10.00", desc: "Eggs, chorizo, potato, and house salsa." },
        { name: "Almond Cake", price: "$5.00", desc: "Gluten-free and perfectly moist." },
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-4">Our Menu</h1>
        <p className="text-coffee-dark/60 max-w-lg mx-auto">Everything we serve is sourced ethically and prepared with precision. We believe in quality you can taste.</p>
      </div>

      <div className="space-y-20">
        {menuData.map((cat, i) => (
          <div key={i}>
            <h2 className="text-3xl font-bold mb-10 border-b border-coffee-dark/10 pb-4">{cat.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {cat.items.map((item, j) => (
                <div key={j} className="flex justify-between items-start group">
                  <div className="flex-1 pr-4">
                    <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{item.name}</h3>
                    <p className="text-sm text-coffee-dark/60 mt-1">{item.desc}</p>
                  </div>
                  <span className="font-bold text-coffee-dark">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <div>
          <span className="text-accent font-medium tracking-widest uppercase text-sm">Our Story</span>
          <h1 className="text-6xl font-bold mt-4 mb-8">Brewing Community Since 2012</h1>
          <p className="text-lg text-coffee-dark/70 leading-relaxed mb-6">
            Java House started with a simple idea: that a coffee shop should be more than just a place to get a caffeine fix. It should be the heartbeat of the neighborhood.
          </p>
          <p className="text-lg text-coffee-dark/70 leading-relaxed">
            Founded by two coffee enthusiasts who spent years traveling the globe to find the perfect bean, we've dedicated ourselves to the art of the roast and the warmth of hospitality.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-[3rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1000" 
              alt="Team at work" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-accent p-12 rounded-3xl hidden md:block">
            <p className="text-4xl font-serif font-bold text-coffee-dark">14+</p>
            <p className="text-xs uppercase tracking-widest text-coffee-dark/60">Local Partners</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-12 md:p-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <h3 className="text-4xl font-bold mb-4">100%</h3>
          <p className="text-accent font-medium uppercase tracking-widest text-xs mb-4">Organic</p>
          <p className="text-sm text-coffee-dark/60">Every bean we roast is certified organic and ethically sourced.</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold mb-4">Direct</h3>
          <p className="text-accent font-medium uppercase tracking-widest text-xs mb-4">Trade</p>
          <p className="text-sm text-coffee-dark/60">We work directly with farmers to ensure fair wages and sustainable practices.</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold mb-4">Local</h3>
          <p className="text-accent font-medium uppercase tracking-widest text-xs mb-4">Sourced</p>
          <p className="text-sm text-coffee-dark/60">Our pastries and milk come from local dairies and bakeries within 50 miles.</p>
        </div>
      </div>
    </div>
  </div>
);

const LocationPage = () => (
  <div className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-4">Visit Us</h1>
        <p className="text-coffee-dark/60">We're located in the heart of downtown, easy to find and hard to leave.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Address</h3>
            <p className="text-coffee-dark/70">
              123 Brew Street<br />
              Downtown City, ST 12345
            </p>
            <button className="text-accent font-bold mt-4 flex items-center gap-2 hover:underline">
              Get Directions <ArrowRight size={16} />
            </button>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Hours</h3>
            <ul className="space-y-2 text-coffee-dark/70">
              <li className="flex justify-between"><span>Monday - Friday</span> <span>7am - 7pm</span></li>
              <li className="flex justify-between"><span>Saturday</span> <span>8am - 6pm</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>8am - 5pm</span></li>
            </ul>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-coffee-dark/5">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap size={20} className="text-accent" /> Parking Info
            </h3>
            <p className="text-sm text-coffee-dark/60 leading-relaxed">
              Validated parking is available in the Central Garage across the street. Street parking is free after 6pm and on Sundays.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 aspect-video bg-coffee-dark/5 rounded-[3rem] overflow-hidden relative">
          {/* Placeholder for Map */}
          <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
            alt="Map location" 
            className="w-full h-full object-cover opacity-50 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-coffee-dark rounded-full flex items-center justify-center text-cream">
                <Coffee size={24} />
              </div>
              <div>
                <p className="font-bold">Java House</p>
                <p className="text-xs text-coffee-dark/60">123 Brew Street</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
    <div className="text-center mb-20">
      <h1 className="text-6xl font-bold mb-4">Get in Touch</h1>
      <p className="text-coffee-dark/60">Questions, feedback, or just want to say hi? We'd love to hear from you.</p>
    </div>

    <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-sm border border-coffee-dark/5">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-coffee-dark/40">Full Name</label>
            <input type="text" className="w-full bg-cream/50 border border-coffee-dark/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-coffee-dark/40">Email Address</label>
            <input type="email" className="w-full bg-cream/50 border border-coffee-dark/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-coffee-dark/40">Subject</label>
          <select className="w-full bg-cream/50 border border-coffee-dark/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors appearance-none">
            <option>General Inquiry</option>
            <option>Catering Request</option>
            <option>Career Opportunities</option>
            <option>Feedback</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-coffee-dark/40">Message</label>
          <textarea rows={5} className="w-full bg-cream/50 border border-coffee-dark/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-colors" placeholder="How can we help?"></textarea>
        </div>
        <button className="btn-primary w-full py-5 text-lg">Send Message</button>
      </form>
    </div>

    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div>
        <h4 className="font-bold mb-2">Email Us</h4>
        <p className="text-sm text-accent">hello@javahouse.com</p>
      </div>
      <div>
        <h4 className="font-bold mb-2">Call Us</h4>
        <p className="text-sm text-accent">(555) 123-4567</p>
      </div>
      <div>
        <h4 className="font-bold mb-2">Social</h4>
        <p className="text-sm text-accent">@javahouse_coffee</p>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-coffee-dark">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <HomePage setCurrentPage={setCurrentPage} />
            </motion.div>
          )}
          {currentPage === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
            >
              <MenuPage />
            </motion.div>
          )}
          {currentPage === 'about' && (
            <motion.div 
              key="about"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <AboutPage />
            </motion.div>
          )}
          {currentPage === 'location' && (
            <motion.div 
              key="location"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <LocationPage />
            </motion.div>
          )}
          {currentPage === 'contact' && (
            <motion.div 
              key="contact"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
