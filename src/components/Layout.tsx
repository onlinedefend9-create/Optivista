import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Package, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Bell,
  Search,
  Globe,
  FileText,
  Stethoscope,
  Truck
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'ar' : 'fr';
    i18n.changeLanguage(nextLang);
    document.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  const navItems = [
    { name: t('dashboard'), icon: BarChart3, path: '/' },
    { name: t('customers'), icon: Users, path: '/customers' },
    { name: t('quotes'), icon: FileText, path: '/quotes' },
    { name: t('orders'), icon: ShoppingCart, path: '/orders' },
    { name: t('doctors', 'Médecins'), icon: Stethoscope, path: '/doctors' },
    { name: t('suppliers', 'Fournisseurs'), icon: Truck, path: '/suppliers' },
    { name: t('inventory'), icon: Package, path: '/inventory' },
    { name: t('appointments'), icon: Calendar, path: '/appointments' },
    { name: t('settings'), icon: Settings, path: '/settings' },
  ];

  return (
    <div className={`min-h-screen bg-background text-foreground flex font-sans ${i18n.language === 'ar' ? 'font-arabic' : ''}`}>
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-border sticky top-0 h-screen transition-all">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
            <Globe className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">OptiVista</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-white/5 text-blue-400 border border-blue-500/20 shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-950/20 gap-3">
            <LogOut className="w-5 h-5" />
            <span>{t('logout', 'Déconnexion')}</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: i18n.language === 'ar' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: i18n.language === 'ar' ? '100%' : '-100%' }}
              className={`fixed ${i18n.language === 'ar' ? 'right-0' : 'left-0'} top-0 bottom-0 w-72 bg-sidebar border-border z-50 md:hidden shadow-2xl flex flex-col`}
            >
               <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-blue-600" />
                  <span className="font-bold text-xl text-white">OptiVista</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-slate-400">
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <nav className="flex-1 px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-white/5 text-blue-400 border border-blue-500/20' 
                          : 'text-slate-400'
                      }`
                    }
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-lg font-medium">{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-sidebar/80 backdrop-blur-md border-b border-border sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="ghost" size="icon" className="md:hidden text-slate-400" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </Button>
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                placeholder={t('search')} 
                className="pl-10 bg-slate-900 border-border rounded-lg h-9 text-sm focus-visible:ring-blue-500 shadow-inner text-slate-300 placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" onClick={toggleLanguage} className="rounded-full text-slate-400 hover:text-white">
              <span className="font-bold text-sm">{i18n.language.toUpperCase()}</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative rounded-full text-slate-400 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-sidebar" />
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block bg-slate-800" />

            <DropdownMenu>
              <DropdownMenuTrigger nativeButton={false} render={
                <div className="flex items-center gap-3 cursor-pointer pl-2 group">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">Younes Optic</p>
                    <p className="text-xs text-slate-500">Casablanca, MA</p>
                  </div>
                  <Avatar className="h-9 w-9 border-2 border-slate-800 shadow-lg group-hover:scale-105 transition-transform">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Younes" />
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                </div>
              } />
              <DropdownMenuContent align="end" className="w-56 mt-2 bg-slate-900 border-slate-800 text-slate-200">
                <DropdownMenuItem className="py-2 focus:bg-slate-800 focus:text-white">{t('profile', 'Mon Profil')}</DropdownMenuItem>
                <DropdownMenuItem className="py-2 focus:bg-slate-800 focus:text-white">{t('settings')}</DropdownMenuItem>
                <Separator className="my-1 bg-slate-800" />
                <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-950/30 py-2">
                  {t('logout', 'Déconnexion')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-4 md:p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
