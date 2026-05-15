import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Download, 
  Eye,
  Edit,
  Trash2,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Hash,
  User,
  Calendar,
  Building2,
  Stethoscope,
  Loader2
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { downloadPDF } from '@/src/lib/pdf-utils';
import { DocumentTemplate, DocumentData } from '@/src/components/pdf/DocumentTemplate';
import { toast } from 'sonner';

export default function Quotes() {
  const { t } = useTranslation();
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

  const handleDownloadQuote = async (quote: any) => {
    try {
      setIsDownloading(quote.id);
      
      const documentData: DocumentData = {
        type: 'DEVIS',
        number: quote.id,
        date: quote.date,
        expiryDate: '2024-06-10',
        client: {
          name: quote.client,
          address: 'Casablanca, Maroc',
          ice: quote.ice !== '-' ? quote.ice : undefined,
        },
        company: companyInfo,
        items: [
          {
            description: 'Monture Optique de Marque',
            quantity: 1,
            unitPrice: quote.amount * 0.4,
            vatRate: 20
          },
          {
            description: 'Verres Correcteurs (Paire)',
            quantity: 1,
            unitPrice: quote.amount * 0.6,
            vatRate: 20
          }
        ],
        notes: "Devis valable 30 jours. Accord de la mutuelle sous réserve de vérification."
      };

      await downloadPDF(<DocumentTemplate data={documentData} />, `Devis_${quote.id}`);
      toast.success(`Le devis ${quote.id} a été généré avec succès.`);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la génération du PDF.");
    } finally {
      setIsDownloading(null);
    }
  };

  const quotes = [
    { id: 'QT-2024-001', client: 'Yassine Belhaj', date: '2024-05-10', amount: 2450.00, status: 'accepted', ice: '001234567890012' },
    { id: 'QT-2024-002', client: 'Hassan Amrani', date: '2024-05-12', amount: 1100.00, status: 'pending', ice: '-' },
    { id: 'QT-2024-003', client: 'Cabinet Dr. Tazi', date: '2024-05-14', amount: 8900.00, status: 'draft', ice: '009876543210088' },
    { id: 'QT-2024-004', client: 'Mona El Alami', date: '2024-04-20', amount: 3200.00, status: 'rejected', ice: '-' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-emerald-500/10 text-emerald-400 border-none rounded-full px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-tight flex items-center gap-1"><CheckCircle2 className="w-2.5 h-2.5" /> Accepté</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/10 text-amber-400 border-none rounded-full px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-tight flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> Envoyé</Badge>;
      case 'rejected':
        return <Badge className="bg-rose-500/10 text-rose-400 border-none rounded-full px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-tight flex items-center gap-1"><XCircle className="w-2.5 h-2.5" /> Refusé</Badge>;
      default:
        return <Badge className="bg-slate-800 text-slate-400 border-none rounded-full px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-tight">Brouillon</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{t('quotes')}</h1>
          <div className="flex items-center gap-2 mt-1">
             <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
             <p className="text-slate-400 text-sm font-medium">Gestion des devis et offres commerciales (Marché Marocain).</p>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger nativeButton={true} render={
            <Button className="rounded-xl h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 gap-2 font-bold transition-all hover:scale-105 active:scale-95">
              <Plus className="w-4 h-4" />
              {t('add_quote')}
            </Button>
          } />
          <DialogContent className="sm:max-w-[700px] bg-slate-900 border-slate-800 text-slate-200">
            <DialogHeader>
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-2">
                <FileText className="w-6 h-6" />
              </div>
              <DialogTitle className="text-2xl font-black text-white">{t('add_quote')}</DialogTitle>
              <DialogDescription className="text-slate-400 font-medium">
                Créez un devis complet conforme aux normes marocaines (ICE inclut).
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-12 gap-6 py-6">
              {/* Section Client & Mutuelle */}
              <div className="col-span-12 md:col-span-4 space-y-4 border-r border-slate-800 pr-6">
                <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest mb-4">Informations Client</h3>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500">CLIENT / PATIENT</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-950 border-slate-800 rounded-lg h-10">
                      <SelectValue placeholder="Choisir un patient" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                      <SelectItem value="1">Mohammed Alami</SelectItem>
                      <SelectItem value="2">Karima Bennani</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500">ICE (SI ENTREPRISE)</Label>
                  <Input placeholder="00XXXXXXXXXXXXX" className="bg-slate-950 border-slate-800 rounded-lg h-10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500">ORGANISME (MUTUELLE)</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-950 border-slate-800 rounded-lg h-10">
                      <SelectValue placeholder="Aucune" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                      <SelectItem value="none">Aucune (Particulier)</SelectItem>
                      <SelectItem value="cnops">CNOPS</SelectItem>
                      <SelectItem value="cnss">CNSS / AMO</SelectItem>
                      <SelectItem value="sahama">SAHAM / AXA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Section Prescription */}
              <div className="col-span-12 md:col-span-8 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-2">
                   <Stethoscope className="w-3 h-3" /> Prescription (Référé par Médecin)
                </h3>
                
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2">Médecin Ophtalmologue</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-950 border-slate-800 rounded-lg h-10">
                        <SelectValue placeholder="Choisir un médecin" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                        <SelectItem value="1">Dr. Sarah Alami</SelectItem>
                        <SelectItem value="2">Dr. Ahmed Benjelloun</SelectItem>
                        <SelectItem value="none">Client direct (sans ordonnance)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-slate-950/50 rounded-lg border border-slate-800 p-4">
                    <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                      <div className="text-[9px] font-black text-slate-600"></div>
                      <div className="text-[9px] font-black text-slate-600 uppercase">Sphère</div>
                      <div className="text-[9px] font-black text-slate-600 uppercase">Cylindre</div>
                      <div className="text-[9px] font-black text-slate-600 uppercase">Axe</div>
                      <div className="text-[9px] font-black text-slate-600 uppercase">Addition</div>
                      <div className="text-[9px] font-black text-slate-600 uppercase">Écart</div>
                      <div className="text-[9px] font-black text-slate-600 uppercase">Hauteur</div>
                    </div>
                    
                    {/* OEIL DROIT */}
                    <div className="grid grid-cols-7 gap-2 items-center mb-3">
                      <div className="text-[10px] font-black text-blue-400">OD</div>
                      <Input placeholder="0.00" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                      <Input placeholder="0.00" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                      <Input placeholder="0°" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                      <Input placeholder="0.00" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                      <Input placeholder="0.0" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                      <Input placeholder="0.0" className="h-8 bg-slate-900 border-slate-800 text-center text-xs font-bold" />
                    </div>

                    {/* OEIL GAUCHE */}
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

              {/* Section Articles */}
              <div className="col-span-12 border-t border-slate-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase text-blue-500 tracking-widest">Articles & Services</h3>
                  <Button variant="ghost" size="sm" className="h-8 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 font-bold rounded-lg text-xs">
                    + Ajouter Verres/Monture
                  </Button>
                </div>
                
                <div className="bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-slate-900/50">
                      <TableRow className="hover:bg-transparent border-slate-800">
                        <TableHead className="text-[9px] uppercase font-bold text-slate-500 py-2">Catégorie</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-slate-500 py-2">Désignation</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-slate-500 py-2 w-16">Qté</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-slate-500 py-2 w-24">P.U HT</TableHead>
                        <TableHead className="text-[9px] uppercase font-bold text-slate-500 py-2 w-20">TVA %</TableHead>
                        <TableHead className="text-right text-[9px] uppercase font-bold text-slate-500 py-2">Total TTC</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-slate-800">
                        <TableCell className="py-2 text-[10px] items-center gap-2"><Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px]">Verres</Badge></TableCell>
                        <TableCell className="py-2 text-xs font-medium text-slate-300">
                           <Input defaultValue="Prog. Varilux Comfort Max 1.5 Crizal Sapphire" className="h-7 bg-transparent border-none text-xs font-medium p-0 focus-visible:ring-0" />
                        </TableCell>
                        <TableCell className="py-2">
                           <Input defaultValue="2" className="w-10 h-7 bg-slate-900 border-slate-800 text-center text-[10px] font-black p-0" />
                        </TableCell>
                        <TableCell className="py-2">
                           <Input defaultValue="850.00" className="w-20 h-7 bg-slate-900 border-slate-800 text-center text-[10px] font-bold p-0" />
                        </TableCell>
                        <TableCell className="py-2">
                           <Input defaultValue="20" className="w-12 h-7 bg-slate-900 border-slate-800 text-center text-[10px] font-bold p-0" />
                        </TableCell>
                        <TableCell className="py-2 text-right text-xs font-black text-white">2,040.00</TableCell>
                      </TableRow>
                      <TableRow className="border-slate-800">
                        <TableCell className="py-2 text-[10px] items-center gap-2"><Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px]">Monture</Badge></TableCell>
                        <TableCell className="py-2 text-xs font-medium text-slate-300">
                           <Input defaultValue="Ray-Ban Wayfarer Classic Black" className="h-7 bg-transparent border-none text-xs font-medium p-0 focus-visible:ring-0" />
                        </TableCell>
                        <TableCell className="py-2">
                           <Input defaultValue="1" className="w-10 h-7 bg-slate-900 border-slate-800 text-center text-[10px] font-black p-0" />
                        </TableCell>
                        <TableCell className="py-2">
                           <Input defaultValue="1200.00" className="w-20 h-7 bg-slate-900 border-slate-800 text-center text-[10px] font-bold p-0" />
                        </TableCell>
                        <TableCell className="py-2">
                           <Input defaultValue="20" className="w-12 h-7 bg-slate-900 border-slate-800 text-center text-[10px] font-bold p-0" />
                        </TableCell>
                        <TableCell className="py-2 text-right text-xs font-black text-white">1,440.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-slate-500 uppercase">Validité du devis</Label>
                          <Select defaultValue="30">
                             <SelectTrigger className="bg-slate-950 border-slate-800 h-10 text-xs">
                                <SelectValue placeholder="Durée de validité" />
                             </SelectTrigger>
                             <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                                <SelectItem value="15">15 jours</SelectItem>
                                <SelectItem value="30">30 jours</SelectItem>
                                <SelectItem value="60">60 jours</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-slate-500 uppercase">Délai estimé</Label>
                          <Input placeholder="Ex: 3-5 jours" className="bg-slate-950 border-slate-800 h-10 text-xs" />
                       </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-slate-500 uppercase">Observations</Label>
                      <textarea className="w-full bg-slate-950 border border-slate-800 rounded-lg text-xs p-3 h-16 text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Mentionner les détails de l'ordonnance ou remises spéciales..." />
                    </div>
                  </div>
                  <div className="w-full md:w-72 space-y-3 bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Total HT</span>
                      <span className="text-white font-bold">2,900.00 DH</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Total TVA (20%)</span>
                      <span className="text-white font-bold">580.00 DH</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                      <span className="text-blue-500 font-black uppercase text-[10px] tracking-tight">Net à Payer TTC</span>
                      <span className="text-white font-black text-xl leading-none">3,480.00 <span className="text-[10px]">DH</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-slate-800 pt-6">
              <Button variant="outline" className="rounded-xl border-slate-800 text-slate-400 hover:bg-slate-800 font-bold">Annuler</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xl shadow-blue-900/40 font-bold px-8">
                 Créer le Devis
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Rechercher par n° de devis ou client..." 
              className="pl-10 bg-background border-border rounded-xl h-11 focus-visible:ring-blue-500 text-foreground placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="rounded-xl h-11 px-4 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 gap-2 flex-1 sm:flex-none font-bold">
              <Filter className="w-4 h-4" />
              Filtres
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/10">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-[200px] text-slate-400 font-black text-[10px] uppercase tracking-widest pl-8">N° de Devis</TableHead>
                <TableHead className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Client / ICE</TableHead>
                <TableHead className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Date</TableHead>
                <TableHead className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Montant TTC</TableHead>
                <TableHead className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Statut</TableHead>
                <TableHead className="text-right text-slate-400 font-black text-[10px] uppercase tracking-widest pr-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id} className="hover:bg-white/5 transition-all cursor-pointer group border-white/5">
                  <TableCell className="py-5 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <FileText className="w-4 h-4 text-blue-400 group-hover:text-white" />
                      </div>
                      <span className="font-mono font-bold text-sm text-slate-300 group-hover:text-white">{quote.id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="space-y-1">
                      <p className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{quote.client}</p>
                      {quote.ice !== '-' && (
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-600 uppercase tracking-tighter">
                          <Building2 className="w-3 h-3" /> ICE: {quote.ice}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-5 text-xs font-bold text-slate-400 font-mono">
                    {new Date(quote.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell className="py-5 font-mono font-black text-sm text-white">
                    {quote.amount.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} <span className="text-[10px] text-blue-500 tracking-tighter">DH</span>
                  </TableCell>
                  <TableCell className="py-5">
                    {getStatusBadge(quote.status)}
                  </TableCell>
                  <TableCell className="py-5 text-right pr-8">
                    <div className="flex items-center justify-end gap-1">
                       <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 h-8 w-8">
                         <Eye className="w-4 h-4" />
                       </Button>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         className="rounded-full hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 h-8 w-8 disabled:opacity-50"
                         onClick={() => handleDownloadQuote(quote)}
                         disabled={isDownloading === quote.id}
                       >
                         {isDownloading === quote.id ? (
                           <Loader2 className="w-4 h-4 animate-spin" />
                         ) : (
                           <Download className="w-4 h-4" />
                         )}
                       </Button>
                       <DropdownMenu>
                        <DropdownMenuTrigger nativeButton={true} render={
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 h-8 w-8">
                            <MoreHorizontal className="w-4 h-4 text-slate-500" />
                          </Button>
                        } />
                        <DropdownMenuContent align="end" className="w-48 bg-slate-900 border-slate-800 text-slate-200 p-1.5 rounded-xl outline-none shadow-2xl">
                          <DropdownMenuLabel className="text-[10px] text-slate-500 uppercase tracking-widest font-black px-2 py-2 font-mono">Administration</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 focus:bg-white/10 focus:text-white cursor-pointer py-2 px-2 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-amber-400" /> Modifier le devis
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1 bg-slate-800/50" />
                          <DropdownMenuItem className="gap-2 text-rose-400 focus:text-rose-300 focus:bg-rose-950/30 cursor-pointer py-2 px-2 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" /> Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {searchTerm && quotes.length === 0 && (
             <div className="p-20 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                   <Search className="w-8 h-8 text-slate-700" />
                </div>
                <h3 className="text-white font-black text-lg uppercase tracking-tight">Aucun devis trouvé</h3>
                <p className="text-slate-500 font-medium">Réessayez avec un autre numéro ou nom de client.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
