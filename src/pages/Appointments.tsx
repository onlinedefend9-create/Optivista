import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Clock, 
  User,
  CheckCircle2,
  XCircle,
  Video
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function Appointments() {
  const { t } = useTranslation();
  
  const today = new Date();
  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  const upcomingAppointments = [
    { id: 1, customer: 'Karim Alaoui', time: '09:00', type: 'Examen de vue', status: 'confirmed' },
    { id: 2, customer: 'Lina Benzakour', time: '11:30', type: 'Ajustement monture', status: 'confirmed' },
    { id: 3, customer: 'Mohammed Alami', time: '14:00', type: 'Nouveau client', status: 'pending' },
    { id: 4, customer: 'Sofia Tazi', time: '15:30', type: 'Livraison verres', status: 'confirmed' },
    { id: 5, customer: 'Yassine ID', time: '17:00', type: 'Consultation', status: 'cancelled' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{t('appointments')}</h1>
          <p className="text-slate-400 mt-1">Gérez vos rendez-vous clients et consultations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="rounded-xl h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 gap-2 font-bold">
            <Plus className="w-4 h-4" />
            Nouveau RDV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Side Pane */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/5 border border-white/10 shadow-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="font-black text-white text-lg tracking-tight">Mai 2024</span>
                <div className="flex gap-1">
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white">
                     <ChevronLeft className="w-4 h-4" />
                   </Button>
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white">
                     <ChevronRight className="w-4 h-4" />
                   </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {weekDays.map(day => (
                  <span key={day} className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{day}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <div 
                    key={day} 
                    className={`h-9 flex items-center justify-center rounded-xl text-[13px] transition-all cursor-pointer font-bold ${
                      day === today.getDate() 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                        : 'hover:bg-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 shadow-2xl text-white border-none overflow-hidden relative">
            <div className="absolute -bottom-4 -right-4 opacity-10">
               <Video className="w-24 h-24" />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/15 rounded-lg">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-black tracking-tight">Téléconsultations</h3>
              </div>
              <p className="text-xs text-blue-100/80 mb-6 leading-relaxed">Proposez des pré-examens à distance via notre plateforme sécurisée.</p>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-black rounded-xl shadow-xl transition-transform active:scale-95 text-xs uppercase tracking-wider h-10">Configurer</Button>
            </CardContent>
          </Card>
        </div>

        {/* Appointment List Pane */}
        <div className="lg:col-span-3 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black text-white flex items-center gap-3 tracking-tight">
                <div className="p-1.5 bg-blue-500/10 rounded-lg">
                   <Clock className="w-5 h-5 text-blue-400" />
                </div>
                Aujourd'hui, 14 Mai
              </h2>
              <Badge variant="outline" className="px-3 py-1 rounded-full bg-white/5 border-white/10 font-bold text-[10px] uppercase tracking-wider text-slate-400">5 rendez-vous</Badge>
           </div>

           <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <Card key={apt.id} className="bg-white/5 border border-white/10 shadow-sm hover:translate-x-1 transition-all group overflow-hidden hover:bg-white/10 hover:border-white/20">
                   <CardContent className="p-0 flex h-full">
                      <div className={`w-1.5 ${
                        apt.status === 'confirmed' ? 'bg-emerald-500' : 
                        apt.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                      }`} />
                      <div className="flex-1 p-6 flex flex-col sm:flex-row items-center gap-8">
                        <div className="w-full sm:w-28 text-center sm:text-left border-b sm:border-b-0 sm:border-r border-white/5 pb-4 sm:pb-0 sm:pr-8">
                           <p className="text-2xl font-black text-white tracking-tighter">{apt.time}</p>
                           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Matinée</p>
                        </div>
                        
                        <div className="flex-1 flex items-center gap-5 w-full">
                           <Avatar className="h-11 w-11 border-2 border-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-300">
                             <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${apt.customer}`} />
                             <AvatarFallback className="bg-slate-900">{apt.customer.charAt(0)}</AvatarFallback>
                           </Avatar>
                           <div className="min-w-0">
                              <h4 className="font-bold text-white text-lg leading-tight group-hover:text-blue-400 transition-colors uppercase tracking-tight">{apt.customer}</h4>
                              <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{apt.type}</p>
                           </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto shrink-0">
                            <Badge className={`rounded-full px-4 h-7 border-none font-bold text-[10px] items-center flex uppercase tracking-tighter ${
                              apt.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                              apt.status === 'pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                            }`}>
                              {apt.status === 'confirmed' ? 'Confirmé' : apt.status === 'pending' ? 'En attente' : 'Annulé'}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white/10 text-slate-500 hover:text-white transition-colors border border-white/5">
                               <Plus className="w-5 h-5" />
                            </Button>
                        </div>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
