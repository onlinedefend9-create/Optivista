import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package, 
  Truck,
  FileText,
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Globe,
  UserPlus,
  ArrowRight,
  History,
  Activity,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from "@/components/ui/progress";
import { Link } from 'react-router-dom';

const data = [
  { name: 'Lun', revenue: 4200, orders: 24, lastWeek: 3800 },
  { name: 'Mar', revenue: 3100, orders: 18, lastWeek: 3500 },
  { name: 'Mer', revenue: 2500, orders: 12, lastWeek: 2100 },
  { name: 'Jeu', revenue: 3800, orders: 15, lastWeek: 3200 },
  { name: 'Ven', revenue: 1900, orders: 10, lastWeek: 2400 },
  { name: 'Sam', revenue: 2400, orders: 20, lastWeek: 1800 },
  { name: 'Dim', revenue: 3600, orders: 25, lastWeek: 2900 },
];

const categoryData = [
  { name: 'Verres', value: 45, color: '#3b82f6' },
  { name: 'Montures', value: 35, color: '#10b981' },
  { name: 'Contact', value: 15, color: '#f59e0b' },
  { name: 'Access', value: 5, color: '#ef4444' },
];

const StatCard = ({ title, value, icon: Icon, percentage, trend, color, description }: any) => (
  <Card className="bg-slate-900/40 border-slate-800/50 shadow-xl overflow-hidden hover:border-blue-500/30 transition-all group backdrop-blur-sm">
    <CardContent className="p-5">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100 group-hover:scale-110 transition-transform`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-black ${trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {percentage}%
        </div>
      </div>
      <div className="mt-4">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-black mt-1 text-white">{value}</h3>
        {description && <p className="text-[10px] text-slate-500 mt-1 font-medium italic">{description}</p>}
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            Dashboard
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] uppercase font-black px-2 py-0.5">Live</Badge>
          </h1>
          <p className="text-slate-400 mt-1 font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            Performance globale: <span className="text-emerald-400 font-bold">+12.4%</span> ce mois-ci
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 px-6 bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white transition-all">
            <History className="w-4 h-4 mr-2" />
            Historique
          </Button>
          <Link to="/orders">
            <Button className="rounded-xl h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 gap-2 font-bold transition-all hover:scale-105 active:scale-95">
              <Plus className="w-5 h-5" />
              Nouvel Ordre
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/customers" className="group p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl flex flex-col items-center gap-3 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <UserPlus className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">Nouveau Client</span>
        </Link>
        <Link to="/quotes" className="group p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl flex flex-col items-center gap-3 hover:bg-emerald-600/10 hover:border-emerald-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">Créer Devis</span>
        </Link>
        <Link to="/inventory" className="group p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl flex flex-col items-center gap-3 hover:bg-amber-600/10 hover:border-amber-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Package className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">Gérer Stock</span>
        </Link>
        <Link to="/appointments" className="group p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl flex flex-col items-center gap-3 hover:bg-purple-600/10 hover:border-purple-500/30 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">Calendrier</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Ventes Totales" 
          value="45 800 DH" 
          icon={TrendingUp} 
          percentage="+15.4" 
          trend="up" 
          color="bg-emerald-600" 
          description="En hausse de 4k cette semaine"
        />
        <StatCard 
          title="Commandes Actives" 
          value="24" 
          icon={ShoppingCart} 
          percentage="+8.2" 
          trend="up" 
          color="bg-blue-600" 
          description="4 prêtes pour retrait"
        />
        <StatCard 
          title="Commandes Labo" 
          value="8" 
          icon={Truck} 
          percentage="+12.5" 
          trend="up" 
          color="bg-purple-600" 
          description="3 livraisons prévues aujourd’hui"
        />
        <StatCard 
          title="Articles Bas" 
          value="12" 
          icon={AlertCircle} 
          percentage="-4.1" 
          trend="down" 
          color="bg-rose-600" 
          description="Stock critique: Verres 1.6"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Performance Chart */}
        <Card className="lg:col-span-8 bg-slate-900/40 border-slate-800/50 shadow-xl overflow-hidden backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between p-6">
            <div>
              <CardTitle className="text-white font-black tracking-tight flex items-center gap-2">
                Performance des Ventes
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">Revenu journalier comparié à la semaine précédente</CardDescription>
            </div>
            <div className="flex gap-2">
               <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-black text-blue-400 uppercase">Semaine Actuelle</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                  <div className="w-2 h-2 rounded-full bg-slate-500" />
                  <span className="text-[10px] font-black text-slate-500 uppercase">Précédente</span>
               </div>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] px-2 pb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} 
                  tickFormatter={(val) => `${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  itemStyle={{ fontWeight: 'black', textTransform: 'uppercase', fontSize: '10px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="lastWeek" 
                  stroke="#475569" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pending Orders & Status */}
        <Card className="lg:col-span-4 bg-slate-900/40 border-slate-800/50 shadow-xl flex flex-col backdrop-blur-sm">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white font-black tracking-tight">{t('pending_deliveries', 'Retraits Clients')}</CardTitle>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-black">4 PRÊTS</Badge>
            </div>
            <CardDescription className="text-slate-500 font-medium">En attente de passage client</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 px-6 pb-6 space-y-4">
            {[
              { name: 'Dr. Sarah Alami', status: 'ready', time: 'Depuis 2j', amount: '2,400 DH' },
              { name: 'Ahmed Benjelloun', status: 'ready', time: 'Aujourd\'hui', amount: '1,850 DH' },
              { name: 'Leila Mansouri', status: 'supplier', time: 'Prévu: Demain', amount: '3,200 DH' },
              { name: 'Omar Dahir', status: 'pending', time: 'En atelier', amount: '950 DH' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 px-2 py-3 -mx-2 rounded-2xl transition-all border border-transparent hover:border-slate-800">
                 <Avatar className="h-10 w-10 border border-slate-800 shadow-xl group-hover:scale-105 transition-transform">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} />
                  <AvatarFallback className="bg-slate-800 text-white font-black">{item.name.charAt(4)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-200 truncate group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold tracking-tight mt-0.5">{item.time} • <span className="text-slate-400">{item.amount}</span></p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.status === 'ready' ? 'bg-emerald-500/10 text-emerald-400' : 
                  item.status === 'supplier' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {item.status === 'ready' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-blue-400 font-black hover:bg-blue-500/10 mt-2 h-11 border border-blue-500/10 rounded-xl text-[10px] uppercase tracking-widest">
              Gérer toutes les commandes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid: Recent Orders & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
        {/* Recent Orders Table */}
        <Card className="bg-slate-900/40 border-slate-800/50 shadow-xl overflow-hidden backdrop-blur-sm">
          <CardHeader className="p-6 border-b border-slate-800/50">
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-white font-black tracking-tight">{t('recent_orders', 'Commandes Récentes')}</CardTitle>
                  <CardDescription className="text-slate-500 font-medium italic">Les 5 dernières transactions</CardDescription>
               </div>
               <Link to="/orders">
                  <Button variant="outline" size="sm" className="bg-slate-950/50 border-slate-800 text-[10px] uppercase font-black px-4 rounded-xl hover:bg-slate-900">Voir tout</Button>
               </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-800/50">
              {[
                { id: '#ORD-9402', client: 'Youssef Khalil', date: '22 Jan 15:30', total: '2,800.00', status: 'Payé', type: 'Verres + Mont' },
                { id: '#ORD-9401', client: 'Malak El Alami', date: '22 Jan 12:15', total: '1,250.00', status: 'Avance', type: 'Monture Seule' },
                { id: '#ORD-9399', client: 'Karim Bennani', date: '21 Jan 18:40', total: '3,400.00', status: 'En attente', type: 'Verre Labo' },
                { id: '#ORD-9398', client: 'Sofia Tazi', date: '21 Jan 16:50', total: '950.00', status: 'Payé', type: 'Accessoires' },
              ].map((order, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-white/5 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 flex flex-col items-center justify-center border border-slate-800 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                       <CreditCard className="w-4 h-4 text-slate-500 group-hover:text-white" />
                    </div>
                    <div>
                       <p className="text-xs font-black text-slate-200 uppercase tracking-tight">{order.client}</p>
                       <p className="text-[10px] text-slate-500 font-bold">{order.id} • {order.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-white">{order.total} DH</p>
                    <Badge variant="outline" className={`text-[8px] font-black uppercase tracking-widest mt-1 ${
                      order.status === 'Payé' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      order.status === 'Avance' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock & Activity Feed */}
        <div className="space-y-6">
           <Card className="bg-slate-900/40 border-slate-800/50 shadow-xl overflow-hidden backdrop-blur-sm">
             <CardHeader className="p-6 border-b border-slate-800/50">
               <div className="flex items-center justify-between">
                  <CardTitle className="text-white font-black tracking-tight text-lg">Alertes Stock</CardTitle>
                  <AlertCircle className="w-5 h-5 text-rose-500 animate-pulse" />
               </div>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y divide-slate-800/50">
                   {[
                      { name: 'Ray-Ban Aviator Blue', stock: 2, min: 5, category: 'Montures' },
                      { name: 'Essilor Varilux Comfort', stock: 1, min: 3, category: 'Verres' },
                   ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-rose-500/5 hover:bg-rose-500/10 transition-colors">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                               <p className="text-xs font-black text-white uppercase tracking-tight">{item.name}</p>
                               <p className="text-[10px] text-slate-500 font-bold">{item.category}</p>
                            </div>
                            <Badge className="bg-rose-500 text-white border-transparent text-[8px] font-black">{item.stock} EN STOCK</Badge>
                         </div>
                         <Progress value={(item.stock / item.min) * 100} className="h-1 bg-slate-800 rounded-full" />
                         <div className="flex justify-between mt-2">
                           <span className="text-[9px] text-slate-500 font-bold">Seuil: {item.min} unités</span>
                           <Button variant="link" className="h-4 p-0 text-[10px] font-black text-rose-400 uppercase tracking-widest hover:text-rose-300">Réapprovisionner</Button>
                         </div>
                      </div>
                   ))}
                </div>
             </CardContent>
           </Card>

           <Card className="bg-slate-900/40 border-slate-800/50 shadow-xl overflow-hidden backdrop-blur-sm">
             <CardHeader className="p-6 border-b border-slate-800/50 flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-white font-black tracking-tight text-lg">Flux d'Activité</CardTitle>
                   <CardDescription className="text-slate-500 font-medium italic">Aujourd’hui</CardDescription>
                </div>
                <Users className="w-5 h-5 text-blue-500/50" />
             </CardHeader>
             <CardContent className="p-6 space-y-4">
                {[
                   { user: 'Hicham', action: 'a créé un nouveau devis pour', target: 'Sara T.', time: 'il y a 5 min', color: 'blue' },
                   { user: 'Karima', action: 'a validé le retrait de', target: 'M. Benz', time: 'il y a 20 min', color: 'emerald' },
                   { user: 'Système', action: 'Rappel WhatsApp envoyé à', target: 'Client #942', time: 'il y a 1h', color: 'purple' },
                ].map((act, i) => (
                   <div key={i} className="flex gap-3 relative pb-4 last:pb-0">
                      {i !== 2 && <div className="absolute left-[7px] top-4 bottom-0 w-[1px] bg-slate-800" />}
                      <div className={`w-3.5 h-3.5 rounded-full bg-${act.color}-500/20 border-2 border-${act.color}-500/50 mt-1 z-10`} />
                      <div>
                         <p className="text-xs font-medium text-slate-300">
                           <span className="font-black text-white">{act.user}</span> {act.action} <span className="font-black text-blue-400">{act.target}</span>
                         </p>
                         <p className="text-[10px] text-slate-500 font-bold italic mt-0.5">{act.time}</p>
                      </div>
                   </div>
                ))}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
