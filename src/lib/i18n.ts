import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      dashboard: 'Tableau de bord',
      customers: 'Clients',
      orders: 'Commandes',
      inventory: 'Inventaire',
      appointments: 'Rendez-vous',
      settings: 'Paramètres',
      search: 'Rechercher...',
      add_customer: 'Ajouter un client',
      add_order: 'Nouvelle commande',
      daily_stats: 'Statistiques du jour',
      pending_orders: 'Commandes en attente',
      low_stock: 'Stock bas',
      total_customers: 'Total Clients',
      recent_orders: 'Commandes récentes',
      status: {
        pending: 'En attente',
        supplier: 'Chez fournisseur',
        ready: 'Prêt',
        delivered: 'Livré',
        cancelled: 'Annulé'
      },
      lens: 'Verres',
      frame: 'Monture',
      prescription: 'Ordonnance',
      invoice: 'Facture',
      quotes: 'Devis',
      add_quote: 'Nouveau Devis',
      quote_number: 'N° Devis',
      ice: 'ICE',
      validity: 'Validité',
      subtotal: 'Sous-total',
      tva: 'TVA (20%)',
      total_ttc: 'Total TTC',
      unit_price: 'Prix Unit.',
      quantity: 'Qté',
      description: 'Désignation',
      dirham: 'DH',
      generate_pdf: 'Générer PDF',
      lab: 'Laboratoire',
      advance: 'Acompte',
      balance: 'Reste à payer',
      delivery_date: 'Date de livraison',
      sphere: 'Sphère',
      cylinder: 'Cylindre',
      axis: 'Axe',
      addition: 'Addition',
      pd: 'Écart pupillaire',
      right_eye: 'Œil Droit',
      left_eye: 'Œil Gauche',
      ar: 'Arabe',
      fr: 'Français'
    }
  },
  ar: {
    translation: {
      dashboard: 'لوحة القيادة',
      customers: 'الزبائن',
      orders: 'الطلبات',
      inventory: 'المخزون',
      appointments: 'المواعيد',
      settings: 'الإعدادات',
      search: 'بحث...',
      add_customer: 'إضافة زبون',
      add_order: 'طلب جديد',
      daily_stats: 'إحصائيات اليوم',
      pending_orders: 'طلبات قيد الانتظار',
      low_stock: 'مخزون منخفض',
      total_customers: 'إجمالي الزبائن',
      recent_orders: 'أحدث الطلبات',
      status: {
        pending: 'قيد الانتظار',
        supplier: 'عند المورد',
        ready: 'جاهز',
        delivered: 'تم التوصيل',
        cancelled: 'تم الإلغاء'
      },
      lens: 'عدسات',
      frame: 'إطار',
      prescription: 'وصفة طبية',
      invoice: 'فاتورة',
      quotes: 'تقدير سعر',
      add_quote: 'تقدير جديد',
      quote_number: 'رقم التقدير',
      ice: 'ICE',
      validity: 'الصلاحية',
      subtotal: 'المجموع الصافي',
      tva: 'الضريبة (20%)',
      total_ttc: 'المجموع مع الرسوم',
      unit_price: 'سعر الوحدة',
      quantity: 'الكمية',
      description: 'الوصف',
      dirham: 'درهم',
      generate_pdf: 'توليد PDF',
      lab: 'المختبر',
      advance: 'تسبيق',
      balance: 'الباقي',
      delivery_date: 'تاريخ التسليم',
      sphere: 'الكرة',
      cylinder: 'الأسطوانة',
      axis: 'المحور',
      addition: 'الإضافة',
      pd: 'المسافة بين الحدقتين',
      right_eye: 'العين اليمنى',
      left_eye: 'العين اليسرى',
      ar: 'العربية',
      fr: 'الفرنسية'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
