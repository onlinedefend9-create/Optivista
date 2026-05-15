import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Stethoscope, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  MapPin,
  ExternalLink,
  UserPlus
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

export default function Doctors() {
  const { t } = useTranslation();

  const mockDoctors = [
    { id: 1, name: 'Dr. Sarah Alami', specialty: 'Ophtalmologue', phone: '+212 661-234567', email: 's.alami@gmail.com', city: 'Casablanca', patients: 124 },
    { id: 2, name: 'Dr. Ahmed Benjelloun', specialty: 'Ophtalmologue', phone: '+212 522-987654', email: 'benjelloun.doc@sanante.ma', city: 'Rabat', patients: 85 },
    { id: 3, name: 'Dr. Leila Mansouri', specialty: 'Ophtalmologue', phone: '+212 670-112233', email: 'l.mansouri@optivista.com', city: 'Casablanca', patients: 42 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-blue-500" />
            {t('doctors', 'Médecins')}
          </h1>
          <p className="text-slate-400 mt-2 font-medium">{t('manage_prescribing_doctors', 'Gérez les ophtalmologues prescripteurs')}</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger nativeButton={true} render={
              <Button className="rounded-xl h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 gap-2 font-bold transition-all hover:scale-105 active:scale-95">
                <UserPlus className="w-4 h-4" />
                {t('add_doctor', 'Ajouter un médecin')}
              </Button>
            } />
            <DialogContent className="bg-slate-900 border-slate-800 text-slate-200 sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-white">{t('new_doctor', 'Nouveau Médecin')}</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Ajoutez les coordonnées d'un nouvel ophtalmologue prescripteur.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Nom complet</Label>
                    <Input id="name" placeholder="Dr. ..." className="bg-slate-950 border-slate-800 text-white h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty" className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Spécialité</Label>
                    <Input id="specialty" defaultValue="Ophtalmologue" className="bg-slate-950 border-slate-800 text-white h-11" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+212 ..." className="bg-slate-950 border-slate-800 text-white h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Email</Label>
                    <Input id="email" type="email" placeholder="email@exemple.com" className="bg-slate-950 border-slate-800 text-white h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Ville / Adresse</Label>
                  <Input id="city" placeholder="Ville ou adresse complète" className="bg-slate-950 border-slate-800 text-white h-11" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-lg">
                  Enregistrer le médecin
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Total Médecins</p>
            <h3 className="text-2xl font-black text-white">{mockDoctors.length}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Prescriptions ce mois</p>
            <h3 className="text-2xl font-black text-white">42</h3>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">Ville dominante</p>
            <h3 className="text-2xl font-black text-white">Casablanca</h3>
          </div>
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="Rechercher par nom, ville..." 
              className="pl-10 bg-slate-950 border-slate-800 h-10 text-slate-300 placeholder:text-slate-600"
            />
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-slate-900/50">
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Nom du Médecin</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Spécialité</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Coordonnées</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">Ville</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4 text-center">Patients envoyés</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDoctors.map((doc) => (
              <TableRow key={doc.id} className="border-slate-800 hover:bg-white/5 transition-colors group">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 font-bold text-blue-400 group-hover:scale-110 transition-transform">
                      {doc.name.charAt(4)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-200">{doc.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">ID: #{doc.id + 1000}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 font-medium text-slate-400">
                  <Badge variant="outline" className="bg-blue-500/5 text-blue-400 border-blue-500/20 text-[10px] font-bold">
                    {doc.specialty}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Phone className="w-3 h-3 text-slate-500" />
                      {doc.phone}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Mail className="w-3 h-3 text-slate-500" />
                      {doc.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-slate-400 text-sm">
                  {doc.city}
                </TableCell>
                <TableCell className="py-4 text-center">
                  <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold border border-slate-700">
                    {doc.patients}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger nativeButton={true} render={
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 h-8 w-8">
                        <MoreHorizontal className="w-5 h-5 text-slate-500" />
                      </Button>
                    } />
                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200 w-48">
                      <DropdownMenuItem className="focus:bg-slate-800">
                        <ExternalLink className="w-4 h-4 mr-2" /> Voir le profil
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-slate-800 text-red-400 focus:text-red-300">
                        Supprimer
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
  );
}
