import StaggeredMenu from "../ui/staggeredMenu";
import { menuItems, socialItems } from "../data/content";
import { ACCENT, MENU_COLORS } from "../data/config";

export default function Header() {
  return (
    <StaggeredMenu
      isFixed
      position="left"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering={false}
      menuButtonColor={ACCENT}
      openMenuButtonColor={ACCENT}
      changeMenuColorOnOpen
      colors={[...MENU_COLORS]}
      accentColor={ACCENT}
      closeOnClickAway
    />
  );
}
