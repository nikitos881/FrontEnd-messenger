import { View, Text, TouchableOpacity } from 'react-native';
import { Link, router, usePathname } from 'expo-router';
import { ICONS } from '../icons';
import { styles } from './chats-header.styles';

export function CHATSHEADER() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
        <NavItem href="/contacts" Icon={ICONS.PeopleIcon} label="Контакти" isActive={pathname === '/contacts'} />
        <NavItem href="/message" Icon={ICONS.ChatIcon} label="Повідомлення" isActive={pathname === '/message'} />
        <NavItem href="/group-chats" Icon={ICONS.ChatIcon} label="Групові чати" isActive={pathname === '/group-chats'} />
    </View>
  );
}

function NavItem({
  href,
  Icon,
  label,
  isActive,
}: {
  href: string;
  Icon: React.ComponentType<any>;
  label: string;
  isActive: boolean;
}) {
  return (
    // <Link href={href} asChild>
      <TouchableOpacity style={styles.tab} onPress={() => router.push(href)}>
        {isActive && <View style={styles.topUnderline} />}
        <Icon width={20} height={20} />
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    // </Link>
  );
}
