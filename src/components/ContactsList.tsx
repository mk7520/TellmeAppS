import React, { useState } from 'react';
import { Contact, Story } from '../types';
import { TellmeLogo } from './TellmeLogo';
import { StoriesBar } from './StoriesBar';
import { Search, Plus, MessageCircle, Phone, Video, UserPlus } from 'lucide-react';
import { CountryPhoneInput } from './CountryPhoneInput';

interface ContactsListProps {
  contacts: Contact[];
  stories: Story[];
  onSelectContact: (contact: Contact) => void;
  onStartCall: (name: string, kind: 'audio' | 'video') => void;
  onAddStory: () => void;
  onNewContact: (contact: Partial<Contact>) => void;
}

export const ContactsList: React.FC<ContactsListProps> = ({
  contacts,
  stories,
  onSelectContact,
  onStartCall,
  onAddStory,
  onNewContact,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCountryCode, setNewCountryCode] = useState('+966');
  const [newPhone, setNewPhone] = useState('');

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const formattedPhone = newPhone.trim() 
      ? (newPhone.trim().startsWith('+') ? newPhone.trim() : `${newCountryCode} ${newPhone.trim()}`)
      : `${newCountryCode} 50 000 0000`;
    onNewContact({
      name: newName,
      phone: formattedPhone,
      username: `@${newName.replace(/\s+/g, '_').toLowerCase()}`,
      statusText: 'Lets to 5m',
      isOnline: true,
      categoryLetter: newName.trim().charAt(0),
    });
    setNewName('');
    setNewPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Top Header - Matching Slide 7: "Tellme Contacts" */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-2">
          <TellmeLogo size="sm" />
          <h1
            className="font-brand font-bold text-2xl text-blue-600 tracking-wide"
            style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
          >
            Tellme Contacts
          </h1>
        </div>

        <div className="flex items-center gap-1 text-slate-600">
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
            title="إضافة جهة اتصال"
          >
            <Plus className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute right-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في جهات الاتصال..."
            className="w-full bg-white border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs"
          />
        </div>
      </div>

      {/* Stories Bar - Slide 7 */}
      <StoriesBar stories={stories} onAddStory={onAddStory} />

      {/* Contacts list */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        <div className="px-4 py-2 bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-500 flex justify-between">
          <span>قائمة جهات الاتصال</span>
          <span>{filteredContacts.length} جهة</span>
        </div>

        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <button
              onClick={() => onSelectContact(contact)}
              className="flex items-center gap-3 text-right flex-1 min-w-0 cursor-pointer"
            >
              <div className="relative shrink-0">
                <TellmeLogo size="md" />
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-800 truncate hover:text-blue-600 transition-colors">
                    {contact.name}
                  </h3>
                  <span className="text-[10px] text-blue-600 font-mono">
                    {contact.username}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">
                  {contact.statusText}
                </p>
              </div>
            </button>

            {/* Quick Actions (Message, Call) */}
            <div className="flex items-center gap-1 text-slate-500 shrink-0 mr-2">
              <button
                onClick={() => onSelectContact(contact)}
                className="p-1.5 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
                title="إرسال رسالة"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => onStartCall(contact.name, 'audio')}
                className="p-1.5 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors cursor-pointer"
                title="مكالمة صوتية"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSubmit}
            className="bg-white w-full max-w-xs rounded-2xl p-5 border border-slate-200 shadow-xl space-y-3.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">إضافة جهة اتصال جديدة</h3>
              <TellmeLogo size="sm" />
            </div>

            <div className="space-y-2.5 text-right">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  الاسم الكامل:
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="مثال: فيصل العتيبي"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  رقم الهاتف والدولة:
                </label>
                <CountryPhoneInput
                  countryCode={newCountryCode}
                  onCountryCodeChange={setNewCountryCode}
                  phoneNumber={newPhone}
                  onPhoneNumberChange={setNewPhone}
                  placeholder="50 123 4567"
                  id="new-contact-phone"
                  required={false}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
              >
                حفظ الجهة
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500 font-semibold text-xs hover:bg-slate-100 cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
