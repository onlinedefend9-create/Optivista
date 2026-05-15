import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  Zap,
  MoreVertical,
  ChevronRight,
  Eye,
  Settings2,
  Download,
  Filter,
  User,
  Building2,
  Hash,
  Calendar,
  CreditCard,
  FileText,
  AlertCircle,
  Stethoscope,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { downloadPDF } from '@/src/lib/pdf-utils';
import { DocumentTemplate, DocumentData } from '@/src/components/pdf/DocumentTemplate';
import { toast } from 'sonner';

const StatusIcon = ({ status, className }: { status: string; className?: string }) => {
  switch (status) {
    case 'pending': return <Clock className={className} />;
    case 'supplier': return <Truck className={className} />;
    case 'ready': return <Zap className={className} />;
    case 'delivered': return <CheckCircle2 className={className} />;
    default: return <ShoppingCart className={className} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'supplier': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'ready': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'delivered': return 'bg-slate-800 text-slate-400 border-slate-700';
    default: return 'bg-slate-800 text-slate-400';
  }
};

export default function Orders() {
  const { t } = useTranslation();
  const [activeMainTab, setActiveMainTab] = React.useState('customers');
  const [customerFilter, setCustomerFilter] = React.useState('all');
  const [supplierFilter, setSupplierFilter] = React.useState('active');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDownloading, setIsDownloading] = React.useState<string | null>(null);

  const companyInfo = {
    name: 'OPTI-CARE MAROC',
    address: '123 Boulevard Mohammed V, Casablanca, Maroc',
    phone: '+212 5 22 00 00 00',
    email: 'contact@opticare.ma',
    ice: '001234567890012',
    rc: '123456',
    if: '9876543',
  };

  const handleDownloadInvoice = async (order: any) => {
    try {
      setIsDownloading(order.id);
      
      const documentData: DocumentData = {
        type: 'FACTURE',
        number: order.id,
        date: order.date,
        client: {
          name: order.customer,
          address: 'Casablanca, Maroc',
        },
        company: companyInfo,
        items: [
          {
            description: order.lens,
            quantity: 1,
            unitPrice: order.total * 0.6,
            vatRate: 20
          },
          {
            description: order.frame,
            quantity: 1,
            unitPrice: order.total * 0.4,
            vatRate: 20
          }
        ],
        notes: "Total payé: " + order.paid + " DH. Merci de votre confiance."
      };

      await downloadPDF(<DocumentTemplate data={documentData} />, `Facture_${order.id}`);
      toast.success(`La facture ${order.id} a été générée avec succès.`);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la génération de la facture.");
    } finally {
      setIsDownloading(null);
    }
  };

  const customerOrders = [
    { 
      id: 'ORD-2024-001', 
      customer: 'Amine El Fassi', 
      frame: 'Ray-Ban Aviator RB3025', 
      lens: 'Essilor Varilux Comfort Max Crizal Sapphire', 
      status: 'ready', 
      total: 3200, 
      paid: 1500, 
      date: '2024-05-12',
      deliveryDate: '2024-05-15',
      lab: "Essilor Maroc"
    },
    { 
      id: 'ORD-2024-002', 
      customer: 'Sarah Benani', 
      frame: 'Prada Cinema PR17V', 
      lens: 'Hoya Single Vision Nulux 1.6 HVLL', 
      status: 'supplier', 
      total: 4500, 
      paid: 4500, 
      date: '2024-05-13',
      deliveryDate: '2024-05-18',
      lab: 'Nikon Lenswear'
    },
  ];

  const supplierOrders = [
    {
      id: 'SON-102',
      supplier: 'Essilor Maroc',
      type: 'Verres de Laboratoire',
      status: 'ordered',
      date: '2024-05-13',
      items: 4,
      total: 1250,
      link: 'ORD-2024-002, ORD-2024-005',
      expectedDate: '2024-05-16'
    },
    {
      id: 'SON-101',
      supplier: 'Safilo Group',
      type: 'Stock Montures',
      status: 'received',
      date: '2024-05-10',
      items: 12,
      total: 8400,
      link: 'Stock Re-inventory',
      expectedDate: '2024-05-12'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
             <ShoppingCart className="w-8 h-8 text-blue-500" />
             {t('orders', 'Gestion des Commandes')}
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
             <p className="text-slate-400 text-sm font-medium">Flux de travail synchronisé : Clients ⇄ Laboratoires ⇄ Stock</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Tabs value={activeMainTab} onValueChange={(val) => {
            setActiveMainTab(val);
            setSearchTerm('');
            if (val === 'customers') setCustomerFilter('all');
            else setSupplierFilter('active');
          }} className="bg-slate-900/50 p-1 rounded-xl border border-slate-800">
            <TabsList className="bg-transparent border-none p-0 h-9">
              <TabsTrigger value="customers" className="rounded-lg px-4 h-full data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest transition-all">
                 <User className="w-3 h-3 mr-2" /> Commandes Clients
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="rounded-lg px-4 h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest transition-all">
                 <Truck className="w-3 h-3 mr-2" /> Commandes Fournisseurs
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog>
            <DialogTrigger render={
              <Button className={`rounded-xl h-10 px-6 ${activeMainTab === 'customers' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white shadow-lg gap-2 font-bold transition-all hover:scale-105 active:scale-95`}>
                <Plus className="w-4 h-4" />
                {activeMainTab === 'customers' ? t('add_order', 'Vente Client') : t('new_supplier_order', 'Commande Labo')}
              </Button>
            } />
            <DialogContent className="sm:max-w-[850px] bg-slate-900 border-slate-800 text-slate-200 h-[90vh] flex flex-col p-0 overflow-hidden">
            <DialogHeader className="p-6 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-black text-white">{t('add_order')}</DialogTitle>
                  <DialogDescription className="text-slate-400 font-medium font-mono text-[10px] uppercase tracking-widest mt-1">
                    Système de gestion de commande • OPTIC CRM
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Patient & Provider */}
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4 space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3" /> Informations Client
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-slate-500 uppercase">Patient</Label>
                      <Select>
                        <SelectTrigger className="bg-slate-950 border-slate-800 rounded-lg h-10">
                          <SelectValue placeholder="Choisir un client" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                          <SelectItem value="1">Mohammed Alami</SelectItem>
                          <SelectItem value="2">Karima Bennani</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-slate-500 uppercase">Mutuelle / Organisme</Label>
                      <Select>
                        <SelectTrigger className="bg-slate-950 border-slate-800 rounded-lg h-10">
                          <SelectValue placeholder="Aucune" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                          <SelectItem value="none">Privé (Aucune)</SelectItem>
                          <SelectItem value="cnops">CNOPS</SelectItem>
                          <SelectItem value="cnss">CNSS / AMO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator orientation="vertical" className="hidden md:block h-auto bg-slate-800" />

                <div className="col-span-12 md:col-span-7 space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-2">
                    <FileText className="w-3 h-3" /> Ordonnance / Prescription
                  </h3>
                  
                  <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">
                        <Stethoscope className="w-3 h-3" /> Médecin Prescripteur
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-slate-950 border-slate-800 rounded-lg h-10">
                          <SelectValue placeholder="Choisir un médecin" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                          <SelectItem value="1">Dr. Sarah Alami</SelectItem>
                          <SelectItem value="2">Dr. Ahmed Benjelloun</SelectItem>
                          <SelectItem value="3">Autre / Hors Liste</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-slate-950/50 rounded-lg border border-slate-800 p-4">
                      <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                        <div className="text-[9px] font-black text-slate-600"></div>
                        <div className="text-[9px] font-black text-slate-600 uppercase">Sph.</div>
                        <div className="text-[9px] font-black text-slate-600 uppercase">Cyl.</div>
                        <div className="text-[9px] font-black text-slate-600 uppercase">Axe</div>
                        <div className="text-[9px] font-black text-slate-600 uppercase">Add.</div>
                        <div className="text-[9px] font-black text-slate-600 uppercase">EP</div>
                        <div className="text-[9px] font-black text-slate-600 uppercase">Ht</div>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2 items-center mb-3">
                        <div className="text-[10px] font-black text-blue-400">OD</div>
                        <Input placeholder="0.00" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                        <Input placeholder="0.00" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                        <Input placeholder="0°" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                        <Input placeholder="0.00" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                        <Input placeholder="0.0" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                        <Input placeholder="0.0" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                      </div>

                      <div className="grid grid-cols-7 gap-2 items-center">
                        <div className="text-[10px] font-black text-emerald-400">OG</div>
                        <Input placeholder="0.00" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                        <Input placeholder="0.00" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                        <Input placeholder="0°" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                        <Input placeholder="0.00" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                        <Input placeholder="0.0" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                        <Input placeholder="0.0" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Equipment & Lab */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-2">
                  <Package className="w-3 h-3" /> Choix de l&apos;équipement
                </h3>
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-6 space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center">
                       <Label className="text-[10px] font-bold text-slate-400 uppercase">Monture</Label>
                       <Input placeholder="Prix Vente" className="w-24 bg-slate-950 border-slate-800 h-8 text-xs text-right font-black text-blue-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <Input placeholder="Marque / Modèle" className="bg-slate-950 border-slate-800 h-10 text-xs" />
                       <Input placeholder="Référence / Couleur" className="bg-slate-950 border-slate-800 h-10 text-xs" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 italic">
                      <AlertCircle className="w-3 h-3" /> Personnalisez le prix pour cette monture
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center">
                       <Label className="text-[10px] font-bold text-slate-400 uppercase">Verres & Traitements</Label>
                       <Input placeholder="Prix Vente" className="w-24 bg-slate-950 border-slate-800 h-8 text-xs text-right font-black text-emerald-400" />
                    </div>
                    <div className="space-y-3">
                       <Input placeholder="Type de verre (ex: Varilux Comfort Max)" className="bg-slate-950 border-slate-800 h-10 text-xs" />
                       <div className="grid grid-cols-2 gap-3">
                          <Select>
                             <SelectTrigger className="bg-slate-950 border-slate-800 h-10 text-xs">
                                <SelectValue placeholder="Laboratoire" />
                             </SelectTrigger>
                             <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                                <SelectItem value="essilor">Essilor Morocco</SelectItem>
                                <SelectItem value="nikon">Nikon Lenswear</SelectItem>
                             </SelectContent>
                          </Select>
                          <Input placeholder="Prix Achat (Cout)" className="bg-slate-950 border-slate-800 h-10 text-xs text-right" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financials & Timeline */}
              <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-7 space-y-4">
                    <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Délais & Livraison
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-slate-500">DATE DE COMMANDE</Label>
                          <Input type="date" className="bg-slate-950 border-slate-800 h-10 text-xs" defaultValue={new Date().toISOString().split('T')[0]} />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-slate-500">LIVRAISON PRÉVUE</Label>
                          <Input type="date" className="bg-slate-950 border-slate-800 h-10 text-xs text-blue-400 font-bold" />
                       </div>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-5 space-y-4">
                    <h3 className="text-[10px] font-black uppercase text-emerald-500 tracking-widest flex items-center gap-2">
                      <CreditCard className="w-3 h-3" /> Règlements (Acompte)
                    </h3>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 space-y-4">
                       <div className="flex justify-between items-center">
                          <Label className="text-[10px] font-bold text-slate-400">TOTAL TTC (DH)</Label>
                          <Input type="number" placeholder="0.00" className="w-32 bg-slate-950 border-slate-800 h-10 text-right font-black text-white" />
                       </div>
                       <div className="flex justify-between items-center">
                          <Label className="text-[10px] font-bold text-slate-400">ACOMPTE VERSÉ (DH)</Label>
                          <Input type="number" placeholder="0.00" className="w-32 bg-slate-950 border-emerald-500/30 h-10 text-right font-black text-emerald-400" />
                       </div>
                       <Separator className="bg-emerald-500/20" />
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Reste à payer</span>
                          <span className="text-xl font-black text-white">0.00 DH</span>
                       </div>
                    </div>
                  </div>
              </div>
            </div>

            <DialogFooter className="p-6 border-t border-slate-800 shrink-0 bg-slate-950/50">
              <Button variant="outline" className="rounded-xl border-slate-800 text-slate-400 hover:bg-slate-800 font-bold px-8">Annuler</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl shadow-blue-900/40 font-bold px-12 h-11 transition-all hover:scale-105">
                 Valider la Commande
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
         {activeMainTab === 'customers' ? (
        <Tabs value={customerFilter} onValueChange={setCustomerFilter} className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-auto rounded-xl shadow-sm backdrop-blur-sm">
              <TabsTrigger value="all" className="rounded-lg px-4 py-2 text-slate-400 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all font-bold text-xs uppercase tracking-wider">Toutes</TabsTrigger>
              <TabsTrigger value="pending" className="rounded-lg px-4 py-2 text-slate-400 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm transition-all font-bold text-xs uppercase tracking-wider">En attente</TabsTrigger>
              <TabsTrigger value="supplier" className="rounded-lg px-4 py-2 text-slate-400 data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-400 data-[state=active]:shadow-sm transition-all font-bold text-xs uppercase tracking-wider">Labo / Fourn.</TabsTrigger>
              <TabsTrigger value="ready" className="rounded-lg px-4 py-2 text-slate-400 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all font-bold text-xs uppercase tracking-wider">Prêt pour Client</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                placeholder="Rechercher par client, n°..." 
                className="pl-10 h-11 rounded-xl bg-background border-border shadow-sm text-foreground placeholder:text-slate-600 focus-visible:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value={customerFilter} className="space-y-4">
            {customerOrders.map((order) => (
              <Card key={order.id} className="bg-white/5 border border-white/10 shadow-sm transition-all group overflow-hidden hover:border-white/20 relative">
                 <div className={`absolute top-0 left-0 w-1.5 h-full transition-all group-hover:w-2 ${
                    order.status === 'ready' ? 'bg-emerald-500' : 
                    order.status === 'supplier' ? 'bg-amber-500' : 
                    order.status === 'pending' ? 'bg-blue-500' : 'bg-slate-700'
                 }`} />
                 <CardContent className="p-0">
                  <div className="p-6 pl-8 flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex lg:flex-col items-center lg:items-start gap-4 w-full lg:w-40 shrink-0">
                      <div className={`p-4 rounded-2xl ${getStatusColor(order.status)} border shrink-0 shadow-lg`}>
                        <StatusIcon status={order.status} className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-mono font-black text-lg text-white tracking-tight">{order.id}</p>
                        <Badge variant="outline" className={`mt-1 flex items-center gap-1 px-2 py-0.5 rounded-full border-none font-bold text-[9px] uppercase tracking-tighter ${getStatusColor(order.status)}`}>
                          <div className="w-1 h-1 rounded-full bg-current mr-1" />
                          {t(`status.${order.status}`)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 text-blue-400">
                            <User className="w-3 h-3" /> Patient / Client
                          </p>
                          <p className="font-bold text-white flex items-center gap-2 text-lg group-hover:text-blue-400 transition-colors">
                             {order.customer}
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 opacity-60">Dossier créé le {order.date}</p>
                        </div>
                        
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center justify-between group/lab">
                           <div className="flex items-center gap-3">
                              <Building2 className="w-4 h-4 text-emerald-500" />
                              <div>
                                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Labo Associé</p>
                                 <p className="text-xs font-bold text-slate-300">{order.lab}</p>
                              </div>
                           </div>
                           {order.status === 'supplier' && (
                             <Badge className="bg-emerald-600/10 text-emerald-400 border-emerald-500/20 text-[8px] font-black">CMD ENVOYÉE</Badge>
                           )}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Package className="w-3 h-3" /> Fiche Technique
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-start gap-2">
                               <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                  <Search className="w-2.5 h-2.5 text-blue-400" />
                               </div>
                               <p className="text-xs leading-relaxed">
                                  <span className="font-black text-slate-400 mr-2 uppercase text-[9px]">Verres:</span> 
                                  <span className="text-slate-200 font-medium">{order.lens}</span>
                               </p>
                            </div>
                            <div className="flex items-start gap-2">
                               <div className="w-4 h-4 rounded bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                  <Search className="w-2.5 h-2.5 text-emerald-400" />
                               </div>
                               <p className="text-xs leading-relaxed">
                                  <span className="font-black text-slate-400 mr-2 uppercase text-[9px]">Monture:</span> 
                                  <span className="text-slate-200 font-medium">{order.frame}</span>
                               </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                           <div className="flex-1">
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Livraison estimée</p>
                              <div className="flex items-center gap-2 text-xs font-bold text-white bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1.5 w-fit">
                                 <Calendar className="w-3 h-3 text-blue-400" />
                                 {new Date(order.deliveryDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </div>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <CreditCard className="w-3 h-3" /> Finances
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-bold text-slate-500 uppercase">Acompte</span>
                                 <span className="font-black text-emerald-400 text-lg leading-tight">{order.paid.toLocaleString()} <span className="text-[10px]">DH</span></span>
                              </div>
                              <div className="text-right">
                                 <span className="text-[10px] font-bold text-slate-500 uppercase">Solde</span>
                                 <span className={`font-black text-lg leading-tight ${(order.total - order.paid) > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                                   {(order.total - order.paid).toLocaleString()} <span className="text-[10px]">DH</span>
                                 </span>
                              </div>
                            </div>
                            
                            <div className="space-y-1.5">
                               <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase">
                                  <span>Couverture paiement</span>
                                  <span>{Math.round((order.paid/order.total)*100)}%</span>
                                </div>
                               <Progress value={(order.paid/order.total)*100} className="h-1.5 bg-white/5 rounded-full overflow-hidden" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-2 w-full lg:w-40 self-stretch lg:border-l border-white/5 lg:pl-8">
                      <Button variant="outline" className="flex-1 rounded-xl h-11 border-white/10 bg-white/5 text-slate-300 shadow-sm gap-2 hover:bg-white/10 hover:text-white font-bold text-[10px] uppercase tracking-wider transition-all">
                         <Eye className="w-4 h-4" /> Détails
                      </Button>
                      <div className="flex gap-2">
                        <Button 
                           variant="ghost" 
                           size="icon" 
                           className="h-11 w-11 flex-1 lg:flex-none rounded-xl hover:bg-white/10 hover:text-blue-400 text-slate-500 transition-colors border border-white/5 disabled:opacity-50"
                           onClick={() => handleDownloadInvoice(order)}
                           disabled={isDownloading === order.id}
                        >
                           {isDownloading === order.id ? (
                             <Loader2 className="w-4 h-4 animate-spin" />
                           ) : (
                             <Download className="w-5 h-5" />
                           )}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-11 w-11 flex-1 lg:flex-none rounded-xl hover:bg-white/10 hover:text-white text-slate-500 transition-colors border border-white/5">
                           <Settings2 className="w-5 h-5 text-slate-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-11 w-11 flex-1 lg:flex-none rounded-xl hover:bg-white/10 hover:text-emerald-400 text-slate-500 transition-colors border border-white/5">
                           <CheckCircle2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                 </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs value={supplierFilter} onValueChange={setSupplierFilter} className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-white/5 border border-white/10 p-1 h-auto rounded-xl shadow-sm backdrop-blur-sm">
              <TabsTrigger value="active" className="rounded-lg px-4 py-2 text-slate-400 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all font-bold text-xs uppercase tracking-wider">En cours</TabsTrigger>
              <TabsTrigger value="received" className="rounded-lg px-4 py-2 text-slate-400 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all font-bold text-xs uppercase tracking-wider">Reçu</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                placeholder="Rechercher par fournisseur, n° de bon..." 
                className="pl-10 h-11 rounded-xl bg-background border-border shadow-sm text-foreground placeholder:text-slate-600 focus-visible:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value={supplierFilter} className="space-y-4">
            {supplierOrders.map((order) => (
              <Card key={order.id} className="bg-emerald-500/5 border border-emerald-500/10 shadow-sm transition-all group overflow-hidden hover:border-emerald-500/20 relative">
                 <div className={`absolute top-0 left-0 w-1.5 h-full transition-all group-hover:w-2 ${
                    order.status === 'received' ? 'bg-emerald-500' : 'bg-amber-500'
                 }`} />
                 <CardContent className="p-0">
                  <div className="p-6 pl-8 flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex lg:flex-col items-center lg:items-start gap-4 w-full lg:w-40 shrink-0">
                      <div className={`p-4 rounded-2xl ${order.status === 'received' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'} border shrink-0 shadow-lg`}>
                        <Truck className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-mono font-black text-lg text-white tracking-tight">{order.id}</p>
                        <Badge variant="outline" className={`mt-1 flex items-center gap-1 px-2 py-0.5 rounded-full border-none font-bold text-[9px] uppercase tracking-tighter ${
                           order.status === 'received' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          <div className="w-1 h-1 rounded-full bg-current mr-1" />
                          {order.status === 'received' ? 'Reçu & Vérifié' : 'En transit / Labo'}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2 text-emerald-400">
                            <Building2 className="w-3 h-3" /> Fournisseur / Laboratoire
                          </p>
                          <p className="font-bold text-white flex items-center gap-2 text-lg group-hover:text-emerald-400 transition-colors uppercase">
                             {order.supplier}
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 opacity-60">Type: {order.type}</p>
                        </div>
                        
                        <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800 flex items-center gap-3">
                           <Hash className="w-4 h-4 text-emerald-500" />
                           <div>
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Dossiers Clients Liés</p>
                              <p className="text-xs font-bold text-slate-300">{order.link}</p>
                           </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <Package className="w-3 h-3" /> Contenu de la livraison
                          </p>
                          <div className="space-y-2">
                             <p className="text-xs font-medium text-slate-300">{order.items} articles unitaires dans ce bon</p>
                             <div className="flex items-center gap-2">
                                <Badge className="bg-slate-800 text-slate-400 border-slate-700 text-[8px] font-black">Vérification Qualité requise</Badge>
                             </div>
                          </div>
                        </div>

                        <div>
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 font-mono">Date de Réception Prévue</p>
                           <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5 w-fit">
                              <Calendar className="w-3 h-3 text-emerald-500" />
                              {new Date(order.expectedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                           </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <CreditCard className="w-3 h-3" /> Facturation Fournisseur
                          </p>
                          <div className="space-y-3">
                             <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Cout Total HT</span>
                                <span className="font-black text-white text-lg tracking-tight">{order.total.toLocaleString()} <span className="text-[10px]">DH</span></span>
                             </div>
                             <Badge variant="outline" className="bg-slate-800 text-slate-500 border-slate-700 text-[8px] font-black uppercase">Paiement à 30 jours</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-2 w-full lg:w-40 self-stretch lg:border-l border-emerald-500/10 lg:pl-8">
                       <Button variant="outline" className="flex-1 rounded-xl h-11 border-emerald-500/20 bg-emerald-500/5 text-emerald-400 shadow-sm gap-2 hover:bg-emerald-500/10 hover:text-emerald-300 font-bold text-[10px] uppercase tracking-wider transition-all">
                          Bon de Livraison
                       </Button>
                       <div className="flex gap-2">
                         <Button variant="ghost" size="icon" className="h-11 w-11 flex-1 lg:flex-none rounded-xl hover:bg-white/10 hover:text-white text-slate-500 transition-colors border border-white/5">
                            <Download className="w-5 h-5" />
                         </Button>
                         <Button variant="ghost" size="icon" className="h-11 w-11 flex-1 lg:flex-none rounded-xl hover:bg-white/10 hover:text-emerald-400 text-slate-500 transition-colors border border-white/5">
                            <CheckCircle2 className="w-5 h-5" />
                         </Button>
                       </div>
                    </div>
                  </div>
                 </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
