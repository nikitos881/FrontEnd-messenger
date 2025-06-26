import { View, Text, TouchableOpacity } from 'react-native';
import { Link, router, usePathname } from 'expo-router';
import { ICONS } from '../icons';
import { styles } from './footer.styles';

export function FOOTER() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <NavItem href="/home" Icon={ICONS.HouseIcon} label="Головна" isActive={pathname === '/home'} />
      <NavItem href="/myposts" Icon={ICONS.ImageIcon} label="Мої публікації" isActive={pathname === '/myposts'} />
      <NavItem href="/friends-main" Icon={ICONS.PeopleIcon} label="Друзі" isActive={pathname === '/friends-main' || pathname === '/friends-all' || pathname === '/friends-requests' || pathname === '/friends-recommendations'} />
      <NavItem href="/contacts" Icon={ICONS.ChatIcon} label="Чати" isActive={pathname === '/contacts' || pathname === '/group-chats' || pathname === '/message'} />
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
