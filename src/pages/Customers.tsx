import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  FileText, 
  History, 
  Edit,
  Trash2,
  Filter
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function Customers() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState('');

  const customers = [
    { id: 1, name: 'Amine El Fassi', phone: '06 12 34 56 78', email: 'amine@example.com', last_visit: '2024-05-10', status: 'active' },
    { id: 2, name: 'Sarah Benani', phone: '06 98 76 54 32', email: 'sarah@example.com', last_visit: '2024-04-22', status: 'active' },
    { id: 3, name: 'Omar Mansouri', phone: '06 44 22 11 00', email: 'omar@example.com', last_visit: '2024-05-12', status: 'pending' },
    { id: 4, name: 'Leila Tazi', phone: '06 55 66 77 88', email: 'leila@example.com', last_visit: '2023-12-15', status: 'inactive' },
    { id: 5, name: 'Karim Alaoui', phone: '06 11 22 33 44', email: 'karim@example.com', last_visit: '2024-05-14', status: 'active' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{t('customers')}</h1>
          <p className="text-slate-400 mt-1">Gérez votre base de données clients et leur historique.</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger nativeButton={true} render={
              <Button className="rounded-xl h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 gap-2">
                <Plus className="w-4 h-4" />
                {t('add_customer')}
              </Button>
            } />
            <DialogContent className="sm:max-w-[525px] bg-slate-900 border-slate-800 text-slate-200">
              <DialogHeader>
                <DialogTitle className="text-white">{t('add_customer')}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Entrez les détails du nouveau client ici. Cliquez sur enregistrer lorsque vous avez fini.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-slate-300">Nom Complet</Label>
                  <Input id="name" placeholder="Ex: Mohammed Alami" className="col-span-3 bg-slate-950 border-slate-800 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right text-slate-300">Téléphone</Label>
                  <Input id="phone" placeholder="06..." className="col-span-3 bg-slate-950 border-slate-800 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right text-slate-300">Email</Label>
                  <Input id="email" type="email" placeholder="amine@mail.com" className="col-span-3 bg-slate-950 border-slate-800 focus:ring-blue-500" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="rounded-xl border-slate-800 text-slate-400 hover:bg-slate-800">Annuler</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Enregistrer le client</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder={t('search')} 
              className="pl-10 bg-background border-border rounded-xl h-10 focus-visible:ring-blue-500 text-foreground placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="rounded-xl h-10 px-4 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 gap-2 flex-1 sm:flex-none">
              <Filter className="w-4 h-4" />
              Filtres
            </Button>
            <Button variant="outline" className="rounded-xl h-10 px-4 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 gap-2 flex-1 sm:flex-none">
              Trier par
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/10">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="w-[300px] text-slate-400 font-bold text-[10px] uppercase tracking-wider">Client</TableHead>
                <TableHead className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Contact</TableHead>
                <TableHead className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Dernière Visite</TableHead>
                <TableHead className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Statut</TableHead>
                <TableHead className="text-right text-slate-400 font-bold text-[10px] uppercase tracking-wider">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-white/5 transition-colors cursor-pointer group border-white/5">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10 shadow-sm group-hover:scale-105 transition-transform">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.name}`} />
                        <AvatarFallback className="bg-slate-800 text-white">{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{customer.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold">#{customer.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Mail className="w-3.5 h-3.5" />
                        {customer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-xs font-medium text-slate-400">
                    {new Date(customer.last_visit).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge className={`rounded-full px-2 py-0 h-5 text-[10px] font-bold uppercase tracking-tight border-none ${
                        customer.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 
                        customer.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                      {customer.status === 'active' ? 'Actif' : customer.status === 'pending' ? 'En cours' : 'Passif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger nativeButton={true} render={
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 h-8 w-8">
                          <MoreHorizontal className="w-5 h-5 text-slate-500" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end" className="w-48 bg-slate-900 border-slate-800 text-slate-200">
                        <DropdownMenuLabel className="text-xs text-slate-500 uppercase tracking-widest font-bold px-2 py-1.5 font-mono">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2 focus:bg-white/10 focus:text-white cursor-pointer py-2">
                          <FileText className="w-4 h-4 text-blue-400" /> Voir Ordonnance
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 focus:bg-white/10 focus:text-white cursor-pointer py-2">
                          <History className="w-4 h-4 text-emerald-400" /> Historique achats
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 focus:bg-white/10 focus:text-white cursor-pointer py-2">
                          <Edit className="w-4 h-4 text-amber-400" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 bg-slate-800" />
                        <DropdownMenuItem className="gap-2 text-rose-400 focus:text-rose-300 focus:bg-rose-950/30 cursor-pointer py-2">
                          <Trash2 className="w-4 h-4" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
