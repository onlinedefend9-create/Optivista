import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  MoreVertical,
  Layers,
  ArrowRight,
  Truck
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function Inventory() {
  const { t } = useTranslation();

  const stock = [
    { id: 1, type: 'frame', brand: 'Ray-Ban', model: 'Aviator', stock: 12, min: 5, price: 1200 },
    { id: 2, type: 'frame', brand: 'Oakley', model: 'Holbrook', stock: 3, min: 5, price: 1500 },
    { id: 3, type: 'lens', brand: 'Essilor', model: 'Varilux', stock: 24, min: 10, price: 800 },
    { id: 4, type: 'frame', brand: 'Prada', model: 'Cinema', stock: 1, min: 3, price: 2800 },
    { id: 5, type: 'accessory', brand: 'OpticPlus', model: 'Cleaner', stock: 50, min: 15, price: 50 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{t('inventory')}</h1>
          <p className="text-slate-400 mt-1">Gérez votre stock de montures, verres et accessoires.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="rounded-xl h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 gap-2 font-bold">
            <Plus className="w-4 h-4" />
            Nouveau produit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-500/10 border border-blue-500/20 shadow-xl overflow-hidden">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-900/20">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.1em]">Total Articles</p>
              <h3 className="text-2xl font-black text-white mt-1">4,280</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-rose-500/10 border border-rose-500/20 shadow-xl overflow-hidden">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-rose-600 rounded-xl text-white shadow-lg shadow-rose-900/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.1em]">Stock Bas</p>
              <h3 className="text-2xl font-black text-white mt-1">12 articles</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/10 border border-emerald-500/20 shadow-xl overflow-hidden">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-900/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.1em]">Valeur Stock</p>
              <h3 className="text-2xl font-black text-white mt-1">284,500 DH</h3>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Rechercher marque, modèle..." 
              className="pl-10 bg-background border-border rounded-xl h-10 focus-visible:ring-blue-500 text-foreground placeholder:text-slate-600 focus:shadow-blue-900/20"
            />
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" className="rounded-xl h-10 px-4 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 font-bold text-xs uppercase tracking-wider">
               Catégories
             </Button>
             <Button variant="outline" className="rounded-xl h-10 px-4 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 font-bold text-xs uppercase tracking-wider">
               Fournisseurs
             </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/10">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Type</TableHead>
                <TableHead className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Article</TableHead>
                <TableHead className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Fournisseur</TableHead>
                <TableHead className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Stock Actuel</TableHead>
                <TableHead className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Prix Unit.</TableHead>
                <TableHead className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-right text-slate-400 font-bold text-[10px] uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stock.map((item) => (
                <TableRow key={item.id} className="hover:bg-white/5 transition-colors cursor-pointer group border-white/5">
                  <TableCell>
                    <Badge variant="outline" className="capitalize px-2 py-0 h-5 text-[10px] bg-slate-800 text-slate-300 border-slate-700 font-bold">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-slate-500 border border-white/5 shadow-inner">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.brand}</p>
                        <p className="text-[10px] text-slate-500 font-bold">{item.model}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                       <Truck className="w-3 h-3 text-emerald-500/50" />
                       {'Essilor Maroc'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <span className={`font-black text-sm ${item.stock <= item.min ? 'text-rose-400' : 'text-white'}`}>
                         {item.stock}
                       </span>
                       <span className="text-slate-500 text-[10px] font-bold">/ {item.min} MIN</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-slate-200 text-sm">{item.price} DH</span>
                  </TableCell>
                  <TableCell>
                     {item.stock <= item.min ? (
                       <Badge className="bg-rose-500/10 text-rose-400 border-none rounded-full flex items-center gap-1.5 w-fit text-[10px] font-bold px-2 py-0 h-5 lowercase tracking-tight">
                         <AlertTriangle className="w-3 h-3" /> Alerte Stock
                       </Badge>
                     ) : (
                       <Badge className="bg-emerald-500/10 text-emerald-400 border-none rounded-full flex items-center gap-1.5 w-fit text-[10px] font-bold px-2 py-0 h-5 lowercase tracking-tight">
                         En stock
                       </Badge>
                     )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 h-8 w-8">
                      <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
