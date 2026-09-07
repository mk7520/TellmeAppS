export type AppTab = 
  | 'chat' 
  | 'call' 
  | 'contacts' 
  | 'clips' 
  | 'channels' 
  | 'groups' 
  | 'settings' 
  | 'profile' 
  | 'bots' 
  | 'info' 
  | 'support';

export interface Story {
  id: string;
  userName: string;
  userAvatar?: string;
  imageUrl: string;
  caption?: string;
  timeAgo: string;
  viewed: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'file';
  audioDuration?: string;
  timestamp: string;
  isOutgoing: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  statusText?: string;
  phone?: string;
  username?: string;
  messages: ChatMessage[];
}

export interface CallRecord {
  id: string;
  name: string;
  avatar?: string;
  type: 'incoming' | 'outgoing' | 'missed';
  callKind: 'audio' | 'video';
  timestamp: string;
  duration?: string;
}

export interface Contact {
  id: string;
  name: string;
  username: string;
  phone: string;
  avatar?: string;
  statusText: string;
  isOnline: boolean;
  categoryLetter: string;
}

export interface ClipItem {
  id: string;
  userName: string;
  userHandle: string;
  avatar?: string;
  videoUrl?: string;
  bgGradient: string;
  title: string;
  bio: string;
  likes: number;
  commentsCount: number;
  shares: number;
  isLiked: boolean;
  isFollowing: boolean;
  comments: {
    id: string;
    userName: string;
    text: string;
    timestamp: string;
  }[];
}

export interface BotItem {
  id: string;
  title: string;
  description: string;
  iconType: string;
  badge?: string;
  actionUrl?: string;
}

export interface UserProfile {
  name: string;
  username: string;
  phone: string;
  email: string;
  status: string;
  bio: string;
  avatar: string;
  followingAll: boolean;
  allowAutoPost: boolean;
}

export type MuteDuration = '1h' | '24h' | 'permanent';

export interface MutedTagRecord {
  tag: string;
  duration: MuteDuration;
  mutedAt: number;
  expiresAt: number | null;
}
