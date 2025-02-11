import React from 'react';
import { 
  Gamepad2,
  Users,
  Trophy,
  Crown,
  User,
  LogOut
} from 'lucide-react';

// Re-export commonly used icons with consistent sizing
export const GameIcon = (props: React.ComponentProps<typeof Gamepad2>) => (
  <Gamepad2 {...props} />
);

export const UsersIcon = (props: React.ComponentProps<typeof Users>) => (
  <Users {...props} />
);

export const TrophyIcon = (props: React.ComponentProps<typeof Trophy>) => (
  <Trophy {...props} />
);

export const CrownIcon = (props: React.ComponentProps<typeof Crown>) => (
  <Crown {...props} />
);

export const UserIcon = (props: React.ComponentProps<typeof User>) => (
  <User {...props} />
);

export const LogOutIcon = (props: React.ComponentProps<typeof LogOut>) => (
  <LogOut {...props} />
);