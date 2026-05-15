import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Truck, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Package,
  ExternalLink,
  MapPin,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Suppliers() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = React.useState('list');

  const mockSuppliers = [
    { id: 1, name: 'Essilor Maroc', category: 'Verres', contact: 'M. Omar', phone: '+212 522-112233', email: 'orders@essilor.ma', activeOrders: 12, balance: '12,450.00 DH' },
    { id: 2, name: 'Safilo Group', category: 'Montures', contact: 'Mme. Hind', phone: '+212 522-445566', email: 'sales@safilo.com', activeOrders: 5, balance: '3,200.00 DH' },
    { id: 3, name: 'Shamir Maroc', category: 'Verres', contact: 'M. Karim', phone: '+212 522-778899', email: 'shamir@contact.ma', activeOrders: 8, balance: '0.00 DH' },
    { id: 4, name: 'Luxottica', category: 'Montures', contact: 'M. Ali', phone: '+212 522-990011', email: 'support@luxottica.it', activeOrders: 3, balance: '8,900.00 DH' },
  ];

  const activeLabOrders = [
    { id: 'SON-102', supplier: 'Essilor Maroc', client: 'Sarah Benani', item: 'Varilux Progressif', status: 'En labo', date: 'il y a 2j', expected: 'Demain' },
    { id: 'SON-105', supplier: 'Essilor Maroc', client: 'Karim Bennani', item: 'Solaire Polarise', status: 'Expédié', date: 'il y a 1j', expected: 'Aujourd\'hui' },
    { id: 'SON-098', supplier: 'Shamir Maroc', client: 'Youssef Alami', item: 'Shamir Workspace', status: 'Validation', date: 'il y a 4h', expected: '18 Mai' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Truck className="w-8 h-8 text-emerald-500" />
              {t('suppliers', 'Partenaires & Labo')}
            </h1>
            <p className="text-slate-400 mt-2 font-medium">Flux de travail : Achats de stock et travaux laboratoires spécialisés.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800">
              <TabsList className="bg-transparent border-none p-0 h-9">
                <TabsTrigger value="list" className="rounded-lg px-4 h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest transition-all">Annuaires</TabsTrigger>
                <TabsTrigger value="orders" className="rounded-lg px-4 h-full data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest transition-all">Commandes Labo</TabsTrigger>
              </TabsList>
            </div>
          {activeTab === 'list' && (
            <Dialog>
              <DialogTrigger nativeButton={true} render={
                <Button className="rounded-xl h-10 px-4 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 gap-2 font-bold transition-all hover:scale-105 active:scale-95">
                  <Plus className="w-4 h-4" />
                  {t('add_supplier', 'Nouveau Partenaire')}
                </Button>
              } />
              <DialogContent className="bg-slate-900 border-slate-800 text-slate-200 sm:max-w-[500px]">
                {/* Same dialog content as before */}
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white">{t('new_supplier', 'Nouveau Fournisseur')}</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Ajoutez les détails d'un nouveau laboratoire ou fournisseur de montures.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Société</Label>
                    <Input id="name" placeholder="Ex: Essilor, Safilo..." className="bg-slate-950 border-slate-800 text-white h-11" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Catégorie</Label>
                      <Input id="category" placeholder="Verres, Montures, etc." className="bg-slate-950 border-slate-800 text-white h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact" className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Interlocuteur</Label>
                      <Input id="contact" placeholder="Nom du contact" className="bg-slate-950 border-slate-800 text-white h-11" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-lg">Enregistrer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <TabsContent value="list" className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Total Fournisseurs</p>
              <h3 className="text-2xl font-black text-white">{mockSuppliers.length}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
          <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Encours Labo</p>
              <h3 className="text-2xl font-black text-white">{activeLabOrders.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Passif Facturation</p>
              <h3 className="text-2xl font-black text-white">24,550.00 DH</h3>
            </div>
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 overflow-hidden backdrop-blur-sm">
          <div className="p-6 border-b border-slate-800/50 flex items-center gap-4">
            <Search className="w-4 h-4 text-slate-500" />
            <Input placeholder={t('search_supplier', 'Filtrer l\'annuaire...')} className="bg-transparent border-none p-0 focus-visible:ring-0 text-slate-200" />
          </div>
          <Table>
            <TableHeader className="bg-slate-900/50">
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Fournisseur</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Catégorie</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4 text-center">Cmd en cours</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4 text-right">Solde</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSuppliers.map((supplier) => (
                <TableRow key={supplier.id} className="border-slate-800 hover:bg-white/5 transition-colors group">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Building2 className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-200 uppercase tracking-tight">{supplier.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono italic">{supplier.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className={`text-[9px] font-black uppercase ${
                      supplier.category === 'Verres' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {supplier.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className="text-xs font-black text-slate-200">{supplier.activeOrders}</span>
                  </TableCell>
                  <TableCell className="py-4 text-right font-black text-slate-200">
                    {supplier.balance}
                  </TableCell>
                  <TableCell className="py-4 text-right">
                     <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4 text-slate-500" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="orders" className="space-y-4 animate-in slide-in-from-right-2 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeLabOrders.map((order) => (
            <Card key={order.id} className="bg-slate-900/40 border border-slate-800/50 hover:border-blue-500/30 transition-all group p-6 overflow-hidden relative">
               <div className={`absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors`} />
               <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                     <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <Badge className={`bg-blue-500/10 text-blue-400 border-blue-500/20 font-black text-[9px] uppercase tracking-widest`}>
                    {order.status}
                  </Badge>
               </div>
               <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">{order.id}</p>
                    <h3 className="text-lg font-black text-white uppercase group-hover:text-blue-400 transition-colors">{order.client}</h3>
                    <p className="text-xs text-slate-400 font-medium">Fournisseur : <span className="text-slate-200">{order.supplier}</span></p>
                  </div>
                  <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                     <div>
                        <p className="text-[9px] font-black text-slate-600 uppercase">Article</p>
                        <p className="text-xs font-bold text-slate-300">{order.item}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[9px] font-black text-slate-600 uppercase">Estimé</p>
                        <p className="text-xs font-bold text-emerald-400">{order.expected}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <Button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg h-9 text-[10px] uppercase font-black">
                        Voir Dossier
                     </Button>
                     <Button variant="outline" className="flex-1 border-slate-800 text-slate-400 rounded-lg h-9 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20 text-[10px] uppercase font-black">
                        Marquer Reçu
                     </Button>
                  </div>
               </div>
            </Card>
          ))}
        </div>
      </TabsContent>
      </Tabs>
    </div>
  );
}
